import React from 'react';
import { NavLink } from 'react-router';
import { adminOptions, QUICK_ACTIONS_TITLE } from '../constants';
import './QuickActions.scss';

const QuickActions = () => {
  return (
    <div className="quick-actions">
      <h2 className="quick-actions__title">{QUICK_ACTIONS_TITLE}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {adminOptions.slice(0, 4).map((option) => {
          const IconComponent = option.icon;
          return (
            <NavLink
              key={option.id}
              to={option.route}
              className="block group"
            >
              <div className="quick-actions__card">
                <div className="flex items-center space-x-4">
                  <div className={`quick-actions__icon-wrap ${option.bgColor}`}>
                    <IconComponent size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="quick-actions__card-title">{option.title}</h3>
                    <p className="quick-actions__card-desc">{option.description}</p>
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
