import React from 'react';
import { Sparkles } from 'lucide-react';
import { NEWSLETTER } from '../constants';
import './Newsletter.scss';

export default function Newsletter() {
  return (
    <div className="newsletter">
      <div className="newsletter__overlay"></div>
      <div className="newsletter__orb-1"></div>
      <div className="newsletter__orb-2"></div>
      
      <div className="newsletter__content">
        <div className="newsletter__badge">
          <Sparkles className="w-4 h-4 text-yellow-300" />
          <span className="newsletter__badge-text">{NEWSLETTER.badgeText}</span>
        </div>
        
        <h2 className="newsletter__title">{NEWSLETTER.title}</h2>
        <p className="newsletter__description">
          {NEWSLETTER.description}
        </p>
        
        <div className="newsletter__form">
          <input
            type="email"
            placeholder={NEWSLETTER.inputPlaceholder}
            className="newsletter__input"
          />
          <button className="newsletter__submit">{NEWSLETTER.submitLabel}</button>
        </div>
        
        <p className="newsletter__note">{NEWSLETTER.note}</p>
      </div>
    </div>
  );
}
