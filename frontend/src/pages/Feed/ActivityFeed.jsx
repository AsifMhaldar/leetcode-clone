import React, { useState, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router';
import { RefreshCw, Rss, Wifi, WifiOff } from 'lucide-react';
import { logoutUser } from '../../authSlice';
import HomepageHeader from '../Homepage/components/HomepageHeader';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import ActivityCard from './components/ActivityCard';
import FeedFilters from './components/FeedFilters';
import SkeletonLoader from './components/SkeletonLoader';
import { useFeed } from './hooks/useFeed';
import './ActivityFeed.scss';

const ActivityFeed = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState('');
  const observerRef = useRef(null);

  const handleLogout = () => dispatch(logoutUser());

  const {
    allActivities,
    feedQuery,
    profileQuery,
    suggestedQuery,
    trendingQuery,
    dailyChallengeQuery,
    activeFriendsQuery,
    leaderboardPreviewQuery,
    activeFilter,
    setActiveFilter,
    toggleLike,
    addComment,
    toggleSave,
    share
  } = useFeed(user?._id);

  const lastActivityRef = useCallback(
    (node) => {
      if (feedQuery.isLoading) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && feedQuery.hasNextPage && !feedQuery.isFetchingNextPage) {
            feedQuery.fetchNextPage();
          }
        },
        { threshold: 0.1 }
      );
      if (node) observerRef.current.observe(node);
    },
    [feedQuery.hasNextPage, feedQuery.isFetchingNextPage, feedQuery.isLoading]
  );

  const filteredActivities = searchQuery
    ? allActivities.filter(
        (a) =>
          a.userId?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.userId?.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.problemId?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.content?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allActivities;

  return (
    <div className="page-bg">
      <HomepageHeader user={user} onLogout={handleLogout} />
      <div className="feed-layout">
        <div className="feed-layout__left">
          <LeftSidebar
            profile={profileQuery.data}
            suggested={suggestedQuery.data}
            userId={user?._id}
          />
        </div>

        <main className="feed-layout__center">
          <div className="feed-layout__header glass-card">
            <div className="feed-layout__title-row">
              <div className="feed-layout__title">
                <Rss size={20} />
                <h1>Activity Feed</h1>
              </div>
              <div className="feed-layout__status">
                {feedQuery.isLoading ? (
                  <span className="feed-layout__loading">
                    <RefreshCw size={14} className="spin" /> Loading...
                  </span>
                ) : feedQuery.isError ? (
                  <span className="feed-layout__error">
                    <WifiOff size={14} /> Connection error
                  </span>
                ) : (
                  <span className="feed-layout__live">
                    <Wifi size={14} /> Live
                  </span>
                )}
              </div>
            </div>
          </div>

          <FeedFilters
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          {feedQuery.isLoading ? (
            <SkeletonLoader count={4} />
          ) : feedQuery.isError ? (
            <div className="feed-layout__error-card glass-card">
              <WifiOff size={32} />
              <h3>Failed to load feed</h3>
              <p>Check your connection and try again.</p>
              <button className="feed-layout__retry-btn" onClick={() => feedQuery.refetch()}>
                <RefreshCw size={16} /> Retry
              </button>
            </div>
          ) : filteredActivities.length === 0 ? (
            <div className="feed-layout__empty glass-card">
              <Rss size={40} />
              <h3>No activity yet</h3>
              <p>Solve problems, follow developers, and your feed will come alive.</p>
              <Link to="/home" className="feed-layout__browse-btn">Browse Problems</Link>
            </div>
          ) : (
            <div className="feed-layout__feed">
              {filteredActivities.map((activity, index) => {
                const isLast = index === filteredActivities.length - 1;
                return (
                  <div
                    key={activity._id}
                    ref={isLast ? lastActivityRef : null}
                  >
                    <ActivityCard
                      activity={activity}
                      onLike={toggleLike}
                      onComment={addComment}
                      onSave={toggleSave}
                      onShare={share}
                    />
                  </div>
                );
              })}
              {feedQuery.isFetchingNextPage && <SkeletonLoader count={2} />}
              {feedQuery.isFetching && !feedQuery.isFetchingNextPage && (
                <div className="feed-layout__refreshing">
                  <RefreshCw size={14} className="spin" /> Refreshing...
                </div>
              )}
            </div>
          )}
        </main>

        <div className="feed-layout__right">
          <RightSidebar
            leaderboard={leaderboardPreviewQuery.data}
            dailyChallenge={dailyChallengeQuery.data}
            trending={trendingQuery.data}
            activeFriends={activeFriendsQuery.data}
          />
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;
