import React from 'react';
import StatCard from './StatCard';
import { statCardsConfig } from '../constants';
import './StatsSection.scss';

const StatsSection = ({ stats }) => {
  return (
    <div className="stats-section">
      {statCardsConfig.map((card) => (
        <StatCard
          key={card.key}
          title={card.title}
          value={stats[card.key]}
          gradient={card.gradient}
          icon={card.icon}
        />
      ))}
    </div>
  );
};

export default StatsSection;
