import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleFollow } from '../../api/follow';
import './FollowButton.scss';

const FollowButton = ({ targetId, isFollowing: initialFollowing, size = 'sm' }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => toggleFollow(targetId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['publicProfile'] });
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
      queryClient.invalidateQueries({ queryKey: ['feed'] });
    }
  });

  if (mutation.isPending) {
    return (
      <button className={`follow-btn follow-btn--${size} follow-btn--loading`} disabled>
        <span className="follow-btn__spinner"></span>
      </button>
    );
  }

  return (
    <button
      className={`follow-btn follow-btn--${size} ${mutation.data?.following ? 'follow-btn--following' : initialFollowing ? 'follow-btn--following' : ''}`}
      onClick={() => mutation.mutate()}
    >
      {mutation.data?.following ? 'Following' : initialFollowing ? 'Following' : 'Follow'}
    </button>
  );
};

export default FollowButton;
