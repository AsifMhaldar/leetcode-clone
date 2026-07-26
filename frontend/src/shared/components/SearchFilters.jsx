import { Search, Layout, Menu, X } from 'lucide-react';
import './SearchFilters.scss';

const SearchFilters = ({
  searchQuery,
  setSearchQuery,
  placeholder = 'Search...',
  viewMode,
  setViewMode,
  sortBy,
  setSortBy,
  sortOptions,
  selectedCategory,
  setSelectedCategory,
  categories,
  showCategoryCount = true,
  secondFilterLabel,
  secondFilterItems,
  selectedSecondFilter,
  setSelectedSecondFilter,
  extraFilterLabel,
  extraFilterItems,
  selectedExtraFilter,
  setSelectedExtraFilter,
  rightControls
}) => {
  return (
    <div className="search-filters">
      <div className="search-filters__top">
        <div className="search-filters__search">
          <Search className="search-filters__search-icon" />
          <input
            type="text"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-filters__search-input"
          />
        </div>

        {viewMode !== undefined && setViewMode && (
          <div className="search-filters__view-toggle">
            <button
              onClick={() => setViewMode('grid')}
              className={`search-filters__view-btn ${viewMode === 'grid' ? 'search-filters__view-btn--active' : ''}`}
            >
              <Layout className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`search-filters__view-btn ${viewMode === 'list' ? 'search-filters__view-btn--active' : ''}`}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        )}

        {sortBy !== undefined && setSortBy && sortOptions && (
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="search-filters__sort"
          >
            {sortOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        )}

        {rightControls}
      </div>

      <div className="search-filters__divider">
        <div className="search-filters__categories">
          <span className="search-filters__category-label">Categories:</span>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`search-filters__category-btn ${
                selectedCategory === category.id ? 'search-filters__category-btn--active' : ''
              }`}
              style={selectedCategory === category.id ? {
                background: `var(--cat-${category.color}-bg, #f1f5f9)`,
                color: `var(--cat-${category.color}-text, #475569)`,
                borderColor: `var(--cat-${category.color}-border, transparent)`
              } : undefined}
            >
              {category.icon}
              <span className="ml-2">{category.name}</span>
              {showCategoryCount && category.count !== undefined && (
                <span className="ml-2 text-xs bg-white/50 px-1.5 py-0.5 rounded-full">
                  {category.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {secondFilterLabel && secondFilterItems && (
          <div className="search-filters__level">
            <span className="search-filters__category-label">{secondFilterLabel}:</span>
            {secondFilterItems.map(item => (
              <button
                key={item.id}
                onClick={() => setSelectedSecondFilter(item.id)}
                className={`search-filters__level-btn ${
                  selectedSecondFilter === item.id ? 'search-filters__level-btn--active' : ''
                }`}
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {extraFilterLabel && extraFilterItems && (
        <div className="search-filters__extra">
          <span className="search-filters__category-label">{extraFilterLabel}:</span>
          {extraFilterItems.map(filter => (
            <button
              key={filter.id}
              onClick={() => setSelectedExtraFilter(filter.id)}
              className={`search-filters__extra-btn ${
                selectedExtraFilter === filter.id ? 'search-filters__extra-btn--active' : ''
              }`}
            >
              {filter.name}
              {filter.icon}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
