import { Link } from 'react-router-dom';
import { ChevronRight, Sparkles, Trophy } from 'lucide-react';
import { NAVIGATION_SECTIONS, SIDEBAR_TITLE, SIDEBAR_PROMO } from '../constants';
import './Sidebar.scss';

const Sidebar = ({ location }) => {
  return (
    <div className="sidebar">
      <div className="sidebar__inner">
        <div>
          <h2 className="sidebar__title">
            <span className="sidebar__title-gradient">{SIDEBAR_TITLE}</span>
            <Sparkles className="w-5 h-5 ml-2 text-yellow-500" />
          </h2>
          <div className="sidebar__nav">
            {NAVIGATION_SECTIONS.map((section) => (
              <Link
                key={section.id}
                to={section.path}
                className={`sidebar__link ${location.pathname === section.path ? 'sidebar__link--active' : ''}`}
              >
                <div className={`sidebar__link-icon bg-gradient-to-r ${section.color}`}>
                  {section.icon}
                </div>
                <span className={`sidebar__link-label ${location.pathname === section.path ? 'sidebar__link-label--active' : 'sidebar__link-label--inactive'}`}>
                  {section.label}
                </span>
                <ChevronRight className={`sidebar__link-chevron ${location.pathname === section.path ? 'sidebar__link-chevron--active' : ''}`} />
              </Link>
            ))}
          </div>
        </div>

        <div className="sidebar__promo">
          <div className="sidebar__promo-header">
            <div className="sidebar__promo-icon">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="sidebar__promo-title">{SIDEBAR_PROMO.title}</h3>
              <p className="sidebar__promo-desc">{SIDEBAR_PROMO.description}</p>
            </div>
          </div>
          <Link to={SIDEBAR_PROMO.buttonPath} className="sidebar__promo-btn">{SIDEBAR_PROMO.buttonLabel}</Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
