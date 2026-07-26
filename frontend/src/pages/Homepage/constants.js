export const WELCOME_TITLE = 'Welcome to Codify-CODE';
export const WELCOME_SUBTITLE = 'Sharpen your coding skills with our curated collection of programming challenges';

export const BRAND_NAME = 'Codify-CODE';
export const LOGO_PATH = '/src/assets/codifycode2.png';

export const STATUS_LABEL = 'Status';
export const DIFFICULTY_LABEL = 'Difficulty';
export const CATEGORY_LABEL = 'Category';
export const SEARCH_PLACEHOLDER = 'Search problems by title or tag...';

export const SOLVED_LABEL = 'Solved';
export const SOLVE_CHALLENGE_TEXT = 'Solve Challenge';

export const EMPTY_STATE_FILTERED = 'No problems found matching your search and filters';
export const EMPTY_STATE_DEFAULT = 'No problems available';

export const difficultyColors = {
  easy: 'from-green-500 to-emerald-500',
  medium: 'from-yellow-500 to-orange-500',
  hard: 'from-red-500 to-pink-500'
};

export const tagColors = {
  array: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  string: 'bg-green-500/20 text-green-300 border-green-500/30',
  linkedlist: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  graph: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  dp: 'bg-orange-500/20 text-orange-300 border-orange-500/30'
};

export const statusFilterOptions = [
  { value: 'all', label: 'All Problems' },
  { value: 'solved', label: 'Solved Only' }
];

export const difficultyFilterOptions = [
  { value: 'all', label: 'All Levels' },
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' }
];

export const tagFilterOptions = [
  { value: 'all', label: 'All Categories' },
  { value: 'array', label: 'Array' },
  { value: 'string', label: 'String' },
  { value: 'linkedList', label: 'Linked List' },
  { value: 'graph', label: 'Graph' },
  { value: 'dp', label: 'Dynamic Programming' }
];

export const statCardsConfig = [
  { title: 'Total Problems', key: 'total', gradient: 'from-blue-500 to-cyan-500', icon: '📚' },
  { title: 'Solved', key: 'solved', gradient: 'from-green-500 to-emerald-500', icon: '✅' },
  { title: 'Easy', key: 'easy', gradient: 'from-emerald-400 to-green-500', icon: '🟢' },
  { title: 'Medium', key: 'medium', gradient: 'from-yellow-400 to-orange-500', icon: '🟡' },
  { title: 'Hard', key: 'hard', gradient: 'from-red-500 to-pink-500', icon: '🔴' }
];
