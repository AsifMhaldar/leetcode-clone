import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUserProfile, updateUserProfile } from '../../../api/userProfile';

const STALE_TIME = 60 * 1000;
const REFETCH_INTERVAL = 60 * 1000;

export const useProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  const {
    data: profileData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['userProfile', user?._id],
    queryFn: () => fetchUserProfile(user._id),
    enabled: !!user?._id,
    staleTime: STALE_TIME,
    refetchInterval: REFETCH_INTERVAL,
  });

  const updateMutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['userProfile', user?._id] });
      setIsEditing(false);
    },
  });

  const startEditing = () => {
    if (profileData?.user) {
      setEditForm({
        firstName: profileData.user.firstName || '',
        lastName: profileData.user.lastName || '',
        bio: profileData.user.bio || '',
        github: profileData.user.github || '',
        linkedin: profileData.user.linkedin || '',
        website: profileData.user.website || '',
      });
    }
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    updateMutation.mutate(editForm);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditForm({});
  };

  return {
    user: profileData?.user ?? user,
    userStats: profileData?.stats ?? null,
    languages: profileData?.languages ?? [],
    streak: profileData?.streak ?? { current: 0, longest: 0, lastActive: null },
    calendar: profileData?.calendar ?? [],
    recentSubmissions: profileData?.recentSubmissions ?? [],
    isEditing,
    setIsEditing,
    isLoading,
    isError,
    error,
    saveLoading: updateMutation.isPending,
    saveMessage: updateMutation.isError
      ? updateMutation.error?.response?.data || 'Failed to update profile'
      : updateMutation.isSuccess
      ? 'Profile updated successfully!'
      : '',
    editForm,
    handleInputChange,
    handleSaveProfile,
    handleCancelEdit,
    startEditing,
    refetch,
  };
};
