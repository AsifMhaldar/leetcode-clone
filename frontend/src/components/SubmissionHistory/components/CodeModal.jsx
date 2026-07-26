import React from 'react';
import { MODAL_TITLE_PREFIX, MODAL_RUNTIME_LABEL, MODAL_MEMORY_LABEL, MODAL_PASSED_LABEL, MODAL_NO_CODE, CLOSE_BUTTON } from '../constants';
import './CodeModal.scss';

const CodeModal = ({ submission, getStatusColor, formatMemory, getSafeValue, onClose }) => {
  if (!submission) return null;

  return (
    <div className="code-modal">
      <div className="code-modal__box">
        <h3 className="code-modal__title">
          {MODAL_TITLE_PREFIX} {getSafeValue(submission, 'language', 'Unknown')}
        </h3>
        
        <div>
          <div className="code-modal__badges">
            <span className={`code-modal__badge ${getStatusColor(submission?.status)}`}>
              {getSafeValue(submission, 'status', 'Unknown')}
            </span>
            <span className="code-modal__badge code-modal__badge--outline">
              {MODAL_RUNTIME_LABEL} {getSafeValue(submission, 'runtime', 'N/A')}s
            </span>
            <span className="code-modal__badge code-modal__badge--outline">
              {MODAL_MEMORY_LABEL} {formatMemory(submission?.memory)}
            </span>
            <span className="code-modal__badge code-modal__badge--outline">
              {MODAL_PASSED_LABEL} {getSafeValue(submission, 'testCasesPassed', 0)}/{getSafeValue(submission, 'testCasesTotal', 0)}
            </span>
          </div>
          
          {submission?.errorMessage && (
            <div className="code-modal__error">
              <span>{submission.errorMessage}</span>
            </div>
          )}
        </div>
        
        <pre className="code-modal__code">
          <code>{getSafeValue(submission, 'code', MODAL_NO_CODE)}</code>
        </pre>
        
        <div className="code-modal__actions">
          <button 
            className="code-modal__close-btn"
            onClick={onClose}
          >
            {CLOSE_BUTTON}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeModal;
