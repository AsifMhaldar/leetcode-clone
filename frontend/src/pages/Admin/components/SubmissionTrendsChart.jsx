import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Chart.scss';

const SubmissionTrendsChart = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="dashboard-chart">
        <h2 className="dashboard-chart__title">Submission Trends (7 Days)</h2>
        <div className="dashboard-chart__skeleton">
          <div className="dashboard-chart__skeleton-bars" />
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-chart">
      <h2 className="dashboard-chart__title">Submission Trends (7 Days)</h2>
      <div className="dashboard-chart__body">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--glass-border)"
              vertical={false}
            />
            <XAxis
              dataKey="label"
              tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                borderRadius: '0.75rem',
                color: 'var(--text-primary)',
              }}
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              formatter={(value) => [`${value} submissions`, 'Count']}
            />
            <Bar
              dataKey="count"
              fill="url(#barGradient)"
              radius={[6, 6, 0, 0]}
              maxBarSize={48}
            />
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SubmissionTrendsChart;
