import { useState, useEffect } from 'react';
import axiosClient from '../utils/axiosClient';

const SubmissionHistory = ({ problemId }) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get(`/problem/submittedProblem/${problemId}`);
        
        // Ensure response.data is always an array
        if (Array.isArray(response.data)) {
          setSubmissions(response.data);
        } else {
          setSubmissions([]);
          console.warn('Expected array but got:', typeof response.data);
        }
        
        setError(null);
      } catch (err) {
        setError('Failed to fetch submission history');
        setSubmissions([]); // Reset to empty array on error
        console.error('Submission fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (problemId) {
      fetchSubmissions();
    } else {
      setError('Problem ID is required');
      setLoading(false);
    }
  }, [problemId]);

  const getStatusColor = (status) => {
    if (!status) return 'badge-neutral';
    
    switch (status.toLowerCase()) {
      case 'accepted': return 'badge-success';
      case 'wrong': return 'badge-error';
      case 'error': return 'badge-warning';
      case 'pending': return 'badge-info';
      default: return 'badge-neutral';
    }
  };

  const formatMemory = (memory) => {
    if (!memory || isNaN(memory)) return 'N/A';
    if (memory < 1024) return `${memory} kB`;
    return `${(memory / 1024).toFixed(2)} MB`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleString();
    } catch (error) {
      return 'Invalid Date';
    }
  };

  // Safe data access helper
  const getSafeValue = (obj, key, defaultValue = 'N/A') => {
    return obj?.[key] ?? defaultValue;
  };

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
        <>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Language</th>
                  <th>Status</th>
                  <th>Runtime</th>
                  <th>Memory</th>
                  <th>Test Cases</th>
                  <th>Submitted</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((sub, index) => (
                  <tr key={sub?._id || index}>
                    <td>{index + 1}</td>
                    <td className="font-mono">{getSafeValue(sub, 'language')}</td>
                    <td>
                      <span className={`badge ${getStatusColor(sub?.status)}`}>
                        {getSafeValue(sub, 'status', 'Unknown').charAt(0).toUpperCase() + getSafeValue(sub, 'status', '').slice(1)}
                      </span>
                    </td>
                    <td className="font-mono">{getSafeValue(sub, 'runtime')}s</td>
                    <td className="font-mono">{formatMemory(sub?.memory)}</td>
                    <td className="font-mono">
                      {getSafeValue(sub, 'testCasesPassed', 0)}/{getSafeValue(sub, 'testCasesTotal', 0)}
                    </td>
                    <td>{formatDate(sub?.createdAt)}</td>
                    <td>
                      <button 
                        className="btn btn-sm btn-outline"
                        onClick={() => setSelectedSubmission(sub)}
                        disabled={!sub?.code}
                      >
                        Code
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Showing {submissions.length} submission{submissions.length !== 1 ? 's' : ''}
          </p>
        </>
      )}

      {/* Code View Modal */}
      {selectedSubmission && (
        <div className="modal modal-open">
          <div className="modal-box w-11/12 max-w-5xl">
            <h3 className="font-bold text-lg mb-4">
              Submission Details: {getSafeValue(selectedSubmission, 'language', 'Unknown')}
            </h3>
            
            <div className="mb-4">
              <div className="flex flex-wrap gap-2 mb-2">
                <span className={`badge ${getStatusColor(selectedSubmission?.status)}`}>
                  {getSafeValue(selectedSubmission, 'status', 'Unknown')}
                </span>
                <span className="badge badge-outline">
                  Runtime: {getSafeValue(selectedSubmission, 'runtime', 'N/A')}s
                </span>
                <span className="badge badge-outline">
                  Memory: {formatMemory(selectedSubmission?.memory)}
                </span>
                <span className="badge badge-outline">
                  Passed: {getSafeValue(selectedSubmission, 'testCasesPassed', 0)}/{getSafeValue(selectedSubmission, 'testCasesTotal', 0)}
                </span>
              </div>
              
              {selectedSubmission?.errorMessage && (
                <div className="alert alert-error mt-2">
                  <div>
                    <span>{selectedSubmission.errorMessage}</span>
                  </div>
                </div>
              )}
            </div>
            
            <pre className="p-4 bg-gray-900 text-gray-100 rounded overflow-x-auto max-h-96">
              <code>{getSafeValue(selectedSubmission, 'code', 'No code available')}</code>
            </pre>
            
            <div className="modal-action">
              <button 
                className="btn"
                onClick={() => setSelectedSubmission(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmissionHistory;