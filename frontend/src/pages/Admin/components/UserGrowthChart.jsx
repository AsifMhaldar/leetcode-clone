import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Chart.scss';

const UserGrowthChart = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="dashboard-chart">
        <h2 className="dashboard-chart__title">User Growth (30 Days)</h2>
        <div className="dashboard-chart__skeleton">
          <div className="dashboard-chart__skeleton-lines" />
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-chart">
      <h2 className="dashboard-chart__title">User Growth (30 Days)</h2>
      <div className="dashboard-chart__body">
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--glass-border)"
              vertical={false}
            />
            <XAxis
              dataKey="label"
              tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              interval={4}
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
              formatter={(value) => [`${value} users`, 'New Users']}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#22c55e"
              strokeWidth={2}
              fill="url(#areaGradient)"
              dot={{ fill: '#22c55e', r: 3, strokeWidth: 0 }}
              activeDot={{ fill: '#22c55e', r: 5, stroke: 'var(--glass-bg)', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserGrowthChart;
