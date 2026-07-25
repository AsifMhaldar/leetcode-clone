import React from 'react';
import { useUserManagement } from './hooks/useUserManagement';
import StatsCards from './components/StatsCards';
import SearchControls from './components/SearchControls';
import UsersTable from './components/UsersTable';
import { RefreshCw } from 'lucide-react';

function UserManagement() {
  const {
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
  } = useUserManagement();

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
          <p className="text-gray-400">Manage user accounts, roles, and permissions</p>
        </div>

        <StatsCards users={users} getUserStatus={getUserStatus} />
        
        <SearchControls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          onRefresh={fetchUsers}
        />

        {error && (
          <div className="bg-red-500/20 border border-red-500/30 text-red-400 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <UsersTable
          currentUsers={currentUsers}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          selectAllOnPage={selectAllOnPage}
          startIndex={startIndex}
          usersPerPage={usersPerPage}
          filteredUsers={filteredUsers}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          getUserName={getUserName}
          getUserEmail={getUserEmail}
          getUserStatus={getUserStatus}
          updateUserRole={updateUserRole}
          deleteUser={deleteUser}
        />
      </div>
    </div>
  );
}

export default UserManagement;
