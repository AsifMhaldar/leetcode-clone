import React from 'react';
import { useAdminVideo } from './hooks/useAdminVideo';
import AdminVideoHeader from './components/AdminVideoHeader';
import StatsCard from './components/StatsCard';
import ProblemsTable from './components/ProblemsTable';
import VideoTipsCard from './components/VideoTipsCard';
import { AlertCircle } from 'lucide-react';
import { PAGE_TITLE, PAGE_SUBTITLE, LOADING_TEXT, ERROR_TITLE, BTN_TRY_AGAIN } from './constants';
import './AdminVideo.scss';

const AdminVideo = () => {
  const { problems, loading, error, fetchProblems, handleDelete } = useAdminVideo();

  if (loading) {
    return (
      <div className="admin-video flex items-center justify-center">
        <div className="text-center">
          <div className="admin-video__spinner"></div>
          <p className="text-gray-300 text-lg">{LOADING_TEXT}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-video flex items-center justify-center">
        <div className="admin-video__error-card">
          <AlertCircle className="admin-video__error-icon" />
          <h3 className="admin-video__error-title">{ERROR_TITLE}</h3>
          <p className="text-gray-300 mb-4">{error.response?.data?.error || error}</p>
          <button
            onClick={fetchProblems}
            className="admin-video__retry-btn"
          >
            {BTN_TRY_AGAIN}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-video">
      <AdminVideoHeader onRefresh={fetchProblems} />

      <div className="admin-video__container">
        {/* Header Section */}
        <div className="admin-video__header">
          <h1>
            {PAGE_TITLE}
          </h1>
          <p>
            {PAGE_SUBTITLE}
          </p>
        </div>

        <StatsCard totalProblems={problems.length} />
        <ProblemsTable problems={problems} onDelete={handleDelete} />
        <VideoTipsCard />
      </div>
    </div>
  );
};

export default AdminVideo;
