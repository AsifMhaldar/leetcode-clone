import React from 'react';
import { NavLink } from 'react-router';
import { Code2 } from 'lucide-react';
import { adminOptions } from '../utils/adminData';

const AdminOptionsGrid = () => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white mb-6">Management Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminOptions.map((option, index) => {
          const IconComponent = option.icon;
          return (
            <NavLink
              key={option.id}
              to={option.route}
              className="block group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl h-full">
                {/* Icon with Gradient Background */}
                <div className={`w-16 h-16 bg-gradient-to-r ${option.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent size={28} className="text-white" />
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                  {option.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {option.description}
                </p>
                
                {/* Action Indicator */}
                <div className="flex items-center justify-between">
                  <span className="text-blue-400 text-sm font-medium group-hover:translate-x-2 transition-transform duration-300">
                    Manage →
                  </span>
                  <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-blue-500/20 transition-colors duration-300">
                    <Code2 size={16} className="text-gray-400 group-hover:text-blue-400" />
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

export default AdminOptionsGrid;
