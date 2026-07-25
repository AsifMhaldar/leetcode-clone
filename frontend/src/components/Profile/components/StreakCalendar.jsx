import React from 'react';
import { Flame } from 'lucide-react';
import { getStreakColor, formatTimeAgo } from '../utils/profileUtils';

const StreakCalendar = ({ streak }) => {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
          <Flame className={`w-5 h-5 ${streak.current > 0 ? 'text-orange-500' : 'text-gray-500'}`} />
          <span>Current Streak</span>
        </h3>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">{streak.current}</div>
          <div className="text-gray-400 text-xs">days</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
            <div key={index} className="text-center text-gray-400 text-xs font-medium">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {streak.calendar.map((day, index) => (
            <div
              key={index}
              className={`aspect-square rounded-sm border-2 ${
                day.active
                  ? getStreakColor(streak.current) + ' border-white/20'
                  : day.isToday
                  ? 'bg-white/5 border-purple-500/50'
                  : 'bg-white/5 border-white/10'
              } ${day.isToday ? 'ring-1 ring-purple-500' : ''}`}
              title={`${day.date}${day.active ? ' - Active' : ''}${day.isToday ? ' - Today' : ''}`}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-center">
        <div>
          <div className="text-gray-400 text-xs mb-1">Longest Streak</div>
          <div className="text-white font-semibold">{streak.longest} days</div>
        </div>
        <div>
          <div className="text-gray-400 text-xs mb-1">Last Active</div>
          <div className="text-white font-semibold text-sm">
            {streak.lastActive 
              ? formatTimeAgo(streak.lastActive)
              : 'Never'
            }
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        {streak.current > 0 ? (
          <div className="text-green-400 text-sm">
            🔥 Keep going! You're on a {streak.current}-day streak
          </div>
        ) : (
          <div className="text-gray-400 text-sm">
            Solve a problem today to start your streak!
          </div>
        )}
      </div>
    </div>
  );
};

export default StreakCalendar;
