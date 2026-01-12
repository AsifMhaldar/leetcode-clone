import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import Editor from '@monaco-editor/react';
import { useParams } from 'react-router';
import axiosClient from "../utils/axiosClient";
import SubmissionHistory from "../components/SubmissionHistory"
import ChatAi from '../components/ChatAi';
import Editorial from '../components/Editorial';
import { Play, Send, Code, FileText, BookOpen, MessageSquare, History, ChevronRight, CheckCircle, XCircle, Clock, Cpu, Timer, Pause, Play as PlayIcon, Square } from 'lucide-react';

const langMap = {
  cpp: 'C++',
  java: 'Java',
  javascript: 'JavaScript'
};

const ProblemPage = () => {
  const [problem, setProblem] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('cpp');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [runResult, setRunResult] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);
  const [activeLeftTab, setActiveLeftTab] = useState('description');
  const [activeRightTab, setActiveRightTab] = useState('code');
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false); // Start as false
  const editorRef = useRef(null);
  const timerRef = useRef(null);
  let { problemId } = useParams();

  const { handleSubmit } = useForm();

  useEffect(() => {
    const fetchProblem = async () => {
      setLoading(true);
      try {
        const response = await axiosClient.get(`/problem/problemById/${problemId}`);
        const initialCode = response.data.startCode.find(sc => sc.language === langMap[selectedLanguage]).initialCode;

        setProblem(response.data);
        setCode(initialCode);
        setLoading(false);
        
        // REMOVED auto-start - timer starts only when user clicks start
      } catch (error) {
        console.error('Error fetching problem:', error);
        setLoading(false);
      }
    };

    fetchProblem();

    // Cleanup timer on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [problemId]);

  // Timer functions
  const startTimer = () => {
    if (!isTimerRunning) {
      setIsTimerRunning(true);
      timerRef.current = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
  };

  const pauseTimer = () => {
    if (isTimerRunning) {
      setIsTimerRunning(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setTimer(0);
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Update code when language changes
  useEffect(() => {
    if (problem) {
      const initialCode = problem.startCode.find(sc => sc.language === langMap[selectedLanguage]).initialCode;
      setCode(initialCode);
    }
  }, [selectedLanguage, problem]);

  const handleEditorChange = (value) => {
    setCode(value || '');
  };

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const handleRun = async () => {
    setLoading(true);
    setRunResult(null);
    
    try {
      const response = await axiosClient.post(`/submission/run/${problemId}`, {
        code,
        language: selectedLanguage
      });

      setRunResult(response.data);
      setLoading(false);
      setActiveRightTab('testcase');
    } catch (error) {
      console.error('Error running code:', error);
      setRunResult({
        success: false,
        error: 'Internal server error'
      });
      setLoading(false);
      setActiveRightTab('testcase');
    }
  };

  const handleSubmitCode = async () => {
    setLoading(true);
    setSubmitResult(null);
    
    try {
      const response = await axiosClient.post(`/submission/submit/${problemId}`, {
        code: code,
        language: selectedLanguage
      });

      setSubmitResult(response.data);
      setLoading(false);
      setActiveRightTab('result');
      
      // Stop timer when user submits the solution
      pauseTimer();
    } catch (error) {
      console.error('Error submitting code:', error);
      setSubmitResult(null);
      setLoading(false);
      setActiveRightTab('result');
    }
  };

  const getLanguageForMonaco = (lang) => {
    switch (lang) {
      case 'javascript': return 'javascript';
      case 'java': return 'java';
      case 'cpp': return 'cpp';
      default: return 'javascript';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'hard': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty) {
      case 'easy': return '🟢';
      case 'medium': return '🟡';
      case 'hard': return '🔴';
      default: return '⚪';
    }
  };

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
      {/* Header */}
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
            
            {/* Timer Display */}
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

      <div className="container mx-auto p-6 h-[calc(100vh-80px)]">
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-2xl h-full flex">
          {/* Left Panel */}
          <div className="w-1/2 flex flex-col border-r border-white/10">
            {/* Left Tabs */}
            <div className="flex bg-white/5 px-6 border-b border-white/10">
              {[
                { id: 'description', icon: FileText, label: 'Description' },
                { id: 'editorial', icon: BookOpen, label: 'Editorial' },
                { id: 'solutions', icon: Code, label: 'Solutions' },
                { id: 'submissions', icon: History, label: 'Submissions' },
                { id: 'chatAI', icon: MessageSquare, label: 'ChatAI' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-all duration-300 ${
                    activeLeftTab === tab.id
                      ? 'border-purple-500 text-purple-400 bg-white/5'
                      : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={() => setActiveLeftTab(tab.id)}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="font-medium text-sm">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Left Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {problem && (
                <>
                  {activeLeftTab === 'description' && (
                    <div className="space-y-6">
                      {/* Problem Header */}
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

                      {/* Problem Description */}
                      <div className="prose prose-invert max-w-none">
                        <div className="text-gray-300 leading-relaxed text-base space-y-4">
                          {problem.description.split('\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                          ))}
                        </div>
                      </div>

                      {/* Examples */}
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

                      {/* Timer Start Prompt */}
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
                  )}

                  {activeLeftTab === 'editorial' && (
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold text-white">Editorial</h2>
                      <div className="text-gray-300">
                        <Editorial secureUrl={problem.secureUrl} thumbnailUrl={problem.thumbnailUrl} duration={problem.duration} />
                      </div>
                    </div>
                  )}

                  {activeLeftTab === 'solutions' && (
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
                            <Code className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>Solutions will be available after you solve the problem.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {activeLeftTab === 'submissions' && (
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold text-white">My Submissions</h2>
                      <SubmissionHistory problemId={problemId} />
                    </div>
                  )}

                  {activeLeftTab === 'chatAI' && (
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold text-white">Chat with AI Assistant</h2>
                      <ChatAi problem={problem} />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-1/2 flex flex-col border-l border-white/10">
            {/* Right Tabs */}
            <div className="flex bg-white/5 px-6 border-b border-white/10">
              {[
                { id: 'code', icon: Code, label: 'Code' },
                { id: 'testcase', icon: Play, label: 'Test Results' },
                { id: 'result', icon: Send, label: 'Submission' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-all duration-300 ${
                    activeRightTab === tab.id
                      ? 'border-purple-500 text-purple-400 bg-white/5'
                      : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={() => setActiveRightTab(tab.id)}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="font-medium text-sm">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Right Content */}
            <div className="flex-1 flex flex-col">
              {activeRightTab === 'code' && (
                <div className="flex-1 flex flex-col">
                  {/* Language Selector */}
                  <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
                    <div className="flex space-x-1 bg-white/10 rounded-lg p-1">
                      {[ 'cpp','javascript', 'java'].map((lang) => (
                        <button
                          key={lang}
                          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                            selectedLanguage === lang
                              ? 'bg-purple-600 text-white shadow-lg'
                              : 'text-gray-400 hover:text-white hover:bg-white/10'
                          }`}
                          onClick={() => handleLanguageChange(lang)}
                        >
                          {lang === 'cpp' ? 'C++' : lang === 'javascript' ? 'JavaScript' : 'Java'}
                        </button>
                      ))}
                    </div>
                    
                    {/* Mini Timer */}
                    <div className="flex items-center space-x-2 text-sm">
                      <Timer className={`w-4 h-4 ${isTimerRunning ? 'text-green-400' : 'text-gray-400'}`} />
                      <span className="font-mono text-gray-300">{formatTime(timer)}</span>
                      {!isTimerRunning && timer === 0 && (
                        <span className="text-xs text-yellow-400">Click start!</span>
                      )}
                    </div>
                  </div>

                  {/* Monaco Editor */}
                  <div className="flex-1">
                    <Editor
                      height="100%"
                      language={getLanguageForMonaco(selectedLanguage)}
                      value={code}
                      onChange={handleEditorChange}
                      onMount={handleEditorDidMount}
                      theme="vs-dark"
                      options={{
                        fontSize: 14,
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        tabSize: 2,
                        insertSpaces: true,
                        wordWrap: 'on',
                        lineNumbers: 'on',
                        glyphMargin: false,
                        folding: true,
                        lineDecorationsWidth: 10,
                        lineNumbersMinChars: 3,
                        renderLineHighlight: 'line',
                        selectOnLineNumbers: true,
                        roundedSelection: false,
                        readOnly: false,
                        cursorStyle: 'line',
                        mouseWheelZoom: true,
                      }}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="p-4 border-t border-white/10 bg-white/5 flex justify-between items-center">
                    <button 
                      className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-white transition-colors duration-300"
                      onClick={() => setActiveRightTab('testcase')}
                    >
                      <Play className="w-4 h-4" />
                      <span>Console</span>
                    </button>
                    <div className="flex space-x-3">
                      <button
                        className={`flex items-center space-x-2 px-6 py-2 border border-purple-500/50 text-purple-400 rounded-lg hover:bg-purple-500/10 transition-all duration-300 ${
                          loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                        }`}
                        onClick={handleRun}
                        disabled={loading}
                      >
                        <Play className="w-4 h-4" />
                        <span>Run</span>
                      </button>
                      <button
                        className={`flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 ${
                          loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                        }`}
                        onClick={handleSubmitCode}
                        disabled={loading}
                      >
                        <Send className="w-4 h-4" />
                        <span>Submit</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeRightTab === 'testcase' && (
                <div className="flex-1 p-6 overflow-y-auto">
                  <h3 className="text-lg font-semibold text-white mb-6 flex items-center space-x-2">
                    <Play className="w-5 h-5 text-purple-400" />
                    <span>Test Results</span>
                  </h3>
                  {runResult ? (
                    <div className={`rounded-xl border p-6 ${
                      runResult.success 
                        ? 'bg-emerald-500/10 border-emerald-500/30' 
                        : 'bg-red-500/10 border-red-500/30'
                    }`}>
                      <div className="space-y-4">
                        {runResult.success ? (
                          <>
                            <div className="flex items-center space-x-3 text-emerald-400">
                              <CheckCircle className="w-6 h-6" />
                              <h4 className="font-bold text-lg">All test cases passed!</h4>
                            </div>
                            <div className="flex items-center space-x-6 text-sm text-gray-300">
                              <div className="flex items-center space-x-2">
                                <Clock className="w-4 h-4" />
                                <span>Runtime: {runResult.runtime} sec</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Cpu className="w-4 h-4" />
                                <span>Memory: {runResult.memory} KB</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Timer className="w-4 h-4" />
                                <span>Time elapsed: {formatTime(timer)}</span>
                              </div>
                            </div>
                            <div className="space-y-3 mt-4">
                              {runResult.testCases.map((tc, i) => (
                                <div key={i} className="bg-white/5 rounded-lg p-4 border border-white/10">
                                  <div className="font-mono text-sm space-y-2">
                                    <div className="flex items-center space-x-2">
                                      <span className="text-gray-400">Input:</span>
                                      <code className="text-green-300">{tc.stdin}</code>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <span className="text-gray-400">Expected:</span>
                                      <code className="text-blue-300">{tc.expected_output}</code>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <span className="text-gray-400">Output:</span>
                                      <code className="text-emerald-300">{tc.stdout}</code>
                                    </div>
                                    <div className="flex items-center space-x-2 text-emerald-400">
                                      <CheckCircle className="w-4 h-4" />
                                      <span className="text-sm">Passed</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center space-x-3 text-red-400">
                              <XCircle className="w-6 h-6" />
                              <h4 className="font-bold text-lg">Test Cases Failed</h4>
                            </div>
                            <div className="flex items-center space-x-6 text-sm text-gray-300">
                              <div className="flex items-center space-x-2">
                                <Timer className="w-4 h-4" />
                                <span>Time elapsed: {formatTime(timer)}</span>
                              </div>
                            </div>
                            <div className="space-y-3">
                              {runResult.testCases.map((tc, i) => (
                                <div key={i} className="bg-white/5 rounded-lg p-4 border border-white/10">
                                  <div className="font-mono text-sm space-y-2">
                                    <div className="flex items-center space-x-2">
                                      <span className="text-gray-400">Input:</span>
                                      <code className="text-green-300">{tc.stdin}</code>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <span className="text-gray-400">Expected:</span>
                                      <code className="text-blue-300">{tc.expected_output}</code>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <span className="text-gray-400">Output:</span>
                                      <code className="text-red-300">{tc.stdout}</code>
                                    </div>
                                    <div className={`flex items-center space-x-2 ${
                                      tc.status_id == 3 ? 'text-emerald-400' : 'text-red-400'
                                    }`}>
                                      {tc.status_id == 3 ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                                      <span className="text-sm">
                                        {tc.status_id == 3 ? 'Passed' : 'Failed'}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-400">
                      <Play className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Click "Run" to test your code with the example test cases.</p>
                    </div>
                  )}
                </div>
              )}

              {activeRightTab === 'result' && (
                <div className="flex-1 p-6 overflow-y-auto">
                  <h3 className="text-lg font-semibold text-white mb-6 flex items-center space-x-2">
                    <Send className="w-5 h-5 text-purple-400" />
                    <span>Submission Result</span>
                  </h3>
                  {submitResult ? (
                    <div className={`rounded-xl border p-6 ${
                      submitResult.accepted
                        ? 'bg-emerald-500/10 border-emerald-500/30'
                        : 'bg-red-500/10 border-red-500/30'
                    }`}>
                      {submitResult.accepted ? (
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3 text-emerald-400">
                            <CheckCircle className="w-8 h-8" />
                            <h4 className="font-bold text-2xl">Accepted</h4>
                          </div>
                          <div className="space-y-3 text-gray-300">
                            <div className="flex items-center space-x-4">
                              <div className="bg-white/10 px-3 py-2 rounded-lg">
                                <span className="text-sm text-gray-400">Test Cases</span>
                                <div className="text-lg font-semibold">
                                  {submitResult.passedTestCases}/{submitResult.totalTestCases}
                                </div>
                              </div>
                              <div className="bg-white/10 px-3 py-2 rounded-lg">
                                <span className="text-sm text-gray-400">Runtime</span>
                                <div className="text-lg font-semibold">{submitResult.runtime} sec</div>
                              </div>
                              <div className="bg-white/10 px-3 py-2 rounded-lg">
                                <span className="text-sm text-gray-400">Memory</span>
                                <div className="text-lg font-semibold">{submitResult.memory} KB</div>
                              </div>
                              <div className="bg-white/10 px-3 py-2 rounded-lg">
                                <span className="text-sm text-gray-400">Total Time</span>
                                <div className="text-lg font-semibold">{formatTime(timer)}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3 text-red-400">
                            <XCircle className="w-8 h-8" />
                            <h4 className="font-bold text-2xl">{submitResult.error}</h4>
                          </div>
                          <div className="text-gray-300">
                            <div className="bg-white/10 px-4 py-3 rounded-lg">
                              <span className="text-sm text-gray-400">Test Cases Passed</span>
                              <div className="text-lg font-semibold">
                                {submitResult.passedTestCases}/{submitResult.totalTestCases}
                              </div>
                            </div>
                            <div className="mt-3 text-sm text-gray-400">
                              Time spent: {formatTime(timer)}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-400">
                      <Send className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Click "Submit" to submit your solution for evaluation.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;