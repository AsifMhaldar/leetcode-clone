import React from 'react';
import useCourses from './hooks/useCourses';
import {
  COURSE_STATS, COURSE_CATEGORIES, COURSE_LEVELS, COURSE_PRICE_FILTERS,
  COURSE_HERO, COURSE_SEARCH_PLACEHOLDER, COURSE_LEVEL_FILTER_LABEL, COURSE_PRICE_FILTER_LABEL
} from './constants';
import HeroSection from '../../shared/components/HeroSection';
import StatsSection from '../../shared/components/StatsSection';
import SearchFilters from '../../shared/components/SearchFilters';
import FeaturedCourse from './components/FeaturedCourse';
import CourseGrid from './components/CourseGrid';
import WhyChooseUs from './components/WhyChooseUs';
import CourseCTA from './components/CourseCTA';
import { Play, Gift, Users, Star, Award } from 'lucide-react';
import './Courses.scss';

function Courses() {
  const {
    selectedCategory, setSelectedCategory,
    selectedLevel, setSelectedLevel,
    selectedPrice, setSelectedPrice,
    searchQuery, setSearchQuery,
    viewMode, setViewMode,
    expandedCourse, setExpandedCourse,
    filteredCourses,
    getLevelBadge,
    clearFilters
  } = useCourses();

  return (
    <div className="courses-page">
      <HeroSection
        gradient={COURSE_HERO.gradient}
        badgeIcon={<span className="text-yellow-300"><Star className="w-4 h-4" /></span>}
        badgeText={COURSE_HERO.badgeText}
        titleLine1={COURSE_HERO.titleLine1}
        titleLine2={COURSE_HERO.titleLine2}
        description={COURSE_HERO.description}
        primaryCtaLabel={COURSE_HERO.primaryCtaLabel}
        primaryCtaIcon={<Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />}
        primaryCtaColor={COURSE_HERO.primaryCtaColor}
        secondaryCtaLabel={COURSE_HERO.secondaryCtaLabel}
        secondaryCtaIcon={<Gift className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />}
        stats={COURSE_HERO.heroStats.map(stat => ({
          ...stat,
          icon: stat.label === '1.5M+ students' ? <Users className="w-5 h-5 text-yellow-300" /> :
                stat.label === '4.7 average rating' ? <Star className="w-5 h-5 text-yellow-300 fill-current" /> :
                <Award className="w-5 h-5 text-yellow-300" />
        }))}
      />
      <StatsSection stats={COURSE_STATS} />
      <FeaturedCourse />
      <SearchFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder={COURSE_SEARCH_PLACEHOLDER}
        viewMode={viewMode}
        setViewMode={setViewMode}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={COURSE_CATEGORIES}
        secondFilterLabel={COURSE_LEVEL_FILTER_LABEL}
        secondFilterItems={COURSE_LEVELS}
        selectedSecondFilter={selectedLevel}
        setSelectedSecondFilter={setSelectedLevel}
        extraFilterLabel={COURSE_PRICE_FILTER_LABEL}
        extraFilterItems={COURSE_PRICE_FILTERS}
        selectedExtraFilter={selectedPrice}
        setSelectedExtraFilter={setSelectedPrice}
      />
      <CourseGrid
        filteredCourses={filteredCourses}
        viewMode={viewMode}
        expandedCourse={expandedCourse}
        setExpandedCourse={setExpandedCourse}
        getLevelBadge={getLevelBadge}
        selectedCategory={selectedCategory}
        selectedLevel={selectedLevel}
        selectedPrice={selectedPrice}
        searchQuery={searchQuery}
        clearFilters={clearFilters}
      />
      <WhyChooseUs />
      <CourseCTA />
    </div>
  );
}

export default Courses;
