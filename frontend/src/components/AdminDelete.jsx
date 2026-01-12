import { useEffect, useState } from 'react';
import axiosClient from '../utils/axiosClient';
import { Trash2, Search, Filter, AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { NavLink } from 'react-router';

const AdminDelete = () => {
  const [problems, setProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [deleteLoading, setDeleteLoading] = useState(null);

  useEffect(() => {
    fetchProblems();
  }, []);

  useEffect(() => {
    filterProblems();
  }, [problems, searchTerm, difficultyFilter]);

  const fetchProblems = async () => {
    try {
      setLoading(true);
      const { data } = await axiosClient.get('/problem/getAllProblem');
      setProblems(data);
    } catch (err) {
      setError('Failed to fetch problems');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filterProblems = () => {
    let filtered = problems;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(problem =>
        problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        problem.tags.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply difficulty filter
    if (difficultyFilter !== 'all') {
      filtered = filtered.filter(problem =>
        problem.difficulty.toLowerCase() === difficultyFilter.toLowerCase()
      );
    }

    setFilteredProblems(filtered);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this problem? This action cannot be undone.')) return;
    
    try {
      setDeleteLoading(id);
      await axiosClient.delete(`/problem/delete/${id}`);
      setProblems(problems.filter(problem => problem._id !== id));
    } catch (err) {
      setError('Failed to delete problem');
      console.error(err);
    } finally {
      setDeleteLoading(null);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'text-green-400 border-green-400/20 bg-green-400/10';
      case 'medium': return 'text-yellow-400 border-yellow-400/20 bg-yellow-400/10';
      case 'hard': return 'text-red-400 border-red-400/20 bg-red-400/10';
      default: return 'text-gray-400 border-gray-400/20 bg-gray-400/10';
    }
  };

  const getTagColor = (tag) => {
    switch (tag?.toLowerCase()) {
      case 'array': return 'text-blue-400 border-blue-400/20 bg-blue-400/10';
      case 'linkedlist': return 'text-purple-400 border-purple-400/20 bg-purple-400/10';
      case 'graph': return 'text-cyan-400 border-cyan-400/20 bg-cyan-400/10';
      case 'dp': return 'text-orange-400 border-orange-400/20 bg-orange-400/10';
      default: return 'text-gray-400 border-gray-400/20 bg-gray-400/10';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg">Loading problems...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="bg-red-500/20 border border-red-500/30 rounded-2xl p-8 max-w-md text-center">
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Error</h3>
          <p className="text-gray-300 mb-4">{error}</p>
          <button
            onClick={fetchProblems}
            className="bg-red-500/20 text-red-400 border border-red-500/30 px-6 py-2 rounded-lg hover:bg-red-500/30 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation Header */}
      <nav className="bg-white/5 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
                <Trash2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Delete Problems</h1>
                <p className="text-sm text-gray-400">Admin Panel</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={fetchProblems}
                disabled={loading}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 disabled:opacity-50"
              >
                <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
                <span>Refresh</span>
              </button>
              <NavLink 
                to="/admin" 
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
              >
                <Home size={20} />
                <span>Back to Admin</span>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent pb-2">
            Manage Problems
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Review and delete coding problems from the platform
          </p>
        </div>

        {/* Stats and Filters */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-2xl mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{problems.length}</p>
                <p className="text-gray-400 text-sm">Total Problems</p>
              </div>
              <div className="h-8 w-px bg-white/20"></div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{filteredProblems.length}</p>
                <p className="text-gray-400 text-sm">Filtered</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 flex-1 max-w-2xl">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search problems by title or tag..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              {/* Difficulty Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                  className="pl-10 pr-8 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none"
                >
                  <option value="all" className="bg-slate-800">All Difficulties</option>
                  <option value="easy" className="bg-slate-800">Easy</option>
                  <option value="medium" className="bg-slate-800">Medium</option>
                  <option value="hard" className="bg-slate-800">Hard</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Problems List */}
        <div className="space-y-4">
          {filteredProblems.length === 0 ? (
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-12 border border-white/10 text-center">
              <AlertTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No Problems Found</h3>
              <p className="text-gray-400">
                {searchTerm || difficultyFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'No problems available in the system'
                }
              </p>
            </div>
          ) : (
            filteredProblems.map((problem, index) => (
              <div
                key={problem._id}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-red-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                          {problem.title}
                        </h3>
                        <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                          {problem.description}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <span className={`px-3 py-1 mt-6 rounded-full text-sm font-medium border ${getDifficultyColor(problem.difficulty)}`}>
                          {problem.difficulty}
                        </span>
                        <span className={`px-3 py-1 mt-6 rounded-full text-sm font-medium border ${getTagColor(problem.tags)}`}>
                          {problem.tags}
                        </span>
                      </div>
                    </div>

                    {/* Problem Metadata */}
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>ID: {problem._id}</span>
                      {problem.createdAt && (
                        <span>Created: {new Date(problem.createdAt).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>

                  {/* Delete Button */}
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => handleDelete(problem._id)}
                      disabled={deleteLoading === problem._id}
                      className="flex items-center space-x-2 bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-1 rounded-xl hover:bg-red-500/30 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {deleteLoading === problem._id ? (
                        <>
                          <div className="w-4 h-2 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin"></div>
                          <span>Deleting...</span>
                        </>
                      ) : (
                        <>
                          <Trash2 size={18} />
                          <span>Delete</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Warning Banner */}
        {filteredProblems.length > 0 && (
          <div className="mt-8 bg-yellow-500/20 border border-yellow-500/30 rounded-2xl p-6">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-yellow-400 mb-1">Warning</h4>
                <p className="text-yellow-300/80 text-sm">
                  Deleting a problem will permanently remove it from the platform. This action cannot be undone and will affect all users.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out both;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default AdminDelete; 