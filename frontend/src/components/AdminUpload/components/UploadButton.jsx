import React from 'react';
import { Upload } from 'lucide-react';

const UploadButton = ({ uploading, selectedFile }) => {
  return (
    <div className="flex justify-center pt-4">
      <button
        type="submit"
        disabled={uploading || !selectedFile}
        className={`flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-500 hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
          uploading ? 'animate-pulse' : ''
        }`}
      >
        {uploading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>Uploading...</span>
          </>
        ) : (
          <>
            <Upload size={20} />
            <span>Upload Video Solution</span>
          </>
        )}
      </button>
    </div>
  );
};

export default UploadButton;
