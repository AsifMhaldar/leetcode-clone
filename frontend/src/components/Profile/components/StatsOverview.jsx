import React from 'react';
import { Code2, Eye, CalendarDays, Star } from 'lucide-react';
import { PROBLEM_SOLVING_TITLE, PROGRESS_LABELS, ACCEPTANCE_LABEL, COMMUNITY_STATS_TITLE, LANGUAGES_TITLE, STAT_LABELS } from '../constants';
import EmptyState from './EmptyState';
import './StatsOverview.scss';

const langColors = {
  'javascript': '#f1e05a', 'c++': '#f34b7d', 'java': '#b07219',
  'python': '#3572A5', 'typescript': '#3178c6',
};

const StatsOverview = ({ userStats, languages, calendar }) => {
  const totalSolved = userStats?.totalSolved || 0;
  const totalProblems = userStats?.totalProblems || 0;
  const acceptance = userStats?.acceptanceRate || 0;
  const daysActive = calendar ? calendar.filter(d => d.count > 0).length : 0;

  const difficulties = [
    { key: 'easy', label: PROGRESS_LABELS.easy, solved: userStats?.easySolved || 0, total: userStats?.totalEasy || 0, color: '#4ade80' },
    { key: 'medium', label: PROGRESS_LABELS.medium, solved: userStats?.mediumSolved || 0, total: userStats?.totalMedium || 0, color: '#facc15' },
    { key: 'hard', label: PROGRESS_LABELS.hard, solved: userStats?.hardSolved || 0, total: userStats?.totalHard || 0, color: '#f87171' },
  ];

  return (
    <>
      {/* Problem Solving Card */}
      <div className="stats-overview">
        <div className="stats-overview__header">
          <h3 className="stats-overview__title">{PROBLEM_SOLVING_TITLE}</h3>
          <div className="stats-overview__total">
            <span className="stats-overview__total-num">{totalSolved}</span>
            <span className="stats-overview__total-sep">/</span>
            <span className="stats-overview__total-den">{totalProblems}</span>
          </div>
        </div>

        <div className="stats-overview__accept">
          <span className="stats-overview__accept-lbl">{ACCEPTANCE_LABEL}</span>
          <span className="stats-overview__accept-val">{acceptance}%</span>
        </div>

        <div className="stats-overview__diffs">
          {difficulties.map(d => {
            const pct = d.total > 0 ? Math.round((d.solved / d.total) * 100) : 0;
            return (
              <div key={d.key} className="stats-overview__diff">
                <div className="stats-overview__diff-top">
                  <span className="stats-overview__diff-lbl">{d.label}</span>
                  <span className="stats-overview__diff-count" style={{ color: d.color }}>{d.solved}/{d.total}</span>
                </div>
                <div className="stats-overview__bar-bg">
                  <div className="stats-overview__bar-fill" style={{ width: `${Math.max(4, pct)}%`, background: d.color }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Languages Card */}
      <div className="stats-overview">
        <h3 className="stats-overview__title">{LANGUAGES_TITLE}</h3>
        {languages.length > 0 ? (
          <div className="stats-overview__langs">
            {languages.slice(0, 5).map((lang, i) => {
              const total = languages.reduce((sum, l) => sum + l.count, 0);
              const pct = total > 0 ? Math.round((lang.count / total) * 100) : 0;
              return (
                <div key={i} className="stats-overview__lang">
                  <div className="stats-overview__lang-top">
                    <span className="stats-overview__lang-name">{lang.name}</span>
                    <span className="stats-overview__lang-pct">{pct}%</span>
                  </div>
                  <div className="stats-overview__lang-bar-bg">
                    <div className="stats-overview__lang-bar-fill" style={{ width: `${pct}%`, background: langColors[lang.name.toLowerCase()] || '#60a5fa' }} />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState title="No languages yet" description="Solve problems to see your language breakdown" />
        )}
      </div>

      {/* Community Stats Card */}
      <div className="stats-overview">
        <h3 className="stats-overview__title">{COMMUNITY_STATS_TITLE}</h3>
        <div className="stats-overview__community">
          <div className="stats-overview__community-item">
            <Eye size={14} className="stats-overview__community-icon" />
            <span className="stats-overview__community-val">{(userStats?.totalSubmissions || 0).toLocaleString()}</span>
            <span className="stats-overview__community-lbl">{STAT_LABELS.submissions}</span>
          </div>
          <div className="stats-overview__community-item">
            <Code2 size={14} className="stats-overview__community-icon" />
            <span className="stats-overview__community-val">{(userStats?.acceptedSubmissions || 0).toLocaleString()}</span>
            <span className="stats-overview__community-lbl">{STAT_LABELS.solutions}</span>
          </div>
          <div className="stats-overview__community-item">
            <CalendarDays size={14} className="stats-overview__community-icon" />
            <span className="stats-overview__community-val">{daysActive.toLocaleString()}</span>
            <span className="stats-overview__community-lbl">{STAT_LABELS.daysActive}</span>
          </div>
          <div className="stats-overview__community-item">
            <Star size={14} className="stats-overview__community-icon" />
            <span className="stats-overview__community-val">{(userStats?.reputation || 0).toLocaleString()}</span>
            <span className="stats-overview__community-lbl">{STAT_LABELS.reputation}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatsOverview;
