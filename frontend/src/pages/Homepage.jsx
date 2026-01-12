import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../utils/axiosClient';
import { logoutUser } from '../authSlice';
import { Search, Filter } from 'lucide-react';

function Homepage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    difficulty: 'all',
    tag: 'all',
    status: 'all'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Codify-CODE | Home";
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [problemsRes, solvedRes] = await Promise.all([
          axiosClient.get('/problem/getAllProblem'),
          user ? axiosClient.get('/problem/problemSolvedByUser') : Promise.resolve({ data: [] })
        ]);
        
        setProblems(problemsRes.data);
        setSolvedProblems(solvedRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleLogout = () => {
    dispatch(logoutUser());
    setSolvedProblems([]);
  };

  // Combined filtering function
  const filteredProblems = problems.filter(problem => {
    // Search filter
    const searchMatch = searchTerm === '' || 
      problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      problem.tags.toLowerCase().includes(searchTerm.toLowerCase());

    // Difficulty filter
    const difficultyMatch = filters.difficulty === 'all' || 
      problem.difficulty.toLowerCase() === filters.difficulty.toLowerCase();

    // Tag filter
    const tagMatch = filters.tag === 'all' || 
      problem.tags.toLowerCase() === filters.tag.toLowerCase();

    // Status filter
    const statusMatch = filters.status === 'all' || 
      (filters.status === 'solved' && solvedProblems.some(sp => sp._id === problem._id));

    return searchMatch && difficultyMatch && tagMatch && statusMatch;
  });

  const stats = {
    total: problems.length,
    solved: solvedProblems.length,
    easy: problems.filter(p => p.difficulty.toLowerCase() === 'easy').length,
    medium: problems.filter(p => p.difficulty.toLowerCase() === 'medium').length,
    hard: problems.filter(p => p.difficulty.toLowerCase() === 'hard').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Enhanced Navigation */}
      <nav className="bg-white/5 backdrop-blur-lg border-b border-white/10 shadow-2xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2 cursor-pointer">
              <img src='/src/assets/codifycode2.png' alt="Codify-CODE Logo" className="w-20 h-20 rounded-lg"></img>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Codify-CODE
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-white font-medium">{user?.firstName}</p>
                <p className="text-sm text-gray-400">{user?.role}</p>
              </div>
              
              <div className="dropdown dropdown-end">
                <div tabIndex={0} className="avatar placeholder cursor-pointer hover:scale-110 transition-transform">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full w-10 h-10 flex items-center text-center justify-center">
                    <span className="font-bold">{user?.firstName?.charAt(0)}</span>
                  </div>
                </div>
                <ul className="dropdown-content menu p-2 shadow-2xl bg-white/95 backdrop-blur-lg rounded-box w-52 mt-2 space-y-1 border border-white/20">
                  {user?.role === 'admin' && (
                    <li>
                      <NavLink to="/admin" className="text-gray-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white transition-all duration-200">
                        Admin Dashboard
                      </NavLink>
                    </li>
                  )}
                  <li>

                    <NavLink to="/profile" className="text-gray-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white transition-all duration-200">
                      Profile
                    </NavLink>

                    <button 
                      onClick={handleLogout}
                      className="text-red-600 hover:bg-red-50 transition-all duration-200 font-medium"
                    >
                      Logout
                    </button>
                    
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Welcome to Codify-CODE
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Sharpen your coding skills with our curated collection of programming challenges
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          <StatCard 
            title="Total Problems" 
            value={stats.total} 
            gradient="from-blue-500 to-cyan-500"
            icon="📚"
          />
          <StatCard 
            title="Solved" 
            value={stats.solved} 
            gradient="from-green-500 to-emerald-500"
            icon="✅"
          />
          <StatCard 
            title="Easy" 
            value={stats.easy} 
            gradient="from-emerald-400 to-green-500"
            icon="🟢"
          />
          <StatCard 
            title="Medium" 
            value={stats.medium} 
            gradient="from-yellow-400 to-orange-500"
            icon="🟡"
          />
          <StatCard 
            title="Hard" 
            value={stats.hard} 
            gradient="from-red-500 to-pink-500"
            icon="🔴"
          />
        </div>

        {/* Filters Section */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/10 shadow-2xl">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            <div className="flex flex-wrap gap-4">
              <FilterSelect
                label="Status"
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
                options={[
                  { value: 'all', label: 'All Problems' },
                  { value: 'solved', label: 'Solved Only' }
                ]}
              />
              
              <FilterSelect
                label="Difficulty"
                value={filters.difficulty}
                onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
                options={[
                  { value: 'all', label: 'All Levels' },
                  { value: 'easy', label: 'Easy' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'hard', label: 'Hard' }
                ]}
              />
              
              <FilterSelect
                label="Category"
                value={filters.tag}
                onChange={(e) => setFilters({...filters, tag: e.target.value})}
                options={[
                  { value: 'all', label: 'All Categories' },
                  { value: 'array', label: 'Array' },
                  { value: 'string', label: 'String' },
                  { value: 'linkedList', label: 'Linked List' },
                  { value: 'graph', label: 'Graph' },
                  { value: 'dp', label: 'Dynamic Programming' }
                ]}
              />
            </div>

            {/* Search Input */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute mt-3 left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search problems by title or tag..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full mt-6 pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="text-white/60 text-sm mt-6">
              Showing {filteredProblems.length} of {problems.length} problems
            </div>
          </div>
        </div>

        {/* Problems Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredProblems.map((problem, index) => (
              <ProblemCard
                key={problem._id}
                problem={problem}
                index={index}
                isSolved={solvedProblems.some(sp => sp._id === problem._id)}
              />
            ))}
            
            {filteredProblems.length === 0 && (
              <div className="text-center py-20 text-white/60 text-xl">
                {searchTerm || filters.difficulty !== 'all' || filters.tag !== 'all' || filters.status !== 'all'
                  ? 'No problems found matching your search and filters'
                  : 'No problems available'
                }
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Stat Card Component
const StatCard = ({ title, value, gradient, icon }) => (
  <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 group">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-white/60 text-sm font-medium mb-1">{title}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
      <div className={`text-2xl p-3 rounded-lg bg-gradient-to-r ${gradient} group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
    </div>
  </div>
);

// Filter Select Component
const FilterSelect = ({ label, value, onChange, options }) => (
  <div className="flex flex-col space-y-2">
    <label className="text-white/80 text-sm font-medium">{label}</label>
    <select
      className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:bg-white/15 min-w-[140px]"
      value={value}
      onChange={onChange}
    >
      {options.map(option => (
        <option key={option.value} value={option.value} className="bg-slate-800">
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

// Problem Card Component
const ProblemCard = ({ problem, index, isSolved }) => {
  const difficultyColors = {
    easy: 'from-green-500 to-emerald-500',
    medium: 'from-yellow-500 to-orange-500',
    hard: 'from-red-500 to-pink-500'
  };

  const tagColors = {
    array: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    string: 'bg-green-500/20 text-green-300 border-green-500/30',
    linkedlist: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    graph: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    dp: 'bg-orange-500/20 text-orange-300 border-orange-500/30'
  };

  return (
    <div 
      className="group bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`w-3 h-12 rounded-full bg-gradient-to-b ${difficultyColors[problem.difficulty?.toLowerCase()] || 'from-gray-500 to-gray-700'}`}></div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-xl font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                <NavLink to={`/problem/${problem._id}`}>
                  {problem.title}
                </NavLink>
              </h3>
              
              {isSolved && (
                <div className="flex items-center space-x-1 bg-green-500/20 text-green-300 px-3 py-1 rounded-full border border-green-500/30 animate-pulse">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Solved</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${tagColors[problem.tags?.toLowerCase()] || 'bg-gray-500/20 text-gray-300 border-gray-500/30'}`}>
                {problem.tags}
              </span>
              
              <span className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${difficultyColors[problem.difficulty?.toLowerCase()]} text-white`}>
                {problem.difficulty}
              </span>
            </div>
          </div>
        </div>
        
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <NavLink 
            to={`/problem/${problem._id}`}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            Solve Challenge
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Homepage;