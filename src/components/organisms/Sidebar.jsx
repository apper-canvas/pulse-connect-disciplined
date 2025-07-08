import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Avatar from '@/components/atoms/Avatar'

const Sidebar = ({ onNavigate }) => {
  const location = useLocation()

  const navigationItems = [
    { icon: 'Home', label: 'Home', path: '/' },
    { icon: 'Compass', label: 'Explore', path: '/explore' },
    { icon: 'Bell', label: 'Notifications', path: '/notifications' },
    { icon: 'Search', label: 'Search', path: '/search' },
    { icon: 'User', label: 'Profile', path: '/profile/sarah_creative' },
  ]

  const handleClick = () => {
    if (onNavigate) onNavigate()
  }

  return (
    <div className="h-full flex flex-col">
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={handleClick}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-gradient-to-r from-primary to-secondary text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <ApperIcon name={item.icon} className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
          <Avatar 
            src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
            alt="Sarah Chen"
            size="md"
          />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900 truncate">Sarah Chen</p>
            <p className="text-sm text-gray-500 truncate">@sarah_creative</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar