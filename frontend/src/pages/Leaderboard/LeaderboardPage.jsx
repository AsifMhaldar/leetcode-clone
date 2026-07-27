import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Trophy, AlertTriangle } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { useLeaderboard } from './hooks/useLeaderboard';
import { LEADERBOARD_TABS, TAG_OPTIONS } from './constants';
import YourRank from './components/YourRank';
import LeaderboardTable from './components/LeaderboardTable';
import HomepageHeader from '../Homepage/components/HomepageHeader';
import { logoutUser } from '../../authSlice';
import './LeaderboardPage.scss';

const LeaderboardPage = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('global');
  const [selectedTag, setSelectedTag] = useState('all');

  const { leaderboardQuery, rankQuery } = useLeaderboard(activeTab, selectedTag, user?._id);

  const handleRetry = () => {
    queryClient.invalidateQueries({ queryKey: ['leaderboard', activeTab, selectedTag] });
  };

  return (
    <div className="page-bg">
      <HomepageHeader user={user} onLogout={() => dispatch(logoutUser())} />
      <div className="container max-w-6xl mx-auto px-6 py-8">
        <div className="lb-page__header">
          <Trophy className="lb-page__header-icon" />
          <div>
            <h1 className="lb-page__title">Leaderboard</h1>
            <p className="lb-page__subtitle">Global Rankings</p>
          </div>
        </div>

        {user && <YourRank rankData={rankQuery.data} isLoading={rankQuery.isLoading} />}

        <div className="lb-page__tabs">
          {LEADERBOARD_TABS.map((tab) => (
            <button
              key={tab.id}
              className={`lb-page__tab ${activeTab === tab.id ? 'lb-page__tab--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'tag' && (
          <div className="lb-page__tag-filter">
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="lb-page__tag-select"
            >
              {TAG_OPTIONS.map((tag) => (
                <option key={tag.value} value={tag.value}>{tag.label}</option>
              ))}
            </select>
          </div>
        )}

        <LeaderboardTable
          data={leaderboardQuery.data}
          isLoading={leaderboardQuery.isLoading}
          error={leaderboardQuery.error}
          onRetry={handleRetry}
        />
      </div>
    </div>
  );
};

export default LeaderboardPage;
