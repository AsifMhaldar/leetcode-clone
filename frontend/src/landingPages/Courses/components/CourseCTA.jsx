import React from 'react';
import { COURSE_CTA_TITLE, COURSE_CTA_DESC, COURSE_CTA_BUTTON, COURSE_CTA_NOTE } from '../constants';
import './CourseCTA.scss';

export default function CourseCTA() {
  return (
    <div className="course-cta">
      <h2 className="course-cta__title">{COURSE_CTA_TITLE}</h2>
      <p className="course-cta__desc">
        {COURSE_CTA_DESC}
      </p>
      <button className="course-cta__btn">{COURSE_CTA_BUTTON}</button>
      <p className="course-cta__note">
        {COURSE_CTA_NOTE}
      </p>
    </div>
  );
}
