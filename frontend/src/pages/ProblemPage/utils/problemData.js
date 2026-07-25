export const langMap = {
  cpp: 'C++',
  java: 'Java',
  javascript: 'JavaScript'
};

export const difficultyColors = {
  easy: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  medium: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  hard: 'bg-red-500/20 text-red-300 border-red-500/30'
};

export const difficultyIcons = {
  easy: '🟢',
  medium: '🟡',
  hard: '🔴'
};

export const getLanguageForMonaco = (lang) => {
  switch (lang) {
    case 'javascript': return 'javascript';
    case 'java': return 'java';
    case 'cpp': return 'cpp';
    default: return 'javascript';
  }
};

export const getDifficultyColor = (difficulty) => {
  return difficultyColors[difficulty] || 'bg-gray-500/20 text-gray-300 border-gray-500/30';
};

export const getDifficultyIcon = (difficulty) => {
  return difficultyIcons[difficulty] || '⚪';
};

export const formatTime = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hrs > 0) {
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const languages = ['cpp', 'javascript', 'java'];

export const leftTabs = [
  { id: 'description', label: 'Description' },
  { id: 'editorial', label: 'Editorial' },
  { id: 'solutions', label: 'Solutions' },
  { id: 'submissions', label: 'Submissions' },
  { id: 'chatAI', label: 'ChatAI' }
];

export const rightTabs = [
  { id: 'code', label: 'Code' },
  { id: 'testcase', label: 'Test Results' },
  { id: 'result', label: 'Submission' }
];
