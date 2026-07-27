import React, { useMemo } from 'react';
import { Target } from 'lucide-react';
import { useStatsTimeline } from '../hooks/useStats';
import { WEEKLY_GOAL } from '../constants';
import './DashboardCharts.scss';

const WeeklyGoal = () => {
  const { data, isLoading } = useStatsTimeline(7);

  const solvedThisWeek = useMemo(() => {
    if (!data?.timeline) return 0;

    const today = new Date();
    const dayOfWeek = today.getDay();
    const mondayOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const monday = new Date(today);
    monday.setDate(today.getDate() - mondayOffset);
    monday.setHours(0, 0, 0, 0);
    const mondayStr = monday.toISOString().split('T')[0];

    let count = 0;
    data.timeline.forEach(entry => {
      if (entry.date >= mondayStr) {
        count += entry.accepted || 0;
      }
    });
    return count;
  }, [data]);

  if (isLoading) {
    return (
      <div className="dashboard-chart weekly-goal">
        <div className="weekly-goal__skeleton" />
      </div>
    );
  }

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
