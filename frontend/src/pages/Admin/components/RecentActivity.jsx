import React from 'react';
import { recentActivity, RECENT_ACTIVITY_TITLE, activityIconMap } from '../constants';
import './RecentActivity.scss';

const RecentActivity = () => {
  return (
    <div className="recent-activity">
      <h2 className="recent-activity__title">{RECENT_ACTIVITY_TITLE}</h2>
      <div className="space-y-4">
        {recentActivity.map((activity, index) => {
          const IconComponent = activityIconMap[activity.type] || activityIconMap.video;
          return (
            <div key={index} className="recent-activity__item">
              <div className={`recent-activity__icon recent-activity__icon--${activity.type}`}>
                <IconComponent size={20} />
              </div>
              <div className="recent-activity__content">
                <p className="recent-activity__action">{activity.action}</p>
                <p className="recent-activity__user">by {activity.user}</p>
              </div>
              <div className="recent-activity__time">{activity.time}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;
