import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Breadcrumb = ({ location, getCurrentSectionLabel }) => {
  return (
    <div className="mb-8">
      <nav className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-4">
        <Link 
          to="/" 
          className="hover:text-blue-600 transition-colors"
        >
          Home
        </Link>
        {location.pathname !== '/' && (
          <>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-semibold">
              {getCurrentSectionLabel()}
            </span>
          </>
        )}
      </nav>
    </div>
  );
};

export default Breadcrumb;
