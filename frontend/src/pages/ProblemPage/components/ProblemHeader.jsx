import React from 'react';
import { Code, Timer, Pause, Play as PlayIcon, Square } from 'lucide-react';
import { formatTime } from '../utils/problemData';

const ProblemHeader = ({ timer, isTimerRunning, startTimer, pauseTimer, resetTimer }) => {
  return (
    <div className="bg-white/5 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Code className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Codify-CODE</h1>
              <p className="text-sm text-gray-400">Problem Solver</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl px-4 py-2 border border-white/20">
              <div className="flex items-center space-x-3">
                <Timer className="w-5 h-5 text-purple-400" />
                <div className="text-center">
                  <div className="text-2xl font-mono font-bold text-white">
                    {formatTime(timer)}
                  </div>
                  <div className="text-xs text-gray-400">
                    {isTimerRunning ? 'Timer Running' : 'Timer Stopped'}
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {isTimerRunning ? (
                    <button
                      onClick={pauseTimer}
                      className="p-1.5 rounded-lg bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 hover:bg-yellow-500/30 transition-all duration-200"
                      title="Pause Timer"
                    >
                      <Pause className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={startTimer}
                      className="p-1.5 rounded-lg bg-green-500/20 text-green-300 border border-green-500/30 hover:bg-green-500/30 transition-all duration-200"
                      title="Start Timer"
                    >
                      <PlayIcon className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={resetTimer}
                    className="p-1.5 rounded-lg bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30 transition-all duration-200"
                    title="Reset Timer"
                  >
                    <Square className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-white text-sm">Coding Environment</p>
              <p className="text-gray-400 text-xs">Solve • Test • Submit</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemHeader;
