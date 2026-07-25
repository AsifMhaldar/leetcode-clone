import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Newsletter() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 p-8 md:p-12 text-white mt-12">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
          <Sparkles className="w-4 h-4 text-yellow-300" />
          <span className="text-sm font-medium">Never miss an update</span>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Stay updated with new tutorials
        </h2>
        <p className="text-purple-200 mb-8">
          Get notified when we publish new tutorials, courses, and learning resources.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-6 py-3 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-4 focus:ring-purple-300"
          />
          <button className="bg-white text-purple-900 px-8 py-3 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all">
            Subscribe
          </button>
        </div>
        
        <p className="text-purple-300 text-sm mt-4">
          Join 50,000+ developers who get our newsletter
        </p>
      </div>
    </div>
  );
}
