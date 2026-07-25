import React from 'react';
import {
  BookOpen, Globe, BarChart3, Smartphone, Layout, Terminal,
  GraduationCap, Coffee, Zap, Rocket,
  Users, Clock, Video
} from 'lucide-react';

const categories = [
  { id: 'all', name: 'All Courses', icon: <BookOpen className="w-4 h-4" />, color: 'blue', count: 48 },
  { id: 'web', name: 'Web Development', icon: <Globe className="w-4 h-4" />, color: 'green', count: 15 },
  { id: 'data', name: 'Data Science', icon: <BarChart3 className="w-4 h-4" />, color: 'purple', count: 12 },
  { id: 'mobile', name: 'Mobile Development', icon: <Smartphone className="w-4 h-4" />, color: 'orange', count: 8 },
  { id: 'design', name: 'UI/UX Design', icon: <Layout className="w-4 h-4" />, color: 'pink', count: 6 },
  { id: 'backend', name: 'Backend', icon: <Terminal className="w-4 h-4" />, color: 'indigo', count: 7 }
];

const levels = [
  { id: 'all', name: 'All Levels', icon: <GraduationCap className="w-4 h-4" /> },
  { id: 'beginner', name: 'Beginner', icon: <Coffee className="w-4 h-4" /> },
  { id: 'intermediate', name: 'Intermediate', icon: <Zap className="w-4 h-4" /> },
  { id: 'advanced', name: 'Advanced', icon: <Rocket className="w-4 h-4" /> }
];

const priceFilters = [
  { id: 'all', name: 'All Prices' },
  { id: 'free', name: 'Free' },
  { id: 'paid', name: 'Paid' },
  { id: 'discount', name: 'On Sale' }
];

