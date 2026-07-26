import React from 'react';
import { NavLink } from 'react-router';
import { motion } from 'framer-motion';
import { difficultyColors, tagColors, SOLVED_LABEL, SOLVE_CHALLENGE_TEXT } from '../constants';
import './ProblemCard.scss';

const ProblemCard = ({ problem, index, isSolved }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="problem-card"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`problem-card__difficulty-bar bg-gradient-to-b ${difficultyColors[problem.difficulty?.toLowerCase()] || 'from-gray-500 to-gray-700'}`}></div>

          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="problem-card__title">
                <NavLink to={`/problem/${problem._id}`}>
                  {problem.title}
                </NavLink>
              </h3>

              {isSolved && (
                <div className="problem-card__solved-badge">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a 1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">{SOLVED_LABEL}</span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <span className={`problem-card__tag-badge ${tagColors[problem.tags?.toLowerCase()] || ''}`}>
                {problem.tags}
              </span>

              <span className={`problem-card__difficulty-badge bg-gradient-to-r ${difficultyColors[problem.difficulty?.toLowerCase()]}`}>
                {problem.difficulty}
              </span>
            </div>
          </div>
        </div>

        <div>
          <NavLink
            to={`/problem/${problem._id}`}
            className="problem-card__solve-btn"
          >
            {SOLVE_CHALLENGE_TEXT}
          </NavLink>
        </div>
      </div>
    </motion.div>
  );
};

export default ProblemCard;
