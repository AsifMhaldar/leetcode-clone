import React from 'react';

export default function CourseCTA() {
  return (
    <div className="mt-12 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 rounded-3xl p-8 md:p-12 text-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Learning Today</h2>
      <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto">
        Join over 1.5 million students and start your learning journey
      </p>
      <button className="bg-white text-purple-900 px-8 py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all">
        Get Started For Free
      </button>
      <p className="text-purple-300 text-sm mt-4">
        No credit card required • 30-day money-back guarantee
      </p>
    </div>
  );
}
