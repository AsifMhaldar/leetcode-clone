import React from 'react';
import ProblemCard from './ProblemCard';

const ProblemsList = ({ loading, filteredProblems, solvedProblems, searchTerm, filters }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
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
        <div className="text-center py-20 text-white/60 text-xl">
          {searchTerm || filters.difficulty !== 'all' || filters.tag !== 'all' || filters.status !== 'all'
            ? 'No problems found matching your search and filters'
            : 'No problems available'
          }
        </div>
      )}
    </div>
  );
};

export default ProblemsList;
