import React from 'react';
import { useSubmissionHistory } from './hooks/useSubmissionHistory';
import SubmissionTable from './components/SubmissionTable';
import CodeModal from './components/CodeModal';

const SubmissionHistory = ({ problemId }) => {
  const {
    submissions,
    loading,
    error,
    selectedSubmission,
    setSelectedSubmission,
    getStatusColor,
    formatMemory,
    formatDate,
    getSafeValue
  } = useSubmissionHistory(problemId);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error shadow-lg my-4">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Submission History</h2>
      
      {!submissions || submissions.length === 0 ? (
        <div className="alert alert-info shadow-lg">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>No submissions found for this problem</span>
          </div>
        </div>
      ) : (
        <SubmissionTable
          submissions={submissions}
          getStatusColor={getStatusColor}
          formatMemory={formatMemory}
          formatDate={formatDate}
          getSafeValue={getSafeValue}
          onViewCode={setSelectedSubmission}
        />
      )}

      <CodeModal
        submission={selectedSubmission}
        getStatusColor={getStatusColor}
        formatMemory={formatMemory}
        getSafeValue={getSafeValue}
        onClose={() => setSelectedSubmission(null)}
      />
    </div>
  );
};

export default SubmissionHistory;
