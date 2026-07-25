import React from 'react';
import { Search } from 'lucide-react';
import FilterSelect from './FilterSelect';
import { statusFilterOptions, difficultyFilterOptions, tagFilterOptions } from '../utils/homepageData';

const FiltersSection = ({ filters, updateFilter, searchTerm, setSearchTerm, filteredCount, totalCount }) => {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/10 shadow-2xl">
      <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
        <div className="flex flex-wrap gap-4">
          <FilterSelect
            label="Status"
            value={filters.status}
            onChange={(e) => updateFilter('status', e.target.value)}
            options={statusFilterOptions}
          />
          
          <FilterSelect
            label="Difficulty"
            value={filters.difficulty}
            onChange={(e) => updateFilter('difficulty', e.target.value)}
            options={difficultyFilterOptions}
          />
          
          <FilterSelect
            label="Category"
            value={filters.tag}
            onChange={(e) => updateFilter('tag', e.target.value)}
            options={tagFilterOptions}
          />
        </div>

        {/* Search Input */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute mt-3 left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search problems by title or tag..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full mt-6 pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="text-white/60 text-sm mt-6">
          Showing {filteredCount} of {totalCount} problems
        </div>
      </div>
    </div>
  );
};

export default FiltersSection;
