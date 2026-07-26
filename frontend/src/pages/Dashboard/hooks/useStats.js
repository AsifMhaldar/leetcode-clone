import { useQuery } from '@tanstack/react-query';
import {
  fetchStatsOverview,
  fetchStatsDifficulty,
  fetchStatsTags,
  fetchStatsTimeline,
  fetchStatsHeatmap,
} from '../../../api/userStats';

const STALE_TIME = 60 * 1000;
const REFETCH_INTERVAL = 60 * 1000;

export const useStatsOverview = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['statsOverview'],
    queryFn: fetchStatsOverview,
    staleTime: STALE_TIME,
    refetchInterval: REFETCH_INTERVAL,
  });
  return { data, isLoading, isError, error, refetch };
};

export const useStatsDifficulty = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['statsDifficulty'],
    queryFn: fetchStatsDifficulty,
    staleTime: STALE_TIME,
    refetchInterval: REFETCH_INTERVAL,
  });
  return { data, isLoading, isError, error };
};

export const useStatsTags = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['statsTags'],
    queryFn: fetchStatsTags,
    staleTime: STALE_TIME,
    refetchInterval: REFETCH_INTERVAL,
  });
  return { data, isLoading, isError, error };
};

export const useStatsTimeline = (days = 30) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['statsTimeline', days],
    queryFn: () => fetchStatsTimeline(days),
    staleTime: STALE_TIME,
    refetchInterval: REFETCH_INTERVAL,
  });
  return { data, isLoading, isError, error };
};

export const useStatsHeatmap = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['statsHeatmap'],
    queryFn: fetchStatsHeatmap,
    staleTime: STALE_TIME,
    refetchInterval: REFETCH_INTERVAL,
  });
  return { data, isLoading, isError, error };
};
