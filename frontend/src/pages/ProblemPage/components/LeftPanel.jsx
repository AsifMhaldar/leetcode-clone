import React from 'react';
import { Clock, Cpu, Timer } from 'lucide-react';
import { getDifficultyColor, getDifficultyIcon, formatTime } from '../utils/problemData';
import Editorial from '../../../components/Editorial/Editorial';
import SubmissionHistory from '../../../components/SubmissionHistory/SubmissionHistory';
import ChatAi from '../../../components/ChatAi/ChatAi';
import CommentSection from '../../../components/Comments/CommentSection';

const DescriptionTab = ({ problem, timer, isTimerRunning }) => {
  return (
    <div className="desc">
      <div className="desc__header">
        <h1 className="desc__title">{problem.title}</h1>
        <div className="desc__tags">
          <span className={`desc__badge desc__badge--${problem.difficulty}`}>
            {getDifficultyIcon(problem.difficulty)} {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
          </span>
          <span className="desc__badge desc__badge--tag">
            {problem.tags}
          </span>
        </div>
      </div>

      <div className="desc__meta">
        <span className="desc__meta-item">
          <Clock className="w-4 h-4" />
          30 min avg
        </span>
        <span className="desc__meta-item">
          <Cpu className="w-4 h-4" />
          All levels
        </span>
        <span className="desc__meta-item">
          <Timer className="w-4 h-4" />
          Your time: {formatTime(timer)}
          {!isTimerRunning && <span className="desc__meta-hint">(Stopped)</span>}
        </span>
      </div>

      <div className="desc__body">
        {problem.description.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <div className="examples">
        <h3 className="examples__heading">
          <div className="examples__dot" />
          <span>Examples</span>
        </h3>
        <div className="examples__list">
          {problem.visibleTestCases.map((example, index) => (
            <div key={index} className="example-card">
              <h4 className="example-card__title">Example {index + 1}</h4>
              <div className="example-card__fields">
                <div className="example-card__field">
                  <span className="example-card__label">Input:</span>
                  <code className="example-card__code example-card__code--green">{example.input}</code>
                </div>
                <div className="example-card__field">
                  <span className="example-card__label">Output:</span>
                  <code className="example-card__code example-card__code--blue">{example.output}</code>
                </div>
                <div className="example-card__field">
                  <span className="example-card__label">Explain:</span>
                  <span className="example-card__explanation">{example.explanation}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {!isTimerRunning && timer === 0 && (
        <div className="timer-prompt">
          <Timer className="w-5 h-5" style={{ color: 'var(--accent-yellow)', flexShrink: 0 }} />
          <div>
            <div className="timer-prompt__title">Ready to start coding?</div>
            <p className="timer-prompt__text">
              Click the start button in the timer to begin tracking your solving time!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const EditorialTab = ({ problem }) => (
  <div className="desc">
    <h2 className="tab-heading">Editorial</h2>
    <Editorial secureUrl={problem.secureUrl} thumbnailUrl={problem.thumbnailUrl} duration={problem.duration} />
  </div>
);

const SolutionsTab = ({ problem }) => (
  <div className="desc">
    <h2 className="tab-heading">Solutions</h2>
    <div className="solutions-list">
      {problem.referenceSolution?.map((solution, index) => (
        <div key={index} className="solution-card">
          <div className="solution-card__header">
            <h3>{problem?.title} - {solution?.language}</h3>
          </div>
          <pre className="solution-card__code">
            <code>{solution?.completeCode}</code>
          </pre>
        </div>
      )) || (
        <div className="right-empty">
          <p>Solutions will be available after you solve the problem.</p>
        </div>
      )}
    </div>
  </div>
);

const SubmissionsTab = ({ problemId }) => (
  <div className="desc">
    <h2 className="tab-heading">My Submissions</h2>
    <SubmissionHistory problemId={problemId} />
  </div>
);

const ChatAITab = ({ problem }) => (
  <div className="desc">
    <h2 className="tab-heading">Chat with AI Assistant</h2>
    <ChatAi problem={problem} />
  </div>
);

const CommentsTab = ({ problemId }) => (
  <div className="desc">
    <h2 className="tab-heading">Comments</h2>
    <CommentSection problemId={problemId} />
  </div>
);

const LeftPanel = ({ problem, activeLeftTab, timer, isTimerRunning, problemId }) => {
  return (
    <div className="left-panel__content">
      {problem && (
        <>
          {activeLeftTab === 'description' && (
            <DescriptionTab problem={problem} timer={timer} isTimerRunning={isTimerRunning} />
          )}
          {activeLeftTab === 'editorial' && <EditorialTab problem={problem} />}
          {activeLeftTab === 'solutions' && <SolutionsTab problem={problem} />}
          {activeLeftTab === 'submissions' && <SubmissionsTab problemId={problemId} />}
          {activeLeftTab === 'chatAI' && <ChatAITab problem={problem} />}
          {activeLeftTab === 'comments' && <CommentsTab problemId={problemId} />}
        </>
      )}
    </div>
  );
};

export default LeftPanel;
