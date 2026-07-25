import React from 'react';

const UploadGuidelines = () => {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-2xl mt-6">
      <h3 className="text-lg font-semibold text-white mb-4">Upload Guidelines</h3>
      <div className="space-y-3 text-sm text-gray-400">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          <span>Supported formats: MP4, MOV, AVI, WebM</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          <span>Maximum file size: 100MB</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          <span>Recommended resolution: 1080p or 720p</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          <span>Keep videos focused on explaining the solution clearly</span>
        </div>
      </div>
    </div>
  );
};

export default UploadGuidelines;
