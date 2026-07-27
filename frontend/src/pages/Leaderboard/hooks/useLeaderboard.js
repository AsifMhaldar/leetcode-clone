import { useQuery } from '@tanstack/react-query';
import { fetchGlobalLeaderboard, fetchWeeklyLeaderboard, fetchMonthlyLeaderboard, fetchTagLeaderboard, fetchUserRank } from '../../../api/leaderboard';

export const useLeaderboard = (activeTab, selectedTag, userId) => {
  const leaderboardQuery = useQuery({
    queryKey: ['leaderboard', activeTab, selectedTag],
    queryFn: () => {
      if (activeTab === 'global') return fetchGlobalLeaderboard();
      if (activeTab === 'weekly') return fetchWeeklyLeaderboard();
      if (activeTab === 'monthly') return fetchMonthlyLeaderboard();
      if (activeTab === 'tag' && selectedTag !== 'all') return fetchTagLeaderboard(selectedTag);
      return fetchGlobalLeaderboard();
    },
    refetchInterval: 30000,
    staleTime: 10000
  });

  const rankQuery = useQuery({
    queryKey: ['userRank', userId],
    queryFn: () => fetchUserRank(userId),
    enabled: !!userId,
    refetchInterval: 30000
  });

  return { leaderboardQuery, rankQuery };
};
