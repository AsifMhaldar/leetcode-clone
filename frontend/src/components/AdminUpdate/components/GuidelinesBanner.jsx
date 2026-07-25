import React from 'react';
import { Edit } from 'lucide-react';

const GuidelinesBanner = () => {
  return (
    <div className="mt-8 bg-yellow-500/20 border border-yellow-500/30 rounded-2xl p-6">
      <div className="flex items-center space-x-3">
        <Edit className="w-6 h-6 text-yellow-400 flex-shrink-0" />
        <div>
          <h4 className="font-semibold text-yellow-400 mb-1">Update Guidelines</h4>
          <p className="text-yellow-300/80 text-sm">
            You can edit problem titles, descriptions, difficulty levels, tags, test cases, and code solutions. 
            Make sure to test all changes before saving.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuidelinesBanner;
