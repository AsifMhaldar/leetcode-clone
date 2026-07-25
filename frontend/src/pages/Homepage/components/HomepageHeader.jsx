import React from 'react';
import { NavLink } from 'react-router';

const HomepageHeader = ({ user, onLogout }) => {
  return (
    <nav className="bg-white/5 backdrop-blur-lg border-b border-white/10 shadow-2xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2 cursor-pointer">
            <img src='/src/assets/codifycode2.png' alt="Codify-CODE Logo" className="w-20 h-20 rounded-lg" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Codify-CODE
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-white font-medium">{user?.firstName}</p>
              <p className="text-sm text-gray-400">{user?.role}</p>
            </div>
            
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="avatar placeholder cursor-pointer hover:scale-110 transition-transform">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full w-10 h-10 flex items-center text-center justify-center">
                  <span className="font-bold">{user?.firstName?.charAt(0)}</span>
                </div>
              </div>
              <ul className="dropdown-content menu p-2 shadow-2xl bg-white/95 backdrop-blur-lg rounded-box w-52 mt-2 space-y-1 border border-white/20">
                {user?.role === 'admin' && (
                  <li>
                    <NavLink to="/admin" className="text-gray-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white transition-all duration-200">
                      Admin Dashboard
                    </NavLink>
                  </li>
                )}
                <li>
                  <NavLink to="/profile" className="text-gray-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white transition-all duration-200">
                    Profile
                  </NavLink>
                  <button 
                    onClick={onLogout}
                    className="text-red-600 hover:bg-red-50 transition-all duration-200 font-medium"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HomepageHeader;
