import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { BREADCRUMB_HOME_LABEL } from '../constants';
import './Breadcrumb.scss';

const Breadcrumb = ({ location, getCurrentSectionLabel }) => {
  return (
    <div className="breadcrumb">
      <nav className="breadcrumb__nav">
        <Link to="/" className="breadcrumb__link">{BREADCRUMB_HOME_LABEL}</Link>
        {location.pathname !== '/' && (
          <>
            <ChevronRight className="w-4 h-4" />
            <span className="breadcrumb__current">{getCurrentSectionLabel()}</span>
          </>
        )}
      </nav>
    </div>
  );
};

export default Breadcrumb;
