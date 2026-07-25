import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

const UpdateStatus = ({ error, success }) => {
  return (
    <>
      {error && (
        <div className="bg-red-500/20 border border-red-500/30 rounded-2xl p-4 mb-6">
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-6 h-6 text-red-400" />
            <div>
              <h4 className="text-red-400 font-medium mb-1">Update Failed</h4>
              <p className="text-red-300/80 text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}

      {success && (
        <div className="bg-green-500/20 border border-green-500/30 rounded-2xl p-4 mb-6">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <div>
              <h4 className="text-green-400 font-medium mb-1">Update Successful!</h4>
              <p className="text-green-300/80 text-sm">Problem updated successfully. Redirecting...</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateStatus;
