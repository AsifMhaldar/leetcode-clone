import React from 'react';
import { User, Shield, Star, Crown } from 'lucide-react';
import { STAT_LABELS } from '../constants';
import './StatsCards.scss';

const StatsCards = ({ stats, isLoading }) => {
  if (isLoading || !stats) {
    return (
      <div className="stats-cards">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="stats-cards__card stats-cards__card--skeleton">
            <div className="stats-cards__card-inner">
              <div>
                <div className="stats-cards__skeleton-value" />
                <div className="stats-cards__skeleton-label" />
              </div>
              <div className="stats-cards__skeleton-icon" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="stats-cards">
      <div className="stats-cards__card">
        <div className="stats-cards__card-inner">
          <div>
            <div className="stats-cards__value">{stats.totalUsers.toLocaleString()}</div>
            <div className="stats-cards__label">{STAT_LABELS.totalUsers}</div>
          </div>
          <div className="stats-cards__icon stats-cards__icon--blue">
            <User size={22} />
          </div>
        </div>
      </div>
      <div className="stats-cards__card">
        <div className="stats-cards__card-inner">
          <div>
            <div className="stats-cards__value">{stats.administrators.toLocaleString()}</div>
            <div className="stats-cards__label">{STAT_LABELS.administrators}</div>
          </div>
          <div className="stats-cards__icon stats-cards__icon--red">
            <Shield size={22} />
          </div>
        </div>
      </div>
      <div className="stats-cards__card">
        <div className="stats-cards__card-inner">
          <div>
            <div className="stats-cards__value">{stats.activeUsers.toLocaleString()}</div>
            <div className="stats-cards__label">{STAT_LABELS.activeUsers}</div>
          </div>
          <div className="stats-cards__icon stats-cards__icon--green">
            <Star size={22} />
          </div>
        </div>
      </div>
      <div className="stats-cards__card">
        <div className="stats-cards__card-inner">
          <div>
            <div className="stats-cards__value">{stats.totalSolutions.toLocaleString()}</div>
            <div className="stats-cards__label">{STAT_LABELS.totalSolutions}</div>
          </div>
          <div className="stats-cards__icon stats-cards__icon--purple">
            <Crown size={22} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
