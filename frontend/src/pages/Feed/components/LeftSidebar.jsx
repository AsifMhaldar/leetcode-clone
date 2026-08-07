import React from 'react';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import { Users, Flame, Code, Star, Trophy, Target } from 'lucide-react';
import FollowButton from '../../../components/Follow/FollowButton';
import './LeftSidebar.scss';

const LeftSidebar = ({ profile, suggested, userId }) => {
  const { user: authUser } = useSelector((state) => state.auth);
  const userData = profile?.user || authUser;

  if (!userData) return null;

  return (
    <aside className="feed-left">
      <div className="feed-left__profile glass-card">
        <Link to={`/user/${userId}`} className="feed-left__profile-link">
          <div className="feed-left__avatar">
            {userData?.firstName?.charAt(0)}{userData?.lastName?.charAt(0)}
          </div>
          <h3 className="feed-left__name">{userData?.firstName} {userData?.lastName}</h3>
          <span className="feed-left__handle">@{userData?.firstName?.toLowerCase()}{userData?.lastName?.toLowerCase()}</span>
          <p className="feed-left__bio">{userData?.bio || 'Passionate coder'}</p>
        </Link>

        <div className="feed-left__stats-row">
          <div className="feed-left__stat">
            <Code size={14} className="feed-left__stat-icon" />
            <span className="feed-left__stat-val">{userData?.problemSolved?.length || 0}</span>
            <span className="feed-left__stat-label">Solved</span>
          </div>
          <div className="feed-left__stat">
            <Users size={14} className="feed-left__stat-icon" />
            <span className="feed-left__stat-val">{userData?.followers?.length || 0}</span>
            <span className="feed-left__stat-label">Followers</span>
          </div>
          <div className="feed-left__stat">
            <Users size={14} className="feed-left__stat-icon" />
            <span className="feed-left__stat-val">{userData?.following?.length || 0}</span>
            <span className="feed-left__stat-label">Following</span>
          </div>
        </div>
      </div>

      <div className="feed-left__section glass-card">
        <h3 className="feed-left__section-title">
          <Flame size={16} />
          <span>Current Streak</span>
        </h3>
        <div className="feed-left__streak">
          <span className="feed-left__streak-count">5</span>
          <span className="feed-left__streak-label">days</span>
        </div>
        <div className="feed-left__streak-bar">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className={`feed-left__streak-dot ${i < 5 ? 'feed-left__streak-dot--active' : ''}`}
            />
          ))}
        </div>
      </div>

      <div className="feed-left__section glass-card">
        <h3 className="feed-left__section-title">
          <Target size={16} />
          <span>Quick Stats</span>
        </h3>
        <div className="feed-left__quick-stats">
          <div className="feed-left__quick-stat">
            <Star size={14} className="feed-left__quick-stat-icon" />
            <div className="feed-left__quick-stat-info">
              <span className="feed-left__quick-stat-val">1,250</span>
              <span className="feed-left__quick-stat-label">Total Points</span>
            </div>
          </div>
          <div className="feed-left__quick-stat">
            <Trophy size={14} className="feed-left__quick-stat-icon" />
            <div className="feed-left__quick-stat-info">
              <span className="feed-left__quick-stat-val">Top 10%</span>
              <span className="feed-left__quick-stat-label">Global Rank</span>
            </div>
          </div>
          <div className="feed-left__quick-stat">
            <Code size={14} className="feed-left__quick-stat-icon" />
            <div className="feed-left__quick-stat-info">
              <span className="feed-left__quick-stat-val">{userData?.problemSolved?.length || 0}</span>
              <span className="feed-left__quick-stat-label">Problems Solved</span>
            </div>
          </div>
        </div>
      </div>

      {suggested && suggested.length > 0 && (
        <div className="feed-left__section glass-card">
          <h3 className="feed-left__section-title">
            <Users size={16} />
            <span>Suggested Developers</span>
          </h3>
          <div className="feed-left__suggested">
            {suggested.slice(0, 4).map(user => (
              <div key={user._id} className="feed-left__suggested-item">
                <Link to={`/user/${user._id}`} className="feed-left__suggested-avatar">
                  {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                </Link>
                <div className="feed-left__suggested-info">
                  <Link to={`/user/${user._id}`} className="feed-left__suggested-name">
                    {user.firstName} {user.lastName}
                  </Link>
                  <span className="feed-left__suggested-solved">
                    <Code size={11} /> {user.solvedCount || 0} solved
                  </span>
                </div>
                <FollowButton targetId={user._id} size="sm" />
              </div>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};

export default LeftSidebar;
