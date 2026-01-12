import React, { useState } from 'react';
import { 
  BarChart3, Users, Code, TrendingUp, TrendingDown, 
  Download, Filter, Calendar, Eye, Clock, Award,
  PieChart, LineChart, Activity, Target, RefreshCw
} from 'lucide-react';

function Analytics() {
  const [timeRange, setTimeRange] = useState('7d');

  // Static demo data
  const analyticsData = {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Platform Analytics</h1>
            <p className="text-gray-400">Demo analytics dashboard with sample data</p>
          </div>
          
          <div className="flex gap-4 mt-4 lg:mt-0">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-black focus:outline-none focus:border-blue-500"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors">
              <Download size={18} />
              Export
            </button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-blue-400" />
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{analyticsData.overview.totalUsers.toLocaleString()}</div>
            <div className="text-gray-400 text-sm">Total Users</div>
            <div className="text-green-400 text-xs mt-2">+12% from last month</div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-green-400" />
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{analyticsData.overview.activeUsers.toLocaleString()}</div>
            <div className="text-gray-400 text-sm">Active Users</div>
            <div className="text-green-400 text-xs mt-2">+8% from last month</div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <Code className="w-8 h-8 text-purple-400" />
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{analyticsData.overview.totalSubmissions.toLocaleString()}</div>
            <div className="text-gray-400 text-sm">Total Submissions</div>
            <div className="text-green-400 text-xs mt-2">+23% from last month</div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <Target className="w-8 h-8 text-yellow-400" />
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{analyticsData.overview.successRate}%</div>
            <div className="text-gray-400 text-sm">Success Rate</div>
            <div className="text-green-400 text-xs mt-2">+5% from last month</div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-orange-400" />
              <TrendingDown className="w-5 h-5 text-red-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{analyticsData.overview.avgCompletionTime}</div>
            <div className="text-gray-400 text-sm">Avg. Time</div>
            <div className="text-red-400 text-xs mt-2">-2% from last month</div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <Award className="w-8 h-8 text-red-400" />
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{analyticsData.overview.popularLanguage}</div>
            <div className="text-gray-400 text-sm">Top Language</div>
            <div className="text-green-400 text-xs mt-2">Most used</div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* User Growth Chart */}
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">User Growth</h3>
              <LineChart className="w-5 h-5 text-blue-400" />
            </div>
            <div className="h-64 flex items-end justify-between space-x-2">
              {analyticsData.userGrowth.map((item, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full bg-gradient-to-t from-blue-500 to-blue-600 rounded-t-lg transition-all duration-300 hover:opacity-80"
                    style={{ height: `${(item.users / 2500) * 100}%` }}
                  ></div>
                  <div className="text-gray-400 text-xs mt-2">{item.date}</div>
                  <div className="text-white text-sm font-medium">{item.users}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Language Distribution */}
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Language Distribution</h3>
              <PieChart className="w-5 h-5 text-green-400" />
            </div>
            <div className="space-y-4">
              {analyticsData.submissionStats.map((lang, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: 
                          index === 0 ? '#3b82f6' :
                          index === 1 ? '#10b981' :
                          index === 2 ? '#f59e0b' :
                          index === 3 ? '#ef4444' : '#8b5cf6'
                      }}
                    ></div>
                    <span className="text-white text-sm">{lang.language}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                        style={{ width: `${lang.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-gray-400 text-sm w-12 text-right">{lang.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="text-2xl font-bold text-white mb-2">{analyticsData.performanceMetrics.dailySubmissions}</div>
            <div className="text-gray-400 text-sm">Daily Submissions</div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="text-2xl font-bold text-white mb-2">{analyticsData.performanceMetrics.weeklySubmissions.toLocaleString()}</div>
            <div className="text-gray-400 text-sm">Weekly Submissions</div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="text-2xl font-bold text-white mb-2">{analyticsData.performanceMetrics.monthlySubmissions.toLocaleString()}</div>
            <div className="text-gray-400 text-sm">Monthly Submissions</div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="text-2xl font-bold text-white mb-2">{analyticsData.performanceMetrics.peakHours}</div>
            <div className="text-gray-400 text-sm">Peak Activity Hours</div>
          </div>
        </div>

        {/* Difficulty Distribution & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Difficulty Distribution */}
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-6">Difficulty Distribution</h3>
            <div className="space-y-4">
              {analyticsData.difficultyDistribution.map((diff, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className={`w-3 h-3 rounded-full ${
                        diff.difficulty === 'Easy' ? 'bg-green-500' :
                        diff.difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                    ></div>
                    <span className="text-white text-sm">{diff.difficulty}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          diff.difficulty === 'Easy' ? 'bg-green-500' :
                          diff.difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${diff.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-gray-400 text-sm w-12 text-right">{diff.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {analyticsData.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                    activity.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    <Eye size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{activity.user}</p>
                    <p className="text-gray-400 text-xs">{activity.action}</p>
                  </div>
                  <div className="text-gray-400 text-xs">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;