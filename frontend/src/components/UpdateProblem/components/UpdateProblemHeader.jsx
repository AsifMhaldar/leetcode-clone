import React from 'react';
import { Settings, ArrowLeft, RefreshCw } from 'lucide-react';

const UpdateProblemHeader = ({ problem, problemId, loading, onRefresh, onBack }) => {
  return (
    <nav className="bg-white/5 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Update Problem</h1>
              <p className="text-sm text-gray-400">
                {problem ? problem.title : `Problem ID: ${problemId}`}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={onRefresh}
              disabled={loading}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer"
            >
              <ArrowLeft size={20} />
              <span>Back to Update</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UpdateProblemHeader;
