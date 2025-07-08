import notificationsData from '@/services/mockData/notifications.json'
import usersData from '@/services/mockData/users.json'

let notifications = [...notificationsData]
let users = [...usersData]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const notificationService = {
  async getByUserId(userId) {
    await delay(250)
    return notifications
      .filter(n => n.userId === parseInt(userId))
      .map(notification => ({
        ...notification,
        actor: users.find(u => u.Id === notification.actorId)
      }))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  },

  async markAsRead(id) {
    await delay(150)
    const notification = notifications.find(n => n.Id === parseInt(id))
    if (!notification) throw new Error('Notification not found')
    
    notification.isRead = true
    return notification
  },

  async markAllAsRead(userId) {
    await delay(200)
    notifications
      .filter(n => n.userId === parseInt(userId))
      .forEach(n => n.isRead = true)
    
    return { success: true }
  },

  async getUnreadCount(userId) {
    await delay(100)
    return notifications
      .filter(n => n.userId === parseInt(userId) && !n.isRead)
      .length
  }
}