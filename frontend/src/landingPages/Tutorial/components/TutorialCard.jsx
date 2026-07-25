import React from 'react';
import { 
  TrendingUp, Clock, BookOpen, Users, Star, Award, 
  Bookmark, Heart, Share2, Play, Globe, Download, 
  Zap, Target, ChevronDown, ChevronUp 
} from 'lucide-react';

export default function TutorialCard({
  tutorial,
  viewMode,
  getLevelColor,
  getLevelIcon,
  expandedTutorial,
  setExpandedTutorial
}) {
  return (
    <div
      className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border border-gray-100 overflow-hidden ${
        viewMode === 'list' ? 'flex' : ''
      }`}
    >
      <div className={`relative ${viewMode === 'list' ? 'w-48' : 'w-full'}`}>
        <div className={`relative ${viewMode === 'list' ? 'h-full' : 'h-32'} bg-gradient-to-r ${tutorial.color} p-6 flex items-center justify-center`}>
          <span className="text-5xl">{tutorial.image}</span>
          {tutorial.trending && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              Trending
            </div>
          )}
          {tutorial.progress > 0 && (
            <div className="absolute bottom-2 left-2 right-2">
              <div className="bg-white/30 backdrop-blur-sm rounded-full h-1.5">
                <div 
                  className="bg-white h-1.5 rounded-full" 
                  style={{ width: `${tutorial.progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getLevelColor(tutorial.level)}`}>
                {getLevelIcon(tutorial.level)}
                <span className="ml-1 capitalize">{tutorial.level}</span>
              </span>
              {tutorial.certificate && (
                <span className="inline-flex items-center px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                  <Award className="w-3 h-3 mr-1" />
                  Certificate
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
              {tutorial.title}
            </h3>
          </div>
          <button className={`p-2 rounded-lg transition-colors ${
            tutorial.bookmarked ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100 text-gray-400'
          }`}>
            <Bookmark className="w-5 h-5" fill={tutorial.bookmarked ? 'currentColor' : 'none'} />
          </button>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {tutorial.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tutorial.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors cursor-pointer"
            >
              #{tag}
            </span>
          ))}
          {tutorial.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
              +{tutorial.tags.length - 3}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-2" />
            {tutorial.duration}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <BookOpen className="w-4 h-4 mr-2" />
            {tutorial.lessons} lessons
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Users className="w-4 h-4 mr-2" />
            {tutorial.students}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Star className="w-4 h-4 mr-2 text-yellow-400 fill-current" />
            {tutorial.rating} ({tutorial.quizzes} quizzes)
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center text-lg">
              {tutorial.instructorAvatar}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{tutorial.instructor}</p>
              <p className="text-xs text-gray-500">{tutorial.instructorRole}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors group">
              <Heart className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors group">
              <Share2 className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </button>
            <button className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all group">
              <Play className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        {expandedTutorial === tutorial.id && (
          <div className="mt-4 pt-4 border-t border-gray-100 animate-fadeIn">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center text-gray-600">
                <Globe className="w-4 h-4 mr-2" />
                {tutorial.language}
              </div>
              <div className="flex items-center text-gray-600">
                <Download className="w-4 h-4 mr-2" />
                Resources included
              </div>
              <div className="flex items-center text-gray-600">
                <Zap className="w-4 h-4 mr-2" />
                Updated {tutorial.lastUpdated}
              </div>
              <div className="flex items-center text-gray-600">
                <Target className="w-4 h-4 mr-2" />
                {tutorial.projects} projects
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => setExpandedTutorial(expandedTutorial === tutorial.id ? null : tutorial.id)}
          className="mt-3 text-xs text-blue-600 hover:text-blue-800 flex items-center mx-auto"
        >
          {expandedTutorial === tutorial.id ? (
            <>Show less <ChevronUp className="w-3 h-3 ml-1" /></>
          ) : (
            <>Show more details <ChevronDown className="w-3 h-3 ml-1" /></>
          )}
        </button>
      </div>
    </div>
  );
}
