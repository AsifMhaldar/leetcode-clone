import axiosClient from '../utils/axiosClient';

export const fetchComments = async (problemId, sort = 'newest') => {
  const { data } = await axiosClient.get(`/comment/problem/${problemId}?sort=${sort}`);
  return data.comments;
};

export const createComment = async (problemId, content, parentCommentId = null) => {
  const { data } = await axiosClient.post('/comment', { problemId, content, parentCommentId });
  return data.comment;
};

export const updateComment = async (commentId, content) => {
  const { data } = await axiosClient.put(`/comment/${commentId}`, { content });
  return data.comment;
};

export const deleteComment = async (commentId) => {
  const { data } = await axiosClient.delete(`/comment/${commentId}`);
  return data;
};

export const toggleUpvote = async (commentId) => {
  const { data } = await axiosClient.post(`/comment/${commentId}/upvote`);
  return data;
};
