import React from 'react';
import { NavLink } from 'react-router';
import { Home } from 'lucide-react';

const AdminPageHeader = ({
  icon: Icon,
  title,
  subtitle,
  gradient = 'from-blue-500 to-purple-600',
  actions = [],
  backTo,
  backLabel = 'Back to Admin',
}) => {
  return (
    <nav className="admin-page-header">
      <div className="admin-page-header__inner">
        <div className="flex items-center space-x-3">
          <div className={`admin-page-header__icon bg-gradient-to-r ${gradient}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-theme-primary">{title}</h1>
            {subtitle && <p className="text-sm text-theme-muted">{subtitle}</p>}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {actions.map((action, i) => (
            <button
              key={i}
              onClick={action.onClick}
              disabled={action.disabled}
              className={`admin-page-header__action ${action.loading ? 'animate-spin' : ''}`}
            >
              {action.icon && <action.icon size={20} className={action.loading ? 'animate-spin' : ''} />}
              <span>{action.label}</span>
            </button>
          ))}

          {backTo && (
            <NavLink to={backTo} className="admin-page-header__action">
              <Home size={20} />
              <span>{backLabel}</span>
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AdminPageHeader;
