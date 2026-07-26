import { Link } from 'react-router-dom';
import { Code, Menu, X } from 'lucide-react';
import ThemeToggle from '../../../components/ThemeToggle';
import { BRAND_NAME, NAV_LINKS, AUTH_LINKS } from '../constants';
import './StickyNav.scss';

const StickyNav = ({ isSidebarOpen, setIsSidebarOpen, scrolled }) => {
  return (
    <nav className={`sticky-nav ${scrolled ? 'sticky-nav--scrolled' : 'sticky-nav--transparent'}`}>
      <div className="sticky-nav__container">
        <div className="sticky-nav__inner">
          <Link to="/" className="sticky-nav__logo">
            <div className="sticky-nav__logo-icon">
              <Code className="w-4 h-4 text-white" />
            </div>
            <span className="sticky-nav__logo-text">{BRAND_NAME}</span>
          </Link>

          <div className="sticky-nav__links">
            {NAV_LINKS.map((link) => (
              <Link key={link.path} to={link.path} className="sticky-nav__link">{link.label}</Link>
            ))}

            <div className="sticky-nav__actions">
              <ThemeToggle />
              <Link to={AUTH_LINKS.login.path} className="sticky-nav__login">{AUTH_LINKS.login.label}</Link>
              <Link to={AUTH_LINKS.signup.path} className="sticky-nav__signup">{AUTH_LINKS.signup.label}</Link>
            </div>
          </div>

          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="sticky-nav__mobile-btn"
          >
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default StickyNav;
