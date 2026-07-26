import React from 'react';
import {
  Award, Globe, TrendingUp, Rocket, Shield, Zap,
  GraduationCap, Star, Medal, Crown,
  Users, Briefcase, DollarSign
} from 'lucide-react';

export const CERT_CATEGORIES = [
  { id: 'all', name: 'All Certifications', icon: React.createElement(Award, { className: 'w-4 h-4' }), color: 'blue', count: 24 },
  { id: 'web', name: 'Web Development', icon: React.createElement(Globe, { className: 'w-4 h-4' }), color: 'green', count: 8 },
  { id: 'data', name: 'Data Science', icon: React.createElement(TrendingUp, { className: 'w-4 h-4' }), color: 'purple', count: 6 },
  { id: 'cloud', name: 'Cloud Computing', icon: React.createElement(Rocket, { className: 'w-4 h-4' }), color: 'cyan', count: 4 },
  { id: 'security', name: 'Cybersecurity', icon: React.createElement(Shield, { className: 'w-4 h-4' }), color: 'red', count: 3 },
  { id: 'mobile', name: 'Mobile Dev', icon: React.createElement(Zap, { className: 'w-4 h-4' }), color: 'orange', count: 3 },
];

export const CERT_LEVELS = [
  { id: 'all', name: 'All Levels', icon: React.createElement(GraduationCap, { className: 'w-4 h-4' }) },
  { id: 'beginner', name: 'Beginner', icon: React.createElement(Star, { className: 'w-4 h-4' }) },
  { id: 'intermediate', name: 'Intermediate', icon: React.createElement(Medal, { className: 'w-4 h-4' }) },
  { id: 'advanced', name: 'Advanced', icon: React.createElement(Crown, { className: 'w-4 h-4' }) },
];

