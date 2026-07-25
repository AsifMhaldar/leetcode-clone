import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, TrendingUp, ChevronRight, Star } from 'lucide-react';

export default function FeaturedTrending({ featuredTutorials, trendingTutorials }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Featured Tutorials</h3>
          </div>
          <Link to="/tutorials/featured" className="text-sm text-purple-600 hover:text-purple-800 flex items-center">
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="space-y-3">
          {featuredTutorials.slice(0, 3).map(tutorial => (
            <div key={tutorial.id} className="flex items-center justify-between p-3 bg-white/60 backdrop-blur-sm rounded-xl hover:bg-white transition-all cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${tutorial.color} flex items-center justify-center text-white text-xl`}>
                  {tutorial.image}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{tutorial.title}</h4>
                  <p className="text-xs text-gray-500">{tutorial.duration} • {tutorial.students} students</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="flex items-center text-yellow-500 text-sm">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="ml-1 text-gray-700">{tutorial.rating}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Trending Now</h3>
          </div>
          <Link to="/tutorials/trending" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="space-y-3">
          {trendingTutorials.slice(0, 3).map(tutorial => (
            <div key={tutorial.id} className="flex items-center justify-between p-3 bg-white/60 backdrop-blur-sm rounded-xl hover:bg-white transition-all cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${tutorial.color} flex items-center justify-center text-white text-xl`}>
                  {tutorial.image}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{tutorial.title}</h4>
                  <p className="text-xs text-gray-500">{tutorial.duration} • {tutorial.students} students</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-medium rounded-full">
                  +{Math.floor(Math.random() * 50)}% growth
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
