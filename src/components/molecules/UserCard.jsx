import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Card from '@/components/atoms/Card'
import Avatar from '@/components/atoms/Avatar'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import { userService } from '@/services/api/userService'

const UserCard = ({ user, showFollowButton = true, onUpdate }) => {
  const [isFollowing, setIsFollowing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleFollow = async (e) => {
    e.preventDefault()
    if (isLoading) return

    setIsLoading(true)
    try {
      if (isFollowing) {
        await userService.unfollowUser(1, user.Id) // Using user ID 1 for demo
        setIsFollowing(false)
        toast.success(`Unfollowed ${user.displayName}`)
      } else {
        await userService.followUser(1, user.Id) // Using user ID 1 for demo
        setIsFollowing(true)
        toast.success(`Following ${user.displayName}`)
      }
      if (onUpdate) onUpdate()
    } catch (error) {
      toast.error('Failed to update follow status')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="p-4 hover:shadow-card-hover transition-shadow duration-200">
      <div className="flex items-center space-x-3">
        <Avatar 
          src={user.avatar} 
          alt={user.displayName}
          size="lg"
        />
        <div className="flex-1 min-w-0">
          <Link 
            to={`/profile/${user.username}`}
            className="font-semibold text-gray-900 hover:text-primary transition-colors block truncate"
          >
            {user.displayName}
          </Link>
          <p className="text-sm text-gray-500 truncate">
            @{user.username}
          </p>
          {user.bio && (
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {user.bio}
            </p>
          )}
        </div>
        {showFollowButton && (
          <Button
            onClick={handleFollow}
            variant={isFollowing ? "secondary" : "primary"}
            size="sm"
            loading={isLoading}
            className="shrink-0"
          >
            {isFollowing ? (
              <>
                <ApperIcon name="UserMinus" className="w-4 h-4 mr-1" />
                Unfollow
              </>
            ) : (
              <>
                <ApperIcon name="UserPlus" className="w-4 h-4 mr-1" />
                Follow
              </>
            )}
          </Button>
        )}
      </div>
    </Card>
  )
}

export default UserCard