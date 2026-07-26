import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useAdminUpdate } from './hooks/useAdminUpdate';
import AdminUpdateHeader from './components/AdminUpdateHeader';
import AdminUpdateFilters from './components/AdminUpdateFilters';
import ProblemCard from './components/ProblemCard';
import GuidelinesBanner from './components/GuidelinesBanner';
import {
  PAGE_TITLE, PAGE_SUBTITLE, EMPTY_TITLE, EMPTY_DESC_FILTERED, EMPTY_DESC_DEFAULT,
  LOADING_TEXT, ERROR_TITLE, BTN_TRY_AGAIN
} from './constants';
import './AdminUpdate.scss';

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
      <div className="admin-update flex items-center justify-center">
        <div className="text-center">
          <div className="admin-update__spinner"></div>
          <p className="text-gray-300 text-lg">{LOADING_TEXT}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-update flex items-center justify-center">
        <div className="admin-update__error-card">
          <AlertCircle className="admin-update__error-icon" />
          <h3 className="admin-update__error-title">{ERROR_TITLE}</h3>
          <p className="text-gray-300 mb-4">{error}</p>
          <button
            onClick={fetchProblems}
            className="admin-update__retry-btn"
          >
            {BTN_TRY_AGAIN}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-update">
      {/* Navigation Header */}
      <AdminUpdateHeader fetchProblems={fetchProblems} loading={loading} />

      <div className="admin-update__container">
        {/* Header Section */}
        <div className="admin-update__header">
          <h1>
            {PAGE_TITLE}
          </h1>
          <p>
            {PAGE_SUBTITLE}
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
            <div className="admin-update__empty">
              <AlertCircle className="admin-update__empty-icon" />
              <h3 className="admin-update__empty-title">{EMPTY_TITLE}</h3>
              <p className="admin-update__empty-desc">
                {searchTerm || difficultyFilter !== 'all' 
                  ? EMPTY_DESC_FILTERED
                  : EMPTY_DESC_DEFAULT
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
    </div>
  );
}

export default AdminUpdate;
