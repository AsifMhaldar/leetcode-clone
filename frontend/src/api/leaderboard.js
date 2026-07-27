import axiosClient from '../utils/axiosClient';

export const fetchGlobalLeaderboard = async () => {
  const { data } = await axiosClient.get('/leaderboard/global');
  return data.leaderboard;
};

export const fetchWeeklyLeaderboard = async () => {
  const { data } = await axiosClient.get('/leaderboard/weekly');
  return data.leaderboard;
};

export const fetchMonthlyLeaderboard = async () => {
  const { data } = await axiosClient.get('/leaderboard/monthly');
  return data.leaderboard;
};

export const fetchTagLeaderboard = async (tag) => {
  const { data } = await axiosClient.get(`/leaderboard/tag/${tag}`);
  return data.leaderboard;
};

export const fetchUserRank = async (userId) => {
  const { data } = await axiosClient.get(`/leaderboard/rank/${userId}`);
  return data;
};
