import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useParams } from 'react-router';
import { FileText, BookOpen, Code, MessageSquare, History, Play, Send, Terminal, FileCode } from 'lucide-react';
import { useProblemPage } from './hooks/useProblemPage';
import { leftTabs } from './utils/problemData';
import ProblemHeader from './components/ProblemHeader';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import './ProblemPage.scss';

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [query]);
  return matches;
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

  const [leftWidth, setLeftWidth] = useState(42);
  const [isDragging, setIsDragging] = useState(false);
  const [activeConsoleTab, setActiveConsoleTab] = useState('testcase');
  const [mobileSection, setMobileSection] = useState('editor');
  const [consoleHeight, setConsoleHeight] = useState(280);
  const layoutRef = useRef(null);
  const consoleDragging = useRef(false);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isMobile = useMediaQuery('(max-width: 767px)');

  const onRun = useCallback(() => {
    setActiveConsoleTab('testcase');
    setMobileSection('console');
    handleRun();
  }, [handleRun]);

  const onSubmit = useCallback(() => {
    setActiveConsoleTab('result');
    setMobileSection('console');
    handleSubmitCode();
  }, [handleSubmitCode]);

  const handleDragStart = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  useEffect(() => {
    if (!isDragging) return;
    const handleMouseMove = (e) => {
      if (!layoutRef.current) return;
      const rect = layoutRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const pct = (x / rect.width) * 100;
      setLeftWidth(Math.min(Math.max(pct, 25), 65));
    };
    const handleMouseUp = () => setIsDragging(false);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleConsoleDragStart = useCallback((e) => {
    e.preventDefault();
    consoleDragging.current = true;
    const startY = e.clientY;
    const startHeight = consoleHeight;
    const handleMouseMove = (e) => {
      const delta = startY - e.clientY;
      const newHeight = Math.min(Math.max(startHeight + delta, 120), 500);
      setConsoleHeight(newHeight);
    };
    const handleMouseUp = () => {
      consoleDragging.current = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [consoleHeight]);

  if (loading && !problem) {
    return (
      <div className="problem-page__spinner">
        <div className="page-spinner"></div>
        <p>Loading problem...</p>
      </div>
    );
  }

  const consoleTabs = [
    { id: 'testcase', label: 'Test Cases', icon: FileCode },
    { id: 'output', label: 'Output', icon: Terminal },
    { id: 'result', label: 'Submission', icon: Send },
  ];

  const isPanelView = isDesktop;
  const gridStyle = isPanelView
    ? {
        gridTemplateColumns: `${leftWidth}% 4px 1fr`,
        gridTemplateRows: `1fr ${consoleHeight}px`,
      }
    : undefined;

  return (
    <div className="problem-page">
      <ProblemHeader
        timer={timer}
        isTimerRunning={isTimerRunning}
        startTimer={startTimer}
        pauseTimer={pauseTimer}
        resetTimer={resetTimer}
      />

      {/* Mobile Tab Bar */}
      {!isDesktop && (
        <div className="mobile-tab-bar">
          <div className="mobile-tabs">
            <button
              className={`mobile-tab ${mobileSection === 'description' ? 'mobile-tab--active' : ''}`}
              onClick={() => setMobileSection('description')}
            >
              <FileText />
              <span>Problem</span>
            </button>
            <button
              className={`mobile-tab ${mobileSection === 'editor' ? 'mobile-tab--active' : ''}`}
              onClick={() => setMobileSection('editor')}
            >
              <Code />
              <span>Editor</span>
            </button>
            <button
              className={`mobile-tab ${mobileSection === 'console' ? 'mobile-tab--active' : ''}`}
              onClick={() => setMobileSection('console')}
            >
              <Terminal />
              <span>Console</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Layout — CSS Grid on desktop, stacked on mobile */}
      <div
        className={`problem-layout ${isDesktop ? 'problem-layout--grid' : ''} ${isDragging || consoleDragging.current ? 'problem-layout--dragging' : ''}`}
        ref={layoutRef}
        style={gridStyle}
      >
        {/* Left Panel */}
        <div
          className={`left-panel ${mobileSection === 'description' ? 'left-panel--mobile-active' : ''} ${isDesktop ? 'left-panel--desktop' : ''}`}
        >
          <div className="panel-tabs">
            {leftTabs.map((tab) => {
              const IconComponent = {
                description: FileText,
                editorial: BookOpen,
                solutions: Code,
                submissions: History,
                chatAI: MessageSquare,
                comments: MessageSquare,
              }[tab.id];
              return (
                <button
                  key={tab.id}
                  className={`panel-tab ${activeLeftTab === tab.id ? 'panel-tab--active' : ''}`}
                  onClick={() => setActiveLeftTab(tab.id)}
                >
                  {IconComponent && <IconComponent />}
                  <span>{tab.label}</span>
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

        {/* Vertical Divider (desktop only) */}
        {isDesktop && (
          <div
            className={`resizable-divider ${isDragging ? 'resizable-divider--dragging' : ''}`}
            onMouseDown={handleDragStart}
          />
        )}

        {/* Right Panel — Editor */}
        <div
          className={`right-panel ${mobileSection === 'editor' ? 'right-panel--mobile-active' : ''} ${isDesktop ? 'right-panel--desktop' : ''}`}
        >
          <RightPanel
            selectedLanguage={selectedLanguage}
            code={code}
            loading={loading}
            onLanguageChange={handleLanguageChange}
            onEditorChange={handleEditorChange}
            onEditorMount={handleEditorDidMount}
            onRun={handleRun}
            onSubmit={handleSubmitCode}
          />
        </div>

        {/* Console Panel */}
        <div
          className={`console-panel ${isDesktop ? 'console-panel--desktop' : ''} ${mobileSection === 'console' ? 'console-panel--mobile-active' : ''}`}
        >
          {/* Horizontal resize handle (desktop only) */}
          {isDesktop && (
            <div
              className="console-resize-handle"
              onMouseDown={handleConsoleDragStart}
            />
          )}
          <div className="console-header">
            <div className="console-tabs">
              {consoleTabs.map((tab) => {
                const Icon = tab.icon;
                const tabClass = tab.id === 'result' && submitResult
                  ? submitResult.accepted ? 'console-tab--pass' : 'console-tab--fail'
                  : tab.id === 'testcase' && runResult
                    ? runResult.success ? 'console-tab--pass' : 'console-tab--fail'
                    : '';
                return (
                  <button
                    key={tab.id}
                    className={`console-tab ${activeConsoleTab === tab.id ? 'console-tab--active' : ''} ${tabClass}`}
                    onClick={() => setActiveConsoleTab(tab.id)}
                  >
                    <Icon />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
            <div className="console-actions">
              <button className="btn-run" onClick={onRun} disabled={loading}>
                <Play />
                <span>Run</span>
              </button>
              <button className="btn-submit" onClick={onSubmit} disabled={loading}>
                <Send />
                <span>Submit</span>
              </button>
            </div>
          </div>
          <div className="console-content">
            {activeConsoleTab === 'testcase' && <TestCaseContent runResult={runResult} />}
            {activeConsoleTab === 'output' && <OutputContent runResult={runResult} />}
            {activeConsoleTab === 'result' && <SubmissionContent submitResult={submitResult} />}
          </div>
        </div>
      </div>
    </div>
  );
};

const TestCaseContent = ({ runResult }) => {
  if (!runResult) {
    return (
      <div className="right-empty">
        <Play className="icon" style={{ width: '2rem', height: '2rem' }} />
        <p>Click "Run" to test your code with the example test cases.</p>
      </div>
    );
  }

  return (
    <div className={`result-card ${runResult.success ? 'result-card--pass' : 'result-card--fail'}`}>
      <div className={`result-card__status ${runResult.success ? 'result-card__status--pass' : 'result-card__status--fail'}`}>
        {runResult.success ? '✓ All test cases passed!' : '✗ Test Cases Failed'}
      </div>
      <div className="tc-list">
        {runResult.testCases?.map((tc, i) => (
          <div key={i} className="tc-card">
            <div className="tc-card__code">
              <div className="tc-card__row">
                <span className="tc-card__label">Input:</span>
                <code className="tc-card__val">{tc.stdin}</code>
              </div>
              <div className="tc-card__row">
                <span className="tc-card__label">Expected:</span>
                <code className="tc-card__val tc-card__val--blue">{tc.expected_output}</code>
              </div>
              <div className="tc-card__row">
                <span className="tc-card__label">Output:</span>
                <code className="tc-card__val">{tc.stdout}</code>
              </div>
              <div className={`tc-card__status ${tc.status_id == 3 ? 'tc-card__status--pass' : 'tc-card__status--fail'}`}>
                {tc.status_id == 3 ? '✓ Passed' : '✗ Failed'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const OutputContent = ({ runResult }) => {
  if (!runResult) {
    return (
      <div className="right-empty">
        <Terminal className="icon" style={{ width: '2rem', height: '2rem' }} />
        <p>Output from your code will appear here after you run it.</p>
      </div>
    );
  }

  return (
    <div className="output-content">
      {runResult.testCases?.map((tc, i) => (
        <div key={i} className="output-content__row">
          <span className="output-content__label">Test Case {i + 1}: </span>
          <code className="output-content__val">{tc.stdout}</code>
        </div>
      ))}
      {runResult.success !== undefined && (
        <div className={`output-content__status ${runResult.success ? 'output-content__status--pass' : 'output-content__status--fail'}`}>
          {runResult.success ? 'All tests passed' : 'Some tests failed'}
        </div>
      )}
    </div>
  );
};

const SubmissionContent = ({ submitResult }) => {
  if (!submitResult) {
    return (
      <div className="right-empty">
        <Send className="icon" style={{ width: '2rem', height: '2rem' }} />
        <p>Click "Submit" to submit your solution for evaluation.</p>
      </div>
    );
  }

  return (
    <div className={`result-card ${submitResult.accepted ? 'result-card--pass' : 'result-card--fail'}`}>
      <div className={`result-card__status ${submitResult.accepted ? 'result-card__status--pass' : 'result-card__status--fail'}`}>
        {submitResult.accepted ? '✓ Accepted' : `✗ ${submitResult.error}`}
      </div>
      <div className="stat-badge stat-badge--row">
        <div className="stat-badge">
          <span className="stat-badge__label">Test Cases</span>
          <div className="stat-badge__value">{submitResult.passedTestCases}/{submitResult.totalTestCases}</div>
        </div>
        <div className="stat-badge">
          <span className="stat-badge__label">Runtime</span>
          <div className="stat-badge__value">{submitResult.runtime} sec</div>
        </div>
        <div className="stat-badge">
          <span className="stat-badge__label">Memory</span>
          <div className="stat-badge__value">{submitResult.memory} KB</div>
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;
