import React, { useState } from 'react';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import {
  Heart, MessageCircle, Repeat2, Send,
  CheckCircle, Flame, Award, Code, MessageSquare,
  ChevronDown, ChevronUp, BarChart3
} from 'lucide-react';
import { DIFFICULTY_COLORS, ACTIVITY_TYPES, toTagsArray } from '../constants';
import HighlightedText from './HighlightedText';
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
  return then.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const iconMap = {
  solved: CheckCircle,
  streak: Flame,
  badge: Award,
  shared: Code,
  discussed: MessageSquare
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
  const commentCount = activity.comments?.length || 0;

  const handleComment = () => {
    if (!commentText.trim()) return;
    onComment({ activityId: activity._id, content: commentText.trim() });
    setCommentText('');
  };

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const formatCount = (n) => {
    if (!n || n === 0) return '';
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
    return n;
  };

  const resolveMediaUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${API_URL}${url}`;
  };

  const pollOptions = Array.isArray(activity.poll) ? activity.poll : [];

  return (
    <div className="post-card glass-card">
      <div className="post-card__header">
        <Link to={`/user/${user?._id}`} className="post-card__avatar">
          {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
        </Link>
        <div className="post-card__meta">
          <div className="post-card__meta-top">
            <Link to={`/user/${user?._id}`} className="post-card__name">
              {user?.firstName} {user?.lastName}
            </Link>
            <span className="post-card__username">@{user?.firstName?.toLowerCase()}{user?.lastName?.toLowerCase()}</span>
          </div>
          <div className="post-card__meta-bottom">
            <span className="post-card__action-label" style={{ color: activityConfig.color }}>
              <IconComp size={12} />
              {activityConfig.label}
            </span>
            <span className="post-card__dot">·</span>
            <span className="post-card__time">{formatTime(activity.createdAt)}</span>
          </div>
        </div>
      </div>

      {activity.content && (
        <div className="post-card__content">
          <HighlightedText text={activity.content} />
        </div>
      )}

      {problem && (
        <Link to={`/problem/${problem._id}`} className="post-card__problem">
          <div className="post-card__problem-header">
            <span className="post-card__problem-title">{problem.title}</span>
            <span
              className="post-card__difficulty"
              style={{
                background: `${DIFFICULTY_COLORS[problem.difficulty]}20`,
                color: DIFFICULTY_COLORS[problem.difficulty]
              }}
            >
              {problem.difficulty}
            </span>
          </div>
          {toTagsArray(problem.tags).length > 0 && (
            <div className="post-card__tags">
              {toTagsArray(problem.tags).map(tag => (
                <span key={tag} className="post-card__tag">#{tag}</span>
              ))}
            </div>
          )}
        </Link>
      )}

      {activity.image && (
        <div className="post-card__image">
          <img src={resolveMediaUrl(activity.image)} alt="Post" />
        </div>
      )}

      {activity.video && (
        <div className="post-card__video">
          <video src={resolveMediaUrl(activity.video)} controls />
        </div>
      )}

      {pollOptions.length > 0 && (
        <div className="post-card__poll">
          <div className="post-card__poll-header">
            <BarChart3 size={14} />
            <span>{pollOptions.length} options</span>
          </div>
          {pollOptions.map((option, i) => (
            <div key={i} className="post-card__poll-option">
              <span className="post-card__poll-option-marker">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="post-card__poll-option-text">{option}</span>
            </div>
          ))}
        </div>
      )}

      {activity.codeSnippet && (
        <pre className="post-card__code">
          <code>{activity.codeSnippet}</code>
        </pre>
      )}

      <div className="post-card__stats">
        {activity.likes?.length > 0 && (
          <span className="post-card__stat">
            <Heart size={12} className="post-card__stat-icon" />
            {formatCount(activity.likes.length)}
          </span>
        )}
        {commentCount > 0 && (
          <span className="post-card__stat">
            <MessageCircle size={12} />
            {formatCount(commentCount)}
          </span>
        )}
        {activity.shares > 0 && (
          <span className="post-card__stat">
            <Repeat2 size={12} />
            {formatCount(activity.shares)}
          </span>
        )}
      </div>

      <div className="post-card__actions">
        <button
          className={`post-card__action-btn ${isLiked ? 'post-card__action-btn--liked' : ''}`}
          onClick={() => onLike(activity._id)}
        >
          <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
          <span>{isLiked ? 'Liked' : 'Like'}</span>
        </button>
        <button
          className="post-card__action-btn"
          onClick={() => setShowComments(!showComments)}
        >
          <MessageCircle size={18} />
          <span>Comment</span>
        </button>
        <button
          className="post-card__action-btn"
          onClick={() => onShare(activity._id)}
        >
          <Repeat2 size={18} />
          <span>Repost</span>
        </button>
        <button
          className={`post-card__action-btn ${isSaved ? 'post-card__action-btn--saved' : ''}`}
          onClick={() => onSave(activity._id)}
        >
          <Send size={18} />
          <span>Share</span>
        </button>
      </div>

      {commentCount > 0 && !showComments && (
        <button
          className="post-card__view-comments"
          onClick={() => setShowComments(true)}
        >
          <MessageCircle size={14} />
          View {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
        </button>
      )}

      {showComments && (
        <div className="post-card__comments">
          {activity.comments.map((c, i) => (
            <div key={i} className="post-card__comment">
              <Link to={`/user/${c.userId?._id}`} className="post-card__comment-avatar">
                {c.userId?.firstName?.charAt(0)}
              </Link>
              <div className="post-card__comment-body">
                <Link to={`/user/${c.userId?._id}`} className="post-card__comment-name">
                  {c.userId?.firstName} {c.userId?.lastName}
                </Link>
                <p className="post-card__comment-text">{c.content}</p>
              </div>
            </div>
          ))}
          {commentCount > 2 && (
            <button
              className="post-card__hide-comments"
              onClick={() => setShowComments(false)}
            >
              <ChevronUp size={14} /> Hide comments
            </button>
          )}
        </div>
      )}

      <div className="post-card__comment-input">
        <div className="post-card__comment-input-avatar">
          {currentUser?.firstName?.charAt(0)}
        </div>
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleComment()}
          placeholder="Add a comment..."
          className="post-card__comment-field"
        />
        <button
          className="post-card__comment-send"
          onClick={handleComment}
          disabled={!commentText.trim()}
        >
          <Send size={15} />
        </button>
      </div>
    </div>
  );
};

export default ActivityCard;
