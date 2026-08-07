import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown, Check, SlidersHorizontal } from 'lucide-react';
import { FEED_TABS, FEED_SORTS } from '../constants';
import DropdownMenu from '../../../components/DropdownMenu/DropdownMenu';
import './FeedFilters.scss';

const formatBadge = (n) => {
  if (!n || n === 0) return '';
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n;
};

const FeedFilters = ({
  activeFilter,
  onFilterChange,
  activeSort,
  onSortChange,
  searchQuery,
  onSearchChange,
  feedStats
}) => {
  const tabsRef = useRef(null);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const sortBtnRef = useRef(null);
  const activeSortLabel = FEED_SORTS.find(s => s.id === activeSort)?.label || 'Latest';

  useEffect(() => {
    const activeTab = tabsRef.current?.querySelector('.feed-tabs__tab--active');
    activeTab?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [activeFilter]);

  return (
    <div className="feed-nav glass-card">
      <div className="feed-nav__top">
        <div className="feed-nav__search">
          <Search size={15} />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="feed-nav__search-input"
          />
        </div>

        <div className="feed-nav__sort">
          <button
            ref={sortBtnRef}
            className="feed-nav__sort-btn"
            onClick={() => setShowSortMenu(!showSortMenu)}
          >
            <SlidersHorizontal size={15} />
            <span>{activeSortLabel}</span>
            <ChevronDown
              size={14}
              className={`feed-nav__sort-chevron ${showSortMenu ? 'feed-nav__sort-chevron--open' : ''}`}
            />
          </button>

          <DropdownMenu
            anchorRef={sortBtnRef}
            open={showSortMenu}
            onClose={() => setShowSortMenu(false)}
            width={180}
            align="end"
            placement="top"
          >
            {FEED_SORTS.map(s => (
              <button
                key={s.id}
                className={`feed-nav__sort-option ${activeSort === s.id ? 'feed-nav__sort-option--active' : ''}`}
                onClick={() => { onSortChange(s.id); setShowSortMenu(false); }}
              >
                {s.label}
                {activeSort === s.id && <Check size={15} />}
              </button>
            ))}
          </DropdownMenu>
        </div>
      </div>

      <div className="feed-nav__tabs-wrap">
        <div className="feed-nav__tabs" ref={tabsRef}>
          {FEED_TABS.map(tab => {
            const isActive = activeFilter === tab.id;
            const badge = tab.emoji || (feedStats?.[tab.statKey] ? formatBadge(feedStats[tab.statKey]) : '');
            return (
              <button
                key={tab.id}
                className={`feed-nav__tab ${isActive ? 'feed-nav__tab--active' : ''}`}
                onClick={() => onFilterChange(tab.id)}
              >
                {tab.emoji && <span className="feed-nav__tab-emoji">{tab.emoji}</span>}
                <span className="feed-nav__tab-label">{tab.label}</span>
                {badge && (
                  <span className={`feed-nav__badge ${tab.emoji ? 'feed-nav__badge--emoji' : ''}`}>
                    {badge}
                  </span>
                )}
                {isActive && (
                  <motion.span
                    className="feed-nav__tab-indicator"
                    layoutId="feed-tab-indicator"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
              </button>
            );
          })}
        </div>
        <div className="feed-nav__fade feed-nav__fade--left" />
        <div className="feed-nav__fade feed-nav__fade--right" />
      </div>
    </div>
  );
};

export default FeedFilters;
