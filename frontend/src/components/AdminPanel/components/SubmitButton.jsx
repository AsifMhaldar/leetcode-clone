import React from 'react';
import { Save } from 'lucide-react';

const SubmitButton = ({ isSubmitting }) => {
  return (
    <div className="flex justify-center">
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-500 hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500/50 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>Creating Problem...</span>
          </>
        ) : (
          <>
            <Save size={20} />
            <span>Create Problem</span>
          </>
        )}
      </button>
    </div>
  );
};

export default SubmitButton;
