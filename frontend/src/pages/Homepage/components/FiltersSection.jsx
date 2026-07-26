import React from 'react';
import { Search } from 'lucide-react';
import FilterSelect from './FilterSelect';
import { statusFilterOptions, difficultyFilterOptions, tagFilterOptions, STATUS_LABEL, DIFFICULTY_LABEL, CATEGORY_LABEL, SEARCH_PLACEHOLDER } from '../constants';
import './FiltersSection.scss';

const FiltersSection = ({ filters, updateFilter, searchTerm, setSearchTerm, filteredCount, totalCount }) => {
  return (
    <div className="filters-section">
      <div className="filters-section__row">
        <FilterSelect
          label={STATUS_LABEL}
          value={filters.status}
          onChange={(e) => updateFilter('status', e.target.value)}
          options={statusFilterOptions}
        />
        <FilterSelect
          label={DIFFICULTY_LABEL}
          value={filters.difficulty}
          onChange={(e) => updateFilter('difficulty', e.target.value)}
          options={difficultyFilterOptions}
        />
        <FilterSelect
          label={CATEGORY_LABEL}
          value={filters.tag}
          onChange={(e) => updateFilter('tag', e.target.value)}
          options={tagFilterOptions}
        />

        <div className="filters-section__search">
          <Search className="filters-section__search-icon" />
          <input
            type="text"
            placeholder={SEARCH_PLACEHOLDER}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="filters-section__search-input"
          />
        </div>

        <div className="filters-section__count">
          Showing {filteredCount} of {totalCount} problems
        </div>
      </div>
    </div>
  );
};

export default FiltersSection;
