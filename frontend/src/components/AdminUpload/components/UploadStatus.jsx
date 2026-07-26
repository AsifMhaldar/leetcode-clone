import React from 'react';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { STATUS_ERROR_TITLE, STATUS_SUCCESS_TITLE, STATUS_DURATION_LABEL } from '../constants';
import './UploadStatus.scss';

const UploadStatus = ({ errors, uploadedVideo, formatDuration }) => {
  return (
    <>
      {errors.root && (
        <div className="upload-status__error">
          <div className="upload-status__error-inner">
            <AlertCircle className="upload-status__error-icon" />
            <div>
              <h4 className="upload-status__error-title">{STATUS_ERROR_TITLE}</h4>
              <p className="upload-status__error-text">{errors.root.message}</p>
            </div>
          </div>
        </div>
      )}

      {uploadedVideo && (
        <div className="upload-status__success">
          <div className="upload-status__success-inner">
            <CheckCircle className="upload-status__success-icon" />
            <div className="flex-1">
              <h4 className="upload-status__success-title">{STATUS_SUCCESS_TITLE}</h4>
              <div className="upload-status__success-meta">
                <div className="upload-status__success-detail">
                  <Clock size={16} />
                  <span>{STATUS_DURATION_LABEL} {formatDuration(uploadedVideo.duration)}</span>
                </div>
                <div className="upload-status__success-detail">
                  Uploaded: {new Date(uploadedVideo.uploadedAt).toLocaleString()}
                </div>
              </div>
              <div className="upload-status__success-url">
                <p className="upload-status__success-url-text">
                  {uploadedVideo.secureUrl}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UploadStatus;
