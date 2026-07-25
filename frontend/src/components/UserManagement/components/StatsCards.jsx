import React from 'react';
import { User, Shield, Star, Crown } from 'lucide-react';

const StatsCards = ({ users, getUserStatus }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-white mb-2">{users.length}</div>
            <div className="text-gray-400">Total Users</div>
          </div>
          <div className="p-3 bg-blue-500/20 rounded-lg">
            <User className="w-6 h-6 text-blue-400" />
          </div>
        </div>
      </div>
      <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-white mb-2">
              {users.filter(u => u.role === 'admin').length}
            </div>
            <div className="text-gray-400">Administrators</div>
          </div>
          <div className="p-3 bg-red-500/20 rounded-lg">
            <Shield className="w-6 h-6 text-red-400" />
          </div>
        </div>
      </div>
      <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-white mb-2">
              {users.filter(u => getUserStatus(u) === 'active').length}
            </div>
            <div className="text-gray-400">Active Users</div>
          </div>
          <div className="p-3 bg-green-500/20 rounded-lg">
            <Star className="w-6 h-6 text-green-400" />
          </div>
        </div>
      </div>
      <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-white mb-2">
              {users.reduce((total, user) => total + (user.problemsSolvedCount || 0), 0)}
            </div>
            <div className="text-gray-400">Total Solutions</div>
          </div>
          <div className="p-3 bg-purple-500/20 rounded-lg">
            <Crown className="w-6 h-6 text-purple-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
