import React from 'react';
import { Trash2, ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { ROLE_CONFIGS, STATUS_CONFIGS, TABLE_COLUMNS, DELETE_TOOLTIP, NO_USERS_FOUND, NO_USERS_DESC } from '../constants';
import './UsersTable.scss';

const UsersTable = ({
  users, selectedUsers, setSelectedUsers, selectAllOnPage,
  currentPage, pagination, setCurrentPage,
  handleUpdateRole, handleDeleteUser,
  sortField, sortOrder, toggleSort,
  isFetching, limit,
}) => {
  const getRoleBadge = (role) => ROLE_CONFIGS[role] || ROLE_CONFIGS.user;
  const getStatusBadge = (isActive) => STATUS_CONFIGS[isActive ? 'active' : 'inactive'];

  const startIndex = (currentPage - 1) * limit;
  const showingFrom = startIndex + 1;
  const showingTo = Math.min(startIndex + users.length, pagination.totalCount);

  const getSortIcon = (key) => {
    if (sortField !== key) return <ArrowUpDown size={12} />;
    return sortOrder === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />;
  };

  const formatTimeAgo = (date) => {
    if (!date) return 'Never';
    const now = new Date();
    const diff = now - new Date(date);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 30) return `${days}d ago`;
    return new Date(date).toLocaleDateString();
  };

  if (!isFetching && users.length === 0) {
    return (
      <div className="users-table users-table--empty">
        <div className="users-table__empty">
          <div className="users-table__empty-icon">👥</div>
          <h3 className="users-table__empty-title">{NO_USERS_FOUND}</h3>
          <p className="users-table__empty-desc">{NO_USERS_DESC}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="users-table">
      <div className="users-table__wrap">
        <table className="users-table__table">
          <thead>
            <tr className="users-table__header-row">
              <th className="users-table__th">
                <input
                  type="checkbox"
                  checked={users.length > 0 && selectedUsers.length === users.length}
                  onChange={selectAllOnPage}
                  className="users-table__checkbox"
                />
              </th>
              {TABLE_COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className={`users-table__th ${col.sortable ? 'users-table__th--sortable' : ''}`}
                  onClick={col.sortable ? () => toggleSort(col.key) : undefined}
                >
                  <span className="users-table__th-content">
                    {col.label}
                    {col.sortable && (
                      <span className="users-table__sort-icon">{getSortIcon(col.key)}</span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isFetching && users.length === 0 ? (
              [...Array(5)].map((_, i) => (
                <tr key={`skeleton-${i}`} className="users-table__row users-table__row--skeleton">
                  <td className="users-table__td"><div className="users-table__skeleton-box" /></td>
                  <td className="users-table__td">
                    <div className="users-table__user-cell">
                      <div className="users-table__skeleton-avatar" />
                      <div>
                        <div className="users-table__skeleton-line users-table__skeleton-line--name" />
                        <div className="users-table__skeleton-line users-table__skeleton-line--email" />
                      </div>
                    </div>
                  </td>
                  <td className="users-table__td"><div className="users-table__skeleton-badge" /></td>
                  <td className="users-table__td"><div className="users-table__skeleton-badge" /></td>
                  <td className="users-table__td"><div className="users-table__skeleton-text" /></td>
                  <td className="users-table__td"><div className="users-table__skeleton-text" /></td>
                  <td className="users-table__td"><div className="users-table__skeleton-text" /></td>
                  <td className="users-table__td"><div className="users-table__skeleton-text" /></td>
                  <td className="users-table__td"><div className="users-table__skeleton-box" /></td>
                </tr>
              ))
            ) : (
              users.map((user) => {
                const roleBadge = getRoleBadge(user.role);
                const statusBadge = getStatusBadge(user.isActive);
                const userName = `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.emailId;

                return (
                  <tr key={user._id} className="users-table__row">
                    <td className="users-table__td">
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
                        className="users-table__checkbox"
                      />
                    </td>
                    <td className="users-table__td">
                      <div className="users-table__user-cell">
                        <div className="users-table__avatar">
                          <span className="users-table__avatar-text">
                            {(user.firstName || '?').charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="users-table__name">{userName}</div>
                          <div className="users-table__email">{user.emailId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="users-table__td">
                      <select
                        value={user.role}
                        onChange={(e) => handleUpdateRole(user._id, e.target.value)}
                        className={`users-table__select ${roleBadge.cssClass}`}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="users-table__td">
                      <span className={`users-table__status ${statusBadge.cssClass}`}>
                        {statusBadge.label}
                      </span>
                    </td>
                    <td className="users-table__td">
                      <span className="users-table__metric">{user.problemsSolvedCount || 0}</span>
                    </td>
                    <td className="users-table__td">
                      <span className="users-table__metric">{user.totalSubmissions || 0}</span>
                    </td>
                    <td className="users-table__td">
                      <span className={`users-table__rate ${user.acceptanceRate >= 50 ? 'users-table__rate--good' : user.acceptanceRate > 0 ? 'users-table__rate--mid' : ''}`}>
                        {user.acceptanceRate || 0}%
                      </span>
                    </td>
                    <td className="users-table__td">
                      <span className="users-table__date">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="users-table__td">
                      <span className="users-table__date">{formatTimeAgo(user.lastActive)}</span>
                    </td>
                    <td className="users-table__td">
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="users-table__delete-btn"
                        title={DELETE_TOOLTIP}
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="users-table__pagination">
        <div className="users-table__pagination-info">
          <span>
            Showing {pagination.totalCount > 0 ? showingFrom : 0}–{showingTo} of {pagination.totalCount.toLocaleString()}
          </span>
          <div className="users-table__pagination-btns">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage <= 1}
              className="users-table__page-btn"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="users-table__page-num">
              {currentPage} / {pagination.totalPages || 1}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.totalPages))}
              disabled={currentPage >= pagination.totalPages}
              className="users-table__page-btn"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
