import React from 'react';
import { Settings, Home } from 'lucide-react';
import { NavLink } from 'react-router';
import ThemeToggle from '../../../components/ThemeToggle';
import { ADMIN_PANEL_TITLE, ADMIN_PLATFORM_MANAGEMENT, ADMIN_BACK_TO_HOME } from '../constants';
import './AdminHeader.scss';

const AdminHeader = () => {
  return (
    <nav className="admin-nav">
      <div className="admin-nav__inner">
        <div className="admin-nav__brand">
          <div className="admin-nav__icon">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-theme-primary">{ADMIN_PANEL_TITLE}</h1>
            <p className="text-sm text-theme-muted">{ADMIN_PLATFORM_MANAGEMENT}</p>
          </div>
        </div>
        
        <div className="admin-nav__actions">
          <ThemeToggle />
          <NavLink 
            to="/" 
            className="admin-nav__link"
          >
            <Home size={20} />
            <span>{ADMIN_BACK_TO_HOME}</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default AdminHeader;
