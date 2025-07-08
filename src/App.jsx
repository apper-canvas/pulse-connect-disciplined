import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from '@/components/organisms/Layout'
import Home from '@/components/pages/Home'
import Explore from '@/components/pages/Explore'
import Profile from '@/components/pages/Profile'
import PostDetail from '@/components/pages/PostDetail'
import Notifications from '@/components/pages/Notifications'
import CreatePost from '@/components/pages/CreatePost'
import Search from '@/components/pages/Search'

function App() {
  return (
    <div className="min-h-screen bg-background font-body">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/post/:postId" element={<PostDetail />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Layout>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

export default App