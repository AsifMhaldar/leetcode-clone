import React from 'react';
import { NavLink } from 'react-router';

const ProfileNav = () => {
  return (
    <nav className="bg-white/5 backdrop-blur-lg border-b border-white/10 shadow-2xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <NavLink to="/home">
              <img src='/src/assets/codifycode2.png' alt="Codify-CODE Logo" className="w-12 h-12 lg:w-20 lg:h-20 rounded-lg" />
            </NavLink>
            <span className="text-lg lg:text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Codify-CODE
            </span>
          </div>
          
          <NavLink 
            to="/home"
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 lg:px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 text-sm lg:text-base"
          >
            Back to Home
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default ProfileNav;
