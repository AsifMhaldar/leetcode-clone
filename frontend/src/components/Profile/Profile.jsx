import React from 'react';
import { useProfile } from './hooks/useProfile';
import ProfileNav from './components/ProfileNav';
import HeroProfile from './components/HeroProfile';
import StatsOverview from './components/StatsOverview';
import ActivityCalendar from './components/ActivityCalendar';
import TimelineActivity from './components/TimelineActivity';
import StreakGoals from './components/StreakGoals';
import AnalyticsCharts from './components/AnalyticsCharts';
import { ERROR_TITLE, RETRY_BUTTON } from './constants';
import './Profile.scss';

const ProfileSkeleton = () => (
  <div className="page-bg">
    <ProfileNav />
    <div className="profile__shell">
      <div className="profile__skeleton-hero" />
      <div className="profile__skeleton-dashboard">
        <div className="profile__skeleton-col">
          <div className="profile__skeleton-card" />
        </div>
        <div className="profile__skeleton-col">
          <div className="profile__skeleton-card" />
        </div>
        <div className="profile__skeleton-col">
          <div className="profile__skeleton-card" />
        </div>
      </div>
    </div>
  </div>
);

const Profile = () => {
  const {
    user,
    userStats,
    languages,
    streak,
    calendar,
    recentSubmissions,
    isEditing,
    setIsEditing,
    isLoading,
    isError,
    error,
    saveLoading,
    saveMessage,
    editForm,
    handleInputChange,
    handleSaveProfile,
    handleCancelEdit,
    startEditing,
  } = useProfile();

  if (isLoading) return <ProfileSkeleton />;

  if (isError) {
    return (
      <div className="page-bg flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-lg mb-4">{ERROR_TITLE}</div>
          <div className="text-theme-primary mb-4">{error?.message || 'Failed to load profile'}</div>
          <button onClick={() => window.location.reload()} className="profile__retry-btn">
            {RETRY_BUTTON}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-bg">
      <ProfileNav />

      <div className="profile__shell">
        {saveMessage && (
          <div className={`profile__save-msg ${saveMessage.includes('success') ? 'profile__save-msg--success' : 'profile__save-msg--error'}`}>
            {saveMessage}
          </div>
        )}

        {/* ZONE 1: Hero Profile */}
        <HeroProfile
          user={user}
          editForm={editForm}
          userStats={userStats}
          streak={streak}
          isEditing={isEditing}
          saveLoading={saveLoading}
          onEdit={startEditing}
          onSave={handleSaveProfile}
          onCancel={handleCancelEdit}
          onInputChange={handleInputChange}
        />

        {/* ZONE 2: 3-Column Dashboard */}
        <div className="profile__dashboard">
          {/* Left Sidebar */}
          <div className="profile__sidebar profile__sidebar--left">
            <StatsOverview userStats={userStats} languages={languages} calendar={calendar} />
          </div>

          {/* Center Column */}
          <div className="profile__center">
            <ActivityCalendar
              streak={streak}
              calendar={calendar}
              userStats={userStats}
              languages={languages}
            />
          </div>

          {/* Right Sidebar */}
          <div className="profile__sidebar profile__sidebar--right">
            <TimelineActivity recentSubmissions={recentSubmissions} />
            <StreakGoals streak={streak} calendar={calendar} userStats={userStats} />
          </div>
        </div>

        {/* ZONE 3: Analytics */}
        <AnalyticsCharts calendar={calendar} userStats={userStats} streak={streak} />
      </div>
    </div>
  );
};

export default Profile;
