import { useState, useCallback, useRef, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import {
  fetchEnhancedFeed,
  toggleActivityLike,
  addActivityComment,
  toggleActivitySave,
  shareActivity,
  fetchSuggestedUsers,
  fetchTrendingProblems,
  fetchDailyChallenge,
  fetchActiveFriends,
  fetchLeaderboardPreview
} from '../../../api/activity';
import { fetchPublicProfile } from '../../../api/follow';

export const useFeed = (userId) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const queryClient = useQueryClient();

  const feedQuery = useInfiniteQuery({
    queryKey: ['enhancedFeed', activeFilter],
    queryFn: ({ pageParam = 1 }) => fetchEnhancedFeed(pageParam, activeFilter),
    getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    refetchInterval: 30000,
    staleTime: 10000,
    retry: false
  });

  const likeMutation = useMutation({
    mutationFn: (activityId) => toggleActivityLike(activityId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['enhancedFeed'] })
  });

  const commentMutation = useMutation({
    mutationFn: ({ activityId, content }) => addActivityComment(activityId, content),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['enhancedFeed'] })
  });

  const saveMutation = useMutation({
    mutationFn: (activityId) => toggleActivitySave(activityId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['enhancedFeed'] })
  });

  const shareMutation = useMutation({
    mutationFn: (activityId) => shareActivity(activityId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['enhancedFeed'] })
  });

  const profileQuery = useQuery({
    queryKey: ['feedProfile', userId],
    queryFn: () => fetchPublicProfile(userId),
    enabled: !!userId
  });

  const suggestedQuery = useQuery({
    queryKey: ['suggestedUsers'],
    queryFn: fetchSuggestedUsers,
    retry: false,
    refetchInterval: 60000
  });

  const trendingQuery = useQuery({
    queryKey: ['trendingProblems'],
    queryFn: fetchTrendingProblems,
    retry: false,
    refetchInterval: 60000
  });

  const dailyChallengeQuery = useQuery({
    queryKey: ['dailyChallenge'],
    queryFn: fetchDailyChallenge,
    retry: false,
    refetchInterval: 300000
  });

  const activeFriendsQuery = useQuery({
    queryKey: ['activeFriends'],
    queryFn: fetchActiveFriends,
    retry: false,
    refetchInterval: 60000
  });

  const leaderboardPreviewQuery = useQuery({
    queryKey: ['leaderboardPreview'],
    queryFn: fetchLeaderboardPreview,
    retry: false,
    refetchInterval: 60000
  });

  const allActivities = feedQuery.data?.pages?.flatMap(p => p.activities) || [];

  return {
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
    toggleLike: likeMutation.mutate,
    addComment: commentMutation.mutate,
    toggleSave: saveMutation.mutate,
    share: shareMutation.mutate
  };
};
