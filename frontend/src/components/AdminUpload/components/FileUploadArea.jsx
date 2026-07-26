import React from 'react';
import { Upload, FileVideo, AlertCircle } from 'lucide-react';
import { LABEL_FILE_SELECT, DROPZONE_TEXT, DROPZONE_HINT, MAX_FILE_SIZE } from '../constants';
import './FileUploadArea.scss';

const FileUploadArea = ({ register, errors, selectedFile, formatFileSize, uploading }) => {
  return (
    <div className="form-group">
      <label className="file-upload__label">
        {LABEL_FILE_SELECT}
      </label>

      <div className={`file-upload__dropzone ${errors.videoFile ? 'file-upload__dropzone--error animate-shake' : ''}`}>
        <input
          type="file"
          accept="video/*"
          {...register('videoFile', {
            required: 'Please select a video file',
            validate: {
              isVideo: (files) => {
                if (!files || !files[0]) return 'Please select a video file';
                const file = files[0];
                return file.type.startsWith('video/') || 'Please select a valid video file';
              },
              fileSize: (files) => {
                if (!files || !files[0]) return true;
                const file = files[0];
                const maxSize = MAX_FILE_SIZE;
                return file.size <= maxSize || 'File size must be less than 100MB';
              }
            }
          })}
          className="hidden"
          id="video-upload"
          disabled={uploading}
        />

        <label htmlFor="video-upload" className="cursor-pointer">
          <div className="file-upload__dropzone-inner">
            <div className="file-upload__upload-icon">
              <Upload className="w-8 h-8 text-white" />
            </div>

            <div>
              <p className="file-upload__dropzone-text">{DROPZONE_TEXT}</p>
              <p className="file-upload__dropzone-hint">
                {DROPZONE_HINT}
              </p>
            </div>
          </div>
        </label>
      </div>

      {errors.videoFile && (
        <div className="file-upload__error animate-fade-in">
          <AlertCircle size={16} />
          <span>{errors.videoFile.message}</span>
        </div>
      )}

      {selectedFile && (
        <div className="file-upload__file-info">
          <div className="file-upload__file-inner">
            <FileVideo className="file-upload__file-icon" />
            <div className="flex-1">
              <h4 className="file-upload__file-name">{selectedFile.name}</h4>
              <div className="file-upload__file-meta">
                <span>Size: {formatFileSize(selectedFile.size)}</span>
                <span>Type: {selectedFile.type}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadArea;
