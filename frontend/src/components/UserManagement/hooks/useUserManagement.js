import { useState, useEffect } from 'react';

export const useUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [roleFilter, setRoleFilter] = useState('all');
  const usersPerPage = 8;

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/users');
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      const data = await response.json();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateUserRole = async (userId, newRole) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/role`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user role');
      }

      setUsers(users.map(user => 
        user._id === userId ? { ...user, role: newRole } : user
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      setUsers(users.filter(user => user._id !== userId));
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } catch (err) {
      setError(err.message);
    }
  };

  const getUserStatus = (user) => {
    return user.problemsSolvedCount > 0 || (user.problemSolved && user.problemSolved.length > 0) 
      ? 'active' 
      : 'inactive';
  };

  const getUserName = (user) => {
    return user.name || `${user.firstName} ${user.lastName || ''}`.trim() || user.emailId;
  };

  const getUserEmail = (user) => {
    return user.email || user.emailId;
  };

  const filteredUsers = users.filter(user => {
    const userName = getUserName(user).toLowerCase();
    const userEmail = getUserEmail(user).toLowerCase();
    const matchesSearch = userName.includes(searchTerm.toLowerCase()) ||
                         userEmail.includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  const selectAllOnPage = () => {
    const pageUserIds = currentUsers.map(user => user._id);
    if (selectedUsers.length === pageUserIds.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(pageUserIds);
    }
  };

  return {
    users,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    selectedUsers,
    setSelectedUsers,
    currentPage,
    setCurrentPage,
    roleFilter,
    setRoleFilter,
    usersPerPage,
    filteredUsers,
    totalPages,
    startIndex,
    currentUsers,
    selectAllOnPage,
    fetchUsers,
    updateUserRole,
    deleteUser,
    getUserStatus,
    getUserName,
    getUserEmail
  };
};
