import React from 'react';
import { LineChart, PieChart } from 'lucide-react';
import { USER_GROWTH_TITLE, LANGUAGE_DISTRIBUTION_TITLE, CHART_COLORS } from '../constants';
import './ChartsGrid.scss';

const ChartsGrid = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="charts-grid">
        <div className="charts-grid__chart">
          <div className="charts-grid__chart-header">
            <div className="charts-grid__skeleton-title"></div>
          </div>
          <div className="charts-grid__skeleton-bars">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="charts-grid__skeleton-bar"></div>
            ))}
          </div>
        </div>
        <div className="charts-grid__chart">
          <div className="charts-grid__chart-header">
            <div className="charts-grid__skeleton-title"></div>
          </div>
          <div className="charts-grid__skeleton-list">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="charts-grid__skeleton-row"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const { userGrowth, languageDistribution } = data;
  const maxUserCount = Math.max(...userGrowth.map(d => d.count), 1);

  return (
    <div className="charts-grid">
      {/* User Growth Chart */}
      <div className="charts-grid__chart">
        <div className="charts-grid__chart-header">
          <h3 className="charts-grid__chart-title">{USER_GROWTH_TITLE}</h3>
          <LineChart className="w-5 h-5 text-blue-400" />
        </div>
        <div className="charts-grid__bars">
          {userGrowth.map((item, index) => (
            <div key={index} className="charts-grid__bar-item">
              <div className="charts-grid__bar-value">{item.count}</div>
              <div
                className="charts-grid__bar"
                style={{ height: `${(item.count / maxUserCount) * 100}%` }}
              ></div>
              <div className="charts-grid__bar-date">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Language Distribution */}
      <div className="charts-grid__chart">
        <div className="charts-grid__chart-header">
          <h3 className="charts-grid__chart-title">{LANGUAGE_DISTRIBUTION_TITLE}</h3>
          <PieChart className="w-5 h-5 text-green-400" />
        </div>
        <div className="charts-grid__lang-list">
          {languageDistribution.length > 0 ? languageDistribution.map((lang, index) => (
            <div key={index} className="charts-grid__lang-item">
              <div className="charts-grid__lang-left">
                <div
                  className="charts-grid__lang-dot"
                  style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
                ></div>
                <span className="charts-grid__lang-name">{lang.name}</span>
              </div>
              <div className="charts-grid__lang-right">
                <div className="charts-grid__lang-bar-wrap">
                  <div
                    className="charts-grid__lang-bar"
                    style={{ width: `${lang.percentage}%` }}
                  ></div>
                </div>
                <span className="charts-grid__lang-pct">{lang.percentage}%</span>
              </div>
            </div>
          )) : (
            <div className="charts-grid__empty">No language data available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartsGrid;
