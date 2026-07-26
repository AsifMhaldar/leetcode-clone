import React from 'react';
import { Search, RefreshCw } from 'lucide-react';
import { SEARCH_PLACEHOLDER, ROLE_FILTER_OPTIONS, SORT_OPTIONS, REFRESH_BUTTON } from '../constants';
import './SearchControls.scss';

const SearchControls = ({ searchTerm, setSearchTerm, roleFilter, setRoleFilter, sortField, sortOrder, toggleSort, onRefresh, isRefreshing }) => {
  return (
    <div className="search-controls">
      <div className="search-controls__row">
        <div className="search-controls__left">
          <div className="search-controls__search-wrap">
            <Search className="search-controls__search-icon" />
            <input
              type="text"
              placeholder={SEARCH_PLACEHOLDER}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-controls__search-input"
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="search-controls__filter-select"
          >
            {ROLE_FILTER_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          <select
            value={sortField}
            onChange={(e) => toggleSort(e.target.value)}
            className="search-controls__filter-select"
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div className="search-controls__right">
          <span className="search-controls__live-dot" title="Auto-refreshing every 30s" />
          <button
            onClick={onRefresh}
            className="search-controls__refresh-btn"
            disabled={isRefreshing}
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'search-controls__refresh-spin' : ''}`} />
            {REFRESH_BUTTON}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchControls;
