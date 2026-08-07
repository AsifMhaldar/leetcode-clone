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
import StartPost from './components/StartPost';
import PostComposer from './components/PostComposer';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import ContestsFeed from './components/ContestsFeed';
import { useFeed } from './hooks/useFeed';
import { useSocket } from '../../hooks/useSocket';
import { FEED_TABS } from './constants';
import './ActivityFeed.scss';

const ActivityFeed = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState('');
  const [composerOpen, setComposerOpen] = useState(false);
  const observerRef = useRef(null);

  const handleLogout = () => dispatch(logoutUser());

  const socketRef = useSocket(user?._id);

  const {
    allActivities,
    feedQuery,
    feedStats,
    profileQuery,
    suggestedQuery,
    trendingQuery,
    dailyChallengeQuery,
    activeFriendsQuery,
    leaderboardPreviewQuery,
    activeFilter,
    setActiveFilter,
    activeSort,
    setActiveSort,
    toggleLike,
    addComment,
    toggleSave,
    share,
    createPost,
    createPostStatus
  } = useFeed(user?._id, socketRef);

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

  const activeTabLabel = FEED_TABS.find(t => t.id === activeFilter)?.label || 'Posts';
  const isContestsTab = activeFilter === 'contests';

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

          <StartPost
            onOpenComposer={() => setComposerOpen(true)}
          />

          <ErrorBoundary
            fallback={({ reset }) => (
              <div className="post-composer__fallback glass-card">
                <h3>Couldn't open the composer</h3>
                <p>Something went wrong while preparing the post editor.</p>
                <button
                  className="post-composer__fallback-close"
                  onClick={() => {
                    reset();
                    setComposerOpen(false);
                  }}
                >
                  Close
                </button>
              </div>
            )}
          >
            <PostComposer
              open={composerOpen}
              onClose={() => setComposerOpen(false)}
              onPost={createPost}
              isPosting={createPostStatus.isPending}
              isError={createPostStatus.isError}
              error={createPostStatus.error}
              onReset={() => createPostStatus.reset()}
              user={user}
            />
          </ErrorBoundary>

          <FeedFilters
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            activeSort={activeSort}
            onSortChange={setActiveSort}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            feedStats={feedStats}
          />

          {isContestsTab ? (
            <ContestsFeed />
          ) : feedQuery.isLoading ? (
            <SkeletonLoader count={3} />
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
              <h3>No {activeTabLabel.toLowerCase()} yet</h3>
              <p>
                {activeFilter === 'following'
                  ? 'Follow developers to see their coding activity in your feed.'
                  : 'Follow developers, solve problems, or create the first post!'}
              </p>
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
