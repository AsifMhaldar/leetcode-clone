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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <AdminUploadHeader onBack={() => navigate('/admin')} />

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Upload Video Solution
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Add a video explanation for this coding problem to help users understand the solution better
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Upload Card */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-2xl">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Cloud className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Video Upload</h2>
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

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        
        @keyframes fade-in {
          from { 
            opacity: 0; 
            transform: translateY(-10px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default AdminUpload;
