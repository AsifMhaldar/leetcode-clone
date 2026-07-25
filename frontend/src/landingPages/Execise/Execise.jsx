import React from 'react';
import useExecise from './hooks/useExecise';
import { stats, categories, difficulties } from './data/exercises';
import HeroSection from '../../shared/components/HeroSection';
import StatsSection from '../../shared/components/StatsSection';
import SearchFilters from '../../shared/components/SearchFilters';
import ExerciseGrid from './components/ExerciseGrid';
import RecommendedPath from './components/RecommendedPath';
import SkillProgress from './components/SkillProgress';
import { Play, Rocket, Flame } from 'lucide-react';

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
        gradient="from-blue-600 via-indigo-600 to-purple-600"
        badgeIcon={<Flame className="w-4 h-4 text-yellow-300" />}
        badgeText="25K+ exercises solved today"
        titleLine1="Master Coding with"
        titleLine2="500+ Interactive Exercises"
        description="Practice coding challenges, prepare for interviews, and level up your programming skills"
        primaryCtaLabel="Start Practice"
        primaryCtaIcon={<Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />}
        primaryCtaColor="text-blue-600"
        secondaryCtaLabel="View Challenges"
        secondaryCtaIcon={<Rocket className="w-5 h-5 mr-2" />}
      />
      <StatsSection stats={stats} />
      <SearchFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder="Search exercises, tags, or keywords..."
        viewMode={viewMode}
        setViewMode={setViewMode}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOptions={[
          { value: 'popular', label: 'Most Popular' },
          { value: 'newest', label: 'Newest First' },
          { value: 'difficulty', label: 'Difficulty' }
        ]}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        showCategoryCount={false}
        secondFilterLabel="Difficulty"
        secondFilterItems={difficulties}
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
