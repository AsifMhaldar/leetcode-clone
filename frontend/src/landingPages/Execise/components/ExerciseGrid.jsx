import React from 'react';
import { RefreshCw, Rocket, Search } from 'lucide-react';
import ExerciseCard from './ExerciseCard';

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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {filteredExercises.length} Exercises Available
          </h2>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Clear Filters
            </button>
          )}
        </div>
        <span className="text-sm text-gray-500">
          <span className="font-semibold text-blue-600">{freeExercisesCount}</span> free exercises
        </span>
      </div>

      <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} gap-6 mb-8`}>
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
        <div className="text-center mb-12">
          <button className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden">
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity"></span>
            <span className="relative flex items-center">
              Load More Exercises
              <Rocket className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </span>
          </button>
          <p className="text-gray-500 text-sm mt-4">
            Showing {filteredExercises.length} of 500+ exercises
          </p>
        </div>
      )}

      {filteredExercises.length === 0 && (
        <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-gray-200 mb-8">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">No exercises found</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            We couldn't find any exercises matching your criteria. Try adjusting your filters or search terms.
          </p>
          <button
            onClick={clearFilters}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Clear All Filters
          </button>
        </div>
      )}
    </>
  );
};

export default ExerciseGrid;
