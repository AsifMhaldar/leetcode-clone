import { useState, useCallback, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAdminUsers, updateUserRole, deleteUser as deleteUserApi } from '../../../api/adminUsers';

const STALE_TIME = 15 * 1000;
const POLL_INTERVAL = 30 * 1000;

export const useUserManagement = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [roleFilter, setRoleFilter] = useState('all');
  const [sortField, setSortField] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const limit = 10;
  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 400);
    return () => { if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current); };
  }, [searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
    setSelectedUsers([]);
  }, [roleFilter, sortField, sortOrder]);

  const queryParams = {
    search: debouncedSearch,
    role: roleFilter,
    sort: sortField,
    order: sortOrder,
    page: currentPage,
    limit,
  };

  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['adminUsers', queryParams],
    queryFn: () => fetchAdminUsers(queryParams),
    staleTime: STALE_TIME,
    refetchInterval: POLL_INTERVAL,
    refetchIntervalInBackground: true,
  });

  const roleMutation = useMutation({
    mutationFn: updateUserRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
      setSelectedUsers(prev => prev.filter(id => id !== deleteMutation.variables));
    },
  });

  const users = data?.users || [];
  const pagination = data?.pagination || { currentPage: 1, totalPages: 1, totalCount: 0, limit };
  const stats = data?.stats || null;

  const handleUpdateRole = useCallback((userId, newRole) => {
    roleMutation.mutate({ userId, role: newRole });
  }, [roleMutation]);

  const handleDeleteUser = useCallback((userId) => {
    deleteMutation.mutate(userId);
  }, [deleteMutation]);

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const toggleSort = useCallback((field) => {
    setSortField(prev => {
      if (prev === field) {
        setSortOrder(o => o === 'asc' ? 'desc' : 'asc');
        return field;
      }
      setSortOrder('desc');
      return field;
    });
  }, []);

  const selectAllOnPage = useCallback(() => {
    const pageUserIds = users.map(u => u._id);
    if (selectedUsers.length === pageUserIds.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(pageUserIds);
    }
  }, [users, selectedUsers]);

  return {
    users,
    isLoading,
    isError,
    error: error?.response?.data?.error || error?.message || null,
    isFetching,
    searchTerm,
    setSearchTerm,
    selectedUsers,
    setSelectedUsers,
    currentPage,
    setCurrentPage,
    roleFilter,
    setRoleFilter,
    sortField,
    sortOrder,
    toggleSort,
    pagination,
    limit,
    stats,
    selectAllOnPage,
    handleUpdateRole,
    handleDeleteUser,
    handleRefresh,
  };
};
