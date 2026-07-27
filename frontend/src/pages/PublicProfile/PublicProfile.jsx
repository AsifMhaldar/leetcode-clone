import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Github, Linkedin, Globe, Trophy, Flame, CheckCircle, AlertTriangle } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { usePublicProfile } from './hooks/usePublicProfile';
import FollowButton from '../../components/Follow/FollowButton';
import HomepageHeader from '../Homepage/components/HomepageHeader';
import { logoutUser } from '../../authSlice';
import './PublicProfile.scss';

const PublicProfile = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { user: currentUser } = useSelector((state) => state.auth);
  const { profileQuery } = usePublicProfile(userId);

  const header = <HomepageHeader user={currentUser} onLogout={() => dispatch(logoutUser())} />;

  const handleRetry = () => {
    queryClient.invalidateQueries({ queryKey: ['publicProfile', userId] });
  };

  if (profileQuery.isLoading) {
    return (
      <div className="page-bg">
        {header}
        <div className="container max-w-6xl mx-auto px-6 py-8">
          <div className="profile-skeleton">
            <div className="profile-skeleton__avatar"></div>
            <div className="profile-skeleton__name"></div>
            <div className="profile-skeleton__bio"></div>
          </div>
        </div>
      </div>
    );
  }

  if (profileQuery.error) {
    return (
      <div className="page-bg">
        {header}
        <div className="container max-w-6xl mx-auto px-6 py-8">
          <div className="profile-empty">
            <AlertTriangle className="profile-empty__icon" />
            <p>Failed to load profile</p>
            <p className="profile-empty__hint">{profileQuery.error.message || 'User not found or check your connection'}</p>
            <button className="profile-empty__retry" onClick={handleRetry}>Retry</button>
          </div>
        </div>
      </div>
    );
  }

  if (!profileQuery.data) {
    return (
      <div className="page-bg">
        {header}
        <div className="container max-w-6xl mx-auto px-6 py-8">
          <div className="profile-empty">
            <p>User not found</p>
          </div>
        </div>
      </div>
    );
  }

  const { user, recentSubmissions, totalSubmissions, easyCount, mediumCount, hardCount, languages } = profileQuery.data;
  const isOwnProfile = currentUser?._id === userId;

  return (
    <div className="page-bg">
      {header}
      <div className="container max-w-6xl mx-auto px-6 py-8">
        <div className="profile">
          <div className="profile__header">
            <div className="profile__avatar">
              {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
            </div>
            <div className="profile__info">
              <h1 className="profile__name">{user.firstName} {user.lastName}</h1>
              <p className="profile__email">{user.emailId}</p>
              {user.bio && <p className="profile__bio">{user.bio}</p>}
              <div className="profile__social">
                {user.github && (
                  <a href={user.github} target="_blank" rel="noopener noreferrer" className="profile__social-link">
                    <Github size={18} />
                  </a>
                )}
                {user.linkedin && (
                  <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="profile__social-link">
                    <Linkedin size={18} />
                  </a>
                )}
                {user.website && (
                  <a href={user.website} target="_blank" rel="noopener noreferrer" className="profile__social-link">
                    <Globe size={18} />
                  </a>
                )}
              </div>
            </div>
            {!isOwnProfile && currentUser && (
              <div className="profile__follow">
                <FollowButton targetId={userId} size="md" />
              </div>
            )}
          </div>

          <div className="profile__stats-row">
            <div className="profile__stat">
              <CheckCircle size={18} />
              <span className="profile__stat-value">{user.problemSolved?.length || 0}</span>
              <span className="profile__stat-label">Solved</span>
            </div>
            <div className="profile__stat">
              <Trophy size={18} />
              <span className="profile__stat-value">{totalSubmissions}</span>
              <span className="profile__stat-label">Submissions</span>
            </div>
            <div className="profile__stat">
              <Flame size={18} />
              <span className="profile__stat-value">{user.followers?.length || 0}</span>
              <span className="profile__stat-label">Followers</span>
            </div>
            <div className="profile__stat">
              <span className="profile__stat-value">{user.following?.length || 0}</span>
              <span className="profile__stat-label">Following</span>
            </div>
          </div>

          <div className="profile__section">
            <h2 className="profile__section-title">Recent Solves</h2>
            <div className="profile__solves">
              {recentSubmissions?.length === 0 ? (
                <p className="profile__empty-text">No recent solves</p>
              ) : (
                recentSubmissions?.map((sub) => (
                  <div key={sub._id} className="profile__solve-item">
                    <span className="profile__solve-status profile__solve-status--accepted">✓</span>
                    <span className="profile__solve-problem">{sub.problemId?.title}</span>
                    <span className="profile__solve-difficulty" data-difficulty={sub.problemId?.difficulty}>
                      {sub.problemId?.difficulty}
                    </span>
                    <span className="profile__solve-lang">{sub.language}</span>
                    <span className="profile__solve-time">{new Date(sub.createdAt).toLocaleDateString()}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="profile__section">
            <h2 className="profile__section-title">Problem Distribution</h2>
            <div className="profile__distribution">
              <div className="profile__dist-item">
                <div className="profile__dist-bar profile__dist-bar--easy" style={{ width: `${easyCount * 100 / Math.max(easyCount + mediumCount + hardCount, 1)}%` }}></div>
                <span className="profile__dist-label">Easy: {easyCount}</span>
              </div>
              <div className="profile__dist-item">
                <div className="profile__dist-bar profile__dist-bar--medium" style={{ width: `${mediumCount * 100 / Math.max(easyCount + mediumCount + hardCount, 1)}%` }}></div>
                <span className="profile__dist-label">Medium: {mediumCount}</span>
              </div>
              <div className="profile__dist-item">
                <div className="profile__dist-bar profile__dist-bar--hard" style={{ width: `${hardCount * 100 / Math.max(easyCount + mediumCount + hardCount, 1)}%` }}></div>
                <span className="profile__dist-label">Hard: {hardCount}</span>
              </div>
            </div>
          </div>

          {languages?.length > 0 && (
            <div className="profile__section">
              <h2 className="profile__section-title">Languages</h2>
              <div className="profile__languages">
                {languages.map((lang) => (
                  <div key={lang.name} className="profile__lang-item">
                    <span className="profile__lang-name">{lang.name}</span>
                    <span className="profile__lang-count">{lang.count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;
