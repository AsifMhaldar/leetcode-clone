import React from 'react';
import { FileText } from 'lucide-react';

const ProblemInfoCard = ({ problem }) => {
  if (!problem) return null;

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'text-green-400 border-green-400/20 bg-green-400/10';
      case 'medium': return 'text-yellow-400 border-yellow-400/20 bg-yellow-400/10';
      case 'hard': return 'text-red-400 border-red-400/20 bg-red-400/10';
      default: return 'text-gray-400 border-gray-400/20 bg-gray-400/10';
    }
  };

  const getTagColor = (tag) => {
    switch (tag?.toLowerCase()) {
      case 'array': return 'text-blue-400 border-blue-400/20 bg-blue-400/10';
      case 'string': return 'text-green-400 border-green-400/20 bg-green-400/10';
      case 'linkedlist': return 'text-purple-400 border-purple-400/20 bg-purple-400/10';
      case 'graph': return 'text-cyan-400 border-cyan-400/20 bg-cyan-400/10';
      case 'dp': return 'text-orange-400 border-orange-400/20 bg-orange-400/10';
      default: return 'text-gray-400 border-gray-400/20 bg-gray-400/10';
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-2xl mb-8 max-w-6xl mx-auto">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
          <FileText className="w-4 h-4 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">Problem Information</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-gray-400 text-sm mb-4">Current Difficulty</p>
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(problem.difficulty)}`}>
            {problem.difficulty}
          </span>
        </div>
        <div>
          <p className="text-gray-400 text-sm mb-4">Current Tag</p>
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getTagColor(problem.tags)}`}>
            {problem.tags}
          </span>
        </div>
        <div>
          <p className="text-gray-400 text-sm mb-4">Problem ID</p>
          <p className="text-white font-mono text-sm">{problem.title}</p>
        </div>
      </div>
    </div>
  );
};

export default ProblemInfoCard;
