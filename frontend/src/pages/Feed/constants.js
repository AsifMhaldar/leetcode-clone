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

export const ACTIVITY_FILTERS = [
  { id: 'all', label: 'All Activity' },
  { id: 'solved', label: 'Problems Solved' },
  { id: 'streak', label: 'Streaks' },
  { id: 'badge', label: 'Achievements' },
  { id: 'discussed', label: 'Discussions' }
];

export const ACTIVITY_TYPES = {
  solved: { icon: 'CheckCircle', label: 'solved a problem', color: 'var(--accent-green)' },
  streak: { icon: 'Flame', label: 'started a streak', color: 'var(--accent-orange)' },
  badge: { icon: 'Award', label: 'earned a badge', color: 'var(--accent-yellow)' },
  shared: { icon: 'Share2', label: 'shared code', color: 'var(--accent-blue)' },
  discussed: { icon: 'MessageSquare', label: 'posted a discussion', color: 'var(--accent-purple)' }
};
