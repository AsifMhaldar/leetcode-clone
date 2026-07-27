import React from 'react';
import { Search, Filter } from 'lucide-react';
import { ACTIVITY_FILTERS } from '../constants';
import './FeedFilters.scss';

const FeedFilters = ({ activeFilter, onFilterChange, searchQuery, onSearchChange }) => {
  return (
    <div className="feed-filters glass-card">
      <div className="feed-filters__search">
        <Search size={16} />
        <input
          type="text"
          placeholder="Search activity feed..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="feed-filters__search-input"
        />
      </div>
      <div className="feed-filters__tabs">
        {ACTIVITY_FILTERS.map(f => (
          <button
            key={f.id}
            className={`feed-filters__tab ${activeFilter === f.id ? 'feed-filters__tab--active' : ''}`}
            onClick={() => onFilterChange(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FeedFilters;
