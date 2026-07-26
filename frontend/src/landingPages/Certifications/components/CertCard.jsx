import React from 'react';
import {
  Star, Clock, Users, BookOpen, Heart, Bookmark,
  CheckCircle, ChevronDown, Briefcase
} from 'lucide-react';
import {
  CERT_CARD_POPULAR_LABEL, CERT_CARD_JOB_GUARANTEE_LABEL,
  CERT_CARD_SALARY_LABEL, CERT_CARD_PROJECTS_LABEL, CERT_CARD_DETAILS_BTN,
  CERT_CARD_LEARN_TITLE, CAREER_PATHS_TITLE, HIRED_BY_TITLE,
  CERT_CARD_SHOW_MORE, CERT_CARD_SHOW_LESS
} from '../constants';
import './CertCard.scss';

export default function CertCard({
  cert,
  getLevelBadge,
  expanded,
  onToggleExpand
}) {
  return (
    <div className="cert-card">
      <div className={`cert-card__header bg-gradient-to-r ${cert.color}`}>
        <div className="cert-card__badge-popular">
          {cert.popular && (
            <span className="cert-card__popular">
              <Star className="w-3 h-3 mr-1 fill-current" />
              {CERT_CARD_POPULAR_LABEL}
            </span>
          )}
          {cert.jobGuarantee && (
            <span className="cert-card__job-guarantee">
              <Briefcase className="w-3 h-3 mr-1" />
              {CERT_CARD_JOB_GUARANTEE_LABEL}
            </span>
          )}
        </div>
        <div className="cert-card__icon">
          {cert.image}
        </div>
      </div>

      <div className="cert-card__body">
        <div className="cert-card__header-row">
          <div>
            <h3 className="cert-card__title">
              {cert.title}
            </h3>
            <p className="cert-card__provider">by {cert.provider}</p>
          </div>
          {getLevelBadge(cert.level)}
        </div>

        <p className="cert-card__description line-clamp-2">
          {cert.description}
        </p>

        <div className="cert-card__skills">
          {cert.skills.slice(0, 3).map((skill, idx) => (
            <span key={idx} className="cert-card__skill">
              {skill}
            </span>
          ))}
          {cert.skills.length > 3 && (
            <span className="cert-card__skill">+{cert.skills.length - 3}</span>
          )}
        </div>

        <div className="cert-card__meta">
          <div className="cert-card__meta-item">
            <Clock className="w-4 h-4 mr-2" />
            {cert.duration}
          </div>
          <div className="cert-card__meta-item">
            <BookOpen className="w-4 h-4 mr-2" />
            {cert.hours} hours
          </div>
          <div className="cert-card__meta-item">
            <Users className="w-4 h-4 mr-2" />
            {cert.students}
          </div>
          <div className="cert-card__meta-item">
            <Star className="w-4 h-4 mr-2 text-yellow-400 fill-current" />
            {cert.rating} ({cert.reviews})
          </div>
        </div>

        <div className="cert-card__salary-info">
          <div className="cert-card__salary-row">
            <span className="text-gray-600">{CERT_CARD_SALARY_LABEL}</span>
            <span className="font-bold text-green-600">{cert.averageSalary}</span>
          </div>
          <div className="cert-card__salary-row">
            <span className="text-gray-600">{CERT_CARD_PROJECTS_LABEL}</span>
            <span className="font-medium">{cert.projects} hands-on</span>
          </div>
        </div>

        <div className="cert-card__footer">
          <div className="cert-card__pricing">
            <span className="cert-card__price">${cert.price}</span>
            <span className="cert-card__original-price">${cert.originalPrice}</span>
            <span className="cert-card__discount-badge">{cert.discount}% off</span>
          </div>
          <div className="cert-card__actions">
            <button className="cert-card__action-btn">
              <Heart className="w-4 h-4 text-theme-muted group-hover:text-red-500 transition-colors" />
            </button>
            <button className="cert-card__action-btn">
              <Bookmark className="w-4 h-4 text-theme-muted group-hover:text-blue-500 transition-colors" />
            </button>
            <button className="cert-card__details-btn">{CERT_CARD_DETAILS_BTN}</button>
          </div>
        </div>

        {expanded && (
          <div className="cert-card__expanded animate-fadeIn">
            <h4 className="cert-card__expanded-title">{CERT_CARD_LEARN_TITLE}</h4>
            <ul className="cert-card__expanded-list">
              {cert.modules.map((module, idx) => (
                <li key={idx} className="cert-card__expanded-item">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  {module}
                </li>
              ))}
            </ul>
            
            <h4 className="cert-card__expanded-title">{CAREER_PATHS_TITLE}</h4>
            <div className="cert-card__career-paths">
              {cert.careerPaths.map((path, idx) => (
                <span key={idx} className="cert-card__career-tag">{path}</span>
              ))}
            </div>

            <h4 className="cert-card__expanded-title">{HIRED_BY_TITLE}</h4>
            <div className="cert-card__companies">
              {cert.companies.map((company, idx) => (
                <span key={idx} className="cert-card__company-tag">{company}</span>
              ))}
            </div>
          </div>
        )}

        <button onClick={onToggleExpand} className="cert-card__toggle">
          {expanded ? (
            <>{CERT_CARD_SHOW_LESS} <ChevronDown className="w-3 h-3 ml-1 rotate-180" /></>
          ) : (
            <>{CERT_CARD_SHOW_MORE} <ChevronDown className="w-3 h-3 ml-1" /></>
          )}
        </button>
      </div>
    </div>
  );
}
