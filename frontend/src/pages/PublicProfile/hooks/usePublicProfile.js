import { useQuery } from '@tanstack/react-query';
import { fetchPublicProfile } from '../../../api/follow';

export const usePublicProfile = (userId) => {
  const profileQuery = useQuery({
    queryKey: ['publicProfile', userId],
    queryFn: () => fetchPublicProfile(userId),
    enabled: !!userId,
    refetchInterval: 30000
  });

  return { profileQuery };
};
