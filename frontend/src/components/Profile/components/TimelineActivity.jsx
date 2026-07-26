import React from 'react';
import { CheckCircle, XCircle, AlertCircle, Clock } from 'lucide-react';
import { DIFFICULTY_COLORS, RECENT_ACTIVITY_TITLE } from '../constants';
import { formatTimeAgo } from '../utils/profileUtils';
import EmptyState from './EmptyState';
import './TimelineActivity.scss';

const statusConfig = {
  accepted: { icon: CheckCircle, color: 'green' },
  wrong: { icon: XCircle, color: 'red' },
  error: { icon: AlertCircle, color: 'yellow' },
  pending: { icon: Clock, color: 'blue' },
};

const TimelineActivity = ({ recentSubmissions }) => {
  return (
    <div className="timeline-card">
      <h3 className="timeline-card__title">{RECENT_ACTIVITY_TITLE}</h3>

      {recentSubmissions.length > 0 ? (
        <div className="timeline-card__list">
          {recentSubmissions.map((sub, idx) => {
            const config = statusConfig[sub.status] || statusConfig.pending;
            const StatusIcon = config.icon;
            return (
              <div key={sub._id} className="timeline-card__item">
                <div className="timeline-card__track">
                  <div className={`timeline-card__dot timeline-card__dot--${config.color}`}>
                    <StatusIcon size={10} />
                  </div>
                  {idx < recentSubmissions.length - 1 && <div className="timeline-card__line" />}
                </div>
                <div className="timeline-card__content">
                  <div className="timeline-card__title-text">{sub.title}</div>
                  <div className="timeline-card__meta">
                    <span className={`timeline-card__diff timeline-card__diff--${sub.difficulty}`}>
                      {sub.difficulty}
                    </span>
                    <span className="timeline-card__sep">·</span>
                    <span className="timeline-card__lang">{sub.language}</span>
                    <span className="timeline-card__sep">·</span>
                    <span className="timeline-card__time">{formatTimeAgo(sub.createdAt)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState title="No recent activity" description="Solve a problem to see your activity here" />
      )}
    </div>
  );
};

export default TimelineActivity;
