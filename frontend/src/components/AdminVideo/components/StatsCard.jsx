import React from 'react';

const StatsCard = ({ totalProblems }) => {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-2xl mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-white">{totalProblems}</p>
            <p className="text-gray-400 text-sm">Total Problems</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-gray-400 text-sm">Manage your video content</p>
          <p className="text-white font-medium">Upload and delete videos as needed</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
