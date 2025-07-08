import { motion } from "framer-motion";
import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ 
  type = "posts", 
  onAction,
  actionText = "Create Post",
  title,
  description
}) => {
const getEmptyContent = () => {
    switch (type) {
      case 'posts':
        return {
          icon: 'FileText',
          title: title || 'No Posts Yet',
          description: description || 'Start sharing your thoughts and moments with the world!',
          action: actionText,
          gradient: 'from-primary to-secondary'
        }
      case 'followers':
        return {
          icon: 'Users',
          title: title || 'No Followers Yet',
          description: description || 'Share great content to start building your community!',
          action: 'Create Your First Post',
          gradient: 'from-secondary to-accent'
        }
      case 'following':
        return {
          icon: 'UserPlus',
          title: title || 'Not Following Anyone',
          description: description || 'Discover and follow users to see their content in your feed!',
          action: 'Explore Users',
          gradient: 'from-accent to-primary'
        }
      case 'search':
        return {
          icon: 'Search',
          title: title || 'No Results Found',
          description: description || 'Try adjusting your search terms or explore trending content.',
          action: 'Clear Search',
          gradient: 'from-info to-primary'
        }
      case 'notifications':
        return {
          icon: 'Bell',
          title: title || 'No Notifications',
          description: description || 'You\'re all caught up! Check back later for new updates.',
          action: 'Explore Posts',
          gradient: 'from-success to-secondary'
        }
      case 'comments':
        return {
          icon: 'MessageCircle',
          title: title || 'No Comments Yet',
          description: description || 'Be the first to start the conversation!',
          action: 'Add Comment',
          gradient: 'from-accent to-secondary'
        }
default:
        return {
          icon: 'Smile',
          title: title || 'Nothing Here',
          description: description || 'There\'s nothing to show at the moment.',
          action: actionText,
          gradient: 'from-primary to-secondary'
        };
    }
  }

  const emptyContent = getEmptyContent()

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-8 text-center"
    >
      <div className={`w-20 h-20 bg-gradient-to-br ${emptyContent.gradient} rounded-full flex items-center justify-center mb-6 shadow-lg`}>
        <ApperIcon 
          name={emptyContent.icon} 
          className="w-10 h-10 text-white" 
        />
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-3">
        {emptyContent.title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md text-lg">
        {emptyContent.description}
      </p>
      
      {onAction && (
        <Button 
          onClick={onAction}
          variant="primary"
          size="lg"
          className="min-w-40"
        >
          <ApperIcon name="Plus" className="w-5 h-5 mr-2" />
          {emptyContent.action}
        </Button>
      )}
    </motion.div>
  )
}

export default Empty