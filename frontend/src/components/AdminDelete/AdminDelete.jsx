import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useAdminDelete } from './hooks/useAdminDelete';
import AdminDeleteHeader from './components/AdminDeleteHeader';
import AdminDeleteFilters from './components/AdminDeleteFilters';
import ProblemCard from './components/ProblemCard';
import WarningBanner from './components/WarningBanner';
import {
  PAGE_TITLE, PAGE_SUBTITLE, EMPTY_TITLE, EMPTY_DESC_FILTERED, EMPTY_DESC_DEFAULT,
  LOADING_TEXT, ERROR_TITLE, BTN_TRY_AGAIN
} from './constants';
import './AdminDelete.scss';

const AdminDelete = () => {
  const {
    problems,
    filteredProblems,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    difficultyFilter,
    setDifficultyFilter,
    deleteLoading,
    fetchProblems,
    handleDelete
  } = useAdminDelete();

  if (loading) {
    return (
      <div className="admin-delete flex items-center justify-center">
        <div className="text-center">
          <div className="admin-delete__spinner"></div>
          <p className="text-gray-300 text-lg">{LOADING_TEXT}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-delete flex items-center justify-center">
        <div className="admin-delete__error-card">
          <AlertTriangle className="admin-delete__error-icon" />
          <h3 className="admin-delete__error-title">{ERROR_TITLE}</h3>
          <p className="text-gray-300 mb-4">{error}</p>
          <button
            onClick={fetchProblems}
            className="admin-delete__retry-btn"
          >
            {BTN_TRY_AGAIN}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-delete">
      {/* Navigation Header */}
      <AdminDeleteHeader fetchProblems={fetchProblems} loading={loading} />

      <div className="admin-delete__container">
        {/* Header Section */}
        <div className="admin-delete__header">
          <h1>
            {PAGE_TITLE}
          </h1>
          <p>
            {PAGE_SUBTITLE}
          </p>
        </div>

        {/* Stats and Filters */}
        <AdminDeleteFilters
          totalProblems={problems.length}
          filteredProblemsCount={filteredProblems.length}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          difficultyFilter={difficultyFilter}
          setDifficultyFilter={setDifficultyFilter}
        />

        {/* Problems List */}
        <div className="space-y-4">
          {filteredProblems.length === 0 ? (
            <div className="admin-delete__empty">
              <AlertTriangle className="admin-delete__empty-icon" />
              <h3 className="admin-delete__empty-title">{EMPTY_TITLE}</h3>
              <p className="admin-delete__empty-desc">
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
                deleteLoading={deleteLoading}
                handleDelete={handleDelete}
              />
            ))
          )}
        </div>

        {/* Warning Banner */}
        {filteredProblems.length > 0 && <WarningBanner />}
      </div>
    </div>
  );
};

export default AdminDelete;
