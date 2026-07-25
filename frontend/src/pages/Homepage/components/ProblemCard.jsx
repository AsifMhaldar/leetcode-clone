import React from 'react';
import { NavLink } from 'react-router';
import { difficultyColors, tagColors } from '../utils/homepageData';

const ProblemCard = ({ problem, index, isSolved }) => {
  return (
    <div 
      className="group bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`w-3 h-12 rounded-full bg-gradient-to-b ${difficultyColors[problem.difficulty?.toLowerCase()] || 'from-gray-500 to-gray-700'}`}></div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-xl font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                <NavLink to={`/problem/${problem._id}`}>
                  {problem.title}
                </NavLink>
              </h3>
              
              {isSolved && (
                <div className="flex items-center space-x-1 bg-green-500/20 text-green-300 px-3 py-1 rounded-full border border-green-500/30 animate-pulse">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Solved</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${tagColors[problem.tags?.toLowerCase()] || 'bg-gray-500/20 text-gray-300 border-gray-500/30'}`}>
                {problem.tags}
              </span>
              
              <span className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${difficultyColors[problem.difficulty?.toLowerCase()]} text-white`}>
                {problem.difficulty}
              </span>
            </div>
          </div>
        </div>
        
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <NavLink 
            to={`/problem/${problem._id}`}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            Solve Challenge
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ProblemCard;
