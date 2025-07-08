import postsData from '@/services/mockData/posts.json'
import usersData from '@/services/mockData/users.json'
import commentsData from '@/services/mockData/comments.json'
import followsData from '@/services/mockData/follows.json'

let posts = [...postsData]
let users = [...usersData]
let comments = [...commentsData]
let follows = [...followsData]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const postService = {
  async getAll() {
    await delay(400)
    return posts
      .map(post => ({
        ...post,
        user: users.find(u => u.Id === post.userId),
        likesCount: post.likes.length,
        commentsCount: comments.filter(c => c.postId === post.Id).length,
        isLiked: false // Would be based on current user
      }))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  },

  async getById(id) {
    await delay(200)
    const post = posts.find(p => p.Id === parseInt(id))
    if (!post) throw new Error('Post not found')
    
    const postComments = comments
      .filter(c => c.postId === post.Id)
      .map(comment => ({
        ...comment,
        user: users.find(u => u.Id === comment.userId)
      }))
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    
    return {
      ...post,
      user: users.find(u => u.Id === post.userId),
      likesCount: post.likes.length,
      commentsCount: postComments.length,
      isLiked: false, // Would be based on current user
      comments: postComments
    }
  },

  async getByUserId(userId) {
    await delay(300)
    const userPosts = posts
      .filter(p => p.userId === parseInt(userId))
      .map(post => ({
        ...post,
        user: users.find(u => u.Id === post.userId),
        likesCount: post.likes.length,
        commentsCount: comments.filter(c => c.postId === post.Id).length,
        isLiked: false
      }))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    
    return userPosts
  },

  async getFeedPosts(userId) {
    await delay(350)
    const userFollowing = follows
      .filter(f => f.followerId === userId)
      .map(f => f.followingId)
    
    // Include user's own posts and followed users' posts
    const feedPosts = posts
      .filter(p => p.userId === userId || userFollowing.includes(p.userId))
      .map(post => ({
        ...post,
        user: users.find(u => u.Id === post.userId),
        likesCount: post.likes.length,
        commentsCount: comments.filter(c => c.postId === post.Id).length,
        isLiked: post.likes.includes(userId)
      }))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    
    return feedPosts
  },

  async getTrendingPosts() {
    await delay(300)
    return posts
      .map(post => ({
        ...post,
        user: users.find(u => u.Id === post.userId),
        likesCount: post.likes.length,
        commentsCount: comments.filter(c => c.postId === post.Id).length,
        isLiked: false
      }))
      .sort((a, b) => b.likesCount - a.likesCount)
      .slice(0, 10)
  },

  async create(postData) {
    await delay(400)
    const newPost = {
      Id: Math.max(...posts.map(p => p.Id)) + 1,
      userId: postData.userId,
      content: postData.content,
      mediaUrls: postData.mediaUrls || [],
      likes: [],
      comments: [],
      createdAt: new Date().toISOString(),
      hashtags: postData.hashtags || []
    }
    
    posts.unshift(newPost)
    
    return {
      ...newPost,
      user: users.find(u => u.Id === newPost.userId),
      likesCount: 0,
      commentsCount: 0,
      isLiked: false
    }
  },

  async likePost(postId, userId) {
    await delay(200)
    const post = posts.find(p => p.Id === parseInt(postId))
    if (!post) throw new Error('Post not found')
    
    const isLiked = post.likes.includes(userId)
    
    if (isLiked) {
      post.likes = post.likes.filter(id => id !== userId)
    } else {
      post.likes.push(userId)
    }
    
    return {
      isLiked: !isLiked,
      likesCount: post.likes.length
    }
  },

  async searchPosts(query) {
    await delay(250)
    const searchTerm = query.toLowerCase()
    return posts
      .filter(post => 
        post.content.toLowerCase().includes(searchTerm) ||
        post.hashtags.some(tag => tag.toLowerCase().includes(searchTerm))
      )
      .map(post => ({
        ...post,
        user: users.find(u => u.Id === post.userId),
        likesCount: post.likes.length,
        commentsCount: comments.filter(c => c.postId === post.Id).length,
        isLiked: false
      }))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }
}