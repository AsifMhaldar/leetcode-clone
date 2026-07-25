import React from 'react';
import { Award, Lock } from 'lucide-react';

const BadgesCard = ({ totalSolved }) => {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-2xl">
      <h3 className="text-lg font-semibold text-white mb-4">Badges</h3>
      <div className="text-center py-4">
        {totalSolved > 0 ? (
          <>
            <Award className="w-12 h-12 text-yellow-400 mx-auto mb-2" />
            <div className="text-yellow-400">Problem Solver</div>
            <div className="text-gray-400 text-sm mt-2">{totalSolved} problems solved</div>
          </>
        ) : (
          <>
            <Lock className="w-12 h-12 text-gray-500 mx-auto mb-2" />
            <div className="text-gray-400">No badges yet</div>
            <div className="text-gray-400 text-sm mt-2">Solve problems to earn badges</div>
          </>
        )}
      </div>
    </div>
  );
};

export default BadgesCard;
