import React from 'react';
import { TrendingUp, DollarSign, ThumbsUp } from 'lucide-react';

const reasons = [
  {
    icon: <TrendingUp className="w-8 h-8 text-white" />,
    color: 'from-blue-500 to-cyan-500',
    title: 'Career Growth',
    description: '87% of employers consider certifications for promotions'
  },
  {
    icon: <DollarSign className="w-8 h-8 text-white" />,
    color: 'from-purple-500 to-pink-500',
    title: 'Higher Salary',
    description: 'Certified professionals earn 25% more on average'
  },
  {
    icon: <ThumbsUp className="w-8 h-8 text-white" />,
    color: 'from-green-500 to-emerald-500',
    title: 'Industry Recognition',
    description: 'Recognized by 500+ top companies worldwide'
  }
];

export default function WhyCertified() {
  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
      {reasons.map((reason, idx) => (
        <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center group hover:shadow-xl transition-all">
          <div className={`w-16 h-16 bg-gradient-to-r ${reason.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
            {reason.icon}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{reason.title}</h3>
          <p className="text-gray-600">{reason.description}</p>
        </div>
      ))}
    </div>
  );
}
