import React from 'react';
import './StatCard.scss';

const StatCard = ({ title, value, gradient, icon }) => (
  <div className="stat-card">
    <div className="flex items-center justify-between">
      <div>
        <p className="stat-card__label">{title}</p>
        <p className="stat-card__value">{value}</p>
      </div>
      <div className={`stat-card__icon bg-gradient-to-r ${gradient}`}>
        {icon}
      </div>
    </div>
  </div>
);

export default StatCard;
