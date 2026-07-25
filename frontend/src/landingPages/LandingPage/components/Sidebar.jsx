import { Link } from 'react-router-dom';
import { ChevronRight, Sparkles, Trophy } from 'lucide-react';
import navigationSections from '../data/navigationSections';

const Sidebar = ({ location }) => {
  return (
    <div className="hidden lg:block w-72 flex-shrink-0">
      <div className="sticky top-28 bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Learning Paths
            </span>
            <Sparkles className="w-5 h-5 ml-2 text-yellow-500" />
          </h2>
          <div className="space-y-2">
            {navigationSections.map((section) => (
              <Link
                key={section.id}
                to={section.path}
                className={`w-full flex items-center space-x-4 px-5 py-4 rounded-xl transition-all duration-300 group ${
                  location.pathname === section.path 
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 shadow-md' 
                    : 'hover:bg-gray-50 hover:shadow-sm'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${section.color} flex items-center justify-center`}>
                  {section.icon}
                </div>
                <span className={`font-semibold ${location.pathname === section.path ? 'text-blue-600' : 'text-gray-700'}`}>
                  {section.label}
                </span>
                <ChevronRight className={`w-4 h-4 ml-auto transition-transform ${
                  location.pathname === section.path ? 'text-blue-500' : 'text-gray-400 group-hover:translate-x-1'
                }`} />
              </Link>
            ))}
          </div>
        </div>

        {/* Promo Card */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Pro Member</h3>
              <p className="text-sm text-gray-600">Unlock all features</p>
            </div>
          </div>
          <Link
            to="/signup"
            className="block w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-center py-3 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all"
          >
            Upgrade Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
