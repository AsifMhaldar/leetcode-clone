import React, { useState, useMemo, useCallback } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip as ReTooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import {
  CalendarDays, ChevronLeft, ChevronRight, TrendingUp, Award, Zap, Target, Code2,
} from 'lucide-react';
import {
  WEEKDAY_LETTERS, CONTRIBUTIONS_TITLE, CODING_TREND_TITLE, MONTHLY_SUMMARY_TITLE,
  ACHIEVEMENTS_TITLE, LEVEL_LABELS, NEVER_LABEL,
} from '../constants';
import { formatTimeAgo } from '../utils/profileUtils';
import './ActivityCalendar.scss';

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="cal-tooltip">
      <div className="cal-tooltip__date">{d.dateLabel}</div>
      <div className="cal-tooltip__count">{d.count} submission{d.count !== 1 ? 's' : ''}</div>
    </div>
  );
};

const ActivityCalendar = ({ streak, calendar, userStats, languages }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [tooltip, setTooltip] = useState(null);
  const [trendView, setTrendView] = useState('30');
  const today = useMemo(() => new Date(), []);

  // Monthly grid data
  const gridData = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < firstDay; i++) cells.push({ empty: true, key: `e${i}` });
    for (let d = 1; d <= daysInMonth; d++) {
      const ds = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const entry = calendar.find(c => c.date === ds);
      const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === d;
      cells.push({ empty: false, date: ds, day: d, count: entry?.count || 0, level: entry?.level || 0, isToday, key: ds });
    }
    return cells;
  }, [calendar, currentMonth, today]);

  // Monthly stats
  const monthlyData = useMemo(() => {
    const prefix = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}`;
    const entries = calendar.filter(c => c.date.startsWith(prefix));
    return {
      activeDays: entries.filter(c => c.count > 0).length,
      totalSubmissions: entries.reduce((s, c) => s + c.count, 0),
      bestDay: entries.reduce((b, c) => (c.count > b.count ? c : b), { count: 0, date: '' }),
    };
  }, [calendar, currentMonth]);

  // Trend chart data
  const trendData = useMemo(() => {
    const days = trendView === '7' ? 7 : trendView === '30' ? 30 : 90;
    const result = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const ds = d.toISOString().split('T')[0];
      const entry = calendar.find(c => c.date === ds);
      result.push({
        date: ds,
        dateLabel: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        count: entry?.count || 0,
        label: d.toLocaleDateString('en', { weekday: 'short' }),
        dayNum: d.getDate(),
      });
    }
    return result;
  }, [calendar, today, trendView]);

  // Achievements
  const achievements = useMemo(() => {
    const b = [];
    if (streak?.current >= 7) b.push({ icon: '🔥', label: '7-Day Streak', color: 'orange' });
    if (streak?.current >= 30) b.push({ icon: '🔥', label: '30-Day Streak', color: 'red' });
    if ((userStats?.totalSolved || 0) >= 10) b.push({ icon: '🎯', label: '10 Solved', color: 'green' });
    if ((userStats?.totalSolved || 0) >= 50) b.push({ icon: '🏆', label: '50 Solved', color: 'gold' });
    if ((userStats?.totalSolved || 0) >= 100) b.push({ icon: '👑', label: '100 Solved', color: 'purple' });
    return b;
  }, [streak, userStats]);

  const canGoNext = !(currentMonth.getFullYear() === today.getFullYear() && currentMonth.getMonth() === today.getMonth());
  const navigateMonth = useCallback((dir) => {
    setCurrentMonth(prev => { const d = new Date(prev); d.setMonth(d.getMonth() + dir); return d; });
  }, []);

  const topLanguage = languages?.[0]?.name || '—';
  const accepted = Math.round(monthlyData.totalSubmissions * (userStats?.acceptanceRate ?? 0) / 100);

  const handleCellEnter = (e, cell) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({ x: rect.left + rect.width / 2, y: rect.top - 8, date: cell.date, count: cell.count, level: cell.level });
  };

  return (
    <div className="activity-cal">
      {/* ── Contributions Heatmap ──────────────────────────── */}
      <div className="activity-cal__card">
        <div className="activity-cal__card-header">
          <h3 className="activity-cal__title"><CalendarDays size={16} />{CONTRIBUTIONS_TITLE}</h3>
          <div className="activity-cal__month-nav">
            <button className="activity-cal__nav-btn" onClick={() => navigateMonth(-1)}><ChevronLeft size={14} /></button>
            <span className="activity-cal__month-label">{MONTH_NAMES[currentMonth.getMonth()]} {currentMonth.getFullYear()}</span>
            <button className="activity-cal__nav-btn" onClick={() => navigateMonth(1)} disabled={canGoNext}><ChevronRight size={14} /></button>
          </div>
        </div>

        <div className="activity-cal__heatmap">
          <div className="activity-cal__weekday-row">
            {WEEKDAY_LETTERS.map((l, i) => <span key={i} className="activity-cal__weekday">{l}</span>)}
          </div>
          <div className="activity-cal__grid">
            {gridData.map((cell) =>
              cell.empty ? (
                <div key={cell.key} className="activity-cal__cell activity-cal__cell--empty" />
              ) : (
                <div key={cell.key}
                  className={`activity-cal__cell activity-cal__cell--level-${cell.level}${cell.isToday ? ' activity-cal__cell--today' : ''}`}
                  onMouseEnter={(e) => handleCellEnter(e, cell)}
                  onMouseLeave={() => setTooltip(null)}
                />
              )
            )}
          </div>
          <div className="activity-cal__legend">
            <span className="activity-cal__legend-text">Less</span>
            {[0, 1, 2, 3, 4].map(l => <div key={l} className={`activity-cal__legend-cell activity-cal__cell--level-${l}`} />)}
            <span className="activity-cal__legend-text">More</span>
          </div>
        </div>

        {/* ── Trend Chart (recharts) ──────────────────────── */}
        <div className="activity-cal__trend">
          <div className="activity-cal__trend-header">
            <span className="activity-cal__trend-title"><TrendingUp size={13} />{CODING_TREND_TITLE}</span>
            <div className="activity-cal__trend-toggle">
              {['7', '30', '90'].map(v => (
                <button key={v} className={`activity-cal__toggle-btn${trendView === v ? ' activity-cal__toggle-btn--active' : ''}`}
                  onClick={() => setTrendView(v)}>{v}D</button>
              ))}
            </div>
          </div>
          <div className="activity-cal__chart-wrap">
            <ResponsiveContainer width="100%" height={120}>
              <AreaChart data={trendData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" vertical={false} />
                <XAxis dataKey="label" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false}
                  interval={trendView === '7' ? 0 : trendView === '30' ? 4 : 9} />
                <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} allowDecimals={false} />
                <ReTooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="count" stroke="#a855f7" strokeWidth={2} fill="url(#trendGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ── Monthly Summary + Achievements ──────────────────── */}
      <div className="activity-cal__card">
        <h3 className="activity-cal__title"><Zap size={16} />{MONTHLY_SUMMARY_TITLE}</h3>
        <div className="activity-cal__summary-grid">
          <div className="activity-cal__summary-item">
            <span className="activity-cal__summary-val">{monthlyData.activeDays}</span>
            <span className="activity-cal__summary-lbl">Active Days</span>
          </div>
          <div className="activity-cal__summary-item">
            <span className="activity-cal__summary-val">{monthlyData.totalSubmissions}</span>
            <span className="activity-cal__summary-lbl">Submissions</span>
          </div>
          <div className="activity-cal__summary-item">
            <span className="activity-cal__summary-val">{accepted}</span>
            <span className="activity-cal__summary-lbl">Accepted</span>
          </div>
          <div className="activity-cal__summary-item">
            <span className="activity-cal__summary-val">
              {monthlyData.bestDay.count > 0
                ? new Date(monthlyData.bestDay.date + 'T00:00:00').toLocaleDateString('en', { weekday: 'short' })
                : '—'}
            </span>
            <span className="activity-cal__summary-lbl">Best Day</span>
          </div>
          <div className="activity-cal__summary-item">
            <span className="activity-cal__summary-val activity-cal__summary-val--cap">{topLanguage}</span>
            <span className="activity-cal__summary-lbl">Top Lang</span>
          </div>
          <div className="activity-cal__summary-item">
            <span className="activity-cal__summary-val">
              {streak?.lastActive ? formatTimeAgo(streak.lastActive) : NEVER_LABEL}
            </span>
            <span className="activity-cal__summary-lbl">Last Active</span>
          </div>
        </div>

        {achievements.length > 0 && (
          <div className="activity-cal__achievements">
            <h4 className="activity-cal__section-title"><Award size={13} />{ACHIEVEMENTS_TITLE}</h4>
            <div className="activity-cal__badge-row">
              {achievements.map((a, i) => (
                <span key={i} className={`activity-cal__badge activity-cal__badge--${a.color}`}>
                  <span className="activity-cal__badge-icon">{a.icon}</span>{a.label}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {tooltip && (
        <div className="activity-cal__tooltip" style={{ left: tooltip.x, top: tooltip.y }}>
          <div className="activity-cal__tooltip-date">
            {new Date(tooltip.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
          <div className="activity-cal__tooltip-count">
            {tooltip.count} submission{tooltip.count !== 1 ? 's' : ''} — {LEVEL_LABELS[tooltip.level]}
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityCalendar;
