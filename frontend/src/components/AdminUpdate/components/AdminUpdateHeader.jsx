import React from 'react';
import { Edit, RefreshCw, Home } from 'lucide-react';
import { NavLink } from 'react-router';
import { HEADER_BRAND_TITLE, HEADER_BRAND_SUBTITLE, HEADER_REFRESH_TEXT, HEADER_BACK_TEXT } from '../constants';
import './AdminUpdateHeader.scss';

const AdminUpdateHeader = ({ fetchProblems, loading }) => {
  return (
    <nav className="admin-nav">
      <div className="admin-nav__inner">
        <div className="admin-nav__brand">
          <div className="admin-nav__icon">
            <Edit className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-theme-primary">{HEADER_BRAND_TITLE}</h1>
            <p className="text-sm text-theme-muted">{HEADER_BRAND_SUBTITLE}</p>
          </div>
        </div>
        
        <div className="admin-nav__actions">
          <button
            onClick={fetchProblems}
            disabled={loading}
            className="admin-nav__btn"
          >
            <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
            <span>{HEADER_REFRESH_TEXT}</span>
          </button>
          <NavLink 
            to="/admin" 
            className="admin-nav__link"
          >
            <Home size={20} />
            <span>{HEADER_BACK_TEXT}</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default AdminUpdateHeader;
