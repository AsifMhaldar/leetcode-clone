import { useQuery } from '@tanstack/react-query';
import { fetchDashboardData } from '../../../api/adminDashboard';

const STALE_TIME = 30 * 1000;
const REFETCH_INTERVAL = 30 * 1000;

export const useAdminDashboard = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    dataUpdatedAt,
  } = useQuery({
    queryKey: ['adminDashboard'],
    queryFn: fetchDashboardData,
    staleTime: STALE_TIME,
    refetchInterval: REFETCH_INTERVAL,
  });

  return {
    stats: data?.stats ?? null,
    recentActivity: data?.recentActivity ?? [],
    difficultyDistribution: data?.difficultyDistribution ?? [],
    submissionTrends: data?.submissionTrends ?? [],
    userGrowth: data?.userGrowth ?? [],
    isLoading,
    isError,
    error,
    refetch,
    dataUpdatedAt,
  };
};
