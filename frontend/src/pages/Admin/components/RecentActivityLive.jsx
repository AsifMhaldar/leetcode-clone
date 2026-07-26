import React from 'react';
import { CheckCircle, XCircle, AlertCircle, Clock, Loader } from 'lucide-react';
import './RecentActivity.scss';

const statusConfig = {
  accepted: { icon: CheckCircle, color: 'create', label: 'Accepted' },
  wrong: { icon: XCircle, color: 'user', label: 'Wrong Answer' },
  error: { icon: AlertCircle, color: 'video', label: 'Runtime Error' },
  pending: { icon: Loader, color: 'update', label: 'Pending' },
};

const formatTimeAgo = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const RecentActivityLive = ({ activities, isLoading }) => {
  if (isLoading) {
    return (
      <div className="recent-activity">
        <h2 className="recent-activity__title">Recent Activity</h2>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="recent-activity__item recent-activity__item--skeleton">
              <div className="recent-activity__skeleton-circle" />
              <div className="recent-activity__skeleton-content">
                <div className="recent-activity__skeleton-line recent-activity__skeleton-line--wide" />
                <div className="recent-activity__skeleton-line recent-activity__skeleton-line--narrow" />
              </div>
              <div className="recent-activity__skeleton-line recent-activity__skeleton-line--time" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!activities || activities.length === 0) {
    return (
      <div className="recent-activity">
        <h2 className="recent-activity__title">Recent Activity</h2>
        <p className="recent-activity__empty">No recent submissions yet.</p>
      </div>
    );
  }

  return (
    <div className="recent-activity">
      <h2 className="recent-activity__title">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity) => {
          const config = statusConfig[activity.status] || statusConfig.pending;
          const StatusIcon = config.icon;
          return (
            <div key={activity._id} className="recent-activity__item">
              <div className={`recent-activity__icon recent-activity__icon--${config.color}`}>
                <StatusIcon size={20} />
              </div>
              <div className="recent-activity__content">
                <p className="recent-activity__action">
                  {activity.problemTitle}
                  <span className={`recent-activity__status recent-activity__status--${activity.status}`}>
                    {config.label}
                  </span>
                </p>
                <p className="recent-activity__user">by {activity.userName}</p>
              </div>
              <div className="recent-activity__time">
                {formatTimeAgo(activity.createdAt)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivityLive;
