import React from 'react';
import { BarChart3 } from 'lucide-react';
import { stats } from '../utils/adminData';

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {stats.map((stat) => (
        <div 
          key={stat.label}
          className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-lg ${
              stat.trend === 'up' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            } group-hover:scale-110 transition-transform duration-300`}>
              <BarChart3 size={20} />
            </div>
          </div>
          <div className={`flex items-center space-x-1 mt-2 text-sm ${
            stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
          }`}>
            <span>{stat.change}</span>
            <span>this month</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
