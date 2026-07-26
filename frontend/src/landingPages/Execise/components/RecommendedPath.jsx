import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Trophy, Sparkles, Brain, GitBranch, Award as AwardIcon, Rocket
} from 'lucide-react';
import { RECOMMENDED_PATH } from '../constants';
import './RecommendedPath.scss';

const RecommendedPath = () => {
  return (
    <div className="recommended-path">
      <div className="recommended-path__overlay"></div>
      <div className="recommended-path__orb-1"></div>
      <div className="recommended-path__orb-2"></div>
      
      <div className="recommended-path__inner">
        <div className="recommended-path__content">
          <div className="recommended-path__trophy">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <div className="recommended-path__text">
            <div className="recommended-path__badge">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="recommended-path__badge-text">{RECOMMENDED_PATH.badgeText}</span>
            </div>
            <h3 className="recommended-path__title">{RECOMMENDED_PATH.title}</h3>
            <p className="recommended-path__desc">
              {RECOMMENDED_PATH.description}
            </p>
            
            <div className="recommended-path__features">
              {RECOMMENDED_PATH.features.map((feature, idx) => {
                const FeatureIcon = idx === 0 ? Brain : idx === 1 ? GitBranch : AwardIcon;
                return (
                  <div key={idx} className="recommended-path__feature">
                    <FeatureIcon className="w-5 h-5 text-yellow-300" />
                    <span>{feature.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        <Link to={RECOMMENDED_PATH.ctaPath} className="recommended-path__cta">
          <span className="recommended-path__cta-label">
            {RECOMMENDED_PATH.ctaLabel}
            <Rocket className="w-5 h-5 ml-2" />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default RecommendedPath;
