import React from 'react';
import { NavLink } from 'react-router';
import { Upload, Trash2, Video } from 'lucide-react';
import { TABLE_TITLE, TABLE_COLUMNS, BTN_UPLOAD, BTN_DELETE, EMPTY_TITLE, EMPTY_DESC } from '../constants';
import './ProblemsTable.scss';

const ProblemsTable = ({ problems, onDelete }) => {
  return (
    <div className="problems-table">
      <div className="problems-table__header">
        <h2 className="problems-table__header-title">{TABLE_TITLE}</h2>
      </div>
      
      <div className="problems-table__scroll">
        <table className="problems-table__table">
          <thead>
            <tr className="problems-table__head-row">
              <th className="problems-table__th">{TABLE_COLUMNS[0]}</th>
              <th className="problems-table__th">{TABLE_COLUMNS[1]}</th>
              <th className="problems-table__th">{TABLE_COLUMNS[2]}</th>
              <th className="problems-table__th">{TABLE_COLUMNS[3]}</th>
              <th className="problems-table__th">{TABLE_COLUMNS[4]}</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem, index) => (
              <tr 
                key={problem._id} 
                className="problems-table__row"
              >
                <td className="problems-table__td problems-table__td-num">
                  {index + 1}
                </td>
                <td className="problems-table__td">
                  <div>
                    <p className="problems-table__problem-title">{problem.title}</p>
                    <p className="problems-table__problem-desc">
                      {problem.description}
                    </p>
                  </div>
                </td>
                <td className="problems-table__td">
                  <span className={`problems-table__difficulty problems-table__difficulty--${problem.difficulty.toLowerCase()}`}>
                    {problem.difficulty}
                  </span>
                </td>
                <td className="problems-table__td">
                  <span className="problems-table__tag">
                    {problem.tags}
                  </span>
                </td>
                <td className="problems-table__td">
                  <div className="problems-table__actions">
                    <NavLink 
                      to={`/admin/upload/${problem._id}`}
                      className="problems-table__upload-btn"
                    >
                      <Upload size={16} />
                      <span>{BTN_UPLOAD}</span>
                    </NavLink>
                    <button 
                      onClick={() => onDelete(problem._id)}
                      className="problems-table__delete-btn"
                    >
                      <Trash2 size={16} />
                      <span>{BTN_DELETE}</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {problems.length === 0 && (
        <div className="problems-table__empty">
          <Video className="problems-table__empty-icon" />
          <h3 className="problems-table__empty-title">{EMPTY_TITLE}</h3>
          <p className="problems-table__empty-desc">{EMPTY_DESC}</p>
        </div>
      )}
    </div>
  );
};

export default ProblemsTable;
