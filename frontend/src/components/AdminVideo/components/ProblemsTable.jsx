import React from 'react';
import { NavLink } from 'react-router';
import { Upload, Trash2, Video } from 'lucide-react';

const ProblemsTable = ({ problems, onDelete }) => {
  return (
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
                      onClick={() => onDelete(problem._id)}
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

      {problems.length === 0 && (
        <div className="text-center py-12">
          <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Problems Found</h3>
          <p className="text-gray-400">There are no problems available in the system.</p>
        </div>
      )}
    </div>
  );
};

export default ProblemsTable;
