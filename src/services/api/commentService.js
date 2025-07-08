import commentsData from '@/services/mockData/comments.json'
import usersData from '@/services/mockData/users.json'

let comments = [...commentsData]
let users = [...usersData]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const commentService = {
  async getByPostId(postId) {
    await delay(200)
    return comments
      .filter(c => c.postId === parseInt(postId))
      .map(comment => ({
        ...comment,
        user: users.find(u => u.Id === comment.userId)
      }))
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
  },

  async create(commentData) {
    await delay(300)
    const newComment = {
      Id: Math.max(...comments.map(c => c.Id)) + 1,
      postId: commentData.postId,
      userId: commentData.userId,
      content: commentData.content,
      createdAt: new Date().toISOString()
    }
    
    comments.push(newComment)
    
    return {
      ...newComment,
      user: users.find(u => u.Id === newComment.userId)
    }
  },

  async delete(id) {
    await delay(200)
    const commentIndex = comments.findIndex(c => c.Id === parseInt(id))
    if (commentIndex === -1) throw new Error('Comment not found')
    
    comments.splice(commentIndex, 1)
    return { success: true }
  }
}