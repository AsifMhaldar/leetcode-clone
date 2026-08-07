import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import {
  fetchEnhancedFeed,
  fetchFeedStats,
  createActivity,
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

export const useFeed = (userId, socketRef) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeSort, setActiveSort] = useState('latest');
  const queryClient = useQueryClient();

  const feedQuery = useInfiniteQuery({
    queryKey: ['enhancedFeed', activeFilter, activeSort],
    queryFn: ({ pageParam = 1 }) => fetchEnhancedFeed(pageParam, activeFilter, activeSort),
    getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    refetchInterval: 30000,
    staleTime: 10000,
    retry: false
  });

  const feedStatsQuery = useQuery({
    queryKey: ['feedStats'],
    queryFn: fetchFeedStats,
    retry: false,
    refetchInterval: 30000
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

  const createPostMutation = useMutation({
    mutationFn: (postData) => createActivity(postData),
    onMutate: async (postData) => {
      await queryClient.cancelQueries({ queryKey: ['enhancedFeed', activeFilter, activeSort] });
      const previousData = queryClient.getQueryData(['enhancedFeed', activeFilter, activeSort]);

      const optimisticPost = {
        _id: 'temp-' + Date.now(),
        userId: {
          _id: userId,
          firstName: postData.content?.split(' ')[0] || 'You',
          lastName: ''
        },
        type: postData.type || 'shared',
        content: postData.content || '',
        image: postData.image || '',
        video: postData.video || '',
        codeSnippet: postData.codeSnippet || '',
        codeLanguage: postData.codeLanguage || '',
        visibility: postData.visibility || 'public',
        poll: postData.poll || [],
        likes: [],
        comments: [],
        saves: [],
        shares: 0,
        createdAt: new Date().toISOString(),
        problemId: null,
        __optimistic: true
      };

      queryClient.setQueryData(['enhancedFeed', activeFilter, activeSort], (old) => {
        if (!old?.pages?.length) return { pages: [{ activities: [optimisticPost], hasMore: false, page: 1 }], pageParams: [1] };
        const newPages = [...old.pages];
        newPages[0] = {
          ...newPages[0],
          activities: [optimisticPost, ...newPages[0].activities]
        };
        return { ...old, pages: newPages };
      });

      return { previousData };
    },
    onError: (err, formData, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['enhancedFeed', activeFilter, activeSort], context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['enhancedFeed', activeFilter, activeSort] });
      queryClient.invalidateQueries({ queryKey: ['feedStats'] });
    }
  });

  useEffect(() => {
    const socket = socketRef?.current;
    if (!socket) return;

    const handleNewPost = (post) => {
      queryClient.setQueryData(['enhancedFeed', activeFilter, activeSort], (old) => {
        if (!old?.pages?.length) return old;
        const newPages = [...old.pages];
        const exists = newPages[0]?.activities?.some(a => a._id === post._id);
        if (exists) return old;
        newPages[0] = {
          ...newPages[0],
          activities: [post, ...newPages[0].activities]
        };
        return { ...old, pages: newPages };
      });
      queryClient.invalidateQueries({ queryKey: ['feedStats'] });
    };

    socket.on('newPost', handleNewPost);
    return () => { socket.off('newPost', handleNewPost); };
  }, [socketRef, queryClient, activeFilter, activeSort]);

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
    feedStats: feedStatsQuery.data,
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
    toggleLike: likeMutation.mutate,
    addComment: commentMutation.mutate,
    toggleSave: saveMutation.mutate,
    share: shareMutation.mutate,
    createPost: createPostMutation.mutate,
    createPostStatus: createPostMutation
  };
};
