import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { useAnalytics } from './hooks/useAnalytics';
import AnalyticsHeader from './components/AnalyticsHeader';
import OverviewCards from './components/OverviewCards';
import ChartsGrid from './components/ChartsGrid';
import PerformanceMetrics from './components/PerformanceMetrics';
import ActivitySection from './components/ActivitySection';
import './Analytics.scss';

function Analytics() {
  const { timeRange, setTimeRange, data, isLoading, isError, error, refetch } = useAnalytics();

  if (isError) {
    return (
      <div className="page-bg p-6">
        <div className="analytics__container">
          <div className="analytics__error">
            <div className="analytics__error-icon">
              <AlertCircle size={48} />
            </div>
            <h2 className="analytics__error-title">Failed to Load Analytics</h2>
            <p className="analytics__error-message">
              {error?.message || 'Unable to fetch dashboard data. Please try again.'}
            </p>
            <button className="analytics__retry-btn" onClick={() => refetch()}>
              <RefreshCw size={18} />
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-bg p-6">
      <div className="analytics__container">
        <AnalyticsHeader timeRange={timeRange} onTimeRangeChange={setTimeRange} isLoading={isLoading} />
        <OverviewCards data={data} isLoading={isLoading} />
        <ChartsGrid data={data} isLoading={isLoading} />
        <PerformanceMetrics data={data} isLoading={isLoading} />
        <ActivitySection data={data} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default Analytics;
