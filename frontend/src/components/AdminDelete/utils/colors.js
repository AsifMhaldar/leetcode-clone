export const getDifficultyColor = (difficulty) => {
  switch (difficulty?.toLowerCase()) {
    case 'easy': return 'text-green-400 border-green-400/20 bg-green-400/10';
    case 'medium': return 'text-yellow-400 border-yellow-400/20 bg-yellow-400/10';
    case 'hard': return 'text-red-400 border-red-400/20 bg-red-400/10';
    default: return 'text-gray-400 border-gray-400/20 bg-gray-400/10';
  }
};

export const getTagColor = (tag) => {
  switch (tag?.toLowerCase()) {
    case 'array': return 'text-blue-400 border-blue-400/20 bg-blue-400/10';
    case 'linkedlist': return 'text-purple-400 border-purple-400/20 bg-purple-400/10';
    case 'graph': return 'text-cyan-400 border-cyan-400/20 bg-cyan-400/10';
    case 'dp': return 'text-orange-400 border-orange-400/20 bg-orange-400/10';
    default: return 'text-gray-400 border-gray-400/20 bg-gray-400/10';
  }
};
