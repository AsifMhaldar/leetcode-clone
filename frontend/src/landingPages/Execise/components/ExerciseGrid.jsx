import React from 'react';
import { RefreshCw, Rocket, Search } from 'lucide-react';
import ExerciseCard from './ExerciseCard';
import {
  EXERCISE_GRID_EMPTY_TITLE, EXERCISE_GRID_EMPTY_DESC,
  EXERCISE_GRID_LOAD_MORE, EXERCISE_GRID_LOAD_MORE_NOTE_PREFIX, EXERCISE_GRID_LOAD_MORE_NOTE_SUFFIX,
  EXERCISE_GRID_CLEAR_FILTERS, EXERCISE_GRID_FREE_SUFFIX
} from '../constants';
import './ExerciseGrid.scss';

const ExerciseGrid = ({
  filteredExercises,
  viewMode,
  getDifficultyColor,
  getCategoryIcon,
  hasActiveFilters,
  freeExercisesCount,
  clearFilters
}) => {
  return (
    <>
      <div className="exercise-grid__header">
        <div className="exercise-grid__count">
          <h2 className="exercise-grid__count-text">
            {filteredExercises.length} Exercises Available
          </h2>
          {hasActiveFilters && (
            <button onClick={clearFilters} className="exercise-grid__clear-btn">
              <RefreshCw className="w-4 h-4 mr-1" />
              {EXERCISE_GRID_CLEAR_FILTERS}
            </button>
          )}
        </div>
        <span className="exercise-grid__free-count">
          <span className="exercise-grid__free-count-highlight">{freeExercisesCount}</span> {EXERCISE_GRID_FREE_SUFFIX}
        </span>
      </div>

      <div className={`exercise-grid__grid exercise-grid__grid--${viewMode}`}>
        {filteredExercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            viewMode={viewMode}
            getDifficultyColor={getDifficultyColor}
            getCategoryIcon={getCategoryIcon}
          />
        ))}
      </div>

      {filteredExercises.length > 0 && (
        <div className="exercise-grid__load-more">
          <button className="exercise-grid__load-more-btn">
            <span className="relative flex items-center">
              {EXERCISE_GRID_LOAD_MORE}
              <Rocket className="w-5 h-5 ml-2" />
            </span>
          </button>
          <p className="exercise-grid__load-more-note">
            {EXERCISE_GRID_LOAD_MORE_NOTE_PREFIX} {filteredExercises.length} {EXERCISE_GRID_LOAD_MORE_NOTE_SUFFIX}
          </p>
        </div>
      )}

      {filteredExercises.length === 0 && (
        <div className="exercise-grid__empty">
          <div className="exercise-grid__empty-icon">
            <Search className="w-12 h-12 text-theme-muted" />
          </div>
          <h3 className="exercise-grid__empty-title">{EXERCISE_GRID_EMPTY_TITLE}</h3>
          <p className="exercise-grid__empty-desc">
            {EXERCISE_GRID_EMPTY_DESC}
          </p>
          <button onClick={clearFilters} className="exercise-grid__empty-btn">
            <RefreshCw className="w-5 h-5 mr-2" />
            Clear All Filters
          </button>
        </div>
      )}
    </>
  );
};

export default ExerciseGrid;
