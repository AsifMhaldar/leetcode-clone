import React from 'react';
import { Search, Filter } from 'lucide-react';
import {
  STAT_TOTAL_LABEL, STAT_FILTERED_LABEL, SEARCH_PLACEHOLDER,
  DIFFICULTY_OPTIONS
} from '../constants';
import './AdminDeleteFilters.scss';

const AdminDeleteFilters = ({
  totalProblems,
  filteredProblemsCount,
  searchTerm,
  setSearchTerm,
  difficultyFilter,
  setDifficultyFilter
}) => {
  return (
    <div className="filter-bar">
      <div className="filter-bar__inner">
        <div className="filter-bar__stats">
          <div className="filter-bar__stat">
            <p className="filter-bar__stat-value">{totalProblems}</p>
            <p className="filter-bar__stat-label">{STAT_TOTAL_LABEL}</p>
          </div>
          <div className="filter-bar__divider"></div>
          <div className="filter-bar__stat">
            <p className="filter-bar__stat-value">{filteredProblemsCount}</p>
            <p className="filter-bar__stat-label">{STAT_FILTERED_LABEL}</p>
          </div>
        </div>

        <div className="filter-bar__controls">
          {/* Search Input */}
          <div className="filter-bar__search-wrap">
            <Search className="filter-bar__search-icon" />
            <input
              type="text"
              placeholder={SEARCH_PLACEHOLDER}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="filter-bar__search"
            />
          </div>

          {/* Difficulty Filter */}
          <div className="filter-bar__filter-wrap">
            <Filter className="filter-bar__filter-icon" />
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="filter-bar__filter"
            >
              {DIFFICULTY_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDeleteFilters;
