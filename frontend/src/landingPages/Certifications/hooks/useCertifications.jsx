import React, { useState } from 'react';
import { Star, Medal, Crown } from 'lucide-react';
import { certifications } from '../data/certifications';

export default function useCertifications() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCert, setExpandedCert] = useState(null);

  const filteredCerts = certifications.filter(cert => {
    const matchesCategory = selectedCategory === 'all' || cert.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || cert.level === selectedLevel;
    const matchesSearch = cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cert.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesLevel && matchesSearch;
  });

  const getLevelBadge = (level) => {
    switch(level) {
      case 'beginner':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
          <Star className="w-3 h-3 mr-1" />
          Beginner
        </span>;
      case 'intermediate':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">
          <Medal className="w-3 h-3 mr-1" />
          Intermediate
        </span>;
      case 'advanced':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 border border-purple-200">
          <Crown className="w-3 h-3 mr-1" />
          Advanced
        </span>;
      default:
        return null;
    }
  };

  return {
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
    clearFilters: () => {
      setSelectedCategory('all');
      setSelectedLevel('all');
      setSearchQuery('');
    }
  };
}