export const CERTIFICATIONS = [
  {
    id: 1,
    title: 'Full Stack Web Developer',
    provider: 'Codify-CODE',
    category: 'web',
    level: 'intermediate',
    duration: '6 months',
    students: '45.2K',
    rating: 4.9,
    reviews: '12.4K',
    price: 299,
    originalPrice: 499,
    discount: 40,
    skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB', 'REST APIs'],
    projects: 12,
    quizzes: 48,
    hours: 280,
    certificate: true,
    accredited: true,
    jobGuarantee: true,
    featured: true,
    popular: true,
    image: '🚀',
    color: 'from-blue-500 to-cyan-500',
    description: 'Become a certified full-stack developer and build complete web applications from scratch.',
    prerequisites: ['Basic computer skills', 'Familiarity with programming concepts'],
    careerPaths: ['Full Stack Developer', 'Frontend Developer', 'Backend Developer'],
    averageSalary: '$95,000',
    companies: ['Google', 'Microsoft', 'Amazon'],
    modules: [
      'Frontend Development with React',
      'Backend Development with Node.js',
      'Database Management with MongoDB',
      'API Development & Integration',
      'Deployment & DevOps Basics',
    ],
  },
  {
    id: 2,
    title: 'Data Science Professional',
    provider: 'Codify-CODE',
    category: 'data',
    level: 'intermediate',
    duration: '8 months',
    students: '32.8K',
    rating: 4.8,
    reviews: '9.2K',
    price: 399,
    originalPrice: 599,
    discount: 33,
    skills: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow', 'Data Visualization'],
    projects: 15,
    quizzes: 52,
    hours: 320,
    certificate: true,
    accredited: true,
    jobGuarantee: true,
    featured: true,
    popular: false,
    image: '📊',
    color: 'from-purple-500 to-pink-500',
    description: 'Master data science and machine learning to become a certified data scientist.',
    prerequisites: ['Basic Python', 'Mathematics fundamentals'],
    careerPaths: ['Data Scientist', 'ML Engineer', 'Data Analyst'],
    averageSalary: '$112,000',
    companies: ['Meta', 'Netflix', 'Uber'],
    modules: [
      'Python for Data Science',
      'Statistical Analysis',
      'Machine Learning Algorithms',
      'Deep Learning with TensorFlow',
      'Data Visualization & Storytelling',
    ],
  },
  {
    id: 3,
    title: 'AWS Solutions Architect',
    provider: 'Codify-CODE',
    category: 'cloud',
    level: 'advanced',
    duration: '4 months',
    students: '28.5K',
    rating: 4.9,
    reviews: '8.7K',
    price: 349,
    originalPrice: 449,
    discount: 22,
    skills: ['AWS EC2', 'S3', 'Lambda', 'CloudFormation', 'VPC', 'IAM'],
    projects: 8,
    quizzes: 36,
    hours: 160,
    certificate: true,
    accredited: true,
    jobGuarantee: false,
    featured: false,
    popular: true,
    image: '☁️',
    color: 'from-orange-500 to-red-500',
    description: 'Prepare for the AWS Solutions Architect certification with hands-on labs.',
    prerequisites: ['Networking basics', 'Linux fundamentals'],
    careerPaths: ['Cloud Architect', 'DevOps Engineer', 'Solutions Architect'],
    averageSalary: '$130,000',
    companies: ['AWS', 'Salesforce', 'Adobe'],
    modules: [
      'AWS Fundamentals',
      'Compute Services',
      'Storage & Databases',
      'Networking & Security',
      'Architecture Best Practices',
    ],
  },
  {
    id: 4,
    title: 'Cybersecurity Expert',
    provider: 'Codify-CODE',
    category: 'security',
    level: 'advanced',
    duration: '5 months',
    students: '18.2K',
    rating: 4.9,
    reviews: '6.1K',
    price: 449,
    originalPrice: 649,
    discount: 31,
    skills: ['Network Security', 'Ethical Hacking', 'Cryptography', 'Incident Response', 'Risk Management'],
    projects: 10,
    quizzes: 42,
    hours: 200,
    certificate: true,
    accredited: true,
    jobGuarantee: true,
    featured: true,
    popular: false,
    image: '🛡️',
    color: 'from-red-500 to-rose-500',
    description: 'Become a certified cybersecurity professional and protect organizations from threats.',
    prerequisites: ['Networking knowledge', 'Basic security concepts'],
    careerPaths: ['Security Analyst', 'Penetration Tester', 'Security Engineer'],
    averageSalary: '$105,000',
    companies: ['CrowdStrike', 'Palo Alto', 'IBM Security'],
    modules: [
      'Network Security Fundamentals',
      'Ethical Hacking & Penetration Testing',
      'Cryptography & PKI',
      'Incident Response & Forensics',
      'Security Governance & Compliance',
    ],
  },
  {
    id: 5,
    title: 'Mobile App Developer',
    provider: 'Codify-CODE',
    category: 'mobile',
    level: 'intermediate',
    duration: '5 months',
    students: '22.4K',
    rating: 4.7,
    reviews: '7.8K',
    price: 279,
    originalPrice: 399,
    discount: 30,
    skills: ['React Native', 'Flutter', 'iOS', 'Android', 'Mobile UI/UX', 'App Store Deployment'],
    projects: 14,
    quizzes: 38,
    hours: 190,
    certificate: true,
    accredited: true,
    jobGuarantee: false,
    featured: false,
    popular: true,
    image: '📱',
    color: 'from-green-500 to-emerald-500',
    description: 'Build cross-platform mobile apps and get certified as a mobile developer.',
    prerequisites: ['JavaScript basics', 'HTML/CSS'],
    careerPaths: ['Mobile Developer', 'React Native Developer', 'Flutter Developer'],
    averageSalary: '$98,000',
    companies: ['Uber', 'Airbnb', 'Snapchat'],
    modules: [
      'Cross-Platform Development',
      'Native Features Integration',
      'State Management',
      'API Integration',
      'App Store Submission',
    ],
  },
  {
    id: 6,
    title: 'Frontend Expert',
    provider: 'Codify-CODE',
    category: 'web',
    level: 'beginner',
    duration: '3 months',
    students: '52.1K',
    rating: 4.8,
    reviews: '15.3K',
    price: 199,
    originalPrice: 299,
    discount: 33,
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Responsive Design', 'Web Performance'],
    projects: 10,
    quizzes: 32,
    hours: 120,
    certificate: true,
    accredited: true,
    jobGuarantee: false,
    featured: true,
    popular: true,
    image: '🎨',
    color: 'from-yellow-500 to-orange-500',
    description: 'Master frontend development and create stunning user interfaces.',
    prerequisites: ['Basic computer skills'],
    careerPaths: ['Frontend Developer', 'UI Developer', 'Web Designer'],
    averageSalary: '$85,000',
    companies: ['Spotify', 'Pinterest', 'Twitter'],
    modules: [
      'Modern HTML5 & CSS3',
      'JavaScript Fundamentals',
      'React & State Management',
      'Responsive Web Design',
      'Performance Optimization',
    ],
  },
  {
    id: 7,
    title: 'DevOps Engineer',
    provider: 'Codify-CODE',
    category: 'cloud',
    level: 'advanced',
    duration: '4 months',
    students: '15.6K',
    rating: 4.8,
    reviews: '4.9K',
    price: 399,
    originalPrice: 549,
    discount: 27,
    skills: ['Docker', 'Kubernetes', 'Jenkins', 'CI/CD', 'Terraform', 'Monitoring'],
    projects: 9,
    quizzes: 34,
    hours: 160,
    certificate: true,
    accredited: true,
    jobGuarantee: true,
    featured: false,
    popular: false,
    image: '⚙️',
    color: 'from-indigo-500 to-blue-500',
    description: 'Master DevOps practices and tools to streamline development and deployment.',
    prerequisites: ['Linux basics', 'Scripting knowledge'],
    careerPaths: ['DevOps Engineer', 'Site Reliability Engineer', 'Platform Engineer'],
    averageSalary: '$115,000',
    companies: ['Netflix', 'Etsy', 'GitHub'],
    modules: [
      'Containerization with Docker',
      'Orchestration with Kubernetes',
      'CI/CD Pipelines',
      'Infrastructure as Code',
      'Monitoring & Logging',
    ],
  },
  {
    id: 8,
    title: 'AI & Machine Learning',
    provider: 'Codify-CODE',
    category: 'data',
    level: 'advanced',
    duration: '7 months',
    students: '19.8K',
    rating: 4.9,
    reviews: '7.2K',
    price: 499,
    originalPrice: 699,
    discount: 29,
    skills: ['Python', 'TensorFlow', 'PyTorch', 'NLP', 'Computer Vision', 'Reinforcement Learning'],
    projects: 12,
    quizzes: 48,
    hours: 280,
    certificate: true,
    accredited: true,
    jobGuarantee: true,
    featured: true,
    popular: true,
    image: '🤖',
    color: 'from-violet-500 to-purple-500',
    description: 'Become an AI expert and build intelligent systems with machine learning.',
    prerequisites: ['Python', 'Calculus', 'Linear Algebra'],
    careerPaths: ['AI Engineer', 'ML Engineer', 'Research Scientist'],
    averageSalary: '$145,000',
    companies: ['OpenAI', 'DeepMind', 'Tesla'],
    modules: [
      'Machine Learning Fundamentals',
      'Deep Learning & Neural Networks',
      'Natural Language Processing',
      'Computer Vision',
      'Reinforcement Learning',
    ],
  },
];

