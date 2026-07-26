import React from 'react';
import AdminHeader from './components/AdminHeader';
import StatsCards from './components/StatsCards';
import QuickActions from './components/QuickActions';
import AdminOptionsGrid from './components/AdminOptionsGrid';
import RecentActivityLive from './components/RecentActivityLive';
import DifficultyChart from './components/DifficultyChart';
import SubmissionTrendsChart from './components/SubmissionTrendsChart';
import UserGrowthChart from './components/UserGrowthChart';
import { useAdminDashboard } from './hooks/useAdminDashboard';
import { ADMIN_DASHBOARD_TITLE, ADMIN_DASHBOARD_SUBTITLE } from './constants';
import './Admin.scss';

function Admin() {
  const {
    stats,
    recentActivity,
    difficultyDistribution,
    submissionTrends,
    userGrowth,
    isLoading,
    isError,
  } = useAdminDashboard();

  return (
    <div className="admin-page">
      <AdminHeader />

      <div className="admin-page__container">
        <div className="admin-page__header">
          <h1>{ADMIN_DASHBOARD_TITLE}</h1>
          <p>
            {ADMIN_DASHBOARD_SUBTITLE}
          </p>
        </div>

        <StatsCards stats={stats} isLoading={isLoading} isError={isError} />
        <QuickActions />

        <div className="admin-page__charts-single">
          <DifficultyChart data={difficultyDistribution} isLoading={isLoading} />
        </div>

        <div className="admin-page__charts-grid">
          <SubmissionTrendsChart data={submissionTrends} isLoading={isLoading} />
          <UserGrowthChart data={userGrowth} isLoading={isLoading} />
        </div>

        <AdminOptionsGrid />
        <RecentActivityLive activities={recentActivity} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default Admin;
