import React from 'react';
import { BookOpen, X, ChevronDown } from 'lucide-react';
import CourseCard from './CourseCard';

export default function CourseGrid({
  filteredCourses, viewMode, expandedCourse, setExpandedCourse, getLevelBadge,
  selectedCategory, selectedLevel, selectedPrice, searchQuery, clearFilters
}) {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {filteredCourses.length} Courses Available
          </h2>
          {(selectedCategory !== 'all' || selectedLevel !== 'all' || selectedPrice !== 'all' || searchQuery) && (
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
            >
              <X className="w-4 h-4 mr-1" />
              Clear Filters
            </button>
          )}
        </div>
        <select className="px-4 py-2 rounded-xl border border-gray-200 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
          <option>Most Popular</option>
          <option>Highest Rated</option>
          <option>Newest First</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>
      </div>

      <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'} gap-6 mb-8`}>
        {filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            viewMode={viewMode}
            expandedCourse={expandedCourse}
            setExpandedCourse={setExpandedCourse}
            getLevelBadge={getLevelBadge}
          />
        ))}
      </div>

      {filteredCourses.length > 0 && (
        <div className="text-center mb-12">
          <button className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden">
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity"></span>
            <span className="relative flex items-center">
              Load More Courses
              <ChevronDown className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform" />
            </span>
          </button>
        </div>
      )}

      {filteredCourses.length === 0 && (
        <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-gray-200 mb-8">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">No courses found</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            We couldn't find any courses matching your criteria. Try adjusting your filters.
          </p>
          <button
            onClick={clearFilters}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </>
  );
}
