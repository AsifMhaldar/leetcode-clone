import React from 'react';
import {
  Globe, BookOpen, Code, Award, Video, Target,
  Terminal, Layout, Users, TrendingUp, Smartphone, Database
} from 'lucide-react';

export const NAVIGATION_SECTIONS = [
  { id: '', label: 'Home', icon: React.createElement(Globe, { className: 'w-5 h-5' }), color: 'from-blue-500 to-cyan-500', path: '/' },
  { id: 'tutorials', label: 'Tutorials', icon: React.createElement(BookOpen, { className: 'w-5 h-5' }), color: 'from-purple-500 to-pink-500', path: '/tutorials' },
  { id: 'exercises', label: 'Exercises', icon: React.createElement(Code, { className: 'w-5 h-5' }), color: 'from-green-500 to-emerald-500', path: '/exercises' },
  { id: 'certifications', label: 'Certifications', icon: React.createElement(Award, { className: 'w-5 h-5' }), color: 'from-yellow-500 to-orange-500', path: '/certifications' },
  { id: 'courses', label: 'Courses', icon: React.createElement(Video, { className: 'w-5 h-5' }), color: 'from-red-500 to-pink-500', path: '/courses' },
  { id: 'practice', label: 'Practice', icon: React.createElement(Target, { className: 'w-5 h-5' }), color: 'from-indigo-500 to-purple-500', path: '/practice' },
  { id: 'projects', label: 'Projects', icon: React.createElement(Terminal, { className: 'w-5 h-5' }), color: 'from-blue-500 to-indigo-500', path: '/projects' },
  { id: 'editor', label: 'Code Editor', icon: React.createElement(Layout, { className: 'w-5 h-5' }), color: 'from-cyan-500 to-blue-500', path: '/editor' },
  { id: 'community', label: 'Community', icon: React.createElement(Users, { className: 'w-5 h-5' }), color: 'from-green-500 to-teal-500', path: '/community' },
  { id: 'progress', label: 'Progress', icon: React.createElement(TrendingUp, { className: 'w-5 h-5' }), color: 'from-orange-500 to-red-500', path: '/progress' },
  { id: 'mobile', label: 'Mobile App', icon: React.createElement(Smartphone, { className: 'w-5 h-5' }), color: 'from-pink-500 to-rose-500', path: '/mobile' },
  { id: 'spaces', label: 'Workspaces', icon: React.createElement(Database, { className: 'w-5 h-5' }), color: 'from-purple-500 to-indigo-500', path: '/spaces' },
];

export const LANDING_STATS = [
  { number: '10M+', label: 'Monthly Learners', icon: React.createElement(Users, { className: 'w-6 h-6' }) },
  { number: '5000+', label: 'Tutorials', icon: React.createElement(BookOpen, { className: 'w-6 h-6' }) },
  { number: '25K+', label: 'Exercises', icon: React.createElement(Code, { className: 'w-6 h-6' }) },
  { number: '100+', label: 'Certifications', icon: React.createElement(Award, { className: 'w-6 h-6' }) },
];

export const PROGRAMMING_LANGUAGES = [
  { name: 'HTML', color: 'bg-orange-500', icon: '🚀' },
  { name: 'CSS', color: 'bg-blue-500', icon: '🎨' },
  { name: 'JavaScript', color: 'bg-yellow-500', icon: '⚡' },
  { name: 'Python', color: 'bg-green-500', icon: '🐍' },
  { name: 'React', color: 'bg-cyan-500', icon: '⚛️' },
  { name: 'Node.js', color: 'bg-green-600', icon: '🌐' },
  { name: 'Java', color: 'bg-red-500', icon: '☕' },
  { name: 'SQL', color: 'bg-blue-600', icon: '🗄️' },
  { name: 'TypeScript', color: 'bg-indigo-500', icon: '📘' },
  { name: 'C++', color: 'bg-blue-700', icon: '⚙️' },
  { name: 'PHP', color: 'bg-purple-500', icon: '🐘' },
  { name: 'Git', color: 'bg-gray-700', icon: '📊' },
];

export const BRAND_NAME = 'Codify-CODE';

export const NAV_LINKS = [
  { label: 'Tutorials', path: '/tutorials' },
  { label: 'Exercises', path: '/exercises' },
  { label: 'Certifications', path: '/certifications' },
  { label: 'Courses', path: '/courses' },
];

export const AUTH_LINKS = {
  login: { label: 'Log in', path: '/login' },
  signup: { label: 'Sign Up Free', path: '/signup' },
};

export const FOOTER_SUBTITLE = 'Learn to code, change the world';

export const FOOTER_DESCRIPTION = 'The world\'s largest platform for learning to code. Interactive tutorials, real-world projects, and career-ready certifications.';

export const FOOTER_CATEGORIES = ['Learn', 'Practice', 'Resources', 'Company'];

export const FOOTER_LINKS = {
  Learn: [
    { label: 'Tutorials', path: '/tutorials' },
    { label: 'Exercises', path: '/exercises' },
    { label: 'Certifications', path: '/certifications' },
    { label: 'Courses', path: '/courses' },
  ],
  Practice: [
    { label: 'Practice', path: '/practice' },
    { label: 'Projects', path: '/projects' },
    { label: 'Code Editor', path: '/editor' },
    { label: 'Workspaces', path: '/spaces' },
  ],
  Resources: [
    { label: 'Community', path: '/community' },
    { label: 'Progress', path: '/progress' },
    { label: 'Mobile App', path: '/mobile' },
  ],
  Company: [
    { label: 'About', path: '/about' },
    { label: 'Careers', path: '/careers' },
    { label: 'Contact', path: '/contact' },
  ],
};

export const SOCIAL_LINKS = [
  { url: 'https://github.com/AsifMhaldar', platform: 'GitHub' },
  { url: 'https://www.linkedin.com/in/asif-mhaldar-ab818b297/', platform: 'LinkedIn' },
];

export const COPYRIGHT_TEXT = '© 2024 Codify-CODE. All rights reserved.';

export const COPYRIGHT_HEART = 'Made with ❤️ for developers worldwide';

export const SIDEBAR_TITLE = 'Learning Paths';

export const SIDEBAR_PROMO = {
  title: 'Pro Member',
  description: 'Unlock all features',
  buttonLabel: 'Upgrade Now',
  buttonPath: '/signup',
};

export const MOBILE_SIDEBAR_TITLE = 'Navigation';

export const BREADCRUMB_HOME_LABEL = 'Home';
