import React from 'react';
import { Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { getDifficultyColor, getTagColor } from '../utils/colors';
import { BTN_DELETE, BTN_DELETING } from '../constants';
import './ProblemCard.scss';

const ProblemCard = ({ problem, index, deleteLoading, handleDelete }) => {
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
            <div>
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
            <span>ID: {problem._id}</span>
            {problem.createdAt && (
              <span>Created: {new Date(problem.createdAt).toLocaleDateString()}</span>
            )}
          </div>
        </div>

        <div className="flex-shrink-0">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => handleDelete(problem._id)}
            disabled={deleteLoading === problem._id}
            className="problem-card__delete"
          >
            {deleteLoading === problem._id ? (
              <>
                <div className="problem-card__spinner"></div>
                <span>{BTN_DELETING}</span>
              </>
            ) : (
              <>
                <Trash2 size={18} />
                <span>{BTN_DELETE}</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProblemCard;
