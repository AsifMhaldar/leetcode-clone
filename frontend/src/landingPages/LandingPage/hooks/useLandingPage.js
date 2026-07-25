import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import navigationSections from '../data/navigationSections';

const useLandingPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getCurrentSectionLabel = () => {
    const currentPath = location.pathname;
    const section = navigationSections.find(s => s.path === currentPath);
    return section ? section.label : 'Home';
  };

  return {
    isSidebarOpen,
    setIsSidebarOpen,
    scrolled,
    location,
    getCurrentSectionLabel,
  };
};

export default useLandingPage;
