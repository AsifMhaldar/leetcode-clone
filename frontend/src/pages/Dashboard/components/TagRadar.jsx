import React from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { useStatsTags } from '../hooks/useStats';
import './DashboardCharts.scss';

const TAG_COLORS = {
  array: '#60a5fa',
  string: '#a855f7',
  linkedList: '#22c55e',
  graph: '#f97316',
  dp: '#ef4444',
};

const TagRadar = () => {
  const { data, isLoading } = useStatsTags();

  if (isLoading) {
    return (
      <div className="dashboard-chart">
        <h2 className="dashboard-chart__title">Topic Strength</h2>
        <div className="dashboard-chart__skeleton">
          <div className="dashboard-chart__skeleton-circle" />
        </div>
      </div>
    );
  }

  const tags = data?.tags || [];

  const radarData = tags.map(t => ({
    tag: t.tag,
    percentage: t.percentage,
    solved: t.solved,
    total: t.total,
  }));

  return (
    <div className="dashboard-chart">
      <h2 className="dashboard-chart__title">Topic Strength</h2>
      <div className="dashboard-chart__body">
        {radarData.length === 0 ? (
          <div className="dashboard-chart__empty">No tag data available</div>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
              <PolarGrid stroke="var(--glass-border)" />
              <PolarAngleAxis dataKey="tag"
                tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
              <PolarRadiusAxis
                angle={30} domain={[0, 100]}
                tick={{ fill: 'var(--text-muted)', fontSize: 10 }}
                axisLine={false} />
              <Radar name="Solved %" dataKey="percentage"
                     stroke="#60a5fa" fill="#60a5fa" fillOpacity={0.25} strokeWidth={2} />
              <Tooltip contentStyle={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                borderRadius: '0.75rem',
                color: 'var(--text-primary)',
              }} formatter={(value, name, props) => [
                `${props.payload.solved} / ${props.payload.total} (${value}%)`,
                props.payload.tag,
              ]} />
            </RadarChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className="tag-legend">
        {tags.map((t, i) => (
          <div key={i} className="tag-legend__item">
            <span className="tag-legend__dot" style={{ background: TAG_COLORS[t.tag] || '#60a5fa' }} />
            <span className="tag-legend__name">{t.tag}</span>
            <span className="tag-legend__pct">{t.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagRadar;
