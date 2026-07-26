import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, TrendingUp, ChevronRight, Star } from 'lucide-react';
import { FEATURED_SECTION_TITLE, TRENDING_SECTION_TITLE, VIEW_ALL_LABEL } from '../constants';
import './FeaturedTrending.scss';

export default function FeaturedTrending({ featuredTutorials, trendingTutorials }) {
  return (
    <div className="featured-trending">
      <div className="featured-section featured-section--featured">
        <div className="featured-section__header">
          <div className="featured-section__title-group">
            <div className="featured-section__icon featured-section__icon--featured">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <h3 className="featured-section__title">{FEATURED_SECTION_TITLE}</h3>
          </div>
          <Link to="/tutorials/featured" className="featured-section__view-all featured-section__view-all--featured">
            {VIEW_ALL_LABEL} <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="featured-section__list">
          {featuredTutorials.slice(0, 3).map(tutorial => (
            <div key={tutorial.id} className="featured-item">
              <div className="featured-item__info">
                <div className={`featured-item__icon bg-gradient-to-r ${tutorial.color}`}>
                  {tutorial.image}
                </div>
                <div>
                  <h4 className="featured-item__title">{tutorial.title}</h4>
                  <p className="featured-item__meta">{tutorial.duration} • {tutorial.students} students</p>
                </div>
              </div>
              <div className="featured-item__rating">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="featured-item__rating-value">{tutorial.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="featured-section featured-section--trending">
        <div className="featured-section__header">
          <div className="featured-section__title-group">
            <div className="featured-section__icon featured-section__icon--trending">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h3 className="featured-section__title">{TRENDING_SECTION_TITLE}</h3>
          </div>
          <Link to="/tutorials/trending" className="featured-section__view-all featured-section__view-all--trending">
            {VIEW_ALL_LABEL} <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="featured-section__list">
          {trendingTutorials.slice(0, 3).map(tutorial => (
            <div key={tutorial.id} className="featured-item">
              <div className="featured-item__info">
                <div className={`featured-item__icon bg-gradient-to-r ${tutorial.color}`}>
                  {tutorial.image}
                </div>
                <div>
                  <h4 className="featured-item__title">{tutorial.title}</h4>
                  <p className="featured-item__meta">{tutorial.duration} • {tutorial.students} students</p>
                </div>
              </div>
              <span className="featured-item__growth">
                +{Math.floor(Math.random() * 50)}% growth
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
