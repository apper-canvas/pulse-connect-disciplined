import { Link, useLocation } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'

const BottomNav = () => {
  const location = useLocation()

  const navigationItems = [
    { icon: 'Home', label: 'Home', path: '/' },
    { icon: 'Compass', label: 'Explore', path: '/explore' },
    { icon: 'Plus', label: 'Create', path: '/create' },
    { icon: 'Bell', label: 'Notifications', path: '/notifications' },
    { icon: 'User', label: 'Profile', path: '/profile/sarah_creative' },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30">
      <nav className="flex items-center justify-around px-2 py-2">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
                isActive 
                  ? 'text-primary' 
                  : 'text-gray-600'
              }`}
            >
              <ApperIcon name={item.icon} className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

export default BottomNav