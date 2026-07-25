import React from 'react';
import { NavLink } from 'react-router';
import { adminOptions } from '../utils/adminData';

const QuickActions = () => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {adminOptions.slice(0, 4).map((option) => {
          const IconComponent = option.icon;
          return (
            <NavLink
              key={option.id}
              to={option.route}
              className="block group"
            >
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 h-full">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${option.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{option.title}</h3>
                    <p className="text-gray-400 text-sm">{option.description}</p>
                  </div>
                </div>
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
