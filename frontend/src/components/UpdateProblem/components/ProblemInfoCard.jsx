import React from 'react';
import { FileText } from 'lucide-react';
import { PROBLEM_INFO_TITLE, LABEL_CURRENT_DIFFICULTY, LABEL_CURRENT_TAG, LABEL_PROBLEM_ID } from '../constants';
import './ProblemInfoCard.scss';

const ProblemInfoCard = ({ problem }) => {
  if (!problem) return null;

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'text-green-400 border-green-400/20 bg-green-400/10';
      case 'medium': return 'text-yellow-400 border-yellow-400/20 bg-yellow-400/10';
      case 'hard': return 'text-red-400 border-red-400/20 bg-red-400/10';
      default: return 'text-theme-muted border-theme bg-theme-card';
    }
  };

  const getTagColor = (tag) => {
    switch (tag?.toLowerCase()) {
      case 'array': return 'text-blue-400 border-blue-400/20 bg-blue-400/10';
      case 'string': return 'text-green-400 border-green-400/20 bg-green-400/10';
      case 'linkedlist': return 'text-purple-400 border-purple-400/20 bg-purple-400/10';
      case 'graph': return 'text-cyan-400 border-cyan-400/20 bg-cyan-400/10';
      case 'dp': return 'text-orange-400 border-orange-400/20 bg-orange-400/10';
      default: return 'text-theme-muted border-theme bg-theme-card';
    }
  };

  return (
    <div className="problem-info">
      <div className="problem-info__header">
        <div className="problem-info__icon">
          <FileText className="w-4 h-4 text-white" />
        </div>
        <h2 className="problem-info__title">{PROBLEM_INFO_TITLE}</h2>
      </div>
      
      <div className="problem-info__grid">
        <div>
          <p className="problem-info__field-label">{LABEL_CURRENT_DIFFICULTY}</p>
          <span className={`problem-info__badge ${getDifficultyColor(problem.difficulty)}`}>
            {problem.difficulty}
          </span>
        </div>
        <div>
          <p className="problem-info__field-label">{LABEL_CURRENT_TAG}</p>
          <span className={`problem-info__badge ${getTagColor(problem.tags)}`}>
            {problem.tags}
          </span>
        </div>
        <div>
          <p className="problem-info__field-label">{LABEL_PROBLEM_ID}</p>
          <p className="problem-info__field-value">{problem.title}</p>
        </div>
      </div>
    </div>
  );
};

export default ProblemInfoCard;
