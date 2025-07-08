import { formatDistanceToNow } from 'date-fns'
import Avatar from '@/components/atoms/Avatar'
import { Link } from 'react-router-dom'

const CommentItem = ({ comment }) => {
  return (
    <div className="flex space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <Avatar 
        src={comment.user?.avatar} 
        alt={comment.user?.displayName}
        size="sm"
      />
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-1">
          <Link 
            to={`/profile/${comment.user?.username}`}
            className="font-medium text-gray-900 hover:text-primary transition-colors text-sm"
          >
            {comment.user?.displayName}
          </Link>
          <span className="text-xs text-gray-500">
            @{comment.user?.username}
          </span>
          <span className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
          </span>
        </div>
        <p className="text-gray-900 text-sm leading-relaxed">
          {comment.content}
        </p>
      </div>
    </div>
  )
}

export default CommentItem