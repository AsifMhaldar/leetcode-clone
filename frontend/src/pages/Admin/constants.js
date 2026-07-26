import { Plus, Edit, Trash2, Video, Users, BarChart3 } from 'lucide-react';

export const ADMIN_DASHBOARD_TITLE = 'Admin Dashboard';
export const ADMIN_DASHBOARD_SUBTITLE = 'Manage your coding platform, create challenges, and track performance metrics';

export const ADMIN_PANEL_TITLE = 'Admin Panel';
export const ADMIN_PLATFORM_MANAGEMENT = 'Platform Management';
export const ADMIN_BACK_TO_HOME = 'Back to Home';

export const MANAGEMENT_TOOLS_TITLE = 'Management Tools';
export const MANAGE_LINK_TEXT = 'Manage →';

export const QUICK_ACTIONS_TITLE = 'Quick Actions';

export const RECENT_ACTIVITY_TITLE = 'Recent Activity';

export const STATS_MONTH_SUFFIX = 'this month';

export const activityIconMap = {
  create: Plus,
  user: Users,
  update: Edit,
  video: Video
};

export const adminOptions = [
  {
    id: 'create',
    title: 'Create Problem',
    description: 'Add a new coding challenge with test cases and solutions',
    icon: Plus,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
    route: '/admin/create'
  },
  {
    id: 'update',
    title: 'Update Problem',
    description: 'Edit existing problems, test cases, and descriptions',
    icon: Edit,
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/20',
    route: '/admin/update'
  },
  {
    id: 'delete',
    title: 'Delete Problem',
    description: 'Remove problems and associated data from platform',
    icon: Trash2,
    color: 'from-red-500 to-pink-500',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/20',
    route: '/admin/delete'
  },
  {
    id: 'video',
    title: 'Video Solutions',
    description: 'Upload and manage video explanations for problems',
    icon: Video,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    route: '/admin/video'
  },
  {
    id: 'users',
    title: 'User Management',
    description: 'Manage user accounts, roles, and permissions',
    icon: Users,
    color: 'from-purple-500 to-indigo-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
    route: '/admin/users'
  },
  {
    id: 'analytics',
    title: 'Analytics',
    description: 'View platform statistics and user performance metrics',
    icon: BarChart3,
    color: 'from-indigo-500 to-purple-500',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/20',
    route: '/admin/analytics'
  }
];
