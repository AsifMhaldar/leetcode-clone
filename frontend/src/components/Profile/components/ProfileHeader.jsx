import React from 'react';
import { Edit3, Save } from 'lucide-react';

const ProfileHeader = ({ 
  user, editForm, userStats, isEditing, saveLoading,
  onEdit, onSave, onCancel, onInputChange
}) => {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-2xl mb-6">
      <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-4 lg:space-y-0 lg:space-x-6">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
          {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
        </div>
        
        <div className="flex-1 text-center lg:text-left">
          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-300 text-sm mb-2 block">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={editForm.firstName}
                    onChange={onInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="First Name"
                  />
                </div>
                <div>
                  <label className="text-gray-300 text-sm mb-2 block">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={editForm.lastName}
                    onChange={onInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Last Name"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-gray-300 text-sm mb-2 block">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={onInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Email"
                />
              </div>

              <div>
                <label className="text-gray-300 text-sm mb-2 block">Bio</label>
                <textarea
                  name="bio"
                  value={editForm.bio}
                  onChange={onInputChange}
                  rows="3"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-gray-300 text-sm mb-2 block">GitHub</label>
                  <input
                    type="url"
                    name="github"
                    value={editForm.github}
                    onChange={onInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="https://github.com/username"
                  />
                </div>
                <div>
                  <label className="text-gray-300 text-sm mb-2 block">LinkedIn</label>
                  <input
                    type="url"
                    name="linkedin"
                    value={editForm.linkedin}
                    onChange={onInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                <div>
                  <label className="text-gray-300 text-sm mb-2 block">Website</label>
                  <input
                    type="url"
                    name="website"
                    value={editForm.website}
                    onChange={onInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-white mb-2">{user?.firstName} {user?.lastName}</h1>
              <p className="text-gray-400 mb-2">{user?.email}</p>
              <p className="text-gray-300 mb-3">{editForm.bio}</p>
              
              {(editForm.github || editForm.linkedin || editForm.website) && (
                <div className="flex flex-wrap gap-4 mt-3">
                  {editForm.github && (
                    <a href={editForm.github} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
                      GitHub
                    </a>
                  )}
                  {editForm.linkedin && (
                    <a href={editForm.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
                      LinkedIn
                    </a>
                  )}
                  {editForm.website && (
                    <a href={editForm.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm">
                      Website
                    </a>
                  )}
                </div>
              )}
              
              <div className="text-gray-400 text-sm mt-2">
                Rank #{userStats.communityStats.reputation > 0 ? Math.max(1, 2331261 - userStats.communityStats.reputation) : '2,331,261'}
              </div>
            </>
          )}
        </div>

        <div className="flex space-x-3">
          {isEditing ? (
            <>
              <button
                onClick={onSave}
                disabled={saveLoading}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 cursor-pointer"
              >
                {saveLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span>{saveLoading ? 'Saving...' : 'Save'}</span>
              </button>
              <button
                onClick={onCancel}
                className="bg-white/10 text-white px-6 py-2 rounded-lg font-medium hover:bg-white/20 transition-all duration-200 border border-white/20 cursor-pointer"
              >
                Cancel
              </button>
            </>
          ) : (
            <button 
              onClick={onEdit}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center space-x-2 cursor-pointer"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
