import React from 'react';
import { 
  Users, Code, TrendingUp, TrendingDown, 
  Clock, Award, Activity, Target
} from 'lucide-react';

const OverviewCards = ({ overview }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
      <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <Users className="w-8 h-8 text-blue-400" />
          <TrendingUp className="w-5 h-5 text-green-400" />
        </div>
        <div className="text-2xl font-bold text-white mb-1">{overview.totalUsers.toLocaleString()}</div>
        <div className="text-gray-400 text-sm">Total Users</div>
        <div className="text-green-400 text-xs mt-2">+12% from last month</div>
      </div>

      <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <Activity className="w-8 h-8 text-green-400" />
          <TrendingUp className="w-5 h-5 text-green-400" />
        </div>
        <div className="text-2xl font-bold text-white mb-1">{overview.activeUsers.toLocaleString()}</div>
        <div className="text-gray-400 text-sm">Active Users</div>
        <div className="text-green-400 text-xs mt-2">+8% from last month</div>
      </div>

      <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <Code className="w-8 h-8 text-purple-400" />
          <TrendingUp className="w-5 h-5 text-green-400" />
        </div>
        <div className="text-2xl font-bold text-white mb-1">{overview.totalSubmissions.toLocaleString()}</div>
        <div className="text-gray-400 text-sm">Total Submissions</div>
        <div className="text-green-400 text-xs mt-2">+23% from last month</div>
      </div>

      <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <Target className="w-8 h-8 text-yellow-400" />
          <TrendingUp className="w-5 h-5 text-green-400" />
        </div>
        <div className="text-2xl font-bold text-white mb-1">{overview.successRate}%</div>
        <div className="text-gray-400 text-sm">Success Rate</div>
        <div className="text-green-400 text-xs mt-2">+5% from last month</div>
      </div>

      <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <Clock className="w-8 h-8 text-orange-400" />
          <TrendingDown className="w-5 h-5 text-red-400" />
        </div>
        <div className="text-2xl font-bold text-white mb-1">{overview.avgCompletionTime}</div>
        <div className="text-gray-400 text-sm">Avg. Time</div>
        <div className="text-red-400 text-xs mt-2">-2% from last month</div>
      </div>

      <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <Award className="w-8 h-8 text-red-400" />
          <TrendingUp className="w-5 h-5 text-green-400" />
        </div>
        <div className="text-2xl font-bold text-white mb-1">{overview.popularLanguage}</div>
        <div className="text-gray-400 text-sm">Top Language</div>
        <div className="text-green-400 text-xs mt-2">Most used</div>
      </div>
    </div>
  );
};

export default OverviewCards;
