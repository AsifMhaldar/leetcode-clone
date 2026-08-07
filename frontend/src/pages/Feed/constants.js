export const DIFFICULTY_COLORS = {
  easy: 'var(--accent-green)',
  medium: 'var(--accent-yellow)',
  hard: 'var(--accent-red)'
};

export const toTagsArray = (tags) => {
  if (Array.isArray(tags)) return tags;
  if (typeof tags === 'string' && tags) return [tags];
  return [];
};

export const FEED_TABS = [
  { id: 'all', label: 'Posts', statKey: 'posts' },
  { id: 'following', label: 'Following', statKey: 'following' },
  { id: 'solved', label: 'Solved Problems', statKey: 'solved' },
  { id: 'discussed', label: 'Discussions', statKey: 'discussed' },
  { id: 'projects', label: 'Projects', statKey: 'projects' },
  { id: 'badge', label: 'Achievements', statKey: 'achievements' },
  { id: 'articles', label: 'Articles', statKey: 'articles' },
  { id: 'trending', label: 'Trending', emoji: '🔥' },
  { id: 'contests', label: 'Contests', emoji: '🏆' }
];

export const FEED_SORTS = [
  { id: 'latest', label: 'Latest' },
  { id: 'liked', label: 'Most Liked' },
  { id: 'commented', label: 'Most Commented' },
  { id: 'today', label: 'Today' },
  { id: 'week', label: 'This Week' },
  { id: 'following', label: 'Following Only' }
];

export const ACTIVITY_TYPES = {
  solved: { icon: 'CheckCircle', label: 'solved a problem', color: 'var(--accent-green)' },
  streak: { icon: 'Flame', label: 'started a streak', color: 'var(--accent-orange)' },
  badge: { icon: 'Award', label: 'earned an achievement', color: 'var(--accent-yellow)' },
  shared: { icon: 'Code', label: 'shared code', color: 'var(--accent-blue)' },
  discussed: { icon: 'MessageSquare', label: 'started a discussion', color: 'var(--accent-purple)' }
};

export const CODE_LANGUAGES = [
  'javascript', 'typescript', 'python', 'java', 'c', 'cpp', 'go', 'rust', 'kotlin', 'swift', 'ruby', 'php'
];

export const VISIBILITY_OPTIONS = [
  { id: 'public', label: 'Public', hint: 'Anyone can see this post', icon: 'Globe' },
  { id: 'followers', label: 'Followers', hint: 'Only your followers can see this post', icon: 'Users' },
  { id: 'private', label: 'Private', hint: 'Only you can see this post', icon: 'Lock' }
];

export const POST_MAX_LENGTH = 4000;

export const UPCOMING_CONTESTS = [
  {
    id: 1,
    name: 'Weekly Contest #420',
    date: 'Starts in 3 days',
    duration: '1 hr 30 min',
    prize: '500 points',
    difficulty: 'Mixed',
    tagline: 'Arrays & Hash Maps focus'
  },
  {
    id: 2,
    name: 'Biweekly Contest #136',
    date: 'Starts in 5 days',
    duration: '1 hr 30 min',
    prize: '750 points',
    difficulty: 'Hard',
    tagline: 'Dynamic Programming focus'
  },
  {
    id: 3,
    name: 'Graph Sprint 2026',
    date: 'Starts in 7 days',
    duration: '2 hr',
    prize: '1,000 points',
    difficulty: 'Hard',
    tagline: 'Graph algorithms deep dive'
  }
];
