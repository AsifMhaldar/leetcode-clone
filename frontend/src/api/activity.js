import axiosClient from '../utils/axiosClient';

export const fetchEnhancedFeed = async (page = 1, filter = 'all') => {
  const { data } = await axiosClient.get(`/activity/feed?page=${page}&filter=${filter}`);
  return data;
};

export const createActivity = async (type, problemId, content, codeSnippet) => {
  const { data } = await axiosClient.post('/activity/create', { type, problemId, content, codeSnippet });
  return data.activity;
};

export const toggleActivityLike = async (activityId) => {
  const { data } = await axiosClient.post(`/activity/${activityId}/like`);
  return data;
};

export const addActivityComment = async (activityId, content) => {
  const { data } = await axiosClient.post(`/activity/${activityId}/comment`, { content });
  return data.comments;
};

export const toggleActivitySave = async (activityId) => {
  const { data } = await axiosClient.post(`/activity/${activityId}/save`);
  return data;
};

export const shareActivity = async (activityId) => {
  const { data } = await axiosClient.post(`/activity/${activityId}/share`);
  return data;
};

export const fetchSuggestedUsers = async () => {
  const { data } = await axiosClient.get('/activity/suggested');
  return data.users;
};

export const fetchTrendingProblems = async () => {
  const { data } = await axiosClient.get('/activity/trending');
  return data.problems;
};

export const fetchDailyChallenge = async () => {
  const { data } = await axiosClient.get('/activity/daily-challenge');
  return data.problem;
};

export const fetchActiveFriends = async () => {
  const { data } = await axiosClient.get('/activity/active-friends');
  return data.users;
};

export const fetchLeaderboardPreview = async () => {
  const { data } = await axiosClient.get('/activity/leaderboard-preview');
  return data.leaderboard;
};
