import React from 'react';
import { Edit, Code } from 'lucide-react';
import { NavLink } from 'react-router';
import { motion } from 'framer-motion';
import { getDifficultyColor, getTagColor } from '../utils/colors';
import { BTN_EDIT } from '../constants';
import './ProblemCard.scss';

const ProblemCard = ({ problem, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
      className="problem-card group"
    >
      <div className="problem-card__inner">
        <div className="problem-card__content">
          <div className="problem-card__header">
            <div className="flex-1">
              <h3 className="problem-card__title">
                {problem.title}
              </h3>
              <p className="problem-card__desc">
                {problem.description}
              </p>
            </div>
            <div className="problem-card__badges">
              <span className={`problem-card__badge ${getDifficultyColor(problem.difficulty)}`}>
                {problem.difficulty}
              </span>
              <span className={`problem-card__badge ${getTagColor(problem.tags)}`}>
                {problem.tags}
              </span>
            </div>
          </div>

          <div className="problem-card__meta">
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

        <div className="flex-shrink-0">
          <NavLink
            to={`/admin/update/${problem._id}`}
            className="problem-card__edit-btn"
          >
            <Edit size={18} />
            <span>{BTN_EDIT}</span>
          </NavLink>
        </div>
      </div>
    </motion.div>
  );
};

export default ProblemCard;
