import React from 'react';
import { Edit } from 'lucide-react';
import { GUIDELINES_TITLE, GUIDELINES_TEXT } from '../constants';
import './GuidelinesBanner.scss';

const GuidelinesBanner = () => {
  return (
    <div className="guidelines-banner">
      <div className="guidelines-banner__inner">
        <Edit className="guidelines-banner__icon" />
        <div>
          <h4 className="guidelines-banner__title">{GUIDELINES_TITLE}</h4>
          <p className="guidelines-banner__text">
            {GUIDELINES_TEXT}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuidelinesBanner;
