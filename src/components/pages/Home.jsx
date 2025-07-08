import { useNavigate } from 'react-router-dom'
import PostList from '@/components/organisms/PostList'
import { postService } from '@/services/api/postService'

const Home = () => {
  const navigate = useNavigate()

  const fetchFeedPosts = () => {
    return postService.getFeedPosts(1) // Using user ID 1 for demo
  }

  const handleCreatePost = () => {
    navigate('/create')
  }

  return (
    <div className="space-y-6">
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold gradient-text mb-4">
          Welcome to Pulse Connect
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Stay connected with your friends and discover amazing content from creators you love.
        </p>
      </div>

      <PostList 
        fetchPosts={fetchFeedPosts}
        emptyMessage={{
          title: "Your feed is empty",
          description: "Start following people or create your first post to see content here!"
        }}
        emptyAction={handleCreatePost}
        onPostUpdate={() => {}}
      />
    </div>
  )
}

export default Home