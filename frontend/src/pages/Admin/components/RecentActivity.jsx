import React from 'react';
import { Plus, Edit, Users, Video } from 'lucide-react';
import { recentActivity } from '../utils/adminData';

const activityIconMap = {
  create: { icon: Plus, styles: 'bg-green-500/20 text-green-400' },
  user: { icon: Users, styles: 'bg-blue-500/20 text-blue-400' },
  update: { icon: Edit, styles: 'bg-yellow-500/20 text-yellow-400' },
  video: { icon: Video, styles: 'bg-purple-500/20 text-purple-400' }
};

const RecentActivity = () => {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
      <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
      <div className="space-y-4">
        {recentActivity.map((activity, index) => {
          const { icon: IconComponent, styles } = activityIconMap[activity.type] || activityIconMap.video;
          return (
            <div key={index} className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg border border-white/5 hover:border-white/10 transition-colors duration-200">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${styles}`}>
                <IconComponent size={20} />
              </div>
              <div className="flex-1">
                <p className="text-white font-medium">{activity.action}</p>
                <p className="text-gray-400 text-sm">by {activity.user}</p>
              </div>
              <div className="text-gray-400 text-sm">{activity.time}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;
