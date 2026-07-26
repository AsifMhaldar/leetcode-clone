import React from 'react';
import { Upload } from 'lucide-react';
import { BTN_UPLOAD, BTN_UPLOADING } from '../constants';
import './UploadButton.scss';

const UploadButton = ({ uploading, selectedFile }) => {
  return (
    <div className="upload-btn">
      <button
        type="submit"
        disabled={uploading || !selectedFile}
        className={`upload-btn__btn ${uploading ? 'upload-btn__btn--uploading' : ''}`}
      >
        {uploading ? (
          <>
            <div className="upload-btn__spinner"></div>
            <span>{BTN_UPLOADING}</span>
          </>
        ) : (
          <>
            <Upload size={20} />
            <span>{BTN_UPLOAD}</span>
          </>
        )}
      </button>
    </div>
  );
};

export default UploadButton;
