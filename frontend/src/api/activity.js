import axiosClient from '../utils/axiosClient';

export const fetchEnhancedFeed = async (page = 1, filter = 'all', sort = 'latest') => {
  const { data } = await axiosClient.get(`/activity/feed?page=${page}&filter=${filter}&sort=${sort}`);
  return data;
};

export const fetchFeedStats = async () => {
  const { data } = await axiosClient.get('/activity/feed-stats');
  return data.stats;
};

export const createActivity = async (postData) => {
  const { data } = await axiosClient.post('/activity/create', postData);
  return data.activity;
};

export const fetchPostUploadSignature = async (resourceType = 'image') => {
  const { data } = await axiosClient.get(`/activity/upload-signature?resourceType=${resourceType}`);
  return data;
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
