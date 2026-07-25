import React from 'react';
import { LineChart, PieChart } from 'lucide-react';

const ChartsGrid = ({ userGrowth, submissionStats }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* User Growth Chart */}
      <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">User Growth</h3>
          <LineChart className="w-5 h-5 text-blue-400" />
        </div>
        <div className="h-64 flex items-end justify-between space-x-2">
          {userGrowth.map((item, index) => (
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
          {submissionStats.map((lang, index) => (
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
  );
};

export default ChartsGrid;
