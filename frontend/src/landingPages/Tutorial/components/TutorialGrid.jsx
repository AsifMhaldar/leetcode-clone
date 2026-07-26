import React from 'react';
import { Search, ChevronDown, X } from 'lucide-react';
import TutorialCard from './TutorialCard';
import {
  TUTORIAL_GRID_SORT_OPTIONS, TUTORIAL_GRID_EMPTY_TITLE, TUTORIAL_GRID_EMPTY_DESC,
  TUTORIAL_GRID_LOAD_MORE, TUTORIAL_GRID_CLEAR_FILTERS
} from '../constants';
import './TutorialGrid.scss';

export default function TutorialGrid({
  filteredTutorials,
  viewMode,
  getLevelColor,
  getLevelIcon,
  expandedTutorial,
  setExpandedTutorial,
  selectedCategory,
  selectedLevel,
  searchQuery,
  clearFilters
}) {
  return (
    <>
      <div className="tutorial-grid__header">
        <div className="tutorial-grid__count">
          <h2 className="tutorial-grid__count-text">
            Showing {filteredTutorials.length} tutorials
          </h2>
          {(selectedCategory !== 'all' || selectedLevel !== 'all' || searchQuery) && (
            <button onClick={clearFilters} className="tutorial-grid__clear-btn">
              <X className="w-4 h-4 mr-1" />
              {TUTORIAL_GRID_CLEAR_FILTERS}
            </button>
          )}
        </div>
        <select className="tutorial-grid__sort">
          {TUTORIAL_GRID_SORT_OPTIONS.map((option, idx) => (
            <option key={idx}>{option}</option>
          ))}
        </select>
      </div>

      <div className={`tutorial-grid__grid tutorial-grid__grid--${viewMode}`}>
        {filteredTutorials.map((tutorial) => (
          <TutorialCard
            key={tutorial.id}
            tutorial={tutorial}
            viewMode={viewMode}
            getLevelColor={getLevelColor}
            getLevelIcon={getLevelIcon}
            expandedTutorial={expandedTutorial}
            setExpandedTutorial={setExpandedTutorial}
          />
        ))}
      </div>

      {filteredTutorials.length > 0 && (
        <div className="tutorial-grid__load-more">
          <button className="tutorial-grid__load-more-btn">
            <span className="tutorial-grid__load-more-label">
              {TUTORIAL_GRID_LOAD_MORE}
              <ChevronDown className="w-5 h-5 ml-2" />
            </span>
          </button>
        </div>
      )}

      {filteredTutorials.length === 0 && (
        <div className="tutorial-grid__empty">
          <div className="tutorial-grid__empty-icon">
            <Search className="w-12 h-12 text-theme-muted" />
          </div>
          <h3 className="tutorial-grid__empty-title">{TUTORIAL_GRID_EMPTY_TITLE}</h3>
          <p className="tutorial-grid__empty-desc">
            {TUTORIAL_GRID_EMPTY_DESC}
          </p>
          <button onClick={clearFilters} className="tutorial-grid__empty-btn">
            {TUTORIAL_GRID_CLEAR_FILTERS}
          </button>
        </div>
      )}
    </>
  );
}
