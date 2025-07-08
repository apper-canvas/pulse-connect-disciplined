import usersData from '@/services/mockData/users.json'
import followsData from '@/services/mockData/follows.json'

let users = [...usersData]
let follows = [...followsData]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const userService = {
  async getAll() {
    await delay(300)
    return users.map(user => ({
      ...user,
      followersCount: follows.filter(f => f.followingId === user.Id).length,
      followingCount: follows.filter(f => f.followerId === user.Id).length
    }))
  },

  async getById(id) {
    await delay(200)
    const user = users.find(u => u.Id === parseInt(id))
    if (!user) throw new Error('User not found')
    
    return {
      ...user,
      followersCount: follows.filter(f => f.followingId === user.Id).length,
      followingCount: follows.filter(f => f.followerId === user.Id).length
    }
  },

  async getByUsername(username) {
    await delay(200)
    const user = users.find(u => u.username === username)
    if (!user) throw new Error('User not found')
    
    return {
      ...user,
      followersCount: follows.filter(f => f.followingId === user.Id).length,
      followingCount: follows.filter(f => f.followerId === user.Id).length
    }
  },

  async searchUsers(query) {
    await delay(250)
    const searchTerm = query.toLowerCase()
    return users
      .filter(user => 
        user.username.toLowerCase().includes(searchTerm) ||
        user.displayName.toLowerCase().includes(searchTerm)
      )
      .map(user => ({
        ...user,
        followersCount: follows.filter(f => f.followingId === user.Id).length,
        followingCount: follows.filter(f => f.followerId === user.Id).length
      }))
  },

  async followUser(followerId, followingId) {
    await delay(300)
    const existingFollow = follows.find(f => 
      f.followerId === followerId && f.followingId === followingId
    )
    
    if (existingFollow) {
      throw new Error('Already following this user')
    }
    
    const newFollow = {
      Id: Math.max(...follows.map(f => f.Id)) + 1,
      followerId,
      followingId,
      createdAt: new Date().toISOString()
    }
    
    follows.push(newFollow)
    return newFollow
  },

  async unfollowUser(followerId, followingId) {
    await delay(300)
    const followIndex = follows.findIndex(f => 
      f.followerId === followerId && f.followingId === followingId
    )
    
    if (followIndex === -1) {
      throw new Error('Not following this user')
    }
    
    follows.splice(followIndex, 1)
    return { success: true }
  },

  async isFollowing(followerId, followingId) {
    await delay(100)
    return follows.some(f => 
      f.followerId === followerId && f.followingId === followingId
    )
  },

  async getSuggestedUsers(userId, limit = 5) {
    await delay(200)
    const userFollowing = follows
      .filter(f => f.followerId === userId)
      .map(f => f.followingId)
    
    const suggested = users
      .filter(user => 
        user.Id !== userId && 
        !userFollowing.includes(user.Id)
      )
      .slice(0, limit)
      .map(user => ({
        ...user,
        followersCount: follows.filter(f => f.followingId === user.Id).length,
        followingCount: follows.filter(f => f.followerId === user.Id).length
      }))
    
    return suggested
  }
}