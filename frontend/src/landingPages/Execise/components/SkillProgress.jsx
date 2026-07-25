import React from 'react';

const skills = [
  {
    title: 'JavaScript Progress',
    percentage: '65%',
    width: '65%',
    gradient: 'from-blue-500 to-purple-600',
    exercises: '12/18 exercises',
    change: '+3 this week'
  },
  {
    title: 'Python Progress',
    percentage: '40%',
    width: '40%',
    gradient: 'from-green-500 to-emerald-600',
    exercises: '8/20 exercises',
    change: '+2 this week'
  },
  {
    title: 'React Progress',
    percentage: '25%',
    width: '25%',
    gradient: 'from-cyan-500 to-blue-600',
    exercises: '5/20 exercises',
    change: '+1 this week'
  }
];

const SkillProgress = () => {
  return (
    <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {skills.map((skill, idx) => (
        <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">{skill.title}</h3>
            <span className="text-sm font-medium text-blue-600">{skill.percentage}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div className={`bg-gradient-to-r ${skill.gradient} h-2.5 rounded-full`} style={{ width: skill.width }}></div>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>{skill.exercises}</span>
            <span className="text-green-600">{skill.change}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillProgress;
