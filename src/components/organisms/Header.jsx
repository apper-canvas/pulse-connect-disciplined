import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Button from '@/components/atoms/Button'
import SearchBar from '@/components/molecules/SearchBar'
import ApperIcon from '@/components/ApperIcon'
import Avatar from '@/components/atoms/Avatar'

const Header = ({ onMenuToggle, isMobileMenuOpen }) => {
  const navigate = useNavigate()
  const [showSearch, setShowSearch] = useState(false)

  const handleSearch = (query) => {
    navigate(`/search?q=${encodeURIComponent(query)}`)
    setShowSearch(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuToggle}
            className="lg:hidden"
          >
            <ApperIcon name={isMobileMenuOpen ? "X" : "Menu"} className="w-5 h-5" />
          </Button>
          
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <ApperIcon name="Zap" className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:block">
              Pulse Connect
            </span>
          </Link>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:block flex-1 max-w-md mx-6">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="flex items-center space-x-3">
          {/* Mobile Search Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSearch(!showSearch)}
            className="md:hidden"
          >
            <ApperIcon name="Search" className="w-5 h-5" />
          </Button>

          <Link to="/notifications">
            <Button variant="ghost" size="sm" className="relative">
              <ApperIcon name="Bell" className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full"></span>
            </Button>
          </Link>

          <Link to="/create">
            <Button variant="primary" size="sm" className="hidden sm:flex">
              <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
              Post
            </Button>
          </Link>

          <Link to="/profile/sarah_creative">
            <Avatar 
              src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
              alt="Sarah Chen"
              size="sm"
            />
          </Link>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {showSearch && (
        <div className="md:hidden px-4 py-3 border-t border-gray-200 bg-white">
          <SearchBar onSearch={handleSearch} />
        </div>
      )}
    </header>
  )
}

export default Header