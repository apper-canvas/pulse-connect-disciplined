import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PostList from '@/components/organisms/PostList'
import UserCard from '@/components/molecules/UserCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { postService } from '@/services/api/postService'
import { userService } from '@/services/api/userService'

const Explore = () => {
  const navigate = useNavigate()
  const [suggestedUsers, setSuggestedUsers] = useState([])
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [userError, setUserError] = useState('')

  const fetchTrendingPosts = () => {
    return postService.getTrendingPosts()
  }

  const loadSuggestedUsers = async () => {
    try {
      setUserError('')
      setLoadingUsers(true)
      const users = await userService.getSuggestedUsers(1, 3) // Using user ID 1 for demo
      setSuggestedUsers(users)
    } catch (err) {
      setUserError(err.message || 'Failed to load suggested users')
    } finally {
      setLoadingUsers(false)
    }
  }

  useEffect(() => {
    loadSuggestedUsers()
  }, [])

  const handleCreatePost = () => {
    navigate('/create')
  }

  return (
    <div className="space-y-8">
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold gradient-text mb-4">
          Explore & Discover
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Find trending content and connect with new people in the community.
        </p>
      </div>

      {/* Suggested Users */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Suggested for You
        </h2>
        
        {loadingUsers ? (
          <Loading type="users" />
        ) : userError ? (
          <Error message={userError} onRetry={loadSuggestedUsers} type="general" />
        ) : suggestedUsers.length === 0 ? (
          <Empty 
            type="following" 
            title="No suggestions available"
            description="Check back later for new user recommendations!"
          />
        ) : (
          <div className="space-y-4">
            {suggestedUsers.map((user, index) => (
              <motion.div
                key={user.Id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <UserCard 
                  user={user} 
                  onUpdate={loadSuggestedUsers}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Trending Posts */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Trending Posts
        </h2>
        
        <PostList 
          fetchPosts={fetchTrendingPosts}
          emptyMessage={{
            title: "No trending posts",
            description: "Be the first to create viral content!"
          }}
          emptyAction={handleCreatePost}
        />
      </div>
    </div>
  )
}

export default Explore