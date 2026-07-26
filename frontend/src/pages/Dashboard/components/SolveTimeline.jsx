import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useStatsTimeline } from '../hooks/useStats';
import { TIMELINE_OPTIONS } from '../constants';
import './DashboardCharts.scss';

const SolveTimeline = () => {
  const [days, setDays] = useState(30);
  const { data, isLoading } = useStatsTimeline(days);

  if (isLoading) {
    return (
      <div className="dashboard-chart">
        <h2 className="dashboard-chart__title">Submission Timeline</h2>
        <div className="dashboard-chart__skeleton">
          <div className="dashboard-chart__skeleton-lines" />
        </div>
      </div>
    );
  }

  const timeline = data?.timeline || [];

  return (
    <div className="dashboard-chart">
      <div className="dashboard-chart__header-row">
        <h2 className="dashboard-chart__title">Submission Timeline</h2>
        <div className="dashboard-chart__tabs">
          {TIMELINE_OPTIONS.map(opt => (
            <button key={opt.value}
              className={`dashboard-chart__tab ${days === opt.value ? 'dashboard-chart__tab--active' : ''}`}
              onClick={() => setDays(opt.value)}>
              {opt.label}
            </button>
          ))}
        </div>
      </div>
      <div className="dashboard-chart__body">
        {timeline.every(t => t.total === 0) ? (
          <div className="dashboard-chart__empty">No submissions in this period</div>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={timeline} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="timelineGradTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#60a5fa" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="timelineGradAccepted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" vertical={false} />
              <XAxis dataKey="label" tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
                     tickLine={false} axisLine={false}
                     interval={days <= 7 ? 0 : days <= 30 ? 4 : 9} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
                     tickLine={false} axisLine={false} allowDecimals={false} />
              <Tooltip contentStyle={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                borderRadius: '0.75rem',
                color: 'var(--text-primary)',
              }} />
              <Area type="monotone" dataKey="total" stroke="#60a5fa" strokeWidth={2}
                    fill="url(#timelineGradTotal)" name="Total"
                    dot={false} activeDot={{ r: 4, stroke: 'var(--glass-bg)', strokeWidth: 2 }} />
              <Area type="monotone" dataKey="accepted" stroke="#22c55e" strokeWidth={2}
                    fill="url(#timelineGradAccepted)" name="Accepted"
                    dot={false} activeDot={{ r: 4, stroke: 'var(--glass-bg)', strokeWidth: 2 }} />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default SolveTimeline;
