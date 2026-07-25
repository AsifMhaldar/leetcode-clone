export const analyticsData = {
  overview: {
    totalUsers: 2456,
    activeUsers: 1842,
    totalSubmissions: 45234,
    successRate: 68.5,
    avgCompletionTime: '12.4min',
    popularLanguage: 'JavaScript'
  },
  userGrowth: [
    { date: 'Jan', users: 1200 },
    { date: 'Feb', users: 1450 },
    { date: 'Mar', users: 1630 },
    { date: 'Apr', users: 1890 },
    { date: 'May', users: 2150 },
    { date: 'Jun', users: 2456 }
  ],
  submissionStats: [
    { language: 'JavaScript', count: 15600, percentage: 34.5 },
    { language: 'Python', count: 12800, percentage: 28.3 },
    { language: 'Java', count: 8900, percentage: 19.7 },
    { language: 'C++', count: 5600, percentage: 12.4 },
    { language: 'Others', count: 2334, percentage: 5.1 }
  ],
  difficultyDistribution: [
    { difficulty: 'Easy', count: 15600, percentage: 45 },
    { difficulty: 'Medium', count: 12800, percentage: 37 },
    { difficulty: 'Hard', count: 6200, percentage: 18 }
  ],
  recentActivity: [
    { user: 'John Doe', action: 'Solved "Two Sum"', time: '2 min ago', difficulty: 'Easy' },
    { user: 'Alice Smith', action: 'Solved "Binary Tree"', time: '5 min ago', difficulty: 'Medium' },
    { user: 'Bob Wilson', action: 'Failed "Sudoku Solver"', time: '8 min ago', difficulty: 'Hard' },
    { user: 'Carol Johnson', action: 'Completed daily challenge', time: '12 min ago', difficulty: 'Medium' }
  ],
  performanceMetrics: {
    dailySubmissions: 342,
    weeklySubmissions: 2394,
    monthlySubmissions: 10234,
    peakHours: '14:00 - 16:00'
  }
};
