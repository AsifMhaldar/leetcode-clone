import React from 'react';
import { STATS_TOTAL_LABEL, STATS_HINT_PRIMARY, STATS_HINT_SECONDARY } from '../constants';
import './StatsCard.scss';

const StatsCard = ({ totalProblems }) => {
  return (
    <div className="video-stats">
      <div className="video-stats__inner">
        <div className="video-stats__left">
          <div className="video-stats__count">
            <p className="video-stats__count-value">{totalProblems}</p>
            <p className="video-stats__count-label">{STATS_TOTAL_LABEL}</p>
          </div>
        </div>
        <div className="video-stats__right">
          <p className="video-stats__hint-primary">{STATS_HINT_PRIMARY}</p>
          <p className="video-stats__hint-secondary">{STATS_HINT_SECONDARY}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
