import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, MoreVertical, Edit, Trash2, Ban, 
  Shield, Mail, Eye, EyeOff, ChevronLeft, ChevronRight,
  RefreshCw, UserPlus, Download, User, Crown, Star
} from 'lucide-react';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [roleFilter, setRoleFilter] = useState('all');
  const usersPerPage = 8;

  // Fetch users from your backend API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/users'); // Fixed endpoint
      
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

  // Update user role
  const updateUserRole = async (userId, newRole) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
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

  // Delete user
  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      // Remove from local state
      setUsers(users.filter(user => user._id !== userId));
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } catch (err) {
      setError(err.message);
    }
  };

  // Calculate user status based on activity
  const getUserStatus = (user) => {
    // Simple logic: if user has solved problems, consider active
    return user.problemsSolvedCount > 0 || (user.problemSolved && user.problemSolved.length > 0) 
      ? 'active' 
      : 'inactive';
  };

  // Get user display name
  const getUserName = (user) => {
    return user.name || `${user.firstName} ${user.lastName || ''}`.trim() || user.emailId;
  };

  // Get user email
  const getUserEmail = (user) => {
    return user.email || user.emailId;
  };

  // Filter and search users
  const filteredUsers = users.filter(user => {
    const userName = getUserName(user).toLowerCase();
    const userEmail = getUserEmail(user).toLowerCase();
    const matchesSearch = userName.includes(searchTerm.toLowerCase()) ||
                         userEmail.includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  // Select all users on current page
  const selectAllOnPage = () => {
    const pageUserIds = currentUsers.map(user => user._id);
    if (selectedUsers.length === pageUserIds.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(pageUserIds);
    }
  };

  // Get role badge color
  const getRoleBadge = (role) => {
    const roles = {
      admin: { color: 'bg-red-500/20 text-red-400 border-red-500/30', icon: Shield, label: 'Admin' },
      user: { color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', icon: User, label: 'User' }
    };
    return roles[role] || roles.user;
  };

  // Get status badge color
  const getStatusBadge = (status) => {
    const statuses = {
      active: { color: 'bg-green-500/20 text-green-400 border-green-500/30', label: 'Active' },
      inactive: { color: 'bg-gray-500/20 text-gray-400 border-gray-500/30', label: 'Inactive' }
    };
    return statuses[status] || statuses.inactive;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-blue-400 animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
          <p className="text-gray-400">Manage user accounts, roles, and permissions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-white mb-2">{users.length}</div>
                <div className="text-gray-400">Total Users</div>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <User className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-white mb-2">
                  {users.filter(u => u.role === 'admin').length}
                </div>
                <div className="text-gray-400">Administrators</div>
              </div>
              <div className="p-3 bg-red-500/20 rounded-lg">
                <Shield className="w-6 h-6 text-red-400" />
              </div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-white mb-2">
                  {users.filter(u => getUserStatus(u) === 'active').length}
                </div>
                <div className="text-gray-400">Active Users</div>
              </div>
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Star className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-white mb-2">
                  {users.reduce((total, user) => total + (user.problemsSolvedCount || 0), 0)}
                </div>
                <div className="text-gray-400">Total Solutions</div>
              </div>
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Crown className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Role Filter */}
              <div className="flex gap-4">
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="all">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={fetchUsers}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/30 text-red-400 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Users Table */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === currentUsers.length && currentUsers.length > 0}
                      onChange={selectAllOnPage}
                      className="rounded bg-white/5 border-white/10 text-blue-500 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-gray-400 font-medium">User</th>
                  <th className="px-6 py-4 text-left text-gray-400 font-medium">Role</th>
                  <th className="px-6 py-4 text-left text-gray-400 font-medium">Status</th>
                  <th className="px-6 py-4 text-left text-gray-400 font-medium">Problems Solved</th>
                  <th className="px-6 py-4 text-left text-gray-400 font-medium">Joined</th>
                  <th className="px-6 py-4 text-left text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {currentUsers.map((user) => {
                  const roleBadge = getRoleBadge(user.role);
                  const status = getUserStatus(user);
                  const statusBadge = getStatusBadge(status);
                  const RoleIcon = roleBadge.icon;
                  const problemsSolved = user.problemsSolvedCount || (user.problemSolved ? user.problemSolved.length : 0);
                  
                  return (
                    <tr key={user._id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user._id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedUsers([...selectedUsers, user._id]);
                            } else {
                              setSelectedUsers(selectedUsers.filter(id => id !== user._id));
                            }
                          }}
                          className="rounded bg-white/5 border-white/10 text-blue-500 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                              {getUserName(user).charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-white">{getUserName(user)}</div>
                            <div className="text-gray-400 text-sm">{getUserEmail(user)}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={user.role}
                          onChange={(e) => updateUserRole(user._id, e.target.value)}
                          className={`${roleBadge.color} border rounded-lg px-3 py-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`${statusBadge.color} border rounded-lg px-3 py-1 text-sm font-medium`}>
                          {statusBadge.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-white font-medium">{problemsSolved}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-400">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => deleteUser(user._id)}
                            className="p-2 text-red-400 hover:bg-red-500/20 rounded transition-colors"
                            title="Delete User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 ml-auto">
              <span className="text-gray-400 text-sm">
                Showing {startIndex + 1}-{Math.min(startIndex + usersPerPage, filteredUsers.length)} of {filteredUsers.length}
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded border border-white/10 text-gray-400 hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded border border-white/10 text-gray-400 hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserManagement;