import axiosClient from '../utils/axiosClient';

export const fetchDashboardData = async () => {
  const { data } = await axiosClient.get('/admin/dashboard');
  return data;
};
