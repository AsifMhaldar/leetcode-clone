import React from 'react';
import { useAdminVideo } from './hooks/useAdminVideo';
import AdminVideoHeader from './components/AdminVideoHeader';
import StatsCard from './components/StatsCard';
import ProblemsTable from './components/ProblemsTable';
import VideoTipsCard from './components/VideoTipsCard';
import { AlertCircle } from 'lucide-react';

const AdminVideo = () => {
  const { problems, loading, error, fetchProblems, handleDelete } = useAdminVideo();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg">Loading problems...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="bg-red-500/20 border border-red-500/30 rounded-2xl p-8 max-w-md text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Error</h3>
          <p className="text-gray-300 mb-4">{error.response?.data?.error || error}</p>
          <button
            onClick={fetchProblems}
            className="bg-red-500/20 text-red-400 border border-red-500/30 px-6 py-2 rounded-lg hover:bg-red-500/30 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <AdminVideoHeader onRefresh={fetchProblems} />

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Video Management
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Upload and manage video solutions for coding problems
          </p>
        </div>

        <StatsCard totalProblems={problems.length} />
        <ProblemsTable problems={problems} onDelete={handleDelete} />
        <VideoTipsCard />
      </div>

      <style jsx>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default AdminVideo;
