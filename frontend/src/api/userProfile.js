import axiosClient from '../utils/axiosClient';

export const fetchUserProfile = async (userId) => {
  const { data } = await axiosClient.get(`/user/profile/${userId}`);
  return data;
};

export const updateUserProfile = async (profileData) => {
  const { data } = await axiosClient.put('/user/profile', profileData);
  return data;
};
