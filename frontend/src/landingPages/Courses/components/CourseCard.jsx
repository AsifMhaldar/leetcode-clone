import React from 'react';
import {
  Heart, Clock, BookOpen, Users, Star, TrendingUp, Percent,
  Award, FileText, Code, Download, Bookmark, CheckCircle,
  ChevronDown, ChevronUp
} from 'lucide-react';

export default function CourseCard({ course, viewMode, expandedCourse, setExpandedCourse, getLevelBadge }) {
  return (
    <div
      className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border border-gray-100 overflow-hidden ${
        viewMode === 'list' ? 'flex' : ''
      }`}
    >
      <div className={`relative ${viewMode === 'list' ? 'w-48' : 'w-full'}`}>
        <div className={`relative ${viewMode === 'list' ? 'h-full' : 'h-32'} bg-gradient-to-r ${course.color} p-6 flex items-center justify-center`}>
          <span className="text-5xl">{course.image}</span>

          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {course.bestselling && (
              <span className="bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full flex items-center shadow-lg">
                <TrendingUp className="w-3 h-3 mr-1" />
                Bestseller
              </span>
            )}
            {course.discount > 30 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center shadow-lg">
                <Percent className="w-3 h-3 mr-1" />
                {course.discount}% OFF
              </span>
            )}
          </div>
        </div>
      </div>

      <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              {getLevelBadge(course.level)}
              {course.certificate && (
                <span className="inline-flex items-center px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                  <Award className="w-3 h-3 mr-1" />
                  Certificate
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
              {course.title}
            </h3>
            <p className="text-sm text-gray-500">by {course.instructor}</p>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors group">
            <Heart className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors" />
          </button>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-2" />
            {course.duration}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <BookOpen className="w-4 h-4 mr-2" />
            {course.lectures} lectures
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Users className="w-4 h-4 mr-2" />
            {course.students}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Star className="w-4 h-4 mr-2 text-yellow-400 fill-current" />
            {course.rating} ({course.reviews})
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {course.quizzes && (
            <span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs">
              <FileText className="w-3 h-3 mr-1" />
              Quizzes
            </span>
          )}
          {course.codingExercises && (
            <span className="inline-flex items-center px-2 py-1 bg-green-50 text-green-600 rounded-lg text-xs">
              <Code className="w-3 h-3 mr-1" />
              Coding exercises
            </span>
          )}
          {course.downloadableResources > 0 && (
            <span className="inline-flex items-center px-2 py-1 bg-purple-50 text-purple-600 rounded-lg text-xs">
              <Download className="w-3 h-3 mr-1" />
              {course.downloadableResources} resources
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <span className="text-2xl font-bold text-gray-900">${course.price}</span>
            <span className="text-sm text-gray-500 line-through ml-2">${course.originalPrice}</span>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bookmark className="w-4 h-4 text-gray-400" />
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium text-sm hover:shadow-lg transition-all">
              Preview
            </button>
          </div>
        </div>

        {expandedCourse === course.id && (
          <div className="mt-4 pt-4 border-t border-gray-100 animate-fadeIn">
            <h4 className="font-semibold text-sm text-gray-900 mb-2">What you'll learn:</h4>
            <ul className="space-y-2 mb-3">
              {course.whatYoullLearn.map((item, idx) => (
                <li key={idx} className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  {item}
                </li>
              ))}
            </ul>

            <h4 className="font-semibold text-sm text-gray-900 mb-2">Course syllabus:</h4>
            <div className="space-y-2 mb-3">
              {course.syllabus.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Week {item.week}: {item.topic}</span>
                  <span className="text-gray-400 text-xs">{item.duration}</span>
                </div>
              ))}
            </div>

            <h4 className="font-semibold text-sm text-gray-900 mb-2">Subtitles:</h4>
            <div className="flex flex-wrap gap-2">
              {course.subtitles.map((sub, idx) => (
                <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs">
                  {sub}
                </span>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
          className="mt-3 text-xs text-blue-600 hover:text-blue-800 flex items-center mx-auto"
        >
          {expandedCourse === course.id ? (
            <>Show less <ChevronUp className="w-3 h-3 ml-1" /></>
          ) : (
            <>Show more details <ChevronDown className="w-3 h-3 ml-1" /></>
          )}
        </button>
      </div>
    </div>
  );
}
