import React from 'react';
import { Clock, Cpu, Timer } from 'lucide-react';
import { getDifficultyColor, getDifficultyIcon, formatTime } from '../utils/problemData';
import Editorial from '../../../components/Editorial/Editorial';
import SubmissionHistory from '../../../components/SubmissionHistory/SubmissionHistory';
import ChatAi from '../../../components/ChatAi/ChatAi';

const DescriptionTab = ({ problem, timer, isTimerRunning }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">{problem.title}</h1>
          <div className="flex items-center space-x-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(problem.difficulty)}`}>
              {getDifficultyIcon(problem.difficulty)} {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
            </span>
            <span className="px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full text-sm font-medium">
              {problem.tags}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-gray-400">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>30 min avg</span>
          </div>
          <div className="flex items-center space-x-1">
            <Cpu className="w-4 h-4" />
            <span>All levels</span>
          </div>
          <div className="flex items-center space-x-1">
            <Timer className="w-4 h-4" />
            <span>Your time: {formatTime(timer)}</span>
            {!isTimerRunning && (
              <span className="text-yellow-400 text-xs ml-1">(Stopped)</span>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        <div className="text-gray-300 leading-relaxed text-base space-y-4">
          {problem.description.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white flex items-center space-x-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          <span>Examples</span>
        </h3>
        <div className="space-y-4">
          {problem.visibleTestCases.map((example, index) => (
            <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
              <h4 className="font-semibold text-white text-sm">Example {index + 1}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start space-x-2">
                  <span className="text-gray-400 font-medium min-w-16">Input:</span>
                  <code className="bg-black/30 px-2 py-1 rounded text-green-300 font-mono text-sm">
                    {example.input}
                  </code>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-gray-400 font-medium min-w-16">Output:</span>
                  <code className="bg-black/30 px-2 py-1 rounded text-blue-300 font-mono text-sm">
                    {example.output}
                  </code>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-gray-400 font-medium min-w-16">Explain:</span>
                  <span className="text-gray-300">{example.explanation}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {!isTimerRunning && timer === 0 && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mt-6">
          <div className="flex items-center space-x-3">
            <Timer className="w-5 h-5 text-yellow-400" />
            <div>
              <h4 className="font-semibold text-yellow-300">Ready to start coding?</h4>
              <p className="text-yellow-400/80 text-sm mt-1">
                Click the start button in the timer to begin tracking your solving time!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const EditorialTab = ({ problem }) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold text-white">Editorial</h2>
    <div className="text-gray-300">
      <Editorial secureUrl={problem.secureUrl} thumbnailUrl={problem.thumbnailUrl} duration={problem.duration} />
    </div>
  </div>
);

const SolutionsTab = ({ problem }) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold text-white">Solutions</h2>
    <div className="space-y-4">
      {problem.referenceSolution?.map((solution, index) => (
        <div key={index} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <div className="bg-white/10 px-4 py-3 border-b border-white/10">
            <h3 className="font-semibold text-white text-sm">{problem?.title} - {solution?.language}</h3>
          </div>
          <div className="p-4">
            <pre className="bg-black/30 p-4 rounded-lg text-sm text-gray-300 overflow-x-auto font-mono">
              <code>{solution?.completeCode}</code>
            </pre>
          </div>
        </div>
      )) || (
        <div className="text-center py-12 text-gray-400">
          <p>Solutions will be available after you solve the problem.</p>
        </div>
      )}
    </div>
  </div>
);

const SubmissionsTab = ({ problemId }) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold text-white">My Submissions</h2>
    <SubmissionHistory problemId={problemId} />
  </div>
);

const ChatAITab = ({ problem }) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold text-white">Chat with AI Assistant</h2>
    <ChatAi problem={problem} />
  </div>
);

const LeftPanel = ({ problem, activeLeftTab, timer, isTimerRunning, problemId }) => {
  return (
    <div className="w-1/2 flex flex-col border-r border-white/10">
      <div className="flex-1 overflow-y-auto p-6">
        {problem && (
          <>
            {activeLeftTab === 'description' && (
              <DescriptionTab problem={problem} timer={timer} isTimerRunning={isTimerRunning} />
            )}
            {activeLeftTab === 'editorial' && <EditorialTab problem={problem} />}
            {activeLeftTab === 'solutions' && <SolutionsTab problem={problem} />}
            {activeLeftTab === 'submissions' && <SubmissionsTab problemId={problemId} />}
            {activeLeftTab === 'chatAI' && <ChatAITab problem={problem} />}
          </>
        )}
      </div>
    </div>
  );
};

export default LeftPanel;
