import axiosClient from '../utils/axiosClient';

export const fetchStatsOverview = async () => {
  const { data } = await axiosClient.get('/user/stats/overview');
  return data;
};

export const fetchStatsDifficulty = async () => {
  const { data } = await axiosClient.get('/user/stats/difficulty');
  return data;
};

export const fetchStatsTags = async () => {
  const { data } = await axiosClient.get('/user/stats/tags');
  return data;
};

export const fetchStatsTimeline = async (days = 30) => {
  const { data } = await axiosClient.get(`/user/stats/timeline?days=${days}`);
  return data;
};

export const fetchStatsHeatmap = async () => {
  const { data } = await axiosClient.get('/user/stats/heatmap');
  return data;
};
