import React from 'react';
import { Users, Video, Download, Award } from 'lucide-react';

const items = [
  { icon: <Users className="w-6 h-6" />, title: 'Expert Instructors', desc: 'Learn from industry professionals' },
  { icon: <Video className="w-6 h-6" />, title: 'HD Video Lessons', desc: 'High-quality video content' },
  { icon: <Download className="w-6 h-6" />, title: 'Downloadable Resources', desc: 'Access content offline' },
  { icon: <Award className="w-6 h-6" />, title: 'Certificate', desc: 'Shareable certificate' }
];

export default function WhyChooseUs() {
  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
      {items.map((item, idx) => (
        <div key={idx} className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4 text-white">
            {item.icon}
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
          <p className="text-sm text-gray-600">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}
