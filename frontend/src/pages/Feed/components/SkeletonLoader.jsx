import React from 'react';
import './SkeletonLoader.scss';

const SkeletonCard = () => (
  <div className="skeleton-card glass-card">
    <div className="skeleton-card__header">
      <div className="skeleton-card__avatar skeleton-pulse" />
      <div className="skeleton-card__meta">
        <div className="skeleton-card__line skeleton-card__line--name skeleton-pulse" />
        <div className="skeleton-card__line skeleton-card__line--time skeleton-pulse" />
      </div>
    </div>
    <div className="skeleton-card__body">
      <div className="skeleton-card__line skeleton-card__line--full skeleton-pulse" />
      <div className="skeleton-card__line skeleton-card__line--half skeleton-pulse" />
    </div>
    <div className="skeleton-card__actions">
      <div className="skeleton-card__btn skeleton-pulse" />
      <div className="skeleton-card__btn skeleton-pulse" />
      <div className="skeleton-card__btn skeleton-pulse" />
    </div>
  </div>
);

const SkeletonLoader = ({ count = 3 }) => (
  <div className="skeleton-loader">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export default SkeletonLoader;
