import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ThumbsUp, Reply, Pencil, Trash2 } from 'lucide-react';
import CommentForm from './CommentForm';

const formatTime = (date) => {
  const now = new Date();
  const then = new Date(date);
  const diffMs = now - then;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 30) return `${diffDays}d ago`;
  return then.toLocaleDateString();
};

const CommentCard = ({ comment, onUpvote, onReply, onEdit, onDelete, isReply }) => {
  const { user } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);

  const isOwn = user?._id === comment.userId?._id;
  const hasUpvoted = comment.upvotes?.includes(user?._id);

  if (isEditing) {
    return (
      <div className={`comment-card ${isReply ? 'comment-card--reply' : ''}`}>
        <CommentForm
          initialContent={comment.content}
          onSubmit={(content) => {
            onEdit({ commentId: comment._id, content });
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
          isReply
        />
      </div>
    );
  }

  return (
    <div className={`comment-card ${isReply ? 'comment-card--reply' : ''}`}>
      <div className="comment-card__header">
        <div className="comment-card__avatar">
          {comment.userId?.firstName?.charAt(0)}{comment.userId?.lastName?.charAt(0)}
        </div>
        <div className="comment-card__meta">
          <span className="comment-card__name">{comment.userId?.firstName} {comment.userId?.lastName}</span>
          <span className="comment-card__time">{formatTime(comment.createdAt)}</span>
        </div>
      </div>
      <div className="comment-card__content">{comment.content}</div>
      <div className="comment-card__actions">
        <button
          className={`comment-card__action ${hasUpvoted ? 'comment-card__action--active' : ''}`}
          onClick={() => onUpvote(comment._id)}
        >
          <ThumbsUp size={14} />
          <span>{comment.upvotes?.length || 0}</span>
        </button>
        {!isReply && (
          <button className="comment-card__action" onClick={() => onReply(comment._id)}>
            <Reply size={14} />
            <span>Reply</span>
          </button>
        )}
        {isOwn && (
          <>
            <button className="comment-card__action" onClick={() => setIsEditing(true)}>
              <Pencil size={14} />
            </button>
            <button className="comment-card__action comment-card__action--danger" onClick={() => onDelete(comment._id)}>
              <Trash2 size={14} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
