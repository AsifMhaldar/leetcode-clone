import React from 'react';
import Editor from '@monaco-editor/react';
import { Play, Send, CheckCircle, XCircle, Clock, Cpu, Timer } from 'lucide-react';
import { languages, getLanguageForMonaco, formatTime } from '../utils/problemData';

const LanguageSelector = ({ selectedLanguage, onLanguageChange, timer, isTimerRunning }) => (
  <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
    <div className="flex space-x-1 bg-white/10 rounded-lg p-1">
      {languages.map((lang) => (
        <button
          key={lang}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
            selectedLanguage === lang
              ? 'bg-purple-600 text-white shadow-lg'
              : 'text-gray-400 hover:text-white hover:bg-white/10'
          }`}
          onClick={() => onLanguageChange(lang)}
        >
          {lang === 'cpp' ? 'C++' : lang === 'javascript' ? 'JavaScript' : 'Java'}
        </button>
      ))}
    </div>
    <div className="flex items-center space-x-2 text-sm">
      <Timer className={`w-4 h-4 ${isTimerRunning ? 'text-green-400' : 'text-gray-400'}`} />
      <span className="font-mono text-gray-300">{formatTime(timer)}</span>
      {!isTimerRunning && timer === 0 && (
        <span className="text-xs text-yellow-400">Click start!</span>
      )}
    </div>
  </div>
);

const CodeEditor = ({ selectedLanguage, code, onEditorChange, onEditorMount }) => (
  <div className="flex-1">
    <Editor
      height="100%"
      language={getLanguageForMonaco(selectedLanguage)}
      value={code}
      onChange={onEditorChange}
      onMount={onEditorMount}
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
);

const ActionButtons = ({ loading, onRun, onSubmit, onConsole }) => (
  <div className="p-4 border-t border-white/10 bg-white/5 flex justify-between items-center">
    <button 
      className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-white transition-colors duration-300"
      onClick={onConsole}
    >
      <Play className="w-4 h-4" />
      <span>Console</span>
    </button>
    <div className="flex space-x-3">
      <button
        className={`flex items-center space-x-2 px-6 py-2 border border-purple-500/50 text-purple-400 rounded-lg hover:bg-purple-500/10 transition-all duration-300 ${
          loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
        }`}
        onClick={onRun}
        disabled={loading}
      >
        <Play className="w-4 h-4" />
        <span>Run</span>
      </button>
      <button
        className={`flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 ${
          loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
        }`}
        onClick={onSubmit}
        disabled={loading}
      >
        <Send className="w-4 h-4" />
        <span>Submit</span>
      </button>
    </div>
  </div>
);

const TestCaseResult = ({ runResult, timer }) => {
  if (!runResult) {
    return (
      <div className="text-center py-12 text-gray-400">
        <Play className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>Click "Run" to test your code with the example test cases.</p>
      </div>
    );
  }

  return (
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
  );
};

const SubmissionResult = ({ submitResult, timer }) => {
  if (!submitResult) {
    return (
      <div className="text-center py-12 text-gray-400">
        <Send className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>Click "Submit" to submit your solution for evaluation.</p>
      </div>
    );
  }

  return (
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
  );
};

const RightPanel = ({
  activeRightTab,
  selectedLanguage,
  code,
  loading,
  timer,
  isTimerRunning,
  runResult,
  submitResult,
  onLanguageChange,
  onEditorChange,
  onEditorMount,
  onRun,
  onSubmit
}) => {
  return (
    <div className="w-1/2 flex flex-col border-l border-white/10">
      <div className="flex-1 flex flex-col">
        {activeRightTab === 'code' && (
          <div className="flex-1 flex flex-col">
            <LanguageSelector
              selectedLanguage={selectedLanguage}
              onLanguageChange={onLanguageChange}
              timer={timer}
              isTimerRunning={isTimerRunning}
            />
            <CodeEditor
              selectedLanguage={selectedLanguage}
              code={code}
              onEditorChange={onEditorChange}
              onEditorMount={onEditorMount}
            />
            <ActionButtons
              loading={loading}
              onRun={onRun}
              onSubmit={onSubmit}
              onConsole={() => {}}
            />
          </div>
        )}

        {activeRightTab === 'testcase' && (
          <div className="flex-1 p-6 overflow-y-auto">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center space-x-2">
              <Play className="w-5 h-5 text-purple-400" />
              <span>Test Results</span>
            </h3>
            <TestCaseResult runResult={runResult} timer={timer} />
          </div>
        )}

        {activeRightTab === 'result' && (
          <div className="flex-1 p-6 overflow-y-auto">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center space-x-2">
              <Send className="w-5 h-5 text-purple-400" />
              <span>Submission Result</span>
            </h3>
            <SubmissionResult submitResult={submitResult} timer={timer} />
          </div>
        )}
      </div>
    </div>
  );
};

export default RightPanel;
