import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, Clock, Star, Users, ArrowRight, Award as AwardIcon
} from 'lucide-react';

const ExerciseCard = ({ exercise, viewMode, getDifficultyColor, getCategoryIcon }) => {
  return (
    <div
      className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border border-gray-100 overflow-hidden ${
        viewMode === 'list' ? 'flex items-start' : ''
      }`}
    >
      <div className={`${viewMode === 'list' ? 'flex-1' : ''} p-6`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mr-4 ${
              exercise.difficulty === 'Easy' ? 'bg-emerald-50' :
              exercise.difficulty === 'Medium' ? 'bg-amber-50' : 'bg-rose-50'
            }`}>
              {exercise.icon}
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-xl font-bold text-gray-900">
                  {exercise.title}
                </h3>
                {exercise.solved && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Solved
                  </span>
                )}
                {exercise.premium && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 border border-amber-200">
                    <AwardIcon className="w-3 h-3 mr-1" />
                    Premium
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(exercise.difficulty)}`}>
                  {exercise.difficulty}
                </span>
                <span className="text-sm text-gray-500 flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1" />
                  {exercise.timeEstimate}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-yellow-500 bg-yellow-50 px-2 py-1 rounded-lg">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-medium text-gray-700">
              {exercise.rating}
            </span>
          </div>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">
          {exercise.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {exercise.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500 flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {exercise.completions} solves
            </span>
            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full flex items-center">
              {getCategoryIcon(exercise.category)}
              <span className="ml-1">{exercise.category}</span>
            </span>
          </div>

          <Link
            to={`/exercises/${exercise.id}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold group"
          >
            Solve Challenge
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;
