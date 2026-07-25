import React from 'react';

const ProgressSection = ({ label, solved, total, color }) => {
  const percentage = total > 0 ? (solved / total) * 100 : 0;
  const colorClasses = {
    green: { text: 'text-green-400', bg: 'bg-green-500' },
    yellow: { text: 'text-yellow-400', bg: 'bg-yellow-500' },
    red: { text: 'text-red-400', bg: 'bg-red-500' }
  };

  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-gray-300">{label}</span>
        <span className={colorClasses[color].text}>
          {solved}/{total}
        </span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${colorClasses[color].bg} transition-all duration-1000 ease-out`}
          style={{ width: `${Math.max(5, percentage)}%` }}
        ></div>
      </div>
    </div>
  );
};

const ProgressCard = ({ totalSolved, totalProblems, acceptanceRate, easySolved, totalEasy, mediumSolved, totalMedium, hardSolved, totalHard }) => {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">
          {totalSolved}/{totalProblems}
        </h2>
        <div className="text-gray-400 text-sm">
          Acceptance: <span className="text-green-400 font-medium">{acceptanceRate}%</span>
        </div>
      </div>

      <div className="space-y-4">
        <ProgressSection label="Easy" solved={easySolved} total={totalEasy} color="green" />
        <ProgressSection label="Medium" solved={mediumSolved} total={totalMedium} color="yellow" />
        <ProgressSection label="Hard" solved={hardSolved} total={totalHard} color="red" />
      </div>
    </div>
  );
};

export default ProgressCard;
