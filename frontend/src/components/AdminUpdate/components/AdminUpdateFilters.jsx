import React from 'react';
import { Search, Filter } from 'lucide-react';

const AdminUpdateFilters = ({
  totalProblems,
  filteredProblemsCount,
  searchTerm,
  setSearchTerm,
  difficultyFilter,
  setDifficultyFilter
}) => {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-2xl mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{totalProblems}</p>
            <p className="text-gray-400 text-sm">Total Problems</p>
          </div>
          <div className="h-8 w-px bg-white/20"></div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{filteredProblemsCount}</p>
            <p className="text-gray-400 text-sm">Filtered</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 flex-1 max-w-2xl">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search problems by title or tag..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>

          {/* Difficulty Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="pl-10 pr-8 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent appearance-none"
            >
              <option value="all" className="bg-slate-800">All Difficulties</option>
              <option value="easy" className="bg-slate-800">Easy</option>
              <option value="medium" className="bg-slate-800">Medium</option>
              <option value="hard" className="bg-slate-800">Hard</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUpdateFilters;
