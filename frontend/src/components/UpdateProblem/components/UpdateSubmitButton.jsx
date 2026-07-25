import React from 'react';
import { Save } from 'lucide-react';

const UpdateSubmitButton = ({ updating, loading }) => {
  return (
    <div className="flex justify-center">
      <button
        type="submit"
        disabled={updating || loading}
        className={`flex items-center cursor-pointer space-x-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-500 hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-500/50 disabled:opacity-70 disabled:cursor-not-allowed ${
          updating ? 'animate-pulse' : ''
        }`}
      >
        {updating ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>Updating Problem...</span>
          </>
        ) : (
          <>
            <Save size={20} />
            <span>Update Problem</span>
          </>
        )}
      </button>
    </div>
  );
};

export default UpdateSubmitButton;
