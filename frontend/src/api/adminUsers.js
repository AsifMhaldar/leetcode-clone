import axiosClient from '../utils/axiosClient';

export const fetchAdminUsers = async ({ search = '', role = 'all', sort = 'createdAt', order = 'desc', page = 1, limit = 10 }) => {
  const params = new URLSearchParams();
  if (search) params.set('search', search);
  if (role !== 'all') params.set('role', role);
  params.set('sort', sort);
  params.set('order', order);
  params.set('page', page);
  params.set('limit', limit);

  const { data } = await axiosClient.get(`/admin/users?${params.toString()}`);
  return data;
};

export const updateUserRole = async ({ userId, role }) => {
  const { data } = await axiosClient.put(`/admin/users/${userId}/role`, { role });
  return data;
};

export const deleteUser = async (userId) => {
  const { data } = await axiosClient.delete(`/admin/users/${userId}`);
  return data;
};
