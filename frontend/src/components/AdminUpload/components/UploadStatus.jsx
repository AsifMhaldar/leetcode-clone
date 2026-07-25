import React from 'react';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';

const UploadStatus = ({ errors, uploadedVideo, formatDuration }) => {
  return (
    <>
      {errors.root && (
        <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-6 h-6 text-red-400" />
            <div>
              <h4 className="text-red-400 font-medium mb-1">Upload Failed</h4>
              <p className="text-red-300/80 text-sm">{errors.root.message}</p>
            </div>
          </div>
        </div>
      )}

      {uploadedVideo && (
        <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-8 h-8 text-green-400" />
            <div className="flex-1">
              <h4 className="text-green-400 font-medium text-lg mb-2">Upload Successful!</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2 text-green-300/80">
                  <Clock size={16} />
                  <span>Duration: {formatDuration(uploadedVideo.duration)}</span>
                </div>
                <div className="text-green-300/80">
                  Uploaded: {new Date(uploadedVideo.uploadedAt).toLocaleString()}
                </div>
              </div>
              <div className="mt-3 p-3 bg-black/20 rounded-lg">
                <p className="text-green-300/70 text-sm font-mono break-all">
                  {uploadedVideo.secureUrl}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UploadStatus;
