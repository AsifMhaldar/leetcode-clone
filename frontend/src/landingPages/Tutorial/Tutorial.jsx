import React from 'react';
import useTutorial from './hooks/useTutorial';
import {
  TUTORIAL_STATS, TUTORIAL_CATEGORIES, TUTORIAL_LEVELS,
  TUTORIAL_HERO, TUTORIAL_SEARCH_PLACEHOLDER, TUTORIAL_LEVEL_FILTER_LABEL
} from './constants';
import HeroSection from '../../shared/components/HeroSection';
import StatsSection from '../../shared/components/StatsSection';
import SearchFilters from '../../shared/components/SearchFilters';
import FeaturedTrending from './components/FeaturedTrending';
import TutorialGrid from './components/TutorialGrid';
import Newsletter from './components/Newsletter';
import { Play, BookOpen, Sparkles } from 'lucide-react';
import './Tutorial.scss';

function Tutorial() {
  const {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    selectedLevel,
    setSelectedLevel,
    viewMode,
    setViewMode,
    expandedTutorial,
    setExpandedTutorial,
    filteredTutorials,
    getLevelColor,
    getLevelIcon,
    featuredTutorials,
    trendingTutorials,
    clearFilters
  } = useTutorial();

  return (
    <div className="tutorial-page">
      <HeroSection
        gradient={TUTORIAL_HERO.gradient}
        badgeIcon={<Sparkles className="w-4 h-4 text-yellow-300" />}
        badgeText={TUTORIAL_HERO.badgeText}
        titleLine1={TUTORIAL_HERO.titleLine1}
        titleLine2={TUTORIAL_HERO.titleLine2}
        description={TUTORIAL_HERO.description}
        primaryCtaLabel={TUTORIAL_HERO.primaryCtaLabel}
        primaryCtaIcon={<Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />}
        primaryCtaColor={TUTORIAL_HERO.primaryCtaColor}
        secondaryCtaLabel={TUTORIAL_HERO.secondaryCtaLabel}
        secondaryCtaIcon={<BookOpen className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />}
        maxWidth={TUTORIAL_HERO.maxWidth}
      />
      <StatsSection stats={TUTORIAL_STATS} />
      <FeaturedTrending
        featuredTutorials={featuredTutorials}
        trendingTutorials={trendingTutorials}
      />
      <SearchFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder={TUTORIAL_SEARCH_PLACEHOLDER}
        viewMode={viewMode}
        setViewMode={setViewMode}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={TUTORIAL_CATEGORIES}
        secondFilterLabel={TUTORIAL_LEVEL_FILTER_LABEL}
        secondFilterItems={TUTORIAL_LEVELS}
        selectedSecondFilter={selectedLevel}
        setSelectedSecondFilter={setSelectedLevel}
      />
      <TutorialGrid
        filteredTutorials={filteredTutorials}
        viewMode={viewMode}
        getLevelColor={getLevelColor}
        getLevelIcon={getLevelIcon}
        expandedTutorial={expandedTutorial}
        setExpandedTutorial={setExpandedTutorial}
        selectedCategory={selectedCategory}
        selectedLevel={selectedLevel}
        searchQuery={searchQuery}
        clearFilters={clearFilters}
      />
      <Newsletter />
    </div>
  );
}

export default Tutorial;
