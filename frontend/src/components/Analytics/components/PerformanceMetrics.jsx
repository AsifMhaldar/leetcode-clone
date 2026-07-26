import React from 'react';
import { PERFORMANCE_METRIC_LABELS } from '../constants';
import './PerformanceMetrics.scss';

const PerformanceMetrics = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="perf-metrics">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="perf-metrics__card">
            <div className="perf-metrics__skeleton-value"></div>
            <div className="perf-metrics__skeleton-label"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!data) return null;

  const { stats } = data;
  const metrics = [
    { key: 'dailySubmissions', value: stats.dailySubmissions },
    { key: 'weeklySubmissions', value: stats.weeklySubmissions?.toLocaleString() },
    { key: 'monthlySubmissions', value: stats.monthlySubmissions?.toLocaleString() },
    { key: 'peakHours', value: stats.peakHours || 'N/A' },
  ];

  return (
    <div className="perf-metrics">
      {metrics.map((metric) => (
        <div key={metric.key} className="perf-metrics__card">
          <div className="perf-metrics__value">{metric.value}</div>
          <div className="perf-metrics__label">{PERFORMANCE_METRIC_LABELS[metric.key]}</div>
        </div>
      ))}
    </div>
  );
};

export default PerformanceMetrics;
