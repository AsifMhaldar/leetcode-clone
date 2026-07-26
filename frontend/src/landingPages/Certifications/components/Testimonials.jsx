import React from 'react';
import { Star } from 'lucide-react';
import { CERT_TESTIMONIALS, CERT_TESTIMONIALS_TITLE, CERT_TESTIMONIALS_SUBTITLE } from '../constants';
import './Testimonials.scss';

export default function Testimonials() {
  return (
    <div className="testimonials">
      <div className="testimonials__header">
        <h2 className="testimonials__title">{CERT_TESTIMONIALS_TITLE}</h2>
        <p className="testimonials__subtitle">{CERT_TESTIMONIALS_SUBTITLE}</p>
      </div>

      <div className="testimonials__grid">
        {CERT_TESTIMONIALS.map((testimonial, idx) => (
          <div key={idx} className="testimonial-card">
            <div className="testimonial-card__header">
              <div className="testimonial-card__avatar">{testimonial.image}</div>
              <div>
                <h4 className="testimonial-card__name">{testimonial.name}</h4>
                <p className="testimonial-card__role">{testimonial.role}</p>
              </div>
            </div>
            <p className="testimonial-card__text">"{testimonial.text}"</p>
            <div className="testimonial-card__stars">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
