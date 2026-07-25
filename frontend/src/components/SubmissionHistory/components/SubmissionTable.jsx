import React from 'react';

const SubmissionTable = ({ submissions, getStatusColor, formatMemory, formatDate, getSafeValue, onViewCode }) => {
  return (
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
                    onClick={() => onViewCode(sub)}
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
  );
};

export default SubmissionTable;
