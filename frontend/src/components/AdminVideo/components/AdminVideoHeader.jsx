import React from 'react';
import { Video, RefreshCw, Home } from 'lucide-react';
import { NavLink } from 'react-router';

const AdminVideoHeader = ({ onRefresh }) => {
  return (
    <nav className="bg-white/5 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Video className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Video Management</h1>
              <p className="text-sm text-gray-400">Upload and delete video solutions</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={onRefresh}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer"
            >
              <RefreshCw size={20} />
              <span>Refresh</span>
            </button>
            <NavLink 
              to="/admin" 
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
            >
              <Home size={20} />
              <span>Back to Admin</span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminVideoHeader;
