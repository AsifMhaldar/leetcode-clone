import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { STATUS_ERROR_TITLE, STATUS_SUCCESS_TITLE, STATUS_SUCCESS_TEXT } from '../constants';
import './UpdateStatus.scss';

const UpdateStatus = ({ error, success }) => {
  return (
    <>
      {error && (
        <div className="update-status__error">
          <div className="update-status__error-inner">
            <AlertCircle className="update-status__error-icon" />
            <div>
              <h4 className="update-status__error-title">{STATUS_ERROR_TITLE}</h4>
              <p className="update-status__error-text">{error}</p>
            </div>
          </div>
        </div>
      )}

      {success && (
        <div className="update-status__success">
          <div className="update-status__success-inner">
            <CheckCircle className="update-status__success-icon" />
            <div>
              <h4 className="update-status__success-title">{STATUS_SUCCESS_TITLE}</h4>
              <p className="update-status__success-text">{STATUS_SUCCESS_TEXT}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateStatus;
