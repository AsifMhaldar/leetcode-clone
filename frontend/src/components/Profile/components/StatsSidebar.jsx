import React from 'react';
import { Eye, Code, MessageCircle, Star } from 'lucide-react';

const StatItem = ({ icon, label, value }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center space-x-2">
      <div className="text-blue-400">{icon}</div>
      <span className="text-gray-300 text-sm">{label}</span>
    </div>
    <div className="text-right">
      <div className="text-white font-medium">{value}</div>
      <div className="text-gray-400 text-xs">Last week: 0</div>
    </div>
  </div>
);

const StatsSidebar = ({ communityStats, languages }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-2xl">
        <h3 className="text-lg font-semibold text-white mb-4">Community Stats</h3>
        <div className="space-y-4">
          <StatItem icon={<Eye className="w-4 h-4" />} label="Views" value={communityStats.views} />
          <StatItem icon={<Code className="w-4 h-4" />} label="Solutions" value={communityStats.solutions} />
          <StatItem icon={<MessageCircle className="w-4 h-4" />} label="Discuss" value={communityStats.discussions} />
          <StatItem icon={<Star className="w-4 h-4" />} label="Reputation" value={communityStats.reputation} />
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-2xl">
        <h3 className="text-lg font-semibold text-white mb-4">Languages</h3>
        <div className="space-y-3">
          {languages.map((lang, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-white font-medium">{lang.name}</span>
              <span className="text-gray-400 text-sm">{lang.problems} problems solved</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSidebar;
