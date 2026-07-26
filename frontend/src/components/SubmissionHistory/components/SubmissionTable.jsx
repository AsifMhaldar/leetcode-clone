import React from 'react';
import { CODE_BUTTON } from '../constants';
import './SubmissionTable.scss';

const SubmissionTable = ({ submissions, getStatusColor, formatMemory, formatDate, getSafeValue, onViewCode }) => {
  return (
    <>
      <div className="submission-table__wrap">
        <table className="submission-table__table">
          <thead>
            <tr>
              <th className="submission-table__th">#</th>
              <th className="submission-table__th">Language</th>
              <th className="submission-table__th">Status</th>
              <th className="submission-table__th">Runtime</th>
              <th className="submission-table__th">Memory</th>
              <th className="submission-table__th">Test Cases</th>
              <th className="submission-table__th">Submitted</th>
              <th className="submission-table__th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((sub, index) => (
              <tr key={sub?._id || index} className="submission-table__row">
                <td className="submission-table__td">{index + 1}</td>
                <td className="submission-table__td submission-table__mono">{getSafeValue(sub, 'language')}</td>
                <td className="submission-table__td">
                  <span className={`submission-table__badge ${getStatusColor(sub?.status)}`}>
                    {getSafeValue(sub, 'status', 'Unknown').charAt(0).toUpperCase() + getSafeValue(sub, 'status', '').slice(1)}
                  </span>
                </td>
                <td className="submission-table__td submission-table__mono">{getSafeValue(sub, 'runtime')}s</td>
                <td className="submission-table__td submission-table__mono">{formatMemory(sub?.memory)}</td>
                <td className="submission-table__td submission-table__mono">
                  {getSafeValue(sub, 'testCasesPassed', 0)}/{getSafeValue(sub, 'testCasesTotal', 0)}
                </td>
                <td className="submission-table__td">{formatDate(sub?.createdAt)}</td>
                <td className="submission-table__td">
                  <button 
                    className="submission-table__code-btn"
                    onClick={() => onViewCode(sub)}
                    disabled={!sub?.code}
                  >
                    {CODE_BUTTON}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="submission-table__count">
        Showing {submissions.length} submission{submissions.length !== 1 ? 's' : ''}
      </p>
    </>
  );
};

export default SubmissionTable;
