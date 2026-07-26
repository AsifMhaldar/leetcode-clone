import React from 'react';
import { BarChart3, TrendingUp, TrendingDown } from 'lucide-react';
import { STATS_MONTH_SUFFIX } from '../constants';
import './StatsCards.scss';

const statsConfig = [
  { key: 'totalProblems', label: 'Total Problems', icon: BarChart3, changeKey: 'problemsChange' },
  { key: 'totalUsers', label: 'Total Users', icon: BarChart3, changeKey: 'usersChange' },
  { key: 'totalSubmissions', label: 'Total Submissions', icon: BarChart3, changeKey: 'submissionsChange' },
  { key: 'successRate', label: 'Success Rate', icon: BarChart3, changeKey: null },
];

const StatsCardSkeleton = () => (
  <div className="stats-cards__card stats-cards__card--skeleton">
    <div className="flex items-center justify-between">
      <div>
        <div className="stats-cards__skeleton-line stats-cards__skeleton-line--label" />
        <div className="stats-cards__skeleton-line stats-cards__skeleton-line--value" />
      </div>
      <div className="stats-cards__skeleton-icon" />
    </div>
    <div className="stats-cards__skeleton-line stats-cards__skeleton-line--trend" />
  </div>
);

const StatsCards = ({ stats, isLoading, isError }) => {
  if (isLoading) {
    return (
      <div className="stats-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatsCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="stats-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="stats-cards__error">
          Failed to load stats. Retrying...
        </div>
      </div>
    );
  }

  return (
    <div className="stats-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {statsConfig.map((cfg) => {
        const value = stats?.[cfg.key] ?? 0;
        const change = cfg.changeKey ? stats?.[cfg.changeKey] ?? 0 : null;
        const trend = change !== null ? (change >= 0 ? 'up' : 'down') : 'up';
        const TrendIcon = trend === 'up' ? TrendingUp : TrendingDown;
        const IconComponent = cfg.icon;

        let displayValue;
        if (cfg.key === 'successRate') {
          displayValue = `${value}%`;
        } else if (value >= 1000000) {
          displayValue = `${(value / 1000000).toFixed(1)}M`;
        } else if (value >= 1000) {
          displayValue = `${(value / 1000).toFixed(1)}k`;
        } else {
          displayValue = String(value);
        }

        return (
          <div key={cfg.key} className="stats-cards__card group">
            <div className="flex items-center justify-between">
              <div>
                <p className="stats-cards__label">{cfg.label}</p>
                <p className="stats-cards__value">{displayValue}</p>
              </div>
              <div className={`stats-cards__icon stats-cards__icon--${trend}`}>
                <IconComponent size={20} />
              </div>
            </div>
            {change !== null && (
              <div className={`stats-cards__trend stats-cards__trend--${trend}`}>
                <TrendIcon size={14} />
                <span>{change >= 0 ? '+' : ''}{change}%</span>
                <span>{STATS_MONTH_SUFFIX}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
