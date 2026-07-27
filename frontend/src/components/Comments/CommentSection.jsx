import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { MessageSquare } from 'lucide-react';
import { useComments } from './hooks/useComments';
import { SORT_OPTIONS } from './constants';
import CommentCard from './CommentCard';
import ReplyThread from './ReplyThread';
import CommentForm from './CommentForm';
import './CommentSection.scss';

const CommentSection = ({ problemId }) => {
  const { user } = useSelector((state) => state.auth);
  const {
    comments,
    isLoading,
    sort,
    setSort,
    createComment,
    updateComment,
    deleteComment,
    toggleUpvote,
    isCreating
  } = useComments(problemId);

  const [replyingTo, setReplyingTo] = useState(null);

  const handleReply = (commentId) => {
    setReplyingTo(replyingTo === commentId ? null : commentId);
  };

  const handleDelete = (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      deleteComment(commentId);
    }
  };

  if (isLoading) {
    return (
      <div className="comment-section comment-section--loading">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="comment-section__skeleton">
            <div className="comment-section__skeleton-avatar"></div>
            <div className="comment-section__skeleton-content">
              <div className="comment-section__skeleton-line"></div>
              <div className="comment-section__skeleton-line comment-section__skeleton-line--short"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="comment-section">
      <div className="comment-section__header">
        <div className="comment-section__count">
          <MessageSquare size={16} />
          <span>Comments ({comments?.length || 0})</span>
        </div>
        <div className="comment-section__sort">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              className={`comment-section__sort-btn ${sort === opt.id ? 'comment-section__sort-btn--active' : ''}`}
              onClick={() => setSort(opt.id)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {user && (
        <CommentForm
          onSubmit={(content) => createComment({ content })}
          isCreating={isCreating}
        />
      )}

      <div className="comment-section__list">
        {comments?.length === 0 ? (
          <div className="comment-section__empty">
              <MessageSquare size={32} />
            <p>No comments yet. Be the first to share!</p>
          </div>
        ) : (
          comments?.map((comment) => (
            <div key={comment._id} className="comment-section__item">
              <CommentCard
                comment={comment}
                onUpvote={toggleUpvote}
                onReply={handleReply}
                onEdit={updateComment}
                onDelete={handleDelete}
              />
              {replyingTo === comment._id && (
                <div className="comment-section__reply-form">
                  <CommentForm
                    onSubmit={(content) => {
                      createComment({ content, parentCommentId: comment._id });
                      setReplyingTo(null);
                    }}
                    onCancel={() => setReplyingTo(null)}
                    isReply
                    placeholder={`Reply to @${comment.userId?.firstName}...`}
                  />
                </div>
              )}
              <ReplyThread
                replies={comment.replies}
                onUpvote={toggleUpvote}
                onEdit={updateComment}
                onDelete={handleDelete}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
