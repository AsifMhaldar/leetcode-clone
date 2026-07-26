import React from 'react';
import { UPLOADING_LABEL, UPLOAD_HINT } from '../constants';
import './UploadProgress.scss';

const UploadProgress = ({ uploading, uploadProgress }) => {
  if (!uploading) return null;

  return (
    <div className="upload-progress">
      <div className="upload-progress__header">
        <span className="upload-progress__label">{UPLOADING_LABEL}</span>
        <span className="upload-progress__value">{uploadProgress}%</span>
      </div>
      <div className="upload-progress__bar">
        <div
          className="upload-progress__fill"
          style={{ width: `${uploadProgress}%` }}
        ></div>
      </div>
      <div className="flex justify-center">
        <div className="upload-progress__hint">
          {UPLOAD_HINT}
        </div>
      </div>
    </div>
  );
};

export default UploadProgress;
