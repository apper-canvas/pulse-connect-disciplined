import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Avatar from '@/components/atoms/Avatar'
import Textarea from '@/components/atoms/Textarea'
import ApperIcon from '@/components/ApperIcon'
import { postService } from '@/services/api/postService'

const CreatePost = () => {
  const navigate = useNavigate()
  const [content, setContent] = useState('')
  const [mediaUrls, setMediaUrls] = useState([])
  const [isPosting, setIsPosting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!content.trim() || isPosting) return

    setIsPosting(true)
    try {
      // Extract hashtags from content
      const hashtags = content.match(/#[a-zA-Z0-9_]+/g)?.map(tag => tag.slice(1)) || []
      
      const newPost = await postService.create({
        userId: 1, // Using user ID 1 for demo
        content: content.trim(),
        mediaUrls,
        hashtags
      })
      
      toast.success('Post created successfully!')
      navigate('/')
    } catch (error) {
      toast.error('Failed to create post')
    } finally {
      setIsPosting(false)
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // In a real app, you would upload to a service and get back a URL
      // For now, we'll use a placeholder
      const imageUrl = `https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=500&h=400&fit=crop`
      setMediaUrls([imageUrl])
      toast.success('Image uploaded!')
    }
  }

  const removeImage = () => {
    setMediaUrls([])
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold gradient-text mb-4">
          Create New Post
        </h1>
        <p className="text-gray-600">
          Share your thoughts, moments, and experiences with the world.
        </p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-start space-x-4">
            <Avatar 
              src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
              alt="Sarah Chen"
              size="lg"
            />
            <div className="flex-1">
              <p className="font-semibold text-gray-900 mb-2">Sarah Chen</p>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's happening? Use #hashtags to join conversations..."
                className="min-h-32 resize-none border-none shadow-none focus:ring-0 text-lg"
                rows={4}
              />
            </div>
          </div>

          {mediaUrls.length > 0 && (
            <div className="relative">
              <img 
                src={mediaUrls[0]} 
                alt="Upload preview"
                className="w-full rounded-lg object-cover max-h-96"
              />
              <Button
                type="button"
                onClick={removeImage}
                variant="danger"
                size="sm"
                className="absolute top-2 right-2"
              >
                <ApperIcon name="X" className="w-4 h-4" />
              </Button>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-4">
              <label className="cursor-pointer">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors">
                  <ApperIcon name="Image" className="w-5 h-5" />
                  <span className="text-sm font-medium">Add Photo</span>
                </div>
              </label>
              
              <div className="flex items-center space-x-2 text-gray-400">
                <ApperIcon name="Smile" className="w-5 h-5" />
                <span className="text-sm">Emoji</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-sm text-gray-500">
                {content.length}/280
              </div>
              <Button
                type="submit"
                variant="primary"
                disabled={!content.trim() || content.length > 280}
                loading={isPosting}
              >
                <ApperIcon name="Send" className="w-4 h-4 mr-2" />
                Post
              </Button>
            </div>
          </div>
        </form>
      </Card>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6"
      >
        <h3 className="font-semibold text-gray-900 mb-3">
          💡 Tips for Great Posts
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start space-x-2">
            <span className="text-primary">•</span>
            <span>Use #hashtags to reach more people interested in your topics</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-primary">•</span>
            <span>Share authentic moments and genuine thoughts</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-primary">•</span>
            <span>Add images to make your posts more engaging</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-primary">•</span>
            <span>Ask questions to encourage meaningful conversations</span>
          </li>
        </ul>
      </motion.div>
    </div>
  )
}

export default CreatePost