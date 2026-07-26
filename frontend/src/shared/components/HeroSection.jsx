import { Sparkles } from 'lucide-react';
import './HeroSection.scss';

const HeroSection = ({
  gradient = 'from-blue-600 via-purple-600 to-pink-600',
  badgeIcon,
  badgeText,
  titleLine1,
  titleLine2,
  description,
  primaryCtaLabel,
  primaryCtaIcon,
  primaryCtaColor = 'text-purple-600',
  secondaryCtaLabel,
  secondaryCtaIcon,
  secondaryCtaIconHover = 'group-hover:scale-110',
  stats,
  maxWidth
}) => {
  return (
    <div className={`hero-section bg-gradient-to-r ${gradient}`}>
      <div className="hero-section__overlay"></div>
      <div className="hero-section__orb-1"></div>
      <div className="hero-section__orb-2"></div>
      
      <div className={`hero-section__content${maxWidth ? ` ${maxWidth}` : ''}`}>
        {badgeIcon && badgeText && (
          <div className="hero-section__badge">
            {badgeIcon}
            <span className="hero-section__badge-text">{badgeText}</span>
          </div>
        )}
        
        <h1 className="hero-section__title">
          {titleLine1} <br />
          <span className="hero-section__title-highlight">
            {titleLine2}
          </span>
        </h1>
        
        <p className="hero-section__description">{description}</p>
        
        <div className="hero-section__actions">
          <button className={`hero-section__cta-primary ${primaryCtaColor}`}>
            <span className="hero-section__cta-primary-label">
              {primaryCtaIcon}
              {primaryCtaLabel}
            </span>
          </button>
          <button className="hero-section__cta-secondary">
            {secondaryCtaIcon}
            <span>{secondaryCtaLabel}</span>
          </button>
        </div>

        {stats && stats.length > 0 && (
          <div className="hero-section__stats">
            {stats.map((stat, idx) => (
              <div key={idx} className="hero-section__stat">
                {stat.icon}
                <span className="hero-section__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
