import React from 'react';

const CodeModal = ({ submission, getStatusColor, formatMemory, getSafeValue, onClose }) => {
  if (!submission) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-lg mb-4">
          Submission Details: {getSafeValue(submission, 'language', 'Unknown')}
        </h3>
        
        <div className="mb-4">
          <div className="flex flex-wrap gap-2 mb-2">
            <span className={`badge ${getStatusColor(submission?.status)}`}>
              {getSafeValue(submission, 'status', 'Unknown')}
            </span>
            <span className="badge badge-outline">
              Runtime: {getSafeValue(submission, 'runtime', 'N/A')}s
            </span>
            <span className="badge badge-outline">
              Memory: {formatMemory(submission?.memory)}
            </span>
            <span className="badge badge-outline">
              Passed: {getSafeValue(submission, 'testCasesPassed', 0)}/{getSafeValue(submission, 'testCasesTotal', 0)}
            </span>
          </div>
          
          {submission?.errorMessage && (
            <div className="alert alert-error mt-2">
              <div>
                <span>{submission.errorMessage}</span>
              </div>
            </div>
          )}
        </div>
        
        <pre className="p-4 bg-gray-900 text-gray-100 rounded overflow-x-auto max-h-96">
          <code>{getSafeValue(submission, 'code', 'No code available')}</code>
        </pre>
        
        <div className="modal-action">
          <button 
            className="btn"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeModal;
