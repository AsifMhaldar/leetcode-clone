import React from 'react';
import { useAnalytics } from './hooks/useAnalytics';
import { analyticsData } from './data/analyticsData';
import AnalyticsHeader from './components/AnalyticsHeader';
import OverviewCards from './components/OverviewCards';
import ChartsGrid from './components/ChartsGrid';
import PerformanceMetrics from './components/PerformanceMetrics';
import ActivitySection from './components/ActivitySection';

function Analytics() {
  const { timeRange, setTimeRange } = useAnalytics();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <AnalyticsHeader timeRange={timeRange} onTimeRangeChange={setTimeRange} />
        <OverviewCards overview={analyticsData.overview} />
        <ChartsGrid 
          userGrowth={analyticsData.userGrowth} 
          submissionStats={analyticsData.submissionStats} 
        />
        <PerformanceMetrics metrics={analyticsData.performanceMetrics} />
        <ActivitySection 
          difficultyDistribution={analyticsData.difficultyDistribution} 
          recentActivity={analyticsData.recentActivity} 
        />
      </div>
    </div>
  );
}

export default Analytics;
