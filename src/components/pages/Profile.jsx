import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Avatar from '@/components/atoms/Avatar'
import PostList from '@/components/organisms/PostList'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import ApperIcon from '@/components/ApperIcon'
import { userService } from '@/services/api/userService'
import { postService } from '@/services/api/postService'

const Profile = () => {
  const { username } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isFollowing, setIsFollowing] = useState(false)
  const [isFollowLoading, setIsFollowLoading] = useState(false)

  const loadUser = async () => {
    try {
      setError('')
      setLoading(true)
      const userData = await userService.getByUsername(username)
      setUser(userData)
      
      // Check if current user is following this user
      const followStatus = await userService.isFollowing(1, userData.Id) // Using user ID 1 for demo
      setIsFollowing(followStatus)
    } catch (err) {
      setError(err.message || 'Failed to load user profile')
    } finally {
      setLoading(false)
    }
  }

  const handleFollow = async () => {
    if (isFollowLoading) return

    setIsFollowLoading(true)
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
      // Refresh user data to update follower count
      loadUser()
    } catch (error) {
      toast.error('Failed to update follow status')
    } finally {
      setIsFollowLoading(false)
    }
  }

  const fetchUserPosts = () => {
    return postService.getByUserId(user.Id)
  }

  const handleCreatePost = () => {
    navigate('/create')
  }

  useEffect(() => {
    loadUser()
  }, [username])

  if (loading) {
    return <Loading type="profile" />
  }

  if (error) {
    return <Error message={error} onRetry={loadUser} type="notfound" />
  }

  if (!user) {
    return <Error message="User not found" type="notfound" />
  }

  const isOwnProfile = username === 'sarah_creative' // Check if viewing own profile

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        {/* Cover Image */}
        <div className="h-48 bg-gradient-to-r from-primary via-secondary to-accent"></div>
        
        {/* Profile Info */}
        <div className="p-6">
          <div className="flex items-start space-x-4 -mt-16">
            <Avatar 
              src={user.avatar} 
              alt={user.displayName}
              size="2xl"
              className="border-4 border-white shadow-lg"
            />
            <div className="flex-1 mt-12">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {user.displayName}
                  </h1>
                  <p className="text-gray-600">@{user.username}</p>
                </div>
                
                {!isOwnProfile && (
                  <Button
                    onClick={handleFollow}
                    variant={isFollowing ? "secondary" : "primary"}
                    loading={isFollowLoading}
                  >
                    {isFollowing ? (
                      <>
                        <ApperIcon name="UserMinus" className="w-4 h-4 mr-2" />
                        Following
                      </>
                    ) : (
                      <>
                        <ApperIcon name="UserPlus" className="w-4 h-4 mr-2" />
                        Follow
                      </>
                    )}
                  </Button>
                )}
              </div>
              
              {user.bio && (
                <p className="text-gray-700 mt-3 leading-relaxed">
                  {user.bio}
                </p>
              )}
              
              <div className="flex items-center space-x-6 mt-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">
                    {user.postsCount}
                  </div>
                  <div className="text-sm text-gray-600">Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">
                    {user.followersCount}
                  </div>
                  <div className="text-sm text-gray-600">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">
                    {user.followingCount}
                  </div>
                  <div className="text-sm text-gray-600">Following</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Posts */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Posts by {user.displayName}
        </h2>
        
        <PostList 
          fetchPosts={fetchUserPosts}
          emptyMessage={{
            title: `${isOwnProfile ? 'You haven\'t' : `${user.displayName} hasn't`} posted yet`,
            description: `${isOwnProfile ? 'Share your first post' : 'Check back later for new posts'} to start building your presence!`
          }}
          emptyAction={isOwnProfile ? handleCreatePost : null}
        />
      </div>
    </div>
  )
}

export default Profile