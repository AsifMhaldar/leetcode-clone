import React from 'react';
import { Target } from 'lucide-react';
import { useStatsOverview } from '../hooks/useStats';
import { WEEKLY_GOAL } from '../constants';
import './DashboardCharts.scss';

const WeeklyGoal = () => {
  const { data, isLoading } = useStatsOverview();

  if (isLoading) {
    return (
      <div className="dashboard-chart weekly-goal">
        <div className="weekly-goal__skeleton" />
      </div>
    );
  }

  const solvedThisWeek = data?.totalSolved || 0;
  const target = WEEKLY_GOAL.defaultTarget;
  const progress = Math.min((solvedThisWeek / target) * 100, 100);
  const isComplete = solvedThisWeek >= target;

  return (
    <div className="dashboard-chart weekly-goal">
      <div className="weekly-goal__header">
        <Target size={18} className="weekly-goal__icon" />
        <h3 className="weekly-goal__title">{WEEKLY_GOAL.label}</h3>
      </div>
      <div className="weekly-goal__progress">
        <div className="weekly-goal__bar-bg">
          <div className="weekly-goal__bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="weekly-goal__meta">
          <span className="weekly-goal__count">
            <span className="weekly-goal__count-current">{solvedThisWeek}</span>
            <span className="weekly-goal__count-sep"> / </span>
            <span className="weekly-goal__count-target">{target}</span>
          </span>
          <span className={`weekly-goal__status ${isComplete ? 'weekly-goal__status--complete' : ''}`}>
            {isComplete ? 'Goal reached!' : `${target - solvedThisWeek} to go`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WeeklyGoal;
