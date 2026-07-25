import React from 'react';

const UploadProgress = ({ uploading, uploadProgress }) => {
  if (!uploading) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-white">Uploading to Cloudinary...</span>
        <span className="text-blue-400 font-medium">{uploadProgress}%</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-3">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${uploadProgress}%` }}
        ></div>
      </div>
      <div className="flex justify-center">
        <div className="text-gray-400 text-sm">
          Please don't close this page during upload
        </div>
      </div>
    </div>
  );
};

export default UploadProgress;
