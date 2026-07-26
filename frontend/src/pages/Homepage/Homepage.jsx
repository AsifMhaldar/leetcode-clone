import React from 'react';
import { useHomepage } from './hooks/useHomepage';
import HomepageHeader from './components/HomepageHeader';
import StatsSection from './components/StatsSection';
import FiltersSection from './components/FiltersSection';
import ProblemsList from './components/ProblemsList';
import { motion } from 'framer-motion';
import { WELCOME_TITLE, WELCOME_SUBTITLE } from './constants';
import './Homepage.scss';

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
    <div className="page-bg homepage">
      <HomepageHeader user={user} onLogout={handleLogout} />

      {/* Main Content */}
      <div className="container mx-auto px-20 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="homepage__welcome"
        >
          <h1 className="homepage__title">
            {WELCOME_TITLE}
          </h1>
          <p className="homepage__subtitle">
            {WELCOME_SUBTITLE}
          </p>
        </motion.div>

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
    </div>
  );
}

export default Homepage;
