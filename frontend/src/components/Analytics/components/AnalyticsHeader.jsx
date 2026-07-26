import React from 'react';
import { Download, RefreshCw } from 'lucide-react';
import { PAGE_TITLE, PAGE_SUBTITLE, TIME_RANGE_OPTIONS, EXPORT_BUTTON } from '../constants';
import './AnalyticsHeader.scss';

const AnalyticsHeader = ({ timeRange, onTimeRangeChange, isLoading }) => {
  const handleExport = () => {
    const timestamp = new Date().toISOString().split('T')[0];
    const link = document.createElement('a');
    link.href = `data:text/csv;charset=utf-8,Platform Analytics Export\nGenerated: ${new Date().toLocaleString()}\nTime Range: ${TIME_RANGE_OPTIONS.find(o => o.value === timeRange)?.label || timeRange}`;
    link.download = `analytics-export-${timestamp}.csv`;
    link.click();
  };

  return (
    <div className="analytics-header">
      <div>
        <h1 className="analytics-header__title">{PAGE_TITLE}</h1>
        <p className="analytics-header__subtitle">{PAGE_SUBTITLE}</p>
      </div>
      
      <div className="analytics-header__actions">
        {isLoading && (
          <div className="analytics-header__live-indicator">
            <span className="analytics-header__live-dot"></span>
            <span className="analytics-header__live-text">Updating...</span>
          </div>
        )}

        <select
          value={timeRange}
          onChange={(e) => onTimeRangeChange(e.target.value)}
          className="analytics-header__select"
        >
          {TIME_RANGE_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        
        <button className="analytics-header__export-btn" onClick={handleExport}>
          <Download size={18} />
          {EXPORT_BUTTON}
        </button>
      </div>
    </div>
  );
};

export default AnalyticsHeader;
