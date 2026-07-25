import React from 'react';
import { Download } from 'lucide-react';

const AnalyticsHeader = ({ timeRange, onTimeRangeChange }) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Platform Analytics</h1>
        <p className="text-gray-400">Demo analytics dashboard with sample data</p>
      </div>
      
      <div className="flex gap-4 mt-4 lg:mt-0">
        <select
          value={timeRange}
          onChange={(e) => onTimeRangeChange(e.target.value)}
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
  );
};

export default AnalyticsHeader;
