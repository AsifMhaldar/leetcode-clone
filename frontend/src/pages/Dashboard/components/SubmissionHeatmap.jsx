import React from 'react';
import { useStatsHeatmap } from '../hooks/useStats';
import './DashboardCharts.scss';

const SubmissionHeatmap = () => {
  const { data, isLoading } = useStatsHeatmap();

  if (isLoading) {
    return (
      <div className="dashboard-chart">
        <h2 className="dashboard-chart__title">Contribution Heatmap</h2>
        <div className="dashboard-chart__skeleton">
          <div className="dashboard-chart__skeleton-heatmap" />
        </div>
      </div>
    );
  }

  const calendar = data?.calendar || [];
  const totalActiveDays = data?.totalActiveDays || 0;

  return (
    <div className="dashboard-chart">
      <div className="dashboard-chart__header-row">
        <h2 className="dashboard-chart__title">Contribution Heatmap</h2>
        <span className="dashboard-chart__subtitle">{totalActiveDays} active days</span>
      </div>
      <div className="heatmap">
        <div className="heatmap__grid">
          {calendar.map((entry, i) => (
            <div key={i}
              className={`heatmap__cell heatmap__cell--level-${entry.level}`}
              title={`${entry.date}: ${entry.count} submission${entry.count !== 1 ? 's' : ''}`} />
          ))}
        </div>
        <div className="heatmap__legend">
          <span className="heatmap__legend-label">Less</span>
          {[0, 1, 2, 3, 4].map(level => (
            <div key={level} className={`heatmap__cell heatmap__cell--level-${level}`} />
          ))}
          <span className="heatmap__legend-label">More</span>
        </div>
      </div>
    </div>
  );
};

export default SubmissionHeatmap;
