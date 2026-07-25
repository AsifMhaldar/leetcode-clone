import React from 'react';
import { Shield, User, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

const UsersTable = ({ 
  currentUsers, selectedUsers, setSelectedUsers, selectAllOnPage,
  startIndex, usersPerPage, filteredUsers, currentPage, totalPages,
  setCurrentPage, getUserName, getUserEmail, getUserStatus,
  updateUserRole, deleteUser
}) => {
  const getRoleBadge = (role) => {
    const roles = {
      admin: { color: 'bg-red-500/20 text-red-400 border-red-500/30', icon: Shield, label: 'Admin' },
      user: { color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', icon: User, label: 'User' }
    };
    return roles[role] || roles.user;
  };

  const getStatusBadge = (status) => {
    const statuses = {
      active: { color: 'bg-green-500/20 text-green-400 border-green-500/30', label: 'Active' },
      inactive: { color: 'bg-gray-500/20 text-gray-400 border-gray-500/30', label: 'Inactive' }
    };
    return statuses[status] || statuses.inactive;
  };

  return (
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
  );
};

export default UsersTable;
