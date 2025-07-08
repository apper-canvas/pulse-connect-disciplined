import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'
import { toast } from 'react-toastify'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Avatar from '@/components/atoms/Avatar'
import Textarea from '@/components/atoms/Textarea'
import CommentItem from '@/components/molecules/CommentItem'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import ApperIcon from '@/components/ApperIcon'
import { postService } from '@/services/api/postService'
import { commentService } from '@/services/api/commentService'

const PostDetail = () => {
  const { postId } = useParams()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(0)
  const [isLiking, setIsLiking] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [isCommenting, setIsCommenting] = useState(false)

  const loadPost = async () => {
    try {
      setError('')
      setLoading(true)
      const postData = await postService.getById(postId)
      setPost(postData)
      setComments(postData.comments || [])
      setIsLiked(postData.isLiked)
      setLikesCount(postData.likesCount)
    } catch (err) {
      setError(err.message || 'Failed to load post')
    } finally {
      setLoading(false)
    }
  }

  const handleLike = async () => {
    if (isLiking) return

    setIsLiking(true)
    try {
      const result = await postService.likePost(postId, 1) // Using user ID 1 for demo
      setIsLiked(result.isLiked)
      setLikesCount(result.likesCount)
    } catch (error) {
      toast.error('Failed to like post')
    } finally {
      setIsLiking(false)
    }
  }

  const handleShare = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url)
    toast.success('Post link copied to clipboard!')
  }

  const handleComment = async (e) => {
    e.preventDefault()
    if (!newComment.trim() || isCommenting) return

    setIsCommenting(true)
    try {
      const comment = await commentService.create({
        postId: parseInt(postId),
        userId: 1, // Using user ID 1 for demo
        content: newComment.trim()
      })
      setComments([...comments, comment])
      setNewComment('')
      toast.success('Comment added!')
    } catch (error) {
      toast.error('Failed to add comment')
    } finally {
      setIsCommenting(false)
    }
  }

  useEffect(() => {
    loadPost()
  }, [postId])

  if (loading) {
    return <Loading type="posts" />
  }

  if (error) {
    return <Error message={error} onRetry={loadPost} type="notfound" />
  }

  if (!post) {
    return <Error message="Post not found" type="notfound" />
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        {/* Post Header */}
        <div className="flex items-center space-x-3 mb-6">
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

        {/* Post Content */}
        <div className="mb-6">
          <p className="text-gray-900 text-lg leading-relaxed mb-4">
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
            <div className="flex flex-wrap gap-2 mb-4">
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
        </div>

        {/* Post Actions */}
        <div className="flex items-center justify-between py-4 border-t border-gray-100">
          <div className="flex items-center space-x-8">
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

            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <ApperIcon name="MessageCircle" className="w-5 h-5" />
              <span>{comments.length}</span>
            </div>

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

      {/* Add Comment */}
      <Card className="p-6">
        <form onSubmit={handleComment} className="space-y-4">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="resize-none"
            rows={3}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              variant="primary"
              disabled={!newComment.trim() || isCommenting}
              loading={isCommenting}
            >
              <ApperIcon name="Send" className="w-4 h-4 mr-2" />
              Comment
            </Button>
          </div>
        </form>
      </Card>

      {/* Comments */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Comments ({comments.length})
        </h3>
        
        {comments.length === 0 ? (
          <Empty 
            type="comments" 
            title="No comments yet"
            description="Be the first to start the conversation!"
          />
        ) : (
          <div className="space-y-4">
            {comments.map((comment, index) => (
              <motion.div
                key={comment.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <CommentItem comment={comment} />
              </motion.div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}

export default PostDetail