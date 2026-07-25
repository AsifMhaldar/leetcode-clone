import React from 'react';
import { Sparkles, Clock, Users, Star, CheckCircle } from 'lucide-react';
import { certifications } from '../data/certifications';

export default function FeaturedCert() {
  const featured = certifications.find(c => c.featured);

  if (!featured) return null;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 md:p-12 mb-8">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between">
        <div className="text-white mb-6 lg:mb-0 lg:mr-8">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-sm font-medium">Featured Certification</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{featured.title}</h2>
          <p className="text-white/90 text-lg mb-6 max-w-2xl">{featured.description}</p>
          
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
          <h3 className="text-white font-bold mb-4">What you'll learn:</h3>
          <ul className="space-y-3">
            {featured.skills.slice(0, 5).map((skill, idx) => (
              <li key={idx} className="flex items-center text-white/90">
                <CheckCircle className="w-4 h-4 mr-2 text-green-300" />
                <span className="text-sm">{skill}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
