import React, { useState } from 'react';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import {
  Heart, MessageCircle, Bookmark, Share2,
  CheckCircle, Flame, Award, Send
} from 'lucide-react';
import { DIFFICULTY_COLORS, ACTIVITY_TYPES, toTagsArray } from '../constants';
import './ActivityCard.scss';

const formatTime = (date) => {
  const now = new Date();
  const then = new Date(date);
  const diffMs = now - then;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 30) return `${diffDays}d`;
  return then.toLocaleDateString();
};

const iconMap = {
  solved: CheckCircle,
  streak: Flame,
  badge: Award,
  shared: Share2,
  discussed: MessageCircle
};

const ActivityCard = ({ activity, onLike, onComment, onSave, onShare }) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);

  const user = activity.userId;
  const problem = activity.problemId;
  const activityConfig = ACTIVITY_TYPES[activity.type] || ACTIVITY_TYPES.solved;
  const IconComp = iconMap[activity.type] || CheckCircle;
  const isLiked = activity.likes?.includes(currentUser?._id);
  const isSaved = activity.saves?.includes(currentUser?._id);

  const handleComment = () => {
    if (!commentText.trim()) return;
    onComment({ activityId: activity._id, content: commentText.trim() });
    setCommentText('');
  };

  return (
    <div className="activity-card glass-card">
      <div className="activity-card__header">
        <Link to={`/user/${user?._id}`} className="activity-card__avatar">
          {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
        </Link>
        <div className="activity-card__meta">
          <div className="activity-card__meta-row">
            <Link to={`/user/${user?._id}`} className="activity-card__name">
              {user?.firstName} {user?.lastName}
            </Link>
            <span className="activity-card__action" style={{ color: activityConfig.color }}>
              {activityConfig.label}
            </span>
          </div>
          <span className="activity-card__time">{formatTime(activity.createdAt)}</span>
        </div>
        <div className="activity-card__type-badge" style={{ background: `${activityConfig.color}20`, color: activityConfig.color }}>
          <IconComp size={14} />
        </div>
      </div>

      {problem && (
        <Link to={`/problem/${problem._id}`} className="activity-card__problem">
          <span className="activity-card__problem-title">{problem.title}</span>
          <span
            className="activity-card__difficulty"
            style={{ background: `${DIFFICULTY_COLORS[problem.difficulty]}20`, color: DIFFICULTY_COLORS[problem.difficulty] }}
          >
            {problem.difficulty}
          </span>
          {toTagsArray(problem.tags).length > 0 && (
            <span className="activity-card__tag">#{toTagsArray(problem.tags).join(', #')}</span>
          )}
        </Link>
      )}

      {activity.content && (
        <div className="activity-card__content">{activity.content}</div>
      )}

      {activity.codeSnippet && (
        <pre className="activity-card__code">
          <code>{activity.codeSnippet}</code>
        </pre>
      )}

      <div className="activity-card__stats">
        <span>{activity.likes?.length || 0} likes</span>
        <span>{activity.comments?.length || 0} comments</span>
        <span>{activity.shares || 0} shares</span>
      </div>

      <div className="activity-card__actions">
        <button
          className={`activity-card__action-btn ${isLiked ? 'activity-card__action-btn--active' : ''}`}
          onClick={() => onLike(activity._id)}
        >
          <Heart size={18} fill={isLiked ? 'var(--accent-red)' : 'none'} />
          <span>Like</span>
        </button>
        <button
          className="activity-card__action-btn"
          onClick={() => setShowComments(!showComments)}
        >
          <MessageCircle size={18} />
          <span>Comment</span>
        </button>
        <button
          className="activity-card__action-btn"
          onClick={() => onShare(activity._id)}
        >
          <Share2 size={18} />
          <span>Share</span>
        </button>
        <button
          className={`activity-card__action-btn ${isSaved ? 'activity-card__action-btn--saved' : ''}`}
          onClick={() => onSave(activity._id)}
        >
          <Bookmark size={18} fill={isSaved ? 'var(--accent-blue)' : 'none'} />
          <span>Save</span>
        </button>
      </div>

      {activity.comments?.length > 0 && (
        <div className="activity-card__comments-preview">
          {activity.comments.slice(0, 2).map((c, i) => (
            <div key={i} className="activity-card__comment">
              <Link to={`/user/${c.userId?._id}`} className="activity-card__comment-author">
                {c.userId?.firstName}
              </Link>
              <span>{c.content}</span>
            </div>
          ))}
          {activity.comments.length > 2 && (
            <button className="activity-card__view-all" onClick={() => setShowComments(!showComments)}>
              View all {activity.comments.length} comments
            </button>
          )}
        </div>
      )}

      {showComments && (
        <div className="activity-card__comment-input">
          <div className="activity-card__comment-avatar">
            {currentUser?.firstName?.charAt(0)}
          </div>
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleComment()}
            placeholder="Write a comment..."
            className="activity-card__comment-field"
          />
          <button
            className="activity-card__comment-send"
            onClick={handleComment}
            disabled={!commentText.trim()}
          >
            <Send size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityCard;
