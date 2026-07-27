import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchComments, createComment, updateComment, deleteComment, toggleUpvote } from '../../../api/comments';

export const useComments = (problemId) => {
  const [sort, setSort] = useState('newest');
  const queryClient = useQueryClient();

  const commentsQuery = useQuery({
    queryKey: ['comments', problemId, sort],
    queryFn: () => fetchComments(problemId, sort),
    enabled: !!problemId,
    refetchInterval: 30000
  });

  const createMutation = useMutation({
    mutationFn: ({ content, parentCommentId }) => createComment(problemId, content, parentCommentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', problemId] });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ commentId, content }) => updateComment(commentId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', problemId] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (commentId) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', problemId] });
    }
  });

  const upvoteMutation = useMutation({
    mutationFn: (commentId) => toggleUpvote(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', problemId] });
    }
  });

  return {
    comments: commentsQuery.data,
    isLoading: commentsQuery.isLoading,
    sort,
    setSort,
    createComment: createMutation.mutate,
    updateComment: updateMutation.mutate,
    deleteComment: deleteMutation.mutate,
    toggleUpvote: upvoteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending
  };
};
