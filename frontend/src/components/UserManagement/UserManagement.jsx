import React from 'react';
import { useUserManagement } from './hooks/useUserManagement';
import StatsCards from './components/StatsCards';
import SearchControls from './components/SearchControls';
import UsersTable from './components/UsersTable';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { PAGE_TITLE, PAGE_SUBTITLE } from './constants';
import './UserManagement.scss';

function UserManagement() {
  const {
    users,
    isLoading,
    isError,
    error,
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
  } = useUserManagement();

  if (isError && !users.length) {
    return (
      <div className="page-bg flex items-center justify-center">
        <div className="user-mgmt__error-block">
          <AlertTriangle size={40} className="user-mgmt__error-icon" />
          <h2 className="user-mgmt__error-title">Failed to load users</h2>
          <p className="user-mgmt__error-msg">{error || 'An unexpected error occurred'}</p>
          <button onClick={handleRefresh} className="user-mgmt__retry-btn">
            <RefreshCw size={16} />Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-bg p-6">
      <div className="max-w-7xl mx-auto">
        <div className="user-mgmt__header">
          <h1 className="user-mgmt__title">{PAGE_TITLE}</h1>
          <p className="user-mgmt__subtitle">{PAGE_SUBTITLE}</p>
        </div>

        <StatsCards stats={stats} isLoading={isLoading} />

        <SearchControls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          sortField={sortField}
          sortOrder={sortOrder}
          toggleSort={toggleSort}
          onRefresh={handleRefresh}
          isRefreshing={isFetching}
        />

        {isError && (
          <div className="user-mgmt__error">
            <AlertTriangle size={14} />
            {error}
          </div>
        )}

        <UsersTable
          users={users}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          selectAllOnPage={selectAllOnPage}
          currentPage={currentPage}
          pagination={pagination}
          setCurrentPage={setCurrentPage}
          handleUpdateRole={handleUpdateRole}
          handleDeleteUser={handleDeleteUser}
          sortField={sortField}
          sortOrder={sortOrder}
          toggleSort={toggleSort}
          isFetching={isFetching}
          limit={limit}
        />
      </div>
    </div>
  );
}

export default UserManagement;
