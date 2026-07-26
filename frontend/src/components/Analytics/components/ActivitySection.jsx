import React from 'react';
import { Eye } from 'lucide-react';
import { DIFFICULTY_DISTRIBUTION_TITLE, RECENT_ACTIVITY_TITLE } from '../constants';
import './ActivitySection.scss';

const timeAgo = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now - date) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

const ActivitySection = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="activity-section">
        <div className="activity-section__card">
          <div className="activity-section__skeleton-title"></div>
          <div className="activity-section__skeleton-list">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="activity-section__skeleton-row"></div>
            ))}
          </div>
        </div>
        <div className="activity-section__card">
          <div className="activity-section__skeleton-title"></div>
          <div className="activity-section__skeleton-list">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="activity-section__skeleton-row"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const { difficultyDistribution, recentActivity } = data;
  const totalProblems = difficultyDistribution.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="activity-section">
      {/* Difficulty Distribution */}
      <div className="activity-section__card">
        <h3 className="activity-section__card-title">{DIFFICULTY_DISTRIBUTION_TITLE}</h3>
        <div className="activity-section__diff-list">
          {difficultyDistribution.map((diff, index) => {
            const percentage = totalProblems > 0 ? Math.round((diff.value / totalProblems) * 100) : 0;
            return (
              <div key={index} className="activity-section__diff-item">
                <div className="activity-section__diff-left">
                  <div
                    className={`activity-section__diff-dot ${
                      diff.name === 'Easy' ? 'activity-section__diff-dot--easy' :
                      diff.name === 'Medium' ? 'activity-section__diff-dot--medium' : 'activity-section__diff-dot--hard'
                    }`}
                  ></div>
                  <span className="activity-section__diff-name">{diff.name}</span>
                  <span className="activity-section__diff-count">{diff.value.toLocaleString()}</span>
                </div>
                <div className="activity-section__diff-right">
                  <div className="activity-section__diff-bar-wrap">
                    <div
                      className={`activity-section__diff-bar ${
                        diff.name === 'Easy' ? 'activity-section__diff-bar--easy' :
                        diff.name === 'Medium' ? 'activity-section__diff-bar--medium' : 'activity-section__diff-bar--hard'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="activity-section__diff-pct">{percentage}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="activity-section__card">
        <h3 className="activity-section__card-title">{RECENT_ACTIVITY_TITLE}</h3>
        <div className="activity-section__activity-list">
          {recentActivity.length > 0 ? recentActivity.map((activity, index) => (
            <div key={index} className="activity-section__activity-item">
              <div className={`activity-section__activity-icon ${
                activity.status === 'accepted' ? 'activity-section__activity-icon--easy' :
                'activity-section__activity-icon--hard'
              }`}>
                <Eye size={16} />
              </div>
              <div className="activity-section__activity-info">
                <p className="activity-section__activity-user">{activity.userName}</p>
                <p className="activity-section__activity-action">
                  {activity.status === 'accepted' ? 'Accepted' : 'Attempted'} &quot;{activity.problemTitle}&quot;
                </p>
              </div>
              <div className="activity-section__activity-time">{timeAgo(activity.createdAt)}</div>
            </div>
          )) : (
            <div className="activity-section__empty">No recent activity</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivitySection;
