import React from 'react';
import { Link } from 'react-router';
import { Trophy, Clock, Zap, ArrowRight, Calendar } from 'lucide-react';
import { UPCOMING_CONTESTS } from '../constants';
import './ContestsFeed.scss';

const ContestsFeed = () => {
  return (
    <div className="contests-feed">
      <div className="contests-feed__header">
        <div className="contests-feed__title">
          <Trophy size={18} className="contests-feed__title-icon" />
          <div>
            <h2>Upcoming Contests</h2>
            <p>Compete with developers worldwide and climb the leaderboard</p>
          </div>
        </div>
        <Link to="/leaderboard" className="contests-feed__leaderboard-link">
          Leaderboard <ArrowRight size={14} />
        </Link>
      </div>

      <div className="contests-feed__grid">
        {UPCOMING_CONTESTS.map((contest, i) => (
          <div key={contest.id} className="contests-feed__card glass-card">
            <div className="contests-feed__card-top">
              <span className="contests-feed__number">#{String(i + 1).padStart(2, '0')}</span>
              <span className={`contests-feed__difficulty contests-feed__difficulty--${contest.difficulty.toLowerCase()}`}>
                {contest.difficulty}
              </span>
            </div>
            <h3 className="contests-feed__name">{contest.name}</h3>
            <p className="contests-feed__tagline">{contest.tagline}</p>
            <div className="contests-feed__meta">
              <span><Calendar size={13} /> {contest.date}</span>
              <span><Clock size={13} /> {contest.duration}</span>
              <span><Zap size={13} /> {contest.prize}</span>
            </div>
            <button className="contests-feed__register-btn">Register</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContestsFeed;
