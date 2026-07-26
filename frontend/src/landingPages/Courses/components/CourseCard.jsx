import React from 'react';
import {
  Heart, Clock, BookOpen, Users, Star, TrendingUp, Percent,
  Award, FileText, Code, Download, Bookmark, CheckCircle,
  ChevronDown, ChevronUp
} from 'lucide-react';
import {
  COURSE_CARD_BESTSELLER_LABEL, COURSE_CARD_CERTIFICATE_LABEL,
  COURSE_CARD_QUIZ_TAG, COURSE_CARD_EXERCISE_TAG, COURSE_CARD_PREVIEW_BTN,
  COURSE_CARD_LEARN_TITLE, COURSE_CARD_SYLLABUS_TITLE, COURSE_CARD_SUBTITLES_TITLE,
  COURSE_CARD_SHOW_MORE, COURSE_CARD_SHOW_LESS
} from '../constants';
import './CourseCard.scss';

export default function CourseCard({ course, viewMode, expandedCourse, setExpandedCourse, getLevelBadge }) {
  return (
    <div className={`course-card ${viewMode === 'list' ? 'course-card--list' : ''}`}>
      <div className={`course-card__image ${viewMode === 'list' ? 'course-card__image--list' : 'course-card__image--grid'}`}>
        <div className={`course-card__gradient bg-gradient-to-r ${course.color}`}>
          <span className="course-card__emoji">{course.image}</span>

          <div className="course-card__badges">
            {course.bestselling && (
              <span className="course-card__bestseller">
                <TrendingUp className="w-3 h-3 mr-1" />
                {COURSE_CARD_BESTSELLER_LABEL}
              </span>
            )}
            {course.discount > 30 && (
              <span className="course-card__discount">
                <Percent className="w-3 h-3 mr-1" />
                {course.discount}% OFF
              </span>
            )}
          </div>
        </div>
      </div>

      <div className={`course-card__body ${viewMode === 'list' ? 'course-card__body--list' : ''}`}>
        <div className="course-card__header">
          <div>
            <div className="course-card__badges-row">
              {getLevelBadge(course.level)}
              {course.certificate && (
                <span className="course-card__certificate">
                  <Award className="w-3 h-3 mr-1" />
                  {COURSE_CARD_CERTIFICATE_LABEL}
                </span>
              )}
            </div>
            <h3 className="course-card__title">{course.title}</h3>
            <p className="course-card__instructor">by {course.instructor}</p>
          </div>
          <button className="course-card__favorite">
            <Heart className="w-4 h-4 text-theme-muted group-hover:text-red-500 transition-colors" />
          </button>
        </div>

        <p className="course-card__description line-clamp-2">
          {course.description}
        </p>

        <div className="course-card__meta">
          <div className="course-card__meta-item">
            <Clock className="w-4 h-4 mr-2" />
            {course.duration}
          </div>
          <div className="course-card__meta-item">
            <BookOpen className="w-4 h-4 mr-2" />
            {course.lectures} lectures
          </div>
          <div className="course-card__meta-item">
            <Users className="w-4 h-4 mr-2" />
            {course.students}
          </div>
          <div className="course-card__meta-item">
            <Star className="course-card__meta-icon w-4 h-4 mr-2 fill-current" />
            {course.rating} ({course.reviews})
          </div>
        </div>

        <div className="course-card__tags">
          {course.quizzes && (
            <span className="course-card__tag course-card__tag--quiz">
              <FileText className="w-3 h-3 mr-1" />
              {COURSE_CARD_QUIZ_TAG}
            </span>
          )}
          {course.codingExercises && (
            <span className="course-card__tag course-card__tag--exercise">
              <Code className="w-3 h-3 mr-1" />
              {COURSE_CARD_EXERCISE_TAG}
            </span>
          )}
          {course.downloadableResources > 0 && (
            <span className="course-card__tag course-card__tag--resource">
              <Download className="w-3 h-3 mr-1" />
              {course.downloadableResources} resources
            </span>
          )}
        </div>

        <div className="course-card__footer">
          <div className="course-card__pricing">
            <span className="course-card__price">${course.price}</span>
            <span className="course-card__original-price">${course.originalPrice}</span>
          </div>
          <div className="course-card__actions">
            <button className="course-card__action-btn">
              <Bookmark className="w-4 h-4 text-theme-muted" />
            </button>
            <button className="course-card__preview-btn">{COURSE_CARD_PREVIEW_BTN}</button>
          </div>
        </div>

        {expandedCourse === course.id && (
          <div className="course-card__expanded animate-fadeIn">
            <h4 className="course-card__expanded-title">{COURSE_CARD_LEARN_TITLE}</h4>
            <ul className="course-card__expanded-list">
              {course.whatYoullLearn.map((item, idx) => (
                <li key={idx} className="course-card__expanded-item">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  {item}
                </li>
              ))}
            </ul>

            <h4 className="course-card__expanded-title">{COURSE_CARD_SYLLABUS_TITLE}</h4>
            <div className="course-card__syllabus">
              {course.syllabus.map((item, idx) => (
                <div key={idx} className="course-card__syllabus-item">
                  <span className="text-gray-600">Week {item.week}: {item.topic}</span>
                  <span className="text-theme-muted text-xs">{item.duration}</span>
                </div>
              ))}
            </div>

            <h4 className="course-card__expanded-title">{COURSE_CARD_SUBTITLES_TITLE}</h4>
            <div className="course-card__subtitles">
              {course.subtitles.map((sub, idx) => (
                <span key={idx} className="course-card__subtitle-tag">{sub}</span>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
          className="course-card__toggle"
        >
          {expandedCourse === course.id ? (
            <>{COURSE_CARD_SHOW_LESS} <ChevronUp className="w-3 h-3 ml-1" /></>
          ) : (
            <>{COURSE_CARD_SHOW_MORE} <ChevronDown className="w-3 h-3 ml-1" /></>
          )}
        </button>
      </div>
    </div>
  );
}
