import React from 'react';
import { Link } from 'react-router';
import { Trophy, Zap, TrendingUp, Clock, Users, Flame } from 'lucide-react';
import { DIFFICULTY_COLORS, toTagsArray } from '../constants';
import './RightSidebar.scss';

const RightSidebar = ({ leaderboard, dailyChallenge, trending, activeFriends }) => {
  return (
    <aside className="feed-right">
      <div className="feed-right__section glass-card">
        <h3 className="feed-right__section-title">
          <Trophy size={16} />
          <span>Top Performers</span>
        </h3>
        <div className="feed-right__leaderboard">
          {leaderboard?.slice(0, 5).map((entry, i) => (
            <Link key={entry._id} to={`/user/${entry.userId?._id}`} className="feed-right__leader-item">
              <span className={`feed-right__rank feed-right__rank--${i < 3 ? 'top' : ''}`}>
                {i + 1}
              </span>
              <div className="feed-right__leader-avatar">
                {entry.userId?.firstName?.charAt(0)}{entry.userId?.lastName?.charAt(0)}
              </div>
              <div className="feed-right__leader-info">
                <span className="feed-right__leader-name">
                  {entry.userId?.firstName} {entry.userId?.lastName}
                </span>
                <span className="feed-right__leader-score">{entry.points} pts</span>
              </div>
            </Link>
          ))}
        </div>
        <Link to="/leaderboard" className="feed-right__view-all">View Full Leaderboard</Link>
      </div>

      {dailyChallenge && (
        <div className="feed-right__section glass-card feed-right__daily">
          <h3 className="feed-right__section-title">
            <Zap size={16} />
            <span>Daily Challenge</span>
          </h3>
          <Link to={`/problem/${dailyChallenge._id}`} className="feed-right__daily-card">
            <div className="feed-right__daily-header">
              <span className="feed-right__daily-title">{dailyChallenge.title}</span>
              <span
                className="feed-right__difficulty"
                style={{ background: `${DIFFICULTY_COLORS[dailyChallenge.difficulty]}20`, color: DIFFICULTY_COLORS[dailyChallenge.difficulty] }}
              >
                {dailyChallenge.difficulty}
              </span>
            </div>
            {toTagsArray(dailyChallenge.tags).length > 0 && (
              <div className="feed-right__daily-tags">
                {toTagsArray(dailyChallenge.tags).slice(0, 3).map(tag => (
                  <span key={tag} className="feed-right__tag">#{tag}</span>
                ))}
              </div>
            )}
            <div className="feed-right__daily-meta">
              <span><Flame size={12} /> +10 bonus XP</span>
              <span><Clock size={12} /> {dailyChallenge.acceptanceRate || 45}% acceptance</span>
            </div>
          </Link>
        </div>
      )}

      {trending?.length > 0 && (
        <div className="feed-right__section glass-card">
          <h3 className="feed-right__section-title">
            <TrendingUp size={16} />
            <span>Trending</span>
          </h3>
          <div className="feed-right__trending">
            {trending.slice(0, 4).map(prob => (
              <Link key={prob._id} to={`/problem/${prob._id}`} className="feed-right__trending-item">
                <span className="feed-right__trending-title">{prob.title}</span>
                <span
                  className="feed-right__difficulty"
                  style={{ background: `${DIFFICULTY_COLORS[prob.difficulty]}20`, color: DIFFICULTY_COLORS[prob.difficulty] }}
                >
                  {prob.difficulty}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {activeFriends?.length > 0 && (
        <div className="feed-right__section glass-card">
          <h3 className="feed-right__section-title">
            <Users size={16} />
            <span>Active Friends</span>
          </h3>
          <div className="feed-right__friends">
            {activeFriends.slice(0, 5).map(friend => (
              <Link key={friend._id} to={`/user/${friend._id}`} className="feed-right__friend">
                <div className="feed-right__friend-avatar">
                  {friend.firstName?.charAt(0)}{friend.lastName?.charAt(0)}
                </div>
                <div className="feed-right__friend-info">
                  <span className="feed-right__friend-name">{friend.firstName} {friend.lastName}</span>
                  <span className="feed-right__friend-status">
                    <span className="feed-right__online-dot" />
                    Active recently
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="feed-right__section glass-card feed-right__announcements">
        <h3 className="feed-right__section-title">
          <span>📢</span>
          <span>Announcements</span>
        </h3>
        <p className="feed-right__announcement-text">
          New contest starting next week! Prepare for dynamic programming challenges.
        </p>
        <span className="feed-right__announcement-date">2 hours ago</span>
      </div>
    </aside>
  );
};

export default RightSidebar;
