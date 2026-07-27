import React from 'react';
import { Trophy } from 'lucide-react';
import './YourRank.scss';

const YourRank = ({ rankData, isLoading }) => {
  if (isLoading) {
    return (
      <div className="your-rank your-rank--loading">
        <div className="your-rank__skeleton"></div>
      </div>
    );
  }

  if (!rankData?.rank) {
    return (
      <div className="your-rank">
        <div className="your-rank__content">
          <Trophy className="your-rank__icon" />
          <div className="your-rank__info">
            <span className="your-rank__label">Your Rank</span>
            <span className="your-rank__value">Solve problems to appear on the leaderboard</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="your-rank">
      <div className="your-rank__content">
        <Trophy className="your-rank__icon" />
        <div className="your-rank__info">
          <span className="your-rank__label">Your Rank</span>
          <span className="your-rank__value">#{rankData.rank}</span>
        </div>
      </div>
    </div>
  );
};

export default YourRank;
