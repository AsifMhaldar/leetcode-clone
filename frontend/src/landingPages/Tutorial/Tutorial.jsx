import React from 'react';
import useTutorial from './hooks/useTutorial';
import { stats, categories, levels } from './data/tutorials';
import HeroSection from '../../shared/components/HeroSection';
import StatsSection from '../../shared/components/StatsSection';
import SearchFilters from '../../shared/components/SearchFilters';
import FeaturedTrending from './components/FeaturedTrending';
import TutorialGrid from './components/TutorialGrid';
import Newsletter from './components/Newsletter';
import { Play, BookOpen, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <HeroSection
        gradient="from-blue-600 via-purple-600 to-pink-600"
        badgeIcon={<Sparkles className="w-4 h-4 text-yellow-300" />}
        badgeText="500+ hours of content"
        titleLine1="Learn from the best"
        titleLine2="tutorials & courses"
        description="Access 150+ expert-led tutorials, hands-on projects, and earn certificates to advance your career."
        primaryCtaLabel="Start Learning Free"
        primaryCtaIcon={<Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />}
        primaryCtaColor="text-blue-600"
        secondaryCtaLabel="Browse All Tutorials"
        secondaryCtaIcon={<BookOpen className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />}
        maxWidth="max-w-4xl"
      />
      <StatsSection stats={stats} />
      <FeaturedTrending
        featuredTutorials={featuredTutorials}
        trendingTutorials={trendingTutorials}
      />
      <SearchFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder="Search tutorials by title, topic, or tags..."
        viewMode={viewMode}
        setViewMode={setViewMode}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        secondFilterLabel="Level"
        secondFilterItems={levels}
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
