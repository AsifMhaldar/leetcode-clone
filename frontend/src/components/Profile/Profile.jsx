import React from 'react';
import { useProfile } from './hooks/useProfile';
import ProfileNav from './components/ProfileNav';
import ProfileHeader from './components/ProfileHeader';
import StatsSidebar from './components/StatsSidebar';
import ProgressCard from './components/ProgressCard';
import BadgesCard from './components/BadgesCard';
import RecentActivity from './components/RecentActivity';
import StreakCalendar from './components/StreakCalendar';

const Profile = () => {
  const {
    user,
    userStats,
    isEditing,
    setIsEditing,
    loading,
    error,
    saveLoading,
    saveMessage,
    editForm,
    handleInputChange,
    handleSaveProfile,
    handleCancelEdit
  } = useProfile();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <div className="text-white">Loading your profile...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-lg mb-4">Error</div>
          <div className="text-white mb-4">{error}</div>
          <button 
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <ProfileNav />

      <div className="container mx-auto px-4 py-8">
        {/* Debug Info */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
          <div className="text-yellow-400 text-sm">
            <strong>Debug Info:</strong> Problems: {userStats.totalSolved} solved, {userStats.totalProblems} total | 
            Submissions: {userStats.totalSubmissions} | Acceptance: {userStats.acceptanceRate}% |
            Streak: {userStats.streak.current} days
          </div>
        </div>

        {/* Save Message */}
        {saveMessage && (
          <div className={`mb-6 p-4 rounded-lg ${
            saveMessage.includes('successfully') 
              ? 'bg-green-500/10 border border-green-500/30 text-green-400' 
              : 'bg-red-500/10 border border-red-500/30 text-red-400'
          }`}>
            {saveMessage}
          </div>
        )}

        {/* Profile Header */}
        <ProfileHeader
          user={user}
          editForm={editForm}
          userStats={userStats}
          isEditing={isEditing}
          saveLoading={saveLoading}
          onEdit={() => setIsEditing(true)}
          onSave={handleSaveProfile}
          onCancel={handleCancelEdit}
          onInputChange={handleInputChange}
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Stats */}
          <StatsSidebar 
            communityStats={userStats.communityStats} 
            languages={userStats.languages} 
          />

          {/* Middle Column - Progress */}
          <div className="space-y-6">
            <ProgressCard
              totalSolved={userStats.totalSolved}
              totalProblems={userStats.totalProblems}
              acceptanceRate={userStats.acceptanceRate}
              easySolved={userStats.easySolved}
              totalEasy={userStats.totalEasy}
              mediumSolved={userStats.mediumSolved}
              totalMedium={userStats.totalMedium}
              hardSolved={userStats.hardSolved}
              totalHard={userStats.totalHard}
            />
            <BadgesCard totalSolved={userStats.totalSolved} />
          </div>

          {/* Right Column - Activity */}
          <div className="space-y-6">
            <RecentActivity recentSubmissions={userStats.recentSubmissions} />
            <StreakCalendar streak={userStats.streak} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
