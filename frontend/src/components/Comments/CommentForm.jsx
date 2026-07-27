import React, { useState } from 'react';
import './CommentForm.scss';

const CommentForm = ({ onSubmit, onCancel, isReply, placeholder, initialContent = '' }) => {
  const [content, setContent] = useState(initialContent);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit(content.trim());
    setContent('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSubmit(e);
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <textarea
        className={`comment-form__textarea ${isReply ? 'comment-form__textarea--reply' : ''}`}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || "Share your thoughts..."}
        maxLength={5000}
      />
      <div className="comment-form__footer">
        <span className={`comment-form__count ${content.length > 4500 ? 'comment-form__count--warn' : ''}`}>
          {content.length}/5000
        </span>
        <div className="comment-form__actions">
          {isReply && (
            <button type="button" className="comment-form__cancel" onClick={onCancel}>
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="comment-form__submit"
            disabled={!content.trim()}
          >
            {isReply ? 'Reply' : 'Comment'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
