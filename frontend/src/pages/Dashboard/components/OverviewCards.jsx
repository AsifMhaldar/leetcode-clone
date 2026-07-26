import React from 'react';
import { Flame, Target, TrendingUp, Award, Calendar, BarChart3 } from 'lucide-react';
import './OverviewCards.scss';

const OverviewCards = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="overview-cards">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="overview-cards__skeleton">
            <div className="overview-cards__skeleton-icon" />
            <div className="overview-cards__skeleton-value" />
            <div className="overview-cards__skeleton-label" />
          </div>
        ))}
      </div>
    );
  }

  if (!data) return null;

  const cards = [
    {
      icon: <Target size={20} />,
      value: `${data.totalSolved} / ${data.totalProblems}`,
      label: 'Problems Solved',
      color: '#60a5fa',
    },
    {
      icon: <Flame size={20} />,
      value: `${data.currentStreak}`,
      label: `Day Streak (Best: ${data.longestStreak})`,
      color: '#f97316',
    },
    {
      icon: <TrendingUp size={20} />,
      value: `${data.acceptanceRate}%`,
      label: 'Acceptance Rate',
      color: '#22c55e',
    },
    {
      icon: <Award size={20} />,
      value: `#${data.rank}`,
      label: `Global Rank (${data.totalUsers} users)`,
      color: '#a855f7',
    },
    {
      icon: <Calendar size={20} />,
      value: `${data.daysSinceJoin}`,
      label: 'Days Active',
      color: '#facc15',
    },
    {
      icon: <BarChart3 size={20} />,
      value: `${data.totalSubmissions}`,
      label: 'Total Submissions',
      color: '#06b6d4',
    },
  ];

  return (
    <div className="overview-cards">
      {cards.map((card, index) => (
        <div key={index} className="overview-cards__item">
          <div className="overview-cards__icon" style={{ color: card.color }}>
            {card.icon}
          </div>
          <div className="overview-cards__value">{card.value}</div>
          <div className="overview-cards__label">{card.label}</div>
        </div>
      ))}
    </div>
  );
};

export default OverviewCards;
