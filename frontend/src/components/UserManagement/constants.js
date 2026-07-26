export const PAGE_TITLE = 'User Management';
export const PAGE_SUBTITLE = 'Manage user accounts, roles, and permissions';
export const LOADING_TEXT = 'Loading users...';

export const ROLE_CONFIGS = {
  admin: { cssClass: 'users-table__select--admin', label: 'Admin' },
  user: { cssClass: 'users-table__select--user', label: 'User' },
};

export const STATUS_CONFIGS = {
  active: { cssClass: 'users-table__status--active', label: 'Online' },
  inactive: { cssClass: 'users-table__status--inactive', label: 'Offline' },
};

export const TABLE_COLUMNS = [
  { key: 'user', label: 'User', sortable: false },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'status', label: 'Status', sortable: false },
  { key: 'problemsSolvedCount', label: 'Solved', sortable: true },
  { key: 'totalSubmissions', label: 'Submissions', sortable: true },
  { key: 'acceptanceRate', label: 'Acceptance', sortable: true },
  { key: 'createdAt', label: 'Joined', sortable: true },
  { key: 'lastActive', label: 'Last Active', sortable: true },
  { key: 'actions', label: 'Actions', sortable: false },
];

export const STAT_LABELS = {
  totalUsers: 'Total Users',
  administrators: 'Administrators',
  activeUsers: 'Active Users',
  totalSolutions: 'Total Solutions',
};

export const ROLE_FILTER_OPTIONS = [
  { value: 'all', label: 'All Roles' },
  { value: 'admin', label: 'Admin' },
  { value: 'user', label: 'User' },
];

export const SORT_OPTIONS = [
  { value: 'createdAt', label: 'Date Joined' },
  { value: 'firstName', label: 'Name' },
  { value: 'emailId', label: 'Email' },
];

export const SEARCH_PLACEHOLDER = 'Search users by name or email...';
export const REFRESH_BUTTON = 'Refresh';
export const DELETE_TOOLTIP = 'Delete User';
export const NO_USERS_FOUND = 'No users found';
export const NO_USERS_DESC = 'Try adjusting your search or filter criteria';
export const EMPTY_STATE_TITLE = 'No data yet';
export const EMPTY_STATE_DESC = 'Users will appear here once they register';
