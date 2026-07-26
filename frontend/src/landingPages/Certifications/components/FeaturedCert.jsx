import React from 'react';
import { Sparkles, Clock, Users, Star, CheckCircle } from 'lucide-react';
import { CERTIFICATIONS, CERT_FEATURED_BADGE, CERT_FEATURED_SIDEBAR_TITLE, CERT_FEATURED_CTA } from '../constants';
import './FeaturedCert.scss';

export default function FeaturedCert() {
  const featured = CERTIFICATIONS.find(c => c.featured);

  if (!featured) return null;

  return (
    <div className="featured-cert">
      <div className="featured-cert__overlay"></div>
      <div className="featured-cert__orb"></div>
      
      <div className="featured-cert__inner">
        <div className="featured-cert__content">
          <div className="featured-cert__badge">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="featured-cert__badge-text">{CERT_FEATURED_BADGE}</span>
          </div>
          <h2 className="featured-cert__title">{featured.title}</h2>
          <p className="featured-cert__description">{featured.description}</p>
          
          <div className="featured-cert__meta">
            <div className="featured-cert__meta-item">
              <Clock className="w-4 h-4" />
              <span>{featured.duration}</span>
            </div>
            <div className="featured-cert__meta-item">
              <Users className="w-4 h-4" />
              <span>{featured.students} enrolled</span>
            </div>
            <div className="featured-cert__meta-item">
              <Star className="w-4 h-4 fill-current text-yellow-300" />
              <span>{featured.rating} ({featured.reviews} reviews)</span>
            </div>
          </div>

          <div className="featured-cert__pricing">
            <div>
              <span className="featured-cert__price">${featured.price}</span>
              <span className="featured-cert__original-price">${featured.originalPrice}</span>
              <span className="featured-cert__discount">{featured.discount}% OFF</span>
            </div>
            <button className="featured-cert__cta">{CERT_FEATURED_CTA}</button>
          </div>
        </div>

        <div className="featured-cert__sidebar">
          <h3 className="featured-cert__sidebar-title">{CERT_FEATURED_SIDEBAR_TITLE}</h3>
          <ul className="featured-cert__skills">
            {featured.skills.slice(0, 5).map((skill, idx) => (
              <li key={idx} className="featured-cert__skill">
                <CheckCircle className="w-4 h-4 mr-2 text-green-300" />
                <span>{skill}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
