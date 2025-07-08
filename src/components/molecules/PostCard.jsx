import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'
import { toast } from 'react-toastify'
import Card from '@/components/atoms/Card'
import Avatar from '@/components/atoms/Avatar'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import { postService } from '@/services/api/postService'

const PostCard = ({ post, onUpdate }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked)
  const [likesCount, setLikesCount] = useState(post.likesCount)
  const [isLiking, setIsLiking] = useState(false)

  const handleLike = async (e) => {
    e.preventDefault()
    if (isLiking) return

    setIsLiking(true)
    try {
      const result = await postService.likePost(post.Id, 1) // Using user ID 1 for demo
      setIsLiked(result.isLiked)
      setLikesCount(result.likesCount)
      if (onUpdate) onUpdate()
    } catch (error) {
      toast.error('Failed to like post')
    } finally {
      setIsLiking(false)
    }
  }

  const handleShare = (e) => {
    e.preventDefault()
    const url = `${window.location.origin}/post/${post.Id}`
    navigator.clipboard.writeText(url)
    toast.success('Post link copied to clipboard!')
  }

  return (
    <Card className="p-6 hover:shadow-card-hover transition-shadow duration-200">
      <div className="flex items-center space-x-3 mb-4">
        <Avatar 
          src={post.user?.avatar} 
          alt={post.user?.displayName}
          size="lg"
        />
        <div className="flex-1">
          <Link 
            to={`/profile/${post.user?.username}`}
            className="font-semibold text-gray-900 hover:text-primary transition-colors"
          >
            {post.user?.displayName}
          </Link>
          <p className="text-sm text-gray-500">
            @{post.user?.username} · {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
          </p>
        </div>
      </div>

      <Link to={`/post/${post.Id}`} className="block">
        <p className="text-gray-900 mb-4 leading-relaxed">
          {post.content}
        </p>

        {post.mediaUrls && post.mediaUrls.length > 0 && (
          <div className="mb-4">
            <img 
              src={post.mediaUrls[0]} 
              alt="Post media"
              className="w-full rounded-lg object-cover max-h-96"
            />
          </div>
        )}

        {post.hashtags && post.hashtags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {post.hashtags.map((tag, index) => (
              <span 
                key={index}
                className="text-primary text-sm font-medium hover:underline cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </Link>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLike}
            disabled={isLiking}
            className={`flex items-center space-x-2 text-sm transition-colors ${
              isLiked ? 'text-accent' : 'text-gray-600 hover:text-accent'
            }`}
          >
            <ApperIcon 
              name={isLiked ? "Heart" : "Heart"} 
              className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`}
            />
            <span>{likesCount}</span>
          </motion.button>

          <Link 
            to={`/post/${post.Id}`}
            className="flex items-center space-x-2 text-sm text-gray-600 hover:text-primary transition-colors"
          >
            <ApperIcon name="MessageCircle" className="w-5 h-5" />
            <span>{post.commentsCount}</span>
          </Link>

          <button
            onClick={handleShare}
            className="flex items-center space-x-2 text-sm text-gray-600 hover:text-primary transition-colors"
          >
            <ApperIcon name="Share" className="w-5 h-5" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </Card>
  )
}

export default PostCard