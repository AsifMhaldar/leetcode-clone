import { 
  Globe, BookOpen, Code, Award, Video, Target,
  Terminal, Layout, Users, TrendingUp, Smartphone, Database
} from 'lucide-react';

const navigationSections = [
  { id: '', label: 'Home', icon: <Globe className="w-5 h-5" />, color: 'from-blue-500 to-cyan-500', path: '/' },
  { id: 'tutorials', label: 'Tutorials', icon: <BookOpen className="w-5 h-5" />, color: 'from-purple-500 to-pink-500', path: '/tutorials' },
  { id: 'exercises', label: 'Exercises', icon: <Code className="w-5 h-5" />, color: 'from-green-500 to-emerald-500', path: '/exercises' },
  { id: 'certifications', label: 'Certifications', icon: <Award className="w-5 h-5" />, color: 'from-yellow-500 to-orange-500', path: '/certifications' },
  { id: 'courses', label: 'Courses', icon: <Video className="w-5 h-5" />, color: 'from-red-500 to-pink-500', path: '/courses' },
  { id: 'practice', label: 'Practice', icon: <Target className="w-5 h-5" />, color: 'from-indigo-500 to-purple-500', path: '/practice' },
  { id: 'projects', label: 'Projects', icon: <Terminal className="w-5 h-5" />, color: 'from-blue-500 to-indigo-500', path: '/projects' },
  { id: 'editor', label: 'Code Editor', icon: <Layout className="w-5 h-5" />, color: 'from-cyan-500 to-blue-500', path: '/editor' },
  { id: 'community', label: 'Community', icon: <Users className="w-5 h-5" />, color: 'from-green-500 to-teal-500', path: '/community' },
  { id: 'progress', label: 'Progress', icon: <TrendingUp className="w-5 h-5" />, color: 'from-orange-500 to-red-500', path: '/progress' },
  { id: 'mobile', label: 'Mobile App', icon: <Smartphone className="w-5 h-5" />, color: 'from-pink-500 to-rose-500', path: '/mobile' },
  { id: 'spaces', label: 'Workspaces', icon: <Database className="w-5 h-5" />, color: 'from-purple-500 to-indigo-500', path: '/spaces' },
];

export default navigationSections;
