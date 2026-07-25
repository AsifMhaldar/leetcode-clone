import { Link } from 'react-router-dom';
import { Code, Menu, X } from 'lucide-react';

const StickyNav = ({ isSidebarOpen, setIsSidebarOpen, scrolled }) => {
  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Code className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Codify-CODE</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/tutorials" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Tutorials
            </Link>
            <Link to="/exercises" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Exercises
            </Link>
            <Link to="/certifications" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Certifications
            </Link>
            <Link to="/courses" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Courses
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all"
              >
                Sign Up Free
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default StickyNav;
