import { useState, useMemo } from 'react';
import { Code } from 'lucide-react';
import { EXERCISES, EXERCISE_CATEGORIES } from '../constants';

const useExecise = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popular');

  const filteredExercises = useMemo(() => {
    return EXERCISES.filter(exercise => {
      const matchesCategory = selectedCategory === 'all' || exercise.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'all' || exercise.difficulty === selectedDifficulty;
      const matchesSearch = exercise.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           exercise.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           exercise.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesDifficulty && matchesSearch;
    });
  }, [selectedCategory, selectedDifficulty, searchQuery]);

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'Medium': return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'Hard': return 'text-rose-700 bg-rose-50 border-rose-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getCategoryIcon = (category) => {
    const cat = EXERCISE_CATEGORIES.find(c => c.id === category);
    return cat?.icon || <Code className="w-4 h-4" />;
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    setSearchQuery('');
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedDifficulty !== 'all' || searchQuery;

  const freeExercisesCount = filteredExercises.filter(e => !e.premium).length;

  return {
    selectedDifficulty,
    setSelectedDifficulty,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    sortBy,
    setSortBy,
    filteredExercises,
    getDifficultyColor,
    getCategoryIcon,
    clearFilters,
    hasActiveFilters,
    freeExercisesCount
  };
};

export default useExecise;
