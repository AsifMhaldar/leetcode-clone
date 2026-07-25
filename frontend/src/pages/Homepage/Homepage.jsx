import React from 'react';
import { useHomepage } from './hooks/useHomepage';
import HomepageHeader from './components/HomepageHeader';
import StatsSection from './components/StatsSection';
import FiltersSection from './components/FiltersSection';
import ProblemsList from './components/ProblemsList';

function Homepage() {
  const {
    user,
    solvedProblems,
    searchTerm,
    setSearchTerm,
    filters,
    updateFilter,
    loading,
    handleLogout,
    filteredProblems,
    stats
  } = useHomepage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <HomepageHeader user={user} onLogout={handleLogout} />

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

        <StatsSection stats={stats} />

        <FiltersSection
          filters={filters}
          updateFilter={updateFilter}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredCount={filteredProblems.length}
          totalCount={stats.total}
        />

        <ProblemsList
          loading={loading}
          filteredProblems={filteredProblems}
          solvedProblems={solvedProblems}
          searchTerm={searchTerm}
          filters={filters}
        />
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out both;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out both;
        }
      `}</style>
    </div>
  );
}

export default Homepage;
