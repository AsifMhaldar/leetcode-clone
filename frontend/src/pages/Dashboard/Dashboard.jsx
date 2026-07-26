import React from 'react';
import { BarChart3 } from 'lucide-react';
import { useStatsOverview } from './hooks/useStats';
import OverviewCards from './components/OverviewCards';
import DifficultyChart from './components/DifficultyChart';
import TagRadar from './components/TagRadar';
import SubmissionHeatmap from './components/SubmissionHeatmap';
import SolveTimeline from './components/SolveTimeline';
import WeeklyGoal from './components/WeeklyGoal';
import { DASHBOARD_TITLE, DASHBOARD_SUBTITLE } from './constants';
import './Dashboard.scss';

const Dashboard = () => {
  const { data: overviewData, isLoading: overviewLoading } = useStatsOverview();

  return (
    <div className="page-bg">
      <div className="dashboard">
        <div className="dashboard__header">
          <div className="dashboard__header-icon">
            <BarChart3 size={24} />
          </div>
          <div>
            <h1 className="dashboard__title">{DASHBOARD_TITLE}</h1>
            <p className="dashboard__subtitle">{DASHBOARD_SUBTITLE}</p>
          </div>
        </div>

        <OverviewCards data={overviewData} isLoading={overviewLoading} />

        <div className="dashboard__charts-grid">
          <DifficultyChart />
          <TagRadar />
        </div>

        <SolveTimeline />

        <div className="dashboard__charts-grid dashboard__charts-grid--two">
          <SubmissionHeatmap />
          <WeeklyGoal />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
