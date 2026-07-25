import React from 'react';
import { Upload, FileVideo, AlertCircle } from 'lucide-react';

const FileUploadArea = ({ register, errors, selectedFile, formatFileSize, uploading }) => {
  return (
    <div className="form-group">
      <label className="block text-white/80 text-sm font-medium mb-3">
        Select Video File
      </label>

      <div className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 hover:border-blue-400/50 hover:bg-white/5 ${
        errors.videoFile
          ? 'border-red-500/50 bg-red-500/5 animate-shake'
          : 'border-white/20'
      }`}>
        <input
          type="file"
          accept="video/*"
          {...register('videoFile', {
            required: 'Please select a video file',
            validate: {
              isVideo: (files) => {
                if (!files || !files[0]) return 'Please select a video file';
                const file = files[0];
                return file.type.startsWith('video/') || 'Please select a valid video file';
              },
              fileSize: (files) => {
                if (!files || !files[0]) return true;
                const file = files[0];
                const maxSize = 100 * 1024 * 1024;
                return file.size <= maxSize || 'File size must be less than 100MB';
              }
            }
          })}
          className="hidden"
          id="video-upload"
          disabled={uploading}
        />

        <label htmlFor="video-upload" className="cursor-pointer">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Upload className="w-8 h-8 text-white" />
            </div>

            <div>
              <p className="text-white font-medium mb-1">Choose video file</p>
              <p className="text-gray-400 text-sm">
                MP4, MOV, AVI up to 100MB
              </p>
            </div>
          </div>
        </label>
      </div>

      {errors.videoFile && (
        <div className="flex items-center space-x-2 text-red-400 text-sm mt-2 animate-fade-in">
          <AlertCircle size={16} />
          <span>{errors.videoFile.message}</span>
        </div>
      )}

      {selectedFile && (
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mt-4">
          <div className="flex items-center space-x-3">
            <FileVideo className="w-8 h-8 text-blue-400" />
            <div className="flex-1">
              <h4 className="text-white font-medium">{selectedFile.name}</h4>
              <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                <span>Size: {formatFileSize(selectedFile.size)}</span>
                <span>Type: {selectedFile.type}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadArea;