export const CERT_TESTIMONIALS = [
  {
    name: 'Sarah Johnson',
    role: 'Full Stack Developer at Google',
    image: '👩‍💻',
    text: 'The Full Stack certification helped me transition from marketing to tech. Landed my dream job in 6 months!',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Data Scientist at Amazon',
    image: '👨‍🔬',
    text: 'The Data Science program was comprehensive and practical. The projects prepared me for real-world challenges.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Security Analyst at Microsoft',
    image: '👩‍💼',
    text: 'The Cybersecurity certification gave me the skills and confidence to switch careers. Best decision ever!',
    rating: 5,
  },
];

export const CERT_FAQS = [
  {
    q: 'Are these certifications accredited?',
    a: 'Yes, all our certifications are accredited and recognized by leading industry organizations.',
  },
  {
    q: 'How long do I have access to the course?',
    a: 'You get lifetime access to all course materials, including future updates.',
  },
  {
    q: 'Is there a job guarantee?',
    a: 'Select certifications come with a job guarantee. Check individual certification details.',
  },
  {
    q: 'Can I get a refund?',
    a: 'Yes, we offer a 30-day money-back guarantee if you are not satisfied.',
  },
];

export const CERT_STATS = [
  { icon: React.createElement(Award, { className: 'w-6 h-6' }), label: 'Certifications', value: '24+', color: 'from-blue-500 to-cyan-500', bg: 'from-blue-50 to-cyan-50' },
  { icon: React.createElement(Users, { className: 'w-6 h-6' }), label: 'Certified Pros', value: '100K+', color: 'from-green-500 to-emerald-500', bg: 'from-green-50 to-emerald-50' },
  { icon: React.createElement(Briefcase, { className: 'w-6 h-6' }), label: 'Hiring Partners', value: '500+', color: 'from-purple-500 to-pink-500', bg: 'from-purple-50 to-pink-50' },
  { icon: React.createElement(DollarSign, { className: 'w-6 h-6' }), label: 'Avg. Salary', value: '$98K', color: 'from-amber-500 to-orange-500', bg: 'from-amber-50 to-orange-50' },
];

