import React from 'react';
import { Code, Timer, Pause, Play as PlayIcon, Square } from 'lucide-react';
import { NavLink } from 'react-router';
import ThemeToggle from '../../../components/ThemeToggle';
import { formatTime } from '../utils/problemData';

const ProblemHeader = ({ timer, isTimerRunning, startTimer, pauseTimer, resetTimer }) => {
  return (
    <div className="problem-header">
      <div className="problem-header__inner">
        <div className="problem-header__left">
          <NavLink to="/home" className="problem-header__logo" style={{ textDecoration: 'none' }}>
            <Code className="w-5 h-5" />
          </NavLink>
          <div className="problem-header__brand">
            <h1>Codify-CODE</h1>
            <p>Problem Solver</p>
          </div>
        </div>

        <div className="problem-header__right">
          <div className="timer-display">
            <Timer className="w-4 h-4 text-purple-400" />
            <div>
              <div className="timer-display__time">{formatTime(timer)}</div>
              <div className="timer-display__label">
                {isTimerRunning ? 'Running' : 'Stopped'}
              </div>
            </div>
            <div className="timer-display__controls">
              {isTimerRunning ? (
                <button
                  onClick={pauseTimer}
                  className="timer-btn timer-btn--pause"
                  title="Pause Timer"
                >
                  <Pause className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={startTimer}
                  className="timer-btn timer-btn--start"
                  title="Start Timer"
                >
                  <PlayIcon className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={resetTimer}
                className="timer-btn timer-btn--reset"
                title="Reset Timer"
              >
                <Square className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="header-info">
            <p className="header-info__env">Coding Environment</p>
            <p className="header-info__hint">Solve • Test • Submit</p>
          </div>

          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default ProblemHeader;
