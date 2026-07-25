import React from 'react';
import { Code } from 'lucide-react';
import { difficultyColors } from '../utils/profileUtils';

const RecentActivity = ({ recentSubmissions }) => {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-2xl">
      <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
      
      <div className="space-y-3">
        {recentSubmissions.length > 0 ? (
          recentSubmissions.map((submission, index) => (
            <div key={index} className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg transition-colors duration-200">
              <div className="flex-1">
                <div className="text-white font-medium text-sm">{submission.title}</div>
                <div className="text-gray-400 text-xs">{submission.time}</div>
              </div>
              <div className={`text-xs font-medium ${difficultyColors[submission.difficulty]}`}>
                {submission.difficulty}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-400">
            <Code className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <div className="text-sm">No recent activity</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
