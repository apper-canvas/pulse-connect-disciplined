import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import NotificationItem from '@/components/molecules/NotificationItem'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import ApperIcon from '@/components/ApperIcon'
import { notificationService } from '@/services/api/notificationService'

const Notifications = () => {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [markingAllRead, setMarkingAllRead] = useState(false)

  const loadNotifications = async () => {
    try {
      setError('')
      setLoading(true)
      const data = await notificationService.getByUserId(1) // Using user ID 1 for demo
      setNotifications(data)
    } catch (err) {
      setError(err.message || 'Failed to load notifications')
    } finally {
      setLoading(false)
    }
  }

  const handleMarkAllRead = async () => {
    if (markingAllRead) return

    setMarkingAllRead(true)
    try {
      await notificationService.markAllAsRead(1) // Using user ID 1 for demo
      setNotifications(notifications.map(n => ({ ...n, isRead: true })))
    } catch (err) {
      setError('Failed to mark notifications as read')
    } finally {
      setMarkingAllRead(false)
    }
  }

  useEffect(() => {
    loadNotifications()
  }, [])

  if (loading) {
    return <Loading type="users" />
  }

  if (error) {
    return <Error message={error} onRetry={loadNotifications} />
  }

  const unreadCount = notifications.filter(n => !n.isRead).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">
            Notifications
          </h1>
          {unreadCount > 0 && (
            <p className="text-gray-600 mt-1">
              You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </p>
          )}
        </div>
        
        {unreadCount > 0 && (
          <Button
            onClick={handleMarkAllRead}
            variant="outline"
            loading={markingAllRead}
          >
            <ApperIcon name="CheckCheck" className="w-4 h-4 mr-2" />
            Mark All Read
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <Empty 
          type="notifications" 
          title="No notifications yet"
          description="You're all caught up! Check back later for new updates."
        />
      ) : (
        <Card className="divide-y divide-gray-100">
          {notifications.map((notification, index) => (
            <motion.div
              key={notification.Id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <NotificationItem notification={notification} />
            </motion.div>
          ))}
        </Card>
      )}
    </div>
  )
}

export default Notifications