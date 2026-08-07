import React from 'react';
import './SkeletonLoader.scss';

const SkeletonCard = () => (
  <div className="sk-card glass-card">
    <div className="sk-card__header">
      <div className="sk-card__avatar sk-pulse" />
      <div className="sk-card__meta">
        <div className="sk-card__line sk-card__line--name sk-pulse" />
        <div className="sk-card__line sk-card__line--time sk-pulse" />
      </div>
    </div>
    <div className="sk-card__body">
      <div className="sk-card__line sk-card__line--full sk-pulse" />
      <div className="sk-card__line sk-card__line--half sk-pulse" />
      <div className="sk-card__line sk-card__line--threequarter sk-pulse" />
    </div>
    <div className="sk-card__actions">
      <div className="sk-card__btn sk-pulse" />
      <div className="sk-card__btn sk-pulse" />
      <div className="sk-card__btn sk-pulse" />
      <div className="sk-card__btn sk-pulse" />
    </div>
  </div>
);

const SkeletonLoader = ({ count = 3 }) => (
  <div className="sk-loader">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export default SkeletonLoader;
