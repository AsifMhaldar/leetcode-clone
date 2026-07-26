import React from 'react';
import { Users, Code, TrendingUp, Clock, Award, Activity, Target } from 'lucide-react';
import { OVERVIEW_CARDS } from '../constants';
import './OverviewCards.scss';

const ICON_MAP = {
  Users, Code, TrendingUp, Clock, Award, Activity, Target,
};

const OverviewCards = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="overview-cards">
        {OVERVIEW_CARDS.map((card) => (
          <div key={card.key} className="overview-cards__card">
            <div className="overview-cards__skeleton-icon"></div>
            <div className="overview-cards__skeleton-value"></div>
            <div className="overview-cards__skeleton-label"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!data) return null;

  const { stats } = data;
  const values = {
    totalUsers: stats.totalUsers,
    activeUsers: stats.activeUsers,
    totalSubmissions: stats.totalSubmissions,
    successRate: stats.successRate,
    topLanguage: stats.topLanguage || 'N/A',
    peakHours: stats.peakHours || 'N/A',
  };

  return (
    <div className="overview-cards">
      {OVERVIEW_CARDS.map((card) => {
        const Icon = ICON_MAP[card.icon];
        const value = values[card.key];
        const formattedValue = typeof value === 'number' ? value.toLocaleString() : value;

        return (
          <div key={card.key} className="overview-cards__card">
            <div className={`overview-cards__icon overview-cards__icon--${card.colorClass}`}>
              {Icon && <Icon size={20} />}
            </div>
            <div className="overview-cards__value">{formattedValue}{card.suffix || ''}</div>
            <div className="overview-cards__label">{card.label}</div>
          </div>
        );
      })}
    </div>
  );
};

export default OverviewCards;
