import { useState, useMemo } from 'react';
import { Coffee, Zap, Rocket, GraduationCap } from 'lucide-react';
import React from 'react';
import { tutorials } from '../data/tutorials';

export default function useTutorial() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [expandedTutorial, setExpandedTutorial] = useState(null);

  const filteredTutorials = useMemo(() => tutorials.filter(tutorial => {
    const matchesCategory = selectedCategory === 'all' || tutorial.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || tutorial.level === selectedLevel;
    const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tutorial.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesLevel && matchesSearch;
  }), [selectedCategory, selectedLevel, searchQuery]);

  const getLevelColor = (level) => {
    switch(level) {
      case 'beginner': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'intermediate': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'advanced': return 'text-rose-600 bg-rose-50 border-rose-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getLevelIcon = (level) => {
    switch(level) {
      case 'beginner': return <Coffee className="w-3.5 h-3.5" />;
      case 'intermediate': return <Zap className="w-3.5 h-3.5" />;
      case 'advanced': return <Rocket className="w-3.5 h-3.5" />;
      default: return <GraduationCap className="w-3.5 h-3.5" />;
    }
  };

  const featuredTutorials = useMemo(() => tutorials.filter(t => t.featured), []);
  const trendingTutorials = useMemo(() => tutorials.filter(t => t.trending), []);

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedLevel('all');
    setSearchQuery('');
  };

  return {
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
  };
}
