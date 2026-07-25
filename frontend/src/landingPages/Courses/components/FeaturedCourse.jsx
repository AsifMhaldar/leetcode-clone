import React from 'react';
import { Clock, Users, Star, Trophy, CheckCircle } from 'lucide-react';
import { courses } from '../data/courses';

export default function FeaturedCourse() {
  const featured = courses.filter(c => c.featured).slice(0, 1)[0];

  if (!featured) return null;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 mb-8">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between">
        <div className="text-white mb-6 lg:mb-0 lg:mr-8">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
            <Trophy className="w-4 h-4 text-yellow-300" />
            <span className="text-sm font-medium">Featured Course</span>
          </div>
          <h2 className="text-3xl font-bold mb-4">{featured.title}</h2>
          <p className="text-white/90 mb-6 max-w-2xl">{featured.description}</p>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{featured.duration}</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <Users className="w-4 h-4" />
              <span className="text-sm">{featured.students} enrolled</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <Star className="w-4 h-4 fill-current text-yellow-300" />
              <span className="text-sm">{featured.rating} ({featured.reviews} reviews)</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div>
              <span className="text-3xl font-bold">${featured.price}</span>
              <span className="text-white/60 line-through ml-2">${featured.originalPrice}</span>
              <span className="ml-2 bg-green-400 text-green-900 px-2 py-1 rounded-lg text-sm font-bold">
                {featured.discount}% OFF
              </span>
            </div>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all">
              Enroll Now
            </button>
          </div>
        </div>

        <div className="lg:w-80 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <h3 className="text-white font-bold mb-4">This course includes:</h3>
          <ul className="space-y-3">
            {featured.features.map((feature, idx) => (
              <li key={idx} className="flex items-center text-white/90">
                <CheckCircle className="w-4 h-4 mr-2 text-green-300" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
