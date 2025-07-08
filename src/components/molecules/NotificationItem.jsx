import { formatDistanceToNow } from 'date-fns'
import { Link } from 'react-router-dom'
import Avatar from '@/components/atoms/Avatar'
import ApperIcon from '@/components/ApperIcon'

const NotificationItem = ({ notification }) => {
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like':
        return { name: 'Heart', color: 'text-accent' }
      case 'comment':
        return { name: 'MessageCircle', color: 'text-primary' }
      case 'follow':
        return { name: 'UserPlus', color: 'text-secondary' }
      default:
        return { name: 'Bell', color: 'text-gray-500' }
    }
  }

  const icon = getNotificationIcon(notification.type)

  return (
    <div className={`flex items-start space-x-3 p-4 rounded-lg transition-colors ${
      notification.isRead ? 'bg-white' : 'bg-blue-50'
    } hover:bg-gray-50`}>
      <div className="relative">
        <Avatar 
          src={notification.actor?.avatar} 
          alt={notification.actor?.displayName}
          size="md"
        />
        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
          <ApperIcon name={icon.name} className={`w-3 h-3 ${icon.color}`} />
        </div>
      </div>
      
      <div className="flex-1">
        <p className="text-sm text-gray-900">
          <Link 
            to={`/profile/${notification.actor?.username}`}
            className="font-medium hover:text-primary transition-colors"
          >
            {notification.actor?.displayName}
          </Link>
          <span className="text-gray-600 ml-1">
            {notification.message}
          </span>
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
        </p>
      </div>
      
      {!notification.isRead && (
        <div className="w-2 h-2 bg-primary rounded-full"></div>
      )}
    </div>
  )
}

export default NotificationItem