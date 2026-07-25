import React from 'react';
import useCourses from './hooks/useCourses';
import { stats, categories, levels, priceFilters } from './data/courses';
import HeroSection from '../../shared/components/HeroSection';
import StatsSection from '../../shared/components/StatsSection';
import SearchFilters from '../../shared/components/SearchFilters';
import FeaturedCourse from './components/FeaturedCourse';
import CourseGrid from './components/CourseGrid';
import WhyChooseUs from './components/WhyChooseUs';
import CourseCTA from './components/CourseCTA';
import { Play, Gift, Users, Star, Award } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <HeroSection
        gradient="from-indigo-600 via-purple-600 to-pink-600"
        badgeIcon={<span className="text-yellow-300"><Star className="w-4 h-4" /></span>}
        badgeText="Learn from industry experts"
        titleLine1="Expand Your Skills with"
        titleLine2="Expert-Led Courses"
        description="Access 500+ courses taught by real-world experts. Learn at your own pace with lifetime access."
        primaryCtaLabel="Start Learning Free"
        primaryCtaIcon={<Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />}
        primaryCtaColor="text-purple-600"
        secondaryCtaLabel="View All Courses"
        secondaryCtaIcon={<Gift className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />}
        stats={[
          { icon: <Users className="w-5 h-5 text-yellow-300" />, label: '1.5M+ students' },
          { icon: <Star className="w-5 h-5 text-yellow-300 fill-current" />, label: '4.7 average rating' },
          { icon: <Award className="w-5 h-5 text-yellow-300" />, label: 'Certificate included' }
        ]}
      />
      <StatsSection stats={stats} />
      <FeaturedCourse />
      <SearchFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder="Search courses by title, instructor, or topic..."
        viewMode={viewMode}
        setViewMode={setViewMode}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        secondFilterLabel="Level"
        secondFilterItems={levels}
        selectedSecondFilter={selectedLevel}
        setSelectedSecondFilter={setSelectedLevel}
        extraFilterLabel="Price"
        extraFilterItems={priceFilters}
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
