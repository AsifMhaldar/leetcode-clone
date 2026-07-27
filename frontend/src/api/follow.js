import axiosClient from '../utils/axiosClient';

export const toggleFollow = async (targetId) => {
  const { data } = await axiosClient.post(`/user/follow/${targetId}`);
  return data;
};

export const fetchFollowers = async (userId, page = 1) => {
  const { data } = await axiosClient.get(`/user/followers/${userId}?page=${page}`);
  return data;
};

export const fetchFollowing = async (userId, page = 1) => {
  const { data } = await axiosClient.get(`/user/following/${userId}?page=${page}`);
  return data;
};

export const fetchFeed = async (page = 1) => {
  const { data } = await axiosClient.get(`/user/feed?page=${page}`);
  return data.feed;
};

export const fetchPublicProfile = async (userId) => {
  const { data } = await axiosClient.get(`/user/public/${userId}`);
  return data;
};
