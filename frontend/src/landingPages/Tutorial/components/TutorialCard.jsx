import React from 'react';
import { 
  TrendingUp, Clock, BookOpen, Users, Star, Award, 
  Bookmark, Heart, Share2, Play, Globe, Download, 
  Zap, Target, ChevronDown, ChevronUp 
} from 'lucide-react';
import { TUTORIAL_CARD_TRENDING_LABEL, TUTORIAL_CARD_CERTIFICATE_LABEL, TUTORIAL_CARD_RESOURCES_LABEL, TUTORIAL_CARD_SHOW_MORE, TUTORIAL_CARD_SHOW_LESS } from '../constants';
import './TutorialCard.scss';

export default function TutorialCard({
  tutorial,
  viewMode,
  getLevelColor,
  getLevelIcon,
  expandedTutorial,
  setExpandedTutorial
}) {
  return (
    <div
      className={`tutorial-card ${viewMode === 'list' ? 'tutorial-card--list' : ''}`}
    >
      <div className={`tutorial-card__image ${viewMode === 'list' ? 'tutorial-card__image--list' : 'tutorial-card__image--grid'}`}>
        <div className={`tutorial-card__gradient bg-gradient-to-r ${tutorial.color}`}>
          <span className="tutorial-card__emoji">{tutorial.image}</span>
          {tutorial.trending && (
            <div className="tutorial-card__trending-badge">
              <TrendingUp className="w-3 h-3 mr-1" />
              {TUTORIAL_CARD_TRENDING_LABEL}
            </div>
          )}
          {tutorial.progress > 0 && (
            <div className="tutorial-card__progress-bar">
              <div className="tutorial-card__progress-track">
                <div 
                  className="tutorial-card__progress-fill"
                  style={{ width: `${tutorial.progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={`tutorial-card__body ${viewMode === 'list' ? 'tutorial-card__body--list' : ''}`}>
        <div className="tutorial-card__header">
          <div>
            <div className="tutorial-card__badges">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getLevelColor(tutorial.level)}`}>
                {getLevelIcon(tutorial.level)}
                <span className="ml-1 capitalize">{tutorial.level}</span>
              </span>
              {tutorial.certificate && (
                <span className="tutorial-card__certificate-badge">
                  <Award className="w-3 h-3 mr-1" />
                  {TUTORIAL_CARD_CERTIFICATE_LABEL}
                </span>
              )}
            </div>
            <h3 className="tutorial-card__title">
              {tutorial.title}
            </h3>
          </div>
          <button className={`tutorial-card__bookmark ${tutorial.bookmarked ? 'tutorial-card__bookmark--active' : ''}`}>
            <Bookmark className="w-5 h-5" fill={tutorial.bookmarked ? 'currentColor' : 'none'} />
          </button>
        </div>

        <p className="tutorial-card__description line-clamp-2">
          {tutorial.description}
        </p>

        <div className="tutorial-card__tags">
          {tutorial.tags.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="tutorial-card__tag">#{tag}</span>
          ))}
          {tutorial.tags.length > 3 && (
            <span className="tutorial-card__tag">+{tutorial.tags.length - 3}</span>
          )}
        </div>

        <div className="tutorial-card__meta">
          <div className="tutorial-card__meta-item">
            <Clock className="w-4 h-4 mr-2" />
            {tutorial.duration}
          </div>
          <div className="tutorial-card__meta-item">
            <BookOpen className="w-4 h-4 mr-2" />
            {tutorial.lessons} lessons
          </div>
          <div className="tutorial-card__meta-item">
            <Users className="w-4 h-4 mr-2" />
            {tutorial.students}
          </div>
          <div className="tutorial-card__meta-item">
            <Star className="tutorial-card__meta-icon w-4 h-4 mr-2 fill-current" />
            {tutorial.rating} ({tutorial.quizzes} quizzes)
          </div>
        </div>

        <div className="tutorial-card__footer">
          <div className="tutorial-card__instructor">
            <div className="tutorial-card__avatar">{tutorial.instructorAvatar}</div>
            <div>
              <p className="tutorial-card__instructor-name">{tutorial.instructor}</p>
              <p className="tutorial-card__instructor-role">{tutorial.instructorRole}</p>
            </div>
          </div>
          <div className="tutorial-card__actions">
            <button className="tutorial-card__action-btn">
              <Heart className="w-4 h-4 text-theme-muted group-hover:text-red-500 transition-colors" />
            </button>
            <button className="tutorial-card__action-btn">
              <Share2 className="w-4 h-4 text-theme-muted group-hover:text-blue-500 transition-colors" />
            </button>
            <button className="tutorial-card__play-btn">
              <Play className="w-4 h-4" />
            </button>
          </div>
        </div>

        {expandedTutorial === tutorial.id && (
          <div className="tutorial-card__expanded animate-fadeIn">
            <div className="tutorial-card__expanded-grid">
              <div className="tutorial-card__expanded-item">
                <Globe className="w-4 h-4 mr-2" />
                {tutorial.language}
              </div>
                <div className="tutorial-card__expanded-item">
                <Download className="w-4 h-4 mr-2" />
                {TUTORIAL_CARD_RESOURCES_LABEL}
              </div>
              <div className="tutorial-card__expanded-item">
                <Zap className="w-4 h-4 mr-2" />
                Updated {tutorial.lastUpdated}
              </div>
              <div className="tutorial-card__expanded-item">
                <Target className="w-4 h-4 mr-2" />
                {tutorial.projects} projects
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => setExpandedTutorial(expandedTutorial === tutorial.id ? null : tutorial.id)}
          className="tutorial-card__toggle"
        >
          {expandedTutorial === tutorial.id ? (
            <>{TUTORIAL_CARD_SHOW_LESS} <ChevronUp className="w-3 h-3 ml-1" /></>
          ) : (
            <>{TUTORIAL_CARD_SHOW_MORE} <ChevronDown className="w-3 h-3 ml-1" /></>
          )}
        </button>
      </div>
    </div>
  );
}
