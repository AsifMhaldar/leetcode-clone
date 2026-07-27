import React from 'react';
import CommentCard from './CommentCard';

const ReplyThread = ({ replies, onUpvote, onEdit, onDelete }) => {
  if (!replies || replies.length === 0) return null;

  return (
    <div className="reply-thread">
      {replies.map((reply) => (
        <CommentCard
          key={reply._id}
          comment={reply}
          onUpvote={onUpvote}
          onEdit={onEdit}
          onDelete={onDelete}
          isReply
        />
      ))}
    </div>
  );
};

export default ReplyThread;