const courses = [
  {
    id: 1,
    title: 'The Complete Web Development Bootcamp',
    instructor: 'Dr. Angela Yu',
    instructorRole: 'Senior Developer',
    instructorAvatar: '👩‍🏫',
    category: 'web',
    level: 'beginner',
    duration: '62 hours',
    lectures: 468,
    students: '245K',
    rating: 4.8,
    reviews: '125K',
    price: 89.99,
    originalPrice: 199.99,
    discount: 55,
    language: 'English',
    subtitles: ['English', 'Spanish', 'French'],
    certificate: true,
    assignments: true,
    quizzes: true,
    codingExercises: true,
    articleCount: 128,
    downloadableResources: 45,
    featured: true,
    bestselling: true,
    updated: '2024',
    image: '🌐',
    color: 'from-blue-500 to-cyan-500',
    description: 'Become a full-stack web developer with just one course. HTML, CSS, Javascript, Node, React, MongoDB and more!',
    whatYoullLearn: [
      'Build 16 web development projects',
      'Create complex websites from scratch',
      'Master frontend development with React',
      'Build backend APIs with Node.js',
      'Work with databases like MongoDB'
    ],
    requirements: [
      'No programming experience needed',
      'A computer with internet access'
    ],
    audience: [
      'Beginners who want to learn web development',
      'Developers wanting to specialize in MERN stack'
    ],
    syllabus: [
      { week: 1, topic: 'HTML5 & CSS3 Fundamentals', duration: '8 hours' },
      { week: 2, topic: 'JavaScript Basics', duration: '10 hours' },
      { week: 3, topic: 'Advanced JavaScript & ES6', duration: '12 hours' },
      { week: 4, topic: 'React.js Mastery', duration: '15 hours' },
      { week: 5, topic: 'Node.js & Express', duration: '10 hours' },
      { week: 6, topic: 'MongoDB & Database Integration', duration: '7 hours' }
    ],
    features: [
      'Lifetime access',
      'Certificate of completion',
      'Coding exercises',
      'Downloadable resources',
      'Mobile & TV access'
    ]
  },
  {
    id: 2,
    title: 'Machine Learning A-Z™: Hands-On Python & R',
    instructor: 'Kirill Eremenko',
    instructorRole: 'Data Scientist',
    instructorAvatar: '👨‍🔬',
    category: 'data',
    level: 'intermediate',
    duration: '44 hours',
    lectures: 342,
    students: '189K',
    rating: 4.7,
    reviews: '98K',
    price: 94.99,
    originalPrice: 149.99,
    discount: 37,
    language: 'English',
    subtitles: ['English', 'German', 'Japanese'],
    certificate: true,
    assignments: true,
    quizzes: true,
    codingExercises: true,
    articleCount: 89,
    downloadableResources: 32,
    featured: true,
    bestselling: true,
    updated: '2024',
    image: '🤖',
    color: 'from-purple-500 to-pink-500',
    description: 'Learn to create Machine Learning algorithms in Python and R from two data science experts.',
    whatYoullLearn: [
      'Master Machine Learning on Python & R',
      'Make accurate predictions',
      'Create strong algorithms',
      'Handle specific topics like NLP',
      'Build regression models'
    ],
    requirements: [
      'Basic Python knowledge',
      'High school mathematics'
    ],
    audience: [
      'Anyone interested in Machine Learning',
      'Students who want to start a career in Data Science'
    ],
    syllabus: [
      { week: 1, topic: 'Data Preprocessing', duration: '6 hours' },
      { week: 2, topic: 'Regression Models', duration: '8 hours' },
      { week: 3, topic: 'Classification Algorithms', duration: '10 hours' },
      { week: 4, topic: 'Clustering Techniques', duration: '8 hours' },
      { week: 5, topic: 'Association Rule Learning', duration: '6 hours' },
      { week: 6, topic: 'Reinforcement Learning', duration: '6 hours' }
    ],
    features: [
      'Lifetime access',
      'Certificate of completion',
      'Python & R code templates',
      'Dataset downloads',
      'Interview prep resources'
    ]
  },
  {
    id: 3,
    title: 'iOS & Swift - The Complete iOS App Development Bootcamp',
    instructor: 'Dr. Angela Yu',
    instructorRole: 'iOS Developer',
    instructorAvatar: '👩‍🏫',
    category: 'mobile',
    level: 'beginner',
    duration: '55 hours',
    lectures: 425,
    students: '167K',
    rating: 4.8,
    reviews: '89K',
    price: 94.99,
    originalPrice: 149.99,
    discount: 37,
    language: 'English',
    subtitles: ['English', 'Portuguese', 'Vietnamese'],
    certificate: true,
    assignments: true,
    quizzes: true,
    codingExercises: true,
    articleCount: 112,
    downloadableResources: 38,
    featured: false,
    bestselling: true,
    updated: '2024',
    image: '📱',
    color: 'from-orange-500 to-red-500',
    description: 'From beginner to iOS app developer with just one course! Swift, UIKit, Core Data, and much more!',
    whatYoullLearn: [
      'Create complete iOS apps',
      'Master Swift programming',
      'Work with Core Data & Realm',
      'Implement AR features',
      'Publish apps to App Store'
    ],
    requirements: [
      'No programming experience needed',
      'A Mac computer'
    ],
    audience: [
      'Anyone who wants to build iOS apps',
      'Complete beginners to programming'
    ],
    syllabus: [
      { week: 1, topic: 'Swift Fundamentals', duration: '10 hours' },
      { week: 2, topic: 'UIKit & Storyboards', duration: '12 hours' },
      { week: 3, topic: 'Navigation & Tables', duration: '8 hours' },
      { week: 4, topic: 'Core Data & Persistence', duration: '8 hours' },
      { week: 5, topic: 'Networking & APIs', duration: '9 hours' },
      { week: 6, topic: 'App Store Submission', duration: '8 hours' }
    ],
    features: [
      'Lifetime access',
      'Certificate of completion',
      'Xcode projects',
      'Design resources',
      'App Store optimization guide'
    ]
  },
  {
    id: 4,
    title: 'The Complete JavaScript Course 2024: From Zero to Expert!',
    instructor: 'Jonas Schmedtmann',
    instructorRole: 'Web Developer',
    instructorAvatar: '👨‍🏫',
    category: 'web',
    level: 'beginner',
    duration: '69 hours',
    lectures: 528,
    students: '312K',
    rating: 4.9,
    reviews: '178K',
    price: 84.99,
    originalPrice: 129.99,
    discount: 35,
    language: 'English',
    subtitles: ['English', 'Spanish', 'Chinese'],
    certificate: true,
    assignments: true,
    quizzes: true,
    codingExercises: true,
    articleCount: 156,
    downloadableResources: 52,
    featured: true,
    bestselling: true,
    updated: '2024',
    image: '⚡',
    color: 'from-yellow-500 to-orange-500',
    description: 'The modern JavaScript course for everyone! Master JavaScript with projects, challenges and theory.',
    whatYoullLearn: [
      'Become an advanced JavaScript developer',
      'Understand complex concepts like closures',
      'Build 8 real-world projects',
      'Modern ES6+ features',
      'Asynchronous JavaScript'
    ],
    requirements: [
      'No coding experience required',
      'Any computer and browser'
    ],
    audience: [
      'Anyone who wants to learn JavaScript',
      'Developers who want to update their skills'
    ],
    syllabus: [
      { week: 1, topic: 'JavaScript Fundamentals', duration: '12 hours' },
      { week: 2, topic: 'DOM Manipulation', duration: '10 hours' },
      { week: 3, topic: 'Advanced Functions', duration: '12 hours' },
      { week: 4, topic: 'Object-Oriented Programming', duration: '10 hours' },
      { week: 5, topic: 'Asynchronous JavaScript', duration: '12 hours' },
      { week: 6, topic: 'Modern ES6+ Features', duration: '13 hours' }
    ],
    features: [
      'Lifetime access',
      'Certificate of completion',
      'Coding challenges',
      'Project files',
      'Cheat sheets'
    ]
  },
  {
    id: 5,
    title: 'React - The Complete Guide (incl Hooks, React Router, Redux)',
    instructor: 'Maximilian Schwarzmüller',
    instructorRole: 'Full Stack Developer',
    instructorAvatar: '👨‍💻',
    category: 'web',
    level: 'intermediate',
    duration: '48 hours',
    lectures: 452,
    students: '198K',
    rating: 4.8,
    reviews: '112K',
    price: 89.99,
    originalPrice: 139.99,
    discount: 36,
    language: 'English',
    subtitles: ['English', 'German', 'French'],
    certificate: true,
    assignments: true,
    quizzes: true,
    codingExercises: true,
    articleCount: 134,
    downloadableResources: 42,
    featured: true,
    bestselling: false,
    updated: '2024',
    image: '⚛️',
    color: 'from-cyan-500 to-blue-500',
    description: 'Dive in and learn React.js from scratch! Learn React, Hooks, Redux, React Router, Next.js and more!',
    whatYoullLearn: [
      'Build powerful React applications',
      'Master React Hooks',
      'State management with Redux',
      'Routing with React Router',
      'Next.js framework'
    ],
    requirements: [
      'JavaScript knowledge required',
      'HTML/CSS basics'
    ],
    audience: [
      'Students who want to master React',
      'Developers looking to upgrade their frontend skills'
    ],
    syllabus: [
      { week: 1, topic: 'React Basics & Components', duration: '8 hours' },
      { week: 2, topic: 'State & Events', duration: '8 hours' },
      { week: 3, topic: 'Hooks Deep Dive', duration: '10 hours' },
      { week: 4, topic: 'Redux & Context API', duration: '10 hours' },
      { week: 5, topic: 'React Router', duration: '6 hours' },
      { week: 6, topic: 'Next.js & Deployment', duration: '6 hours' }
    ],
    features: [
      'Lifetime access',
      'Certificate of completion',
      'Code snapshots',
      'Practice exercises',
      'Project demos'
    ]
  },
  {
    id: 6,
    title: 'Python for Data Science and Machine Learning Bootcamp',
    instructor: 'Jose Portilla',
    instructorRole: 'Data Scientist',
    instructorAvatar: '👨‍🔬',
    category: 'data',
    level: 'intermediate',
    duration: '25 hours',
    lectures: 172,
    students: '145K',
    rating: 4.7,
    reviews: '78K',
    price: 79.99,
    originalPrice: 119.99,
    discount: 33,
    language: 'English',
    subtitles: ['English', 'Korean', 'Russian'],
    certificate: true,
    assignments: true,
    quizzes: true,
    codingExercises: true,
    articleCount: 67,
    downloadableResources: 28,
    featured: false,
    bestselling: true,
    updated: '2024',
    image: '🐍',
    color: 'from-green-500 to-emerald-500',
    description: 'Learn how to use Python for real-world tasks in Data Science, Machine Learning, and more!',
    whatYoullLearn: [
      'Use Python for data science',
      'Master NumPy & Pandas',
      'Create data visualizations',
      'Build machine learning models',
      'Work with real datasets'
    ],
    requirements: [
      'Basic Python understanding',
      'Willingness to learn'
    ],
    audience: [
      'Aspiring data scientists',
      'Python developers wanting to learn data science'
    ],
    syllabus: [
      { week: 1, topic: 'Python Crash Course', duration: '5 hours' },
      { week: 2, topic: 'NumPy & Pandas', duration: '6 hours' },
      { week: 3, topic: 'Data Visualization', duration: '4 hours' },
      { week: 4, topic: 'Machine Learning Basics', duration: '5 hours' },
      { week: 5, topic: 'Advanced ML Algorithms', duration: '5 hours' }
    ],
    features: [
      'Lifetime access',
      'Certificate of completion',
      'Jupyter notebooks',
      'Dataset downloads',
      'Project solutions'
    ]
  },
  {
    id: 7,
    title: 'UI/UX Design Specialization',
    instructor: 'CalArts',
    instructorRole: 'Design School',
    instructorAvatar: '🎨',
    category: 'design',
    level: 'beginner',
    duration: '38 hours',
    lectures: 298,
    students: '89K',
    rating: 4.7,
    reviews: '45K',
    price: 69.99,
    originalPrice: 99.99,
    discount: 30,
    language: 'English',
    subtitles: ['English', 'Spanish', 'Italian'],
    certificate: true,
    assignments: true,
    quizzes: false,
    codingExercises: false,
    articleCount: 89,
    downloadableResources: 34,
    featured: true,
    bestselling: false,
    updated: '2024',
    image: '🎨',
    color: 'from-pink-500 to-rose-500',
    description: 'Master the fundamentals of UI/UX design and create beautiful, user-centered digital products.',
    whatYoullLearn: [
      'User research methods',
      'Wireframing & prototyping',
      'Visual design principles',
      'Usability testing',
      'Design systems'
    ],
    requirements: [
      'No design experience needed',
      'Access to design software (Figma)'
    ],
    audience: [
      'Beginners in design',
      'Product managers wanting to learn design'
    ],
    syllabus: [
      { week: 1, topic: 'Design Thinking', duration: '6 hours' },
      { week: 2, topic: 'User Research', duration: '7 hours' },
      { week: 3, topic: 'Wireframing', duration: '8 hours' },
      { week: 4, topic: 'Visual Design', duration: '9 hours' },
      { week: 5, topic: 'Prototyping', duration: '8 hours' }
    ],
    features: [
      'Lifetime access',
      'Certificate of completion',
      'Figma files',
      'Design resources',
      'Portfolio projects'
    ]
  },
  {
    id: 8,
    title: 'Node.js, Express, MongoDB & More: The Complete Bootcamp',
    instructor: 'Jonas Schmedtmann',
    instructorRole: 'Backend Developer',
    instructorAvatar: '👨‍🏫',
    category: 'backend',
    level: 'intermediate',
    duration: '42 hours',
    lectures: 389,
    students: '112K',
    rating: 4.8,
    reviews: '67K',
    price: 84.99,
    originalPrice: 124.99,
    discount: 32,
    language: 'English',
    subtitles: ['English', 'Hindi', 'Arabic'],
    certificate: true,
    assignments: true,
    quizzes: true,
    codingExercises: true,
    articleCount: 98,
    downloadableResources: 36,
    featured: false,
    bestselling: true,
    updated: '2024',
    image: '🖥️',
    color: 'from-green-600 to-emerald-600',
    description: 'Master Node.js, build REST APIs with Express, work with MongoDB, and create real-world backend applications.',
    whatYoullLearn: [
      'Build RESTful APIs',
      'Work with MongoDB & Mongoose',
      'Authentication & authorization',
      'Error handling & debugging',
      'Deploy Node.js applications'
    ],
    requirements: [
      'JavaScript knowledge',
      'Basic understanding of web'
    ],
    audience: [
      'Frontend developers wanting to learn backend',
      'Full-stack aspiring developers'
    ],
    syllabus: [
      { week: 1, topic: 'Node.js Fundamentals', duration: '8 hours' },
      { week: 2, topic: 'Express.js Framework', duration: '8 hours' },
      { week: 3, topic: 'MongoDB & Mongoose', duration: '8 hours' },
      { week: 4, topic: 'Authentication & Security', duration: '6 hours' },
      { week: 5, topic: 'API Development', duration: '7 hours' },
      { week: 6, topic: 'Testing & Deployment', duration: '5 hours' }
    ],
    features: [
      'Lifetime access',
      'Certificate of completion',
      'API templates',
      'Database schemas',
      'Deployment guides'
    ]
  }
];

export { courses, categories, levels, priceFilters };

export const stats = [
  { icon: <BookOpen className="w-6 h-6" />, label: 'Courses', value: '500+', color: 'from-blue-500 to-cyan-500', bg: 'from-blue-50 to-cyan-50' },
  { icon: <Users className="w-6 h-6" />, label: 'Students', value: '1.5M+', color: 'from-green-500 to-emerald-500', bg: 'from-green-50 to-emerald-50' },
  { icon: <Clock className="w-6 h-6" />, label: 'Hours', value: '2,500+', color: 'from-purple-500 to-pink-500', bg: 'from-purple-50 to-pink-50' },
  { icon: <Video className="w-6 h-6" />, label: 'Lectures', value: '12K+', color: 'from-amber-500 to-orange-500', bg: 'from-amber-50 to-orange-50' }
];