export const CERT_HERO = {
  gradient: 'from-indigo-600 via-purple-600 to-pink-600',
  badgeText: 'Industry-recognized certifications',
  titleLine1: 'Get Certified,',
  titleLine2: 'Advance Your Career',
  description: 'Earn professional certifications that matter. Trusted by 500+ companies worldwide.',
  primaryCtaLabel: 'Explore Certifications',
  primaryCtaColor: 'text-purple-600',
  secondaryCtaLabel: 'Watch Demo',
  heroStats: [
    { label: 'Accredited' },
    { label: '100K+ certified' },
    { label: 'Job guarantee' },
  ],
};

export const CERT_SEARCH_PLACEHOLDER = 'Search certifications by name, skill, or career path...';
export const CERT_LEVEL_FILTER_LABEL = 'Level';

export const CERT_WHY_REASONS = [
  {
    color: 'from-blue-500 to-cyan-500',
    title: 'Career Growth',
    description: '87% of employers consider certifications for promotions',
  },
  {
    color: 'from-purple-500 to-pink-500',
    title: 'Higher Salary',
    description: 'Certified professionals earn 25% more on average',
  },
  {
    color: 'from-green-500 to-emerald-500',
    title: 'Industry Recognition',
    description: 'Recognized by 500+ top companies worldwide',
  },
];

export const CERT_TESTIMONIALS_TITLE = 'What Our Certified Professionals Say';
export const CERT_TESTIMONIALS_SUBTITLE = 'Join 100,000+ successful career changers';

export const CERT_FEATURED_BADGE = 'Featured Certification';
export const CERT_FEATURED_SIDEBAR_TITLE = "What you'll learn:";
export const CERT_FEATURED_CTA = 'Enroll Now';

export const CERT_FAQ_TITLE = 'Frequently Asked Questions';

export const CERT_GRID_SORT_OPTIONS = ['Most Popular', 'Highest Rated', 'Price: Low to High', 'Price: High to Low'];
export const CERT_GRID_EMPTY_TITLE = 'No certifications found';
export const CERT_GRID_EMPTY_DESC = 'We couldn\'t find any certifications matching your criteria. Try adjusting your filters.';
export const CERT_GRID_LOAD_MORE = 'Load More Certifications';
export const CERT_GRID_CLEAR_FILTERS = 'Clear All Filters';

export const CERT_CTA_TITLE = 'Ready to Start Your Journey?';
export const CERT_CTA_DESC = 'Join thousands of professionals who have transformed their careers with our certifications.';
export const CERT_CTA_BUTTON = 'Get Started Today';
export const CERT_CTA_NOTE = 'No credit card required • 30-day money-back guarantee';

export const CERT_CARD_POPULAR_LABEL = 'Popular';
export const CERT_CARD_JOB_GUARANTEE_LABEL = 'Job Guarantee';
export const CERT_CARD_SALARY_LABEL = 'Average Salary';
export const CERT_CARD_PROJECTS_LABEL = 'Projects';
export const CERT_CARD_DETAILS_BTN = 'View Details';
export const CERT_CARD_LEARN_TITLE = "What you'll learn:";
export const CAREER_PATHS_TITLE = 'Career paths:';
export const HIRED_BY_TITLE = 'Hired by:';
export const CERT_CARD_SHOW_MORE = 'Show more details';
export const CERT_CARD_SHOW_LESS = 'Show less';
