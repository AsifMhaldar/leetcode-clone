import React from 'react';
import { useNavigate } from 'react-router';
import { useAdminUpload } from './hooks/useAdminUpload';
import AdminUploadHeader from './components/AdminUploadHeader';
import FileUploadArea from './components/FileUploadArea';
import UploadProgress from './components/UploadProgress';
import UploadStatus from './components/UploadStatus';
import UploadButton from './components/UploadButton';
import UploadGuidelines from './components/UploadGuidelines';
import { Cloud } from 'lucide-react';
import { PAGE_TITLE, PAGE_SUBTITLE, CARD_TITLE } from './constants';
import './AdminUpload.scss';

function AdminUpload() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    errors,
    selectedFile,
    uploading,
    uploadProgress,
    uploadedVideo,
    onSubmit,
    formatFileSize,
    formatDuration
  } = useAdminUpload();

  return (
    <div className="admin-upload">
      <AdminUploadHeader onBack={() => navigate('/admin')} />

      <div className="admin-upload__container">
        {/* Header Section */}
        <div className="admin-upload__header">
          <h1>
            {PAGE_TITLE}
          </h1>
          <p>
            {PAGE_SUBTITLE}
          </p>
        </div>

        <div className="admin-upload__form-card">
          {/* Upload Card */}
          <div className="admin-upload__card">
            <div className="admin-upload__card-header">
              <div className="admin-upload__card-icon">
                <Cloud className="w-4 h-4 text-white" />
              </div>
              <h2 className="admin-upload__card-title">{CARD_TITLE}</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <FileUploadArea
                register={register}
                errors={errors}
                selectedFile={selectedFile}
                formatFileSize={formatFileSize}
                uploading={uploading}
              />

              <UploadProgress uploading={uploading} uploadProgress={uploadProgress} />

              <UploadStatus
                errors={errors}
                uploadedVideo={uploadedVideo}
                formatDuration={formatDuration}
              />

              <UploadButton uploading={uploading} selectedFile={selectedFile} />
            </form>
          </div>

          <UploadGuidelines />
        </div>
      </div>
    </div>
  );
}

export default AdminUpload;
