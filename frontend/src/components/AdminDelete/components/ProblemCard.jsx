import React from 'react';
import { Trash2 } from 'lucide-react';
import { getDifficultyColor, getTagColor } from '../utils/colors';

const ProblemCard = ({ problem, index, deleteLoading, handleDelete }) => {
  return (
    <div
      className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-red-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                {problem.title}
              </h3>
              <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                {problem.description}
              </p>
            </div>
            <div className="flex items-center space-x-2 ml-4">
              <span className={`px-3 py-1 mt-6 rounded-full text-sm font-medium border ${getDifficultyColor(problem.difficulty)}`}>
                {problem.difficulty}
              </span>
              <span className={`px-3 py-1 mt-6 rounded-full text-sm font-medium border ${getTagColor(problem.tags)}`}>
                {problem.tags}
              </span>
            </div>
          </div>

          {/* Problem Metadata */}
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <span>ID: {problem._id}</span>
            {problem.createdAt && (
              <span>Created: {new Date(problem.createdAt).toLocaleDateString()}</span>
            )}
          </div>
        </div>

        {/* Delete Button */}
        <div className="flex-shrink-0">
          <button
            onClick={() => handleDelete(problem._id)}
            disabled={deleteLoading === problem._id}
            className="flex items-center space-x-2 bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-1 rounded-xl hover:bg-red-500/30 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {deleteLoading === problem._id ? (
              <>
                <div className="w-4 h-2 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin"></div>
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 size={18} />
                <span>Delete</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProblemCard;
