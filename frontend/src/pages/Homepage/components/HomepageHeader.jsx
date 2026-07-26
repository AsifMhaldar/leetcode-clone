import React from 'react';
import { NavLink } from 'react-router';
import ThemeToggle from '../../../components/ThemeToggle';
import { BRAND_NAME, LOGO_PATH } from '../constants';
import './HomepageHeader.scss';

const HomepageHeader = ({ user, onLogout }) => {
  return (
    <nav className="homepage-header">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2 cursor-pointer">
            <img src={LOGO_PATH} alt={`${BRAND_NAME} Logo`} className="w-20 h-20 rounded-lg" />
            <span className="homepage-header__logo-text">
              {BRAND_NAME}
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <div className="text-right">
              <p className="text-theme-primary font-medium">{user?.firstName}</p>
              <p className="text-sm text-theme-muted">{user?.role}</p>
            </div>
            
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="avatar placeholder cursor-pointer">
                <div className="homepage-header__avatar">
                  <span className="font-bold">{user?.firstName?.charAt(0)}</span>
                </div>
              </div>
              <ul className="dropdown-content menu p-2 homepage-header__dropdown-content w-52 mt-2 space-y-1">
                {user?.role === 'admin' && (
                  <li>
                    <NavLink to="/admin" className="homepage-header__menu-item">
                      Admin Dashboard
                    </NavLink>
                  </li>
                )}
                <li>
                  <NavLink to="/profile" className="homepage-header__menu-item">
                    Profile
                  </NavLink>
                  <button 
                    onClick={onLogout}
                    className="homepage-header__logout"
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
