import React from 'react';
import { Eye } from 'lucide-react';

const ActivitySection = ({ difficultyDistribution, recentActivity }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Difficulty Distribution */}
      <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-6">Difficulty Distribution</h3>
        <div className="space-y-4">
          {difficultyDistribution.map((diff, index) => (
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
          {recentActivity.map((activity, index) => (
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
  );
};

export default ActivitySection;
