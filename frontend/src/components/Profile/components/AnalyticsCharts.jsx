import React, { useMemo } from 'react';
import {
  BarChart, Bar, AreaChart, Area, LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import { BarChart3, TrendingUp, Award } from 'lucide-react';
import { ANALYTICS_TITLE, SUBMISSION_HISTORY_TITLE, ACCEPTANCE_TREND_TITLE, RANK_PROGRESS_TITLE } from '../constants';
import './AnalyticsCharts.scss';

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="analytics-tooltip">
      <div className="analytics-tooltip__label">{label}</div>
      {payload.map((p, i) => (
        <div key={i} className="analytics-tooltip__val" style={{ color: p.color }}>
          {p.name}: {p.value != null ? p.value : '—'}
        </div>
      ))}
    </div>
  );
};

const AnalyticsCharts = ({ calendar, userStats, streak }) => {
  // Submission history — last 30 days bar data
  const submissionData = useMemo(() => {
    const today = new Date();
    const data = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const ds = d.toISOString().split('T')[0];
      const entry = calendar.find(c => c.date === ds);
      data.push({
        date: `${d.getMonth() + 1}/${d.getDate()}`,
        submissions: entry?.count || 0,
      });
    }
    return data;
  }, [calendar]);

  // Acceptance trend — real data from calendar accepted counts
  const acceptanceData = useMemo(() => {
    const today = new Date();
    const data = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const ds = d.toISOString().split('T')[0];
      const entry = calendar.find(c => c.date === ds);
      const total = entry?.count || 0;
      const accepted = entry?.accepted || 0;
      const rate = total > 0 ? Math.round((accepted / total) * 100) : null;
      data.push({
        date: `${d.getMonth() + 1}/${d.getDate()}`,
        rate,
      });
    }
    return data;
  }, [calendar]);

  // Engagement growth — cumulative submissions over time (real data)
  const rankData = useMemo(() => {
    const today = new Date();
    let cumulative = 0;
    const data = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const ds = d.toISOString().split('T')[0];
      const entry = calendar.find(c => c.date === ds);
      cumulative += entry?.count || 0;
      data.push({
        date: `${d.getMonth() + 1}/${d.getDate()}`,
        submissions: cumulative,
      });
    }
    return data;
  }, [calendar]);

  const hasData = submissionData.some(d => d.submissions > 0);

  return (
    <div className="analytics">
      <h3 className="analytics__section-title"><BarChart3 size={16} />{ANALYTICS_TITLE}</h3>

      <div className="analytics__grid">
        {/* Submission History */}
        <div className="analytics__card">
          <h4 className="analytics__card-title"><BarChart3 size={14} />{SUBMISSION_HISTORY_TITLE}</h4>
          <div className="analytics__chart-wrap">
            {hasData ? (
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={submissionData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 9, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} interval={6} />
                  <YAxis tick={{ fontSize: 9, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar dataKey="submissions" name="Submissions" fill="#a855f7" radius={[3, 3, 0, 0]} maxBarSize={16} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="analytics__empty">Solve problems to see your submission history</div>
            )}
          </div>
        </div>

        {/* Acceptance Trend */}
        <div className="analytics__card">
          <h4 className="analytics__card-title"><TrendingUp size={14} />{ACCEPTANCE_TREND_TITLE}</h4>
          <div className="analytics__chart-wrap">
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={acceptanceData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="acceptGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 9, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} interval={6} />
                <YAxis tick={{ fontSize: 9, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} domain={[0, 100]} allowDataOverflow />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="rate" name="Acceptance %" stroke="#22c55e" strokeWidth={2} fill="url(#acceptGrad)" connectNulls />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Engagement Growth */}
        <div className="analytics__card">
          <h4 className="analytics__card-title"><Award size={14} />{RANK_PROGRESS_TITLE}</h4>
          <div className="analytics__chart-wrap">
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={rankData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 9, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} interval={6} />
                <YAxis tick={{ fontSize: 9, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip content={<ChartTooltip />} />
                <Line type="monotone" dataKey="submissions" name="Total Submissions" stroke="#3b82f6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;
