import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchDashboardData } from '../../../api/adminDashboard';

const POLL_INTERVAL = 30000;

export const useAnalytics = () => {
  const [timeRange, setTimeRange] = useState('7d');

  const { data, isLoading, isError, error, refetch, dataUpdatedAt } = useQuery({
    queryKey: ['adminDashboard'],
    queryFn: fetchDashboardData,
    refetchInterval: POLL_INTERVAL,
    staleTime: 10000,
    refetchOnWindowFocus: true,
  });

  return {
    timeRange,
    setTimeRange,
    data,
    isLoading,
    isError,
    error,
    refetch,
    dataUpdatedAt,
  };
};
