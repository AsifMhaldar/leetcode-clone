import React from 'react';
import { Plus } from 'lucide-react';

const VideoTipsCard = () => {
  return (
    <div className="mt-8 bg-blue-500/20 border border-blue-500/30 rounded-2xl p-6">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
          <Plus className="w-4 h-4 text-blue-400" />
        </div>
        <div>
          <h4 className="font-semibold text-blue-400 mb-1">Video Management Tips</h4>
          <p className="text-blue-300/80 text-sm">
            • Upload video solutions to help users understand problems better
            <br />
            • Delete videos when they are no longer needed
            <br />
            • Keep videos focused and concise for better learning experience
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoTipsCard;
