import React from 'react';
import useExecise from './hooks/useExecise';
import {
  EXERCISE_STATS, EXERCISE_CATEGORIES, EXERCISE_DIFFICULTIES,
  EXERCISE_HERO, EXERCISE_SEARCH_PLACEHOLDER, EXERCISE_DIFFICULTY_FILTER_LABEL,
  EXERCISE_SORT_OPTIONS
} from './constants';
import HeroSection from '../../shared/components/HeroSection';
import StatsSection from '../../shared/components/StatsSection';
import SearchFilters from '../../shared/components/SearchFilters';
import ExerciseGrid from './components/ExerciseGrid';
import RecommendedPath from './components/RecommendedPath';
import SkillProgress from './components/SkillProgress';
import { Play, Rocket, Flame } from 'lucide-react';
import './Execise.scss';

const ExercisePage = () => {
  const {
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
  } = useExecise();

  return (
    <div className="animate-fadeIn">
      <HeroSection
        gradient={EXERCISE_HERO.gradient}
        badgeIcon={<Flame className="w-4 h-4 text-yellow-300" />}
        badgeText={EXERCISE_HERO.badgeText}
        titleLine1={EXERCISE_HERO.titleLine1}
        titleLine2={EXERCISE_HERO.titleLine2}
        description={EXERCISE_HERO.description}
        primaryCtaLabel={EXERCISE_HERO.primaryCtaLabel}
        primaryCtaIcon={<Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />}
        primaryCtaColor={EXERCISE_HERO.primaryCtaColor}
        secondaryCtaLabel={EXERCISE_HERO.secondaryCtaLabel}
        secondaryCtaIcon={<Rocket className="w-5 h-5 mr-2" />}
      />
      <StatsSection stats={EXERCISE_STATS} />
      <SearchFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder={EXERCISE_SEARCH_PLACEHOLDER}
        viewMode={viewMode}
        setViewMode={setViewMode}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOptions={EXERCISE_SORT_OPTIONS}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={EXERCISE_CATEGORIES}
        showCategoryCount={false}
        secondFilterLabel={EXERCISE_DIFFICULTY_FILTER_LABEL}
        secondFilterItems={EXERCISE_DIFFICULTIES}
        selectedSecondFilter={selectedDifficulty}
        setSelectedSecondFilter={setSelectedDifficulty}
      />
      <ExerciseGrid
        filteredExercises={filteredExercises}
        viewMode={viewMode}
        getDifficultyColor={getDifficultyColor}
        getCategoryIcon={getCategoryIcon}
        hasActiveFilters={hasActiveFilters}
        freeExercisesCount={freeExercisesCount}
        clearFilters={clearFilters}
      />
      <RecommendedPath />
      <SkillProgress />
    </div>
  );
};

export default ExercisePage;
