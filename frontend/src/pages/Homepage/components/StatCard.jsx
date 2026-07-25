import React from 'react';

const StatCard = ({ title, value, gradient, icon }) => (
  <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 group">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-white/60 text-sm font-medium mb-1">{title}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
      <div className={`text-2xl p-3 rounded-lg bg-gradient-to-r ${gradient} group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
    </div>
  </div>
);

export default StatCard;
