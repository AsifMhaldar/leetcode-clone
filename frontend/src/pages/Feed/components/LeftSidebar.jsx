import React from 'react';
import { Link } from 'react-router';
import { Users, TrendingUp, Code, Flame } from 'lucide-react';
import FollowButton from '../../../components/Follow/FollowButton';
import './LeftSidebar.scss';

const LeftSidebar = ({ profile, suggested, userId }) => {
  const userData = profile?.user;
  const recentSubmissions = profile?.recentSubmissions || [];

  return (
    <aside className="feed-left">
      <div className="feed-left__profile glass-card">
        <Link to={`/user/${userId}`} className="feed-left__profile-link">
          <div className="feed-left__avatar">
            {userData?.firstName?.charAt(0)}{userData?.lastName?.charAt(0)}
          </div>
          <div className="feed-left__profile-info">
            <h3 className="feed-left__name">{userData?.firstName} {userData?.lastName}</h3>
            <p className="feed-left__email">{userData?.emailId}</p>
          </div>
        </Link>
        <div className="feed-left__stats-row">
          <div className="feed-left__stat">
            <span className="feed-left__stat-val">{userData?.problemSolved?.length || 0}</span>
            <span className="feed-left__stat-label">Solved</span>
          </div>
          <div className="feed-left__stat">
            <span className="feed-left__stat-val">{userData?.followers?.length || 0}</span>
            <span className="feed-left__stat-label">Followers</span>
          </div>
          <div className="feed-left__stat">
            <span className="feed-left__stat-val">{userData?.following?.length || 0}</span>
            <span className="feed-left__stat-label">Following</span>
          </div>
        </div>
      </div>

      <div className="feed-left__section glass-card">
        <h3 className="feed-left__section-title">
          <TrendingUp size={16} />
          <span>Trending Tags</span>
        </h3>
        <div className="feed-left__tags">
          {['array', 'string', 'dp', 'graph', 'linkedList'].map(tag => (
            <Link key={tag} to={`/home`} className="feed-left__tag">
              #{tag}
            </Link>
          ))}
        </div>
      </div>

      <div className="feed-left__section glass-card">
        <h3 className="feed-left__section-title">
          <Users size={16} />
          <span>Suggested Developers</span>
        </h3>
        <div className="feed-left__suggested">
          {suggested?.map(user => (
            <div key={user._id} className="feed-left__suggested-item">
              <Link to={`/user/${user._id}`} className="feed-left__suggested-avatar">
                {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
              </Link>
              <div className="feed-left__suggested-info">
                <Link to={`/user/${user._id}`} className="feed-left__suggested-name">
                  {user.firstName} {user.lastName}
                </Link>
                <span className="feed-left__suggested-solved">
                  <Code size={12} /> {user.solvedCount} solved
                </span>
              </div>
              <FollowButton targetId={user._id} size="sm" />
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;
