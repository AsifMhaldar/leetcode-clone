import { useEffect, useState } from 'react';
import axiosClient from '../utils/axiosClient'
import { NavLink } from 'react-router';
import { Video, Upload, Trash2, RefreshCw, Home, AlertCircle, Plus } from 'lucide-react';

const AdminVideo = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      setLoading(true);
      const { data } = await axiosClient.get('/problem/getAllProblem');
      setProblems(data);
    } catch (err) {
      setError('Failed to fetch problems');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this video?')) return;
    
    try {
      await axiosClient.delete(`/video/delete/${id}`);
      setProblems(problems.filter(problem => problem._id !== id));
    } catch (err) {
      setError(err);
      console.error(err);
    }
  };

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
      {/* Navigation Header */}
      <nav className="bg-white/5 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Video className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Video Management</h1>
                <p className="text-sm text-gray-400">Upload and delete video solutions</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={fetchProblems}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                <RefreshCw size={20} />
                <span>Refresh</span>
              </button>
              <NavLink 
                to="/admin" 
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
              >
                <Home size={20} />
                <span>Back to Admin</span>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>

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

        {/* Stats Card */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-2xl mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-white">{problems.length}</p>
                <p className="text-gray-400 text-sm">Total Problems</p>
              </div>
              {/* <div className="h-12 w-px bg-white/20"></div>  */}
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm">Manage your video content</p>
              <p className="text-white font-medium">Upload and delete videos as needed</p>
            </div>
          </div>
        </div>

        {/* Problems Table */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="text-xl font-bold text-white">Problems List</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-6 text-gray-400 font-semibold">Sr. No.</th>
                  <th className="text-left py-4 px-6 text-gray-400 font-semibold">Title</th>
                  <th className="text-left py-4 px-6 text-gray-400 font-semibold">Difficulty</th>
                  <th className="text-left py-4 px-6 text-gray-400 font-semibold">Tags</th>
                  <th className="text-left py-4 px-6 text-gray-400 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {problems.map((problem, index) => (
                  <tr 
                    key={problem._id} 
                    className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200"
                  >
                    <td className="py-4 px-6 text-white font-medium">
                      {index + 1}
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="text-white font-semibold">{problem.title}</p>
                        <p className="text-gray-400 text-sm mt-1 line-clamp-1">
                          {problem.description}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${
                        problem.difficulty === 'Easy' 
                          ? 'text-green-400 border-green-400/20 bg-green-400/10' 
                          : problem.difficulty === 'Medium' 
                            ? 'text-yellow-400 border-yellow-400/20 bg-yellow-400/10' 
                            : 'text-red-400 border-red-400/20 bg-red-400/10'
                      }`}>
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-6 py-1 rounded-full text-sm font-medium border border-gray-400/20 bg-gray-400/10 text-gray-300">
                        {problem.tags}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <NavLink 
                          to={`/admin/upload/${problem._id}`}
                          className="flex items-center space-x-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 px-4 py-2 rounded-lg hover:bg-blue-500/30 hover:scale-105 transition-all duration-200"
                        >
                          <Upload size={16} />
                          <span>Upload</span>
                        </NavLink>
                        <button 
                          onClick={() => handleDelete(problem._id)}
                          className="flex items-center space-x-2 bg-red-500/20 text-red-400 border border-red-500/30 px-4 py-2 rounded-lg hover:bg-red-500/30 hover:scale-105 transition-all duration-200"
                        >
                          <Trash2 size={16} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {problems.length === 0 && (
            <div className="text-center py-12">
              <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No Problems Found</h3>
              <p className="text-gray-400">There are no problems available in the system.</p>
            </div>
          )}
        </div>

        {/* Info Card */}
        <div className="mt-8 bg-blue-500/20 border border-blue-500/30 rounded-2xl p-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Plus className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <h4 className="font-semibold text-blue-400 mb-1">Video Management Tips</h4>
              <p className="text-blue-300/80 text-sm">
                • Upload video solutions to help users understand problems better
                <br />
                • Delete videos when they are no longer needed
                <br />
                • Keep videos focused and concise for better learning experience
              </p>
            </div>
          </div>
        </div>
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