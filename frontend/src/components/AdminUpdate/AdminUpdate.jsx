import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useAdminUpdate } from './hooks/useAdminUpdate';
import AdminUpdateHeader from './components/AdminUpdateHeader';
import AdminUpdateFilters from './components/AdminUpdateFilters';
import ProblemCard from './components/ProblemCard';
import GuidelinesBanner from './components/GuidelinesBanner';

function AdminUpdate() {
  const {
    problems,
    filteredProblems,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    difficultyFilter,
    setDifficultyFilter,
    fetchProblems
  } = useAdminUpdate();

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
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
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
      <AdminUpdateHeader fetchProblems={fetchProblems} loading={loading} />

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-4">
            Update Problems
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Edit and modify existing coding problems, test cases, and solutions
          </p>
        </div>

        {/* Stats and Filters */}
        <AdminUpdateFilters
          totalProblems={problems.length}
          filteredProblemsCount={filteredProblems.length}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          difficultyFilter={difficultyFilter}
          setDifficultyFilter={setDifficultyFilter}
        />

        {/* Problems Grid */}
        <div className="grid gap-6">
          {filteredProblems.length === 0 ? (
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-12 border border-white/10 text-center">
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
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
              <ProblemCard
                key={problem._id}
                problem={problem}
                index={index}
              />
            ))
          )}
        </div>

        {/* Information Banner */}
        <GuidelinesBanner />
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
}

export default AdminUpdate;
