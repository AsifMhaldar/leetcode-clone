import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useStatsDifficulty } from '../hooks/useStats';
import './DashboardCharts.scss';

const DifficultyChart = () => {
  const { data, isLoading } = useStatsDifficulty();

  if (isLoading) {
    return (
      <div className="dashboard-chart">
        <h2 className="dashboard-chart__title">Difficulty Breakdown</h2>
        <div className="dashboard-chart__skeleton">
          <div className="dashboard-chart__skeleton-circle" />
        </div>
      </div>
    );
  }

  const distribution = data?.distribution || [];
  const pieData = distribution.map(d => ({ name: d.name, value: d.solved, color: d.color }));
  const total = pieData.reduce((sum, d) => sum + d.value, 0);

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (percent === 0) return null;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central"
            fontSize={13} fontWeight={600}>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="dashboard-chart">
      <h2 className="dashboard-chart__title">Difficulty Breakdown</h2>
      <div className="dashboard-chart__body">
        {total === 0 ? (
          <div className="dashboard-chart__empty">No problems solved yet</div>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={100}
                   paddingAngle={4} dataKey="value" labelLine={false} label={renderCustomLabel}>
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip contentStyle={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                borderRadius: '0.75rem',
                color: 'var(--text-primary)',
              }} formatter={(value, name) => [`${value} problems`, name]} />
              <Legend wrapperStyle={{ color: 'var(--text-secondary)' }} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className="difficulty-stats">
        {distribution.map((d, i) => (
          <div key={i} className="difficulty-stats__item">
            <span className="difficulty-stats__label" style={{ color: d.color }}>{d.name}</span>
            <span className="difficulty-stats__value">{d.solved} / {d.total}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DifficultyChart;
