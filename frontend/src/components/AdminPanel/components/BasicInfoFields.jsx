import React from 'react';
import { FileText } from 'lucide-react';

const BasicInfoFields = ({ register, errors }) => {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-2xl">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <FileText className="w-4 h-4 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">Basic Information</h2>
      </div>
      
      <div className="space-y-6">
        <div className="form-group">
          <label className="block text-white/80 text-sm font-medium mb-2">
            Problem Title
          </label>
          <input
            {...register('title')}
            placeholder="Enter problem title..."
            className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
              errors.title 
                ? 'border-red-500 focus:ring-red-500 animate-shake' 
                : 'border-white/20 focus:ring-purple-500 focus:border-purple-500'
            }`}
          />
          {errors.title && (
            <span className="text-red-400 text-sm mt-1 animate-fade-in block">
              {errors.title.message}
            </span>
          )}
        </div>

        <div className="form-group">
          <label className="block text-white/80 text-sm font-medium mb-2">
            Problem Description
          </label>
          <textarea
            {...register('description')}
            placeholder="Describe the problem, constraints, and examples..."
            rows={6}
            className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 resize-none ${
              errors.description 
                ? 'border-red-500 focus:ring-red-500 animate-shake' 
                : 'border-white/20 focus:ring-purple-500 focus:border-purple-500'
            }`}
          />
          {errors.description && (
            <span className="text-red-400 text-sm mt-1 animate-fade-in block">
              {errors.description.message}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group">
            <label className="block text-white/80 text-sm font-medium mb-2">
              Difficulty Level
            </label>
            <select
              {...register('difficulty')}
              className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white focus:outline-none focus:ring-2 transition-all duration-300 ${
                errors.difficulty 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-white/20 focus:ring-purple-500 focus:border-purple-500'
              }`}
            >
              <option value="easy" className="bg-slate-800 text-green-400">Easy</option>
              <option value="medium" className="bg-slate-800 text-yellow-400">Medium</option>
              <option value="hard" className="bg-slate-800 text-red-400">Hard</option>
            </select>
          </div>

          <div className="form-group">
            <label className="block text-white/80 text-sm font-medium mb-2">
              Problem Tag
            </label>
            <select
              {...register('tags')}
              className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white focus:outline-none focus:ring-2 transition-all duration-300 ${
                errors.tags 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-white/20 focus:ring-purple-500 focus:border-purple-500'
              }`}
            >
              <option value="array" className="bg-slate-800">Array</option>
              <option value="string" className="bg-slate-800">String</option>
              <option value="linkedList" className="bg-slate-800">Linked List</option>
              <option value="graph" className="bg-slate-800">Graph</option>
              <option value="dp" className="bg-slate-800">Dynamic Programming</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoFields;
