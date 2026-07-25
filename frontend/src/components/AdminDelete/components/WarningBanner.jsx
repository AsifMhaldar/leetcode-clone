import React from 'react';
import { AlertTriangle } from 'lucide-react';

const WarningBanner = () => {
  return (
    <div className="mt-8 bg-yellow-500/20 border border-yellow-500/30 rounded-2xl p-6">
      <div className="flex items-center space-x-3">
        <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0" />
        <div>
          <h4 className="font-semibold text-yellow-400 mb-1">Warning</h4>
          <p className="text-yellow-300/80 text-sm">
            Deleting a problem will permanently remove it from the platform. This action cannot be undone and will affect all users.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WarningBanner;
