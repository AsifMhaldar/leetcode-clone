import React from 'react';

const PerformanceMetrics = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
        <div className="text-2xl font-bold text-white mb-2">{metrics.dailySubmissions}</div>
        <div className="text-gray-400 text-sm">Daily Submissions</div>
      </div>
      <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
        <div className="text-2xl font-bold text-white mb-2">{metrics.weeklySubmissions.toLocaleString()}</div>
        <div className="text-gray-400 text-sm">Weekly Submissions</div>
      </div>
      <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
        <div className="text-2xl font-bold text-white mb-2">{metrics.monthlySubmissions.toLocaleString()}</div>
        <div className="text-gray-400 text-sm">Monthly Submissions</div>
      </div>
      <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
        <div className="text-2xl font-bold text-white mb-2">{metrics.peakHours}</div>
        <div className="text-gray-400 text-sm">Peak Activity Hours</div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;
