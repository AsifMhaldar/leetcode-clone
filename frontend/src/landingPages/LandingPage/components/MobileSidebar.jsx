import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { NAVIGATION_SECTIONS, MOBILE_SIDEBAR_TITLE } from '../constants';
import './MobileSidebar.scss';

const MobileSidebar = ({ isSidebarOpen, setIsSidebarOpen, location }) => {
  if (!isSidebarOpen) return null;

  return (
    <div className="mobile-sidebar animate-fadeIn">
      <div className="mobile-sidebar__overlay" onClick={() => setIsSidebarOpen(false)} />
      <div className="mobile-sidebar__panel animate-slideIn">
        <div className="mobile-sidebar__header">
          <h2 className="mobile-sidebar__title">{MOBILE_SIDEBAR_TITLE}</h2>
          <button onClick={() => setIsSidebarOpen(false)} className="mobile-sidebar__close">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="mobile-sidebar__nav">
          {NAVIGATION_SECTIONS.map((section) => (
            <Link
              key={section.id}
              to={section.path}
              onClick={() => setIsSidebarOpen(false)}
              className={`mobile-sidebar__link ${location.pathname === section.path ? 'mobile-sidebar__link--active' : ''}`}
            >
              <div className={`mobile-sidebar__link-icon bg-gradient-to-r ${section.color}`}>
                {section.icon}
              </div>
              <span className="mobile-sidebar__link-label">{section.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
