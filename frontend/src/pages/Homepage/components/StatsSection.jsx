import React from 'react';
import StatCard from './StatCard';
import { statCardsConfig } from '../utils/homepageData';

const StatsSection = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
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
