import React from 'react';
import ProblemCard from './ProblemCard';
import { EMPTY_STATE_FILTERED, EMPTY_STATE_DEFAULT } from '../constants';
import './ProblemsList.scss';

const ProblemsList = ({ loading, filteredProblems, solvedProblems, searchTerm, filters }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="problems-list__spinner"></div>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {filteredProblems.map((problem, index) => (
        <ProblemCard
          key={problem._id}
          problem={problem}
          index={index}
          isSolved={solvedProblems.some((sp) => sp._id === problem._id)}
        />
      ))}
      
      {filteredProblems.length === 0 && (
        <div className="problems-list__empty">
          {searchTerm || filters.difficulty !== 'all' || filters.tag !== 'all' || filters.status !== 'all'
            ? EMPTY_STATE_FILTERED
            : EMPTY_STATE_DEFAULT
          }
        </div>
      )}
    </div>
  );
};

export default ProblemsList;
