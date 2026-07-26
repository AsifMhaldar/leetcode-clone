// AnalyticsHeader
export const PAGE_TITLE = 'Platform Analytics';
export const PAGE_SUBTITLE = 'Real-time platform metrics';
export const EXPORT_BUTTON = 'Export';

export const TIME_RANGE_OPTIONS = [
  { value: '24h', label: 'Last 24 Hours' },
  { value: '7d', label: 'Last 7 Days' },
  { value: '30d', label: 'Last 30 Days' },
  { value: '90d', label: 'Last 90 Days' },
];

// OverviewCards
export const OVERVIEW_CARDS = [
  { key: 'totalUsers', label: 'Total Users', icon: 'Users', colorClass: 'blue' },
  { key: 'activeUsers', label: 'Active Users', icon: 'Activity', colorClass: 'green' },
  { key: 'totalSubmissions', label: 'Total Submissions', icon: 'Code', colorClass: 'purple' },
  { key: 'successRate', label: 'Success Rate', icon: 'Target', colorClass: 'yellow', suffix: '%' },
  { key: 'topLanguage', label: 'Top Language', icon: 'Award', colorClass: 'red' },
  { key: 'peakHours', label: 'Peak Hours', icon: 'Clock', colorClass: 'orange' },
];

// ChartsGrid
export const USER_GROWTH_TITLE = 'User Growth (30 Days)';
export const LANGUAGE_DISTRIBUTION_TITLE = 'Language Distribution';
export const CHART_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899'];

// PerformanceMetrics
export const PERFORMANCE_METRIC_LABELS = {
  dailySubmissions: 'Daily Submissions',
  weeklySubmissions: 'Weekly Submissions',
  monthlySubmissions: 'Monthly Submissions',
  peakHours: 'Peak Activity',
};

// ActivitySection
export const DIFFICULTY_DISTRIBUTION_TITLE = 'Problem Difficulty Distribution';
export const RECENT_ACTIVITY_TITLE = 'Recent Activity';
