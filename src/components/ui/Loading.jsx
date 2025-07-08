import { motion } from 'framer-motion'

const Loading = ({ type = 'posts' }) => {
  const renderPostSkeleton = () => (
    <div className="bg-white rounded-xl shadow-card p-6 mb-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full shimmer-bg"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded shimmer-bg w-32 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded shimmer-bg w-24"></div>
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-200 rounded shimmer-bg w-full"></div>
        <div className="h-4 bg-gray-200 rounded shimmer-bg w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded shimmer-bg w-1/2"></div>
      </div>
      <div className="h-64 bg-gray-200 rounded-lg shimmer-bg mb-4"></div>
      <div className="flex items-center space-x-6">
        <div className="h-6 bg-gray-200 rounded shimmer-bg w-16"></div>
        <div className="h-6 bg-gray-200 rounded shimmer-bg w-20"></div>
        <div className="h-6 bg-gray-200 rounded shimmer-bg w-14"></div>
      </div>
    </div>
  )

  const renderUserSkeleton = () => (
    <div className="bg-white rounded-xl shadow-card p-4 mb-4">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gray-200 rounded-full shimmer-bg"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded shimmer-bg w-32 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded shimmer-bg w-24"></div>
        </div>
        <div className="h-8 bg-gray-200 rounded-full shimmer-bg w-20"></div>
      </div>
    </div>
  )

  const renderProfileSkeleton = () => (
    <div className="bg-white rounded-xl shadow-card overflow-hidden">
      <div className="h-48 bg-gray-200 shimmer-bg"></div>
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-20 h-20 bg-gray-200 rounded-full shimmer-bg -mt-10 border-4 border-white"></div>
          <div className="flex-1">
            <div className="h-6 bg-gray-200 rounded shimmer-bg w-40 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded shimmer-bg w-32"></div>
          </div>
        </div>
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 rounded shimmer-bg w-full"></div>
          <div className="h-4 bg-gray-200 rounded shimmer-bg w-2/3"></div>
        </div>
        <div className="flex space-x-6">
          <div className="h-4 bg-gray-200 rounded shimmer-bg w-16"></div>
          <div className="h-4 bg-gray-200 rounded shimmer-bg w-20"></div>
          <div className="h-4 bg-gray-200 rounded shimmer-bg w-14"></div>
        </div>
      </div>
    </div>
  )

  const renderGridSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl shadow-card p-4">
          <div className="aspect-square bg-gray-200 rounded-lg shimmer-bg mb-3"></div>
          <div className="h-4 bg-gray-200 rounded shimmer-bg w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded shimmer-bg w-1/2"></div>
        </div>
      ))}
    </div>
  )

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="animate-pulse"
    >
      {type === 'posts' && (
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i}>{renderPostSkeleton()}</div>
          ))}
        </div>
      )}
      
      {type === 'users' && (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i}>{renderUserSkeleton()}</div>
          ))}
        </div>
      )}
      
      {type === 'profile' && renderProfileSkeleton()}
      
      {type === 'grid' && renderGridSkeleton()}
      
      {type === 'comments' && (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex space-x-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full shimmer-bg"></div>
              <div className="flex-1">
                <div className="h-3 bg-gray-200 rounded shimmer-bg w-24 mb-1"></div>
                <div className="h-4 bg-gray-200 rounded shimmer-bg w-full"></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default Loading