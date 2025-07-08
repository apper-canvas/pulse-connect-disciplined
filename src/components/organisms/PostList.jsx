import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PostCard from '@/components/molecules/PostCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'

const PostList = ({ fetchPosts, emptyMessage, emptyAction, onPostUpdate }) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadPosts = async () => {
    try {
      setError('')
      setLoading(true)
      const data = await fetchPosts()
      setPosts(data)
    } catch (err) {
      setError(err.message || 'Failed to load posts')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPosts()
  }, [])

  if (loading) {
    return <Loading type="posts" />
  }

  if (error) {
    return <Error message={error} onRetry={loadPosts} />
  }

  if (posts.length === 0) {
    return (
      <Empty 
        type="posts" 
        title={emptyMessage?.title}
        description={emptyMessage?.description}
        onAction={emptyAction}
      />
    )
  }

  return (
    <div className="space-y-6">
      {posts.map((post, index) => (
        <motion.div
          key={post.Id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <PostCard 
            post={post} 
            onUpdate={() => {
              loadPosts()
              if (onPostUpdate) onPostUpdate()
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}

export default PostList