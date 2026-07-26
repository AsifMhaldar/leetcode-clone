import React from 'react';
import useCertifications from './hooks/useCertifications';
import {
  CERT_STATS, CERT_CATEGORIES, CERT_LEVELS,
  CERT_HERO, CERT_SEARCH_PLACEHOLDER, CERT_LEVEL_FILTER_LABEL
} from './constants';
import HeroSection from '../../shared/components/HeroSection';
import StatsSection from '../../shared/components/StatsSection';
import SearchFilters from '../../shared/components/SearchFilters';
import FeaturedCert from './components/FeaturedCert';
import CertGrid from './components/CertGrid';
import WhyCertified from './components/WhyCertified';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CertCTA from './components/CertCTA';
import { Award, Trophy, Shield, Users, Briefcase, Play } from 'lucide-react';
import './Certifications.scss';

function Certifications() {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedLevel,
    setSelectedLevel,
    searchQuery,
    setSearchQuery,
    expandedCert,
    setExpandedCert,
    filteredCerts,
    getLevelBadge,
    clearFilters
  } = useCertifications();

  return (
    <div className="certifications-page">
      <HeroSection
        gradient={CERT_HERO.gradient}
        badgeIcon={<Trophy className="w-4 h-4 text-yellow-300" />}
        badgeText={CERT_HERO.badgeText}
        titleLine1={CERT_HERO.titleLine1}
        titleLine2={CERT_HERO.titleLine2}
        description={CERT_HERO.description}
        primaryCtaLabel={CERT_HERO.primaryCtaLabel}
        primaryCtaIcon={<Award className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />}
        primaryCtaColor={CERT_HERO.primaryCtaColor}
        secondaryCtaLabel={CERT_HERO.secondaryCtaLabel}
        secondaryCtaIcon={<Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />}
        stats={CERT_HERO.heroStats.map(stat => ({
          ...stat,
          icon: stat.label === 'Accredited' ? <Shield className="w-5 h-5 text-yellow-300" /> :
                stat.label === '100K+ certified' ? <Users className="w-5 h-5 text-yellow-300" /> :
                <Briefcase className="w-5 h-5 text-yellow-300" />
        }))}
      />
      <StatsSection stats={CERT_STATS} />
      <FeaturedCert />
      <SearchFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder={CERT_SEARCH_PLACEHOLDER}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={CERT_CATEGORIES}
        secondFilterLabel={CERT_LEVEL_FILTER_LABEL}
        secondFilterItems={CERT_LEVELS}
        selectedSecondFilter={selectedLevel}
        setSelectedSecondFilter={setSelectedLevel}
        rightControls={
          <div className="flex flex-wrap items-center gap-2">
            <button className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
              More Filters
            </button>
            <button className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Brochure
            </button>
          </div>
        }
      />
      <CertGrid
        filteredCerts={filteredCerts}
        expandedCert={expandedCert}
        setExpandedCert={setExpandedCert}
        getLevelBadge={getLevelBadge}
        selectedCategory={selectedCategory}
        selectedLevel={selectedLevel}
        searchQuery={searchQuery}
        clearFilters={clearFilters}
      />
      <WhyCertified />
      <Testimonials />
      <FAQ />
      <CertCTA />
    </div>
  );
}

export default Certifications;
