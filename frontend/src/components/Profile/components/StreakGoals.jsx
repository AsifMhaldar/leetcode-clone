import React, { useMemo } from 'react';
import { Flame, Trophy, Zap } from 'lucide-react';
import { STREAK_TITLE, WEEKLY_GOAL_TITLE, WEEKLY_GOAL_SUBTITLE, NEXT_MILESTONE, NEVER_LABEL, BADGES_TITLE } from '../constants';
import { formatTimeAgo } from '../utils/profileUtils';
import './StreakGoals.scss';

const WEEKLY_GOAL = 5;
const badgeTiers = [
  { min: 1, label: 'First Step', color: 'green' },
  { min: 5, label: 'Quick Learner', color: 'blue' },
  { min: 10, label: 'Focused', color: 'purple' },
  { min: 25, label: 'Dedicated', color: 'yellow' },
  { min: 50, label: 'Champion', color: 'orange' },
  { min: 100, label: 'Legend', color: 'red' },
];

const StreakGoals = ({ streak, calendar, userStats }) => {
  const totalSolved = userStats?.totalSolved || 0;
  const nextBadge = badgeTiers.find(b => totalSolved < b.min);
  const milestonePct = nextBadge ? Math.min(100, (totalSolved / nextBadge.min) * 100) : 100;

  const weeklyData = useMemo(() => {
    if (!calendar || calendar.length === 0) return { solved: 0, pct: 0 };
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dayOfWeek = today.getDay();
    let solved = 0;
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - dayOfWeek + i);
      const key = d.toISOString().slice(0, 10);
      const entry = calendar.find(c => c.date === key);
      solved += entry?.count || 0;
    }
    return { solved, pct: Math.min(100, Math.round((solved / WEEKLY_GOAL) * 100)) };
  }, [calendar]);

  const circumference = 2 * Math.PI * 32;
  const dashOffset = circumference - (weeklyData.pct / 100) * circumference;

  return (
    <>
      {/* Streak Card */}
      <div className="streak-card">
        <h3 className="streak-card__title"><Flame size={16} />{STREAK_TITLE}</h3>
        <div className="streak-card__row">
          <div className="streak-card__stat">
            <span className="streak-card__stat-val streak-card__stat-val--fire">{streak?.current ?? 0}</span>
            <span className="streak-card__stat-lbl">Current</span>
          </div>
          <div className="streak-card__stat">
            <span className="streak-card__stat-val">{streak?.longest ?? 0}</span>
            <span className="streak-card__stat-lbl">Best</span>
          </div>
          <div className="streak-card__stat">
            <span className="streak-card__stat-val streak-card__stat-val--sm">
              {streak?.lastActive ? formatTimeAgo(streak.lastActive) : NEVER_LABEL}
            </span>
            <span className="streak-card__stat-lbl">Last Active</span>
          </div>
        </div>
      </div>

      {/* Weekly Goal Card */}
      <div className="streak-card">
        <div className="streak-card__wg-header">
          <div>
            <div className="streak-card__wg-title">{WEEKLY_GOAL_TITLE}</div>
            <div className="streak-card__wg-sub">{WEEKLY_GOAL_SUBTITLE}</div>
          </div>
        </div>
        <div className="streak-card__wg-body">
          <div className="streak-card__ring-wrap">
            <svg className="streak-card__ring" viewBox="0 0 72 72">
              <circle cx="36" cy="36" r="32" fill="none" stroke="var(--glass-bg)" strokeWidth="5" />
              <circle cx="36" cy="36" r="32" fill="none" stroke="url(#sgGrad)" strokeWidth="5"
                strokeDasharray={circumference} strokeDashoffset={dashOffset} strokeLinecap="round"
                className="streak-card__ring-progress" />
              <defs>
                <linearGradient id="sgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>
            <div className="streak-card__ring-center">
              <span className="streak-card__ring-count">{weeklyData.solved}</span>
              <span className="streak-card__ring-label">/ {WEEKLY_GOAL}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Badges / Milestone Card */}
      <div className="streak-card">
        <h3 className="streak-card__title"><Trophy size={16} />{BADGES_TITLE}</h3>
        <div className="streak-card__badges">
          {badgeTiers.map((b) => {
            const earned = totalSolved >= b.min;
            return (
              <span key={b.min} className={`streak-card__badge streak-card__badge--${earned ? b.color : 'locked'}`}>
                {b.label}
              </span>
            );
          })}
        </div>
        {nextBadge && (
          <div className="streak-card__milestone">
            <div className="streak-card__milestone-text">{NEXT_MILESTONE}: {nextBadge.label} ({totalSolved}/{nextBadge.min})</div>
            <div className="streak-card__milestone-bar-bg">
              <div className="streak-card__milestone-bar-fill" style={{ width: `${milestonePct}%` }} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StreakGoals;
