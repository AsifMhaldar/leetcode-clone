import { Search, Layout, Menu, X } from 'lucide-react';

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
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
          />
        </div>

        {viewMode !== undefined && setViewMode && (
          <div className="flex items-center space-x-2 p-1 bg-gray-100 rounded-xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'grid'
                  ? 'bg-white shadow-md text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Layout className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'list'
                  ? 'bg-white shadow-md text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        )}

        {sortBy !== undefined && setSortBy && sortOptions && (
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
          >
            {sortOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        )}

        {rightControls}
      </div>

      <div className="flex flex-wrap items-center justify-between mt-6 pt-6 border-t border-gray-100">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-gray-700 mr-2">Categories:</span>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? `bg-${category.color}-100 text-${category.color}-700 border-2 border-${category.color}-200 shadow-sm`
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-transparent'
              }`}
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
          <div className="flex flex-wrap items-center gap-2 mt-2 lg:mt-0">
            <span className="text-sm font-medium text-gray-700 mr-2">{secondFilterLabel}:</span>
            {secondFilterItems.map(item => (
              <button
                key={item.id}
                onClick={() => setSelectedSecondFilter(item.id)}
                className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedSecondFilter === item.id
                    ? 'bg-blue-100 text-blue-700 border-2 border-blue-200 shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-transparent'
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
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <span className="text-sm font-medium text-gray-700 mr-2">{extraFilterLabel}:</span>
          {extraFilterItems.map(filter => (
            <button
              key={filter.id}
              onClick={() => setSelectedExtraFilter(filter.id)}
              className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedExtraFilter === filter.id
                  ? 'bg-green-100 text-green-700 border-2 border-green-200 shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-transparent'
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
