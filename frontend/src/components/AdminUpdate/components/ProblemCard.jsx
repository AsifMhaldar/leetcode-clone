import React from 'react';
import { Edit, Code } from 'lucide-react';
import { NavLink } from 'react-router';
import { getDifficultyColor, getTagColor } from '../utils/colors';

const ProblemCard = ({ problem, index }) => {
  return (
    <div
      className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:to-orange-400 group-hover:bg-clip-text transition-all duration-300">
                {problem.title}
              </h3>
              <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                {problem.description}
              </p>
            </div>
            <div className="flex items-center space-x-2 ml-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(problem.difficulty)}`}>
                {problem.difficulty}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getTagColor(problem.tags)}`}>
                {problem.tags}
              </span>
            </div>
          </div>

          {/* Problem Metadata */}
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <Code size={24} />
              <span>{problem.title}</span>
            </div>
            {problem.createdAt && (
              <div className="flex items-center space-x-1">
                <span>Created: {new Date(problem.createdAt).toLocaleDateString()}</span>
              </div>
            )}
            {problem.updatedAt && (
              <div className="flex items-center space-x-1">
                <span>Updated: {new Date(problem.updatedAt).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>

        {/* Edit Button */}
        <div className="flex-shrink-0">
          <NavLink
            to={`/admin/update/${problem._id}`}
            className="flex items-center mb-15 h-5 space-x-2 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-6 py-3 rounded-xl hover:bg-yellow-500/30 hover:scale-105 transition-all duration-300"
          >
            <Edit size={18} />
            <span>Edit Problem</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ProblemCard;
