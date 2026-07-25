import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Trophy, Sparkles, Brain, GitBranch, Award as AwardIcon, Rocket
} from 'lucide-react';

const RecommendedPath = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-8 md:p-12 text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between">
        <div className="flex items-start space-x-6 mb-6 lg:mb-0">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-2xl">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <div>
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-medium">Personalized for you</span>
            </div>
            <h3 className="text-3xl font-bold mb-3">Recommended Learning Path</h3>
            <p className="text-purple-200 text-lg max-w-2xl">
              Based on your skill level and goals, start with JavaScript fundamentals and progress through algorithms, data structures, and full-stack projects.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                <Brain className="w-5 h-5 text-yellow-300" />
                <span className="text-sm">Beginner Friendly</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                <GitBranch className="w-5 h-5 text-yellow-300" />
                <span className="text-sm">20 Exercises</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                <AwardIcon className="w-5 h-5 text-yellow-300" />
                <span className="text-sm">Certificate Included</span>
              </div>
            </div>
          </div>
        </div>
        
        <Link
          to="/exercises/beginner-path"
          className="group relative inline-flex items-center px-8 py-4 bg-white text-purple-900 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden whitespace-nowrap"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-100 to-pink-100 opacity-0 group-hover:opacity-100 transition-opacity"></span>
          <span className="relative flex items-center">
            Start Learning Path
            <Rocket className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default RecommendedPath;
