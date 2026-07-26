import React from 'react';
import { BookOpen, X, ChevronDown } from 'lucide-react';
import CourseCard from './CourseCard';
import {
  COURSE_GRID_SORT_OPTIONS, COURSE_GRID_EMPTY_TITLE, COURSE_GRID_EMPTY_DESC,
  COURSE_GRID_LOAD_MORE, COURSE_GRID_CLEAR_FILTERS
} from '../constants';
import './CourseGrid.scss';

export default function CourseGrid({
  filteredCourses, viewMode, expandedCourse, setExpandedCourse, getLevelBadge,
  selectedCategory, selectedLevel, selectedPrice, searchQuery, clearFilters
}) {
  return (
    <>
      <div className="course-grid__header">
        <div className="course-grid__count">
          <h2 className="course-grid__count-text">
            {filteredCourses.length} Courses Available
          </h2>
          {(selectedCategory !== 'all' || selectedLevel !== 'all' || selectedPrice !== 'all' || searchQuery) && (
            <button onClick={clearFilters} className="course-grid__clear-btn">
              <X className="w-4 h-4 mr-1" />
              {COURSE_GRID_CLEAR_FILTERS}
            </button>
          )}
        </div>
        <select className="course-grid__sort">
          {COURSE_GRID_SORT_OPTIONS.map((option, idx) => (
            <option key={idx}>{option}</option>
          ))}
        </select>
      </div>

      <div className={`course-grid__grid course-grid__grid--${viewMode}`}>
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
        <div className="course-grid__load-more">
          <button className="course-grid__load-more-btn">
            <span className="relative flex items-center">
              {COURSE_GRID_LOAD_MORE}
              <ChevronDown className="w-5 h-5 ml-2" />
            </span>
          </button>
        </div>
      )}

      {filteredCourses.length === 0 && (
        <div className="course-grid__empty">
          <div className="course-grid__empty-icon">
            <BookOpen className="w-12 h-12 text-theme-muted" />
          </div>
          <h3 className="course-grid__empty-title">{COURSE_GRID_EMPTY_TITLE}</h3>
          <p className="course-grid__empty-desc">
            {COURSE_GRID_EMPTY_DESC}
          </p>
          <button onClick={clearFilters} className="course-grid__empty-btn">
            {COURSE_GRID_CLEAR_FILTERS}
          </button>
        </div>
      )}
    </>
  );
}
