import React from 'react';
import { useParams } from 'react-router';
import { FileText, BookOpen, Code, MessageSquare, History } from 'lucide-react';
import { useProblemPage } from './hooks/useProblemPage';
import { leftTabs, rightTabs } from './utils/problemData';
import ProblemHeader from './components/ProblemHeader';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';

const tabIcons = {
  description: FileText,
  editorial: BookOpen,
  solutions: Code,
  submissions: History,
  chatAI: MessageSquare,
  code: Code,
  testcase: FileText,
  result: Code
};

const ProblemPage = () => {
  const { problemId } = useParams();
  const {
    problem,
    selectedLanguage,
    code,
    loading,
    runResult,
    submitResult,
    activeLeftTab,
    setActiveLeftTab,
    activeRightTab,
    setActiveRightTab,
    timer,
    isTimerRunning,
    startTimer,
    pauseTimer,
    resetTimer,
    handleEditorChange,
    handleEditorDidMount,
    handleLanguageChange,
    handleRun,
    handleSubmitCode
  } = useProblemPage(problemId);

  if (loading && !problem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg">Loading problem...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <ProblemHeader
        timer={timer}
        isTimerRunning={isTimerRunning}
        startTimer={startTimer}
        pauseTimer={pauseTimer}
        resetTimer={resetTimer}
      />

      <div className="container mx-auto p-6 h-[calc(100vh-80px)]">
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-2xl h-full flex">
          {/* Left Panel */}
          <div className="w-1/2 flex flex-col border-r border-white/10">
            <div className="flex bg-white/5 px-6 border-b border-white/10">
              {leftTabs.map((tab) => {
                const IconComponent = tabIcons[tab.id];
                return (
                  <button
                    key={tab.id}
                    className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-all duration-300 ${
                      activeLeftTab === tab.id
                        ? 'border-purple-500 text-purple-400 bg-white/5'
                        : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                    onClick={() => setActiveLeftTab(tab.id)}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="font-medium text-sm">{tab.label}</span>
                  </button>
                );
              })}
            </div>
            <LeftPanel
              problem={problem}
              activeLeftTab={activeLeftTab}
              timer={timer}
              isTimerRunning={isTimerRunning}
              problemId={problemId}
            />
          </div>

          {/* Right Panel */}
          <div className="w-1/2 flex flex-col border-l border-white/10">
            <div className="flex bg-white/5 px-6 border-b border-white/10">
              {rightTabs.map((tab) => {
                const IconComponent = tabIcons[tab.id];
                return (
                  <button
                    key={tab.id}
                    className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-all duration-300 ${
                      activeRightTab === tab.id
                        ? 'border-purple-500 text-purple-400 bg-white/5'
                        : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                    onClick={() => setActiveRightTab(tab.id)}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="font-medium text-sm">{tab.label}</span>
                  </button>
                );
              })}
            </div>
            <RightPanel
              activeRightTab={activeRightTab}
              selectedLanguage={selectedLanguage}
              code={code}
              loading={loading}
              timer={timer}
              isTimerRunning={isTimerRunning}
              runResult={runResult}
              submitResult={submitResult}
              onLanguageChange={handleLanguageChange}
              onEditorChange={handleEditorChange}
              onEditorMount={handleEditorDidMount}
              onRun={handleRun}
              onSubmit={handleSubmitCode}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;
