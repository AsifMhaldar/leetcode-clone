import React, { useState } from 'react';
import { Coffee, Zap, Rocket } from 'lucide-react';
import { COURSES } from '../constants';

export default function useCourses() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [expandedCourse, setExpandedCourse] = useState(null);

  const filteredCourses = COURSES.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    const matchesPrice = selectedPrice === 'all' ||
      (selectedPrice === 'free' && course.price === 0) ||
      (selectedPrice === 'paid' && course.price > 0) ||
      (selectedPrice === 'discount' && course.discount > 0);
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesLevel && matchesPrice && matchesSearch;
  });

  const getLevelBadge = (level) => {
    switch(level) {
      case 'beginner':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
          <Coffee className="w-3 h-3 mr-1" />
          Beginner
        </span>
      case 'intermediate':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">
          <Zap className="w-3 h-3 mr-1" />
          Intermediate
        </span>
      case 'advanced':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 border border-purple-200">
          <Rocket className="w-3 h-3 mr-1" />
          Advanced
        </span>
      default:
        return null;
    }
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedLevel('all');
    setSelectedPrice('all');
    setSearchQuery('');
  };

  return {
    selectedCategory, setSelectedCategory,
    selectedLevel, setSelectedLevel,
    selectedPrice, setSelectedPrice,
    searchQuery, setSearchQuery,
    viewMode, setViewMode,
    expandedCourse, setExpandedCourse,
    filteredCourses,
    getLevelBadge,
    clearFilters
  };
}
