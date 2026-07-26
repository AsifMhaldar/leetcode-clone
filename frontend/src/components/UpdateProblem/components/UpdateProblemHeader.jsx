import React from 'react';
import { Settings, ArrowLeft, RefreshCw } from 'lucide-react';
import { HEADER_BRAND_TITLE, HEADER_REFRESH_TEXT, HEADER_BACK_TEXT } from '../constants';
import './UpdateProblemHeader.scss';

const UpdateProblemHeader = ({ problem, problemId, loading, onRefresh, onBack }) => {
  return (
    <nav className="admin-nav">
      <div className="admin-nav__inner">
        <div className="admin-nav__brand">
          <div className="admin-nav__icon">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-theme-primary">{HEADER_BRAND_TITLE}</h1>
            <p className="text-sm text-theme-muted">
              {problem ? problem.title : `Problem ID: ${problemId}`}
            </p>
          </div>
        </div>
        
        <div className="admin-nav__actions">
          <button
            onClick={onRefresh}
            disabled={loading}
            className="admin-nav__btn"
          >
            <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
            <span>{HEADER_REFRESH_TEXT}</span>
          </button>
          <button
            onClick={onBack}
            className="admin-nav__btn"
          >
            <ArrowLeft size={20} />
            <span>{HEADER_BACK_TEXT}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default UpdateProblemHeader;
