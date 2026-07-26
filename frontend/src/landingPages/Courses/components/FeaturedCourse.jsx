import React from 'react';
import { Clock, Users, Star, Trophy, CheckCircle } from 'lucide-react';
import { COURSES, COURSE_FEATURED_BADGE, COURSE_FEATURED_SIDEBAR_TITLE, COURSE_FEATURED_CTA } from '../constants';
import './FeaturedCourse.scss';

export default function FeaturedCourse() {
  const featured = COURSES.filter(c => c.featured).slice(0, 1)[0];

  if (!featured) return null;

  return (
    <div className="featured-course">
      <div className="featured-course__overlay"></div>
      <div className="featured-course__orb"></div>

      <div className="featured-course__inner">
        <div className="featured-course__content">
          <div className="featured-course__badge">
            <Trophy className="w-4 h-4 text-yellow-300" />
            <span className="featured-course__badge-text">{COURSE_FEATURED_BADGE}</span>
          </div>
          <h2 className="featured-course__title">{featured.title}</h2>
          <p className="featured-course__description">{featured.description}</p>

          <div className="featured-course__meta">
            <div className="featured-course__meta-item">
              <Clock className="w-4 h-4" />
              <span>{featured.duration}</span>
            </div>
            <div className="featured-course__meta-item">
              <Users className="w-4 h-4" />
              <span>{featured.students} enrolled</span>
            </div>
            <div className="featured-course__meta-item">
              <Star className="w-4 h-4 fill-current text-yellow-300" />
              <span>{featured.rating} ({featured.reviews} reviews)</span>
            </div>
          </div>

          <div className="featured-course__pricing">
            <div>
              <span className="featured-course__price">${featured.price}</span>
              <span className="featured-course__original-price">${featured.originalPrice}</span>
              <span className="featured-course__discount">{featured.discount}% OFF</span>
            </div>
            <button className="featured-course__cta">{COURSE_FEATURED_CTA}</button>
          </div>
        </div>

        <div className="featured-course__sidebar">
          <h3 className="featured-course__sidebar-title">{COURSE_FEATURED_SIDEBAR_TITLE}</h3>
          <ul className="featured-course__features">
            {featured.features.map((feature, idx) => (
              <li key={idx} className="featured-course__feature">
                <CheckCircle className="w-4 h-4 mr-2 text-green-300" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
