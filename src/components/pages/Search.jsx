import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import SearchBar from '@/components/molecules/SearchBar'
import PostCard from '@/components/molecules/PostCard'
import UserCard from '@/components/molecules/UserCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import ApperIcon from '@/components/ApperIcon'
import { postService } from '@/services/api/postService'
import { userService } from '@/services/api/userService'

const Search = () => {
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [activeTab, setActiveTab] = useState('posts')
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const performSearch = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setPosts([])
      setUsers([])
      return
    }

    setLoading(true)
    setError('')
    
    try {
      const [postsData, usersData] = await Promise.all([
        postService.searchPosts(searchQuery),
        userService.searchUsers(searchQuery)
      ])
      
      setPosts(postsData)
      setUsers(usersData)
    } catch (err) {
      setError(err.message || 'Failed to search')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery)
    performSearch(searchQuery)
  }

  const clearSearch = () => {
    setQuery('')
    setPosts([])
    setUsers([])
  }

  useEffect(() => {
    const initialQuery = searchParams.get('q')
    if (initialQuery) {
      setQuery(initialQuery)
      performSearch(initialQuery)
    }
  }, [searchParams])

  const tabs = [
    { id: 'posts', label: 'Posts', icon: 'FileText', count: posts.length },
    { id: 'users', label: 'Users', icon: 'Users', count: users.length }
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold gradient-text mb-4">
          Search
        </h1>
        <p className="text-gray-600 mb-6">
          Find posts, users, and conversations that matter to you.
        </p>
        
        <div className="max-w-2xl mx-auto">
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Search for posts, users, or hashtags..."
          />
        </div>
      </div>

      {query && (
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Search results for "{query}"
            </h2>
            <button
              onClick={clearSearch}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <ApperIcon name="X" className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <ApperIcon name={tab.icon} className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    activeTab === tab.id
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Results */}
          {loading ? (
            <Loading type={activeTab === 'posts' ? 'posts' : 'users'} />
          ) : error ? (
            <Error message={error} onRetry={() => performSearch(query)} />
          ) : (
            <div>
              {activeTab === 'posts' && (
                <div className="space-y-6">
                  {posts.length === 0 ? (
                    <Empty 
                      type="search" 
                      title="No posts found"
                      description="Try different keywords or check your spelling."
                      onAction={clearSearch}
                      actionText="Clear Search"
                    />
                  ) : (
                    posts.map((post, index) => (
                      <motion.div
                        key={post.Id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <PostCard post={post} />
                      </motion.div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'users' && (
                <div className="space-y-4">
                  {users.length === 0 ? (
                    <Empty 
                      type="search" 
                      title="No users found"
                      description="Try different keywords or browse suggested users."
                      onAction={clearSearch}
                      actionText="Clear Search"
                    />
                  ) : (
                    users.map((user, index) => (
                      <motion.div
                        key={user.Id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <UserCard user={user} />
                      </motion.div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {!query && (
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-8 text-center">
          <ApperIcon name="Search" className="w-16 h-16 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Discover Something New
          </h3>
          <p className="text-gray-600 mb-4">
            Search for posts, users, and hashtags to connect with the community.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {['#art', '#photography', '#coding', '#fitness', '#food', '#travel'].map((tag) => (
              <button
                key={tag}
                onClick={() => handleSearch(tag)}
                className="px-3 py-1 bg-white rounded-full text-sm text-primary hover:bg-primary hover:text-white transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Search