import React from 'react';
import {
  Star, Clock, Users, BookOpen, Heart, Bookmark,
  CheckCircle, ChevronDown, Briefcase
} from 'lucide-react';

export default function CertCard({
  cert,
  getLevelBadge,
  expanded,
  onToggleExpand
}) {
  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border border-gray-100 overflow-hidden">
      <div className={`relative h-24 bg-gradient-to-r ${cert.color} p-6`}>
        <div className="absolute top-4 right-4 flex space-x-2">
          {cert.popular && (
            <span className="bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full flex items-center">
              <Star className="w-3 h-3 mr-1 fill-current" />
              Popular
            </span>
          )}
          {cert.jobGuarantee && (
            <span className="bg-green-400 text-green-900 text-xs px-2 py-1 rounded-full flex items-center">
              <Briefcase className="w-3 h-3 mr-1" />
              Job Guarantee
            </span>
          )}
        </div>
        <div className="absolute -bottom-8 left-6">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center text-3xl">
            {cert.image}
          </div>
        </div>
      </div>

      <div className="pt-10 p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
              {cert.title}
            </h3>
            <p className="text-sm text-gray-500">by {cert.provider}</p>
          </div>
          {getLevelBadge(cert.level)}
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {cert.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {cert.skills.slice(0, 3).map((skill, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors cursor-pointer"
            >
              {skill}
            </span>
          ))}
          {cert.skills.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
              +{cert.skills.length - 3}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-2" />
            {cert.duration}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <BookOpen className="w-4 h-4 mr-2" />
            {cert.hours} hours
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Users className="w-4 h-4 mr-2" />
            {cert.students}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Star className="w-4 h-4 mr-2 text-yellow-400 fill-current" />
            {cert.rating} ({cert.reviews})
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Average Salary</span>
            <span className="font-bold text-green-600">{cert.averageSalary}</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-gray-600">Projects</span>
            <span className="font-medium">{cert.projects} hands-on</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <span className="text-2xl font-bold text-gray-900">${cert.price}</span>
            <span className="text-sm text-gray-500 line-through ml-2">${cert.originalPrice}</span>
            <span className="ml-2 text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
              {cert.discount}% off
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors group">
              <Heart className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors group">
              <Bookmark className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium text-sm hover:shadow-lg transition-all">
              View Details
            </button>
          </div>
        </div>

        {expanded && (
          <div className="mt-4 pt-4 border-t border-gray-100 animate-fadeIn">
            <h4 className="font-semibold text-sm text-gray-900 mb-2">What you'll learn:</h4>
            <ul className="space-y-2 mb-3">
              {cert.modules.map((module, idx) => (
                <li key={idx} className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  {module}
                </li>
              ))}
            </ul>
            
            <h4 className="font-semibold text-sm text-gray-900 mb-2">Career paths:</h4>
            <div className="flex flex-wrap gap-2 mb-3">
              {cert.careerPaths.map((path, idx) => (
                <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium">
                  {path}
                </span>
              ))}
            </div>

            <h4 className="font-semibold text-sm text-gray-900 mb-2">Hired by:</h4>
            <div className="flex flex-wrap gap-2">
              {cert.companies.map((company, idx) => (
                <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
                  {company}
                </span>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={onToggleExpand}
          className="mt-3 text-xs text-blue-600 hover:text-blue-800 flex items-center mx-auto"
        >
          {expanded ? (
            <>Show less <ChevronDown className="w-3 h-3 ml-1 rotate-180" /></>
          ) : (
            <>Show more details <ChevronDown className="w-3 h-3 ml-1" /></>
          )}
        </button>
      </div>
    </div>
  );
}
