import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import navigationSections from '../data/navigationSections';

const MobileSidebar = ({ isSidebarOpen, setIsSidebarOpen, location }) => {
  if (!isSidebarOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden animate-fadeIn">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={() => setIsSidebarOpen(false)} 
      />
      <div className="absolute left-0 top-0 bottom-0 w-80 bg-white shadow-2xl p-6 overflow-y-auto animate-slideIn">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Navigation</h2>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-2">
          {navigationSections.map((section) => (
            <Link
              key={section.id}
              to={section.path}
              onClick={() => setIsSidebarOpen(false)}
              className={`w-full flex items-center space-x-4 px-5 py-4 rounded-xl transition-all ${
                location.pathname === section.path 
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${section.color} flex items-center justify-center`}>
                {section.icon}
              </div>
              <span className="font-semibold text-gray-700">{section.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
