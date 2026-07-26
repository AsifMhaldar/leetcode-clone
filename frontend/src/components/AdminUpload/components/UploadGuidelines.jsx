import React from 'react';
import { GUIDELINES_TITLE, GUIDELINES_ITEMS } from '../constants';
import './UploadGuidelines.scss';

const UploadGuidelines = () => {
  return (
    <div className="upload-guidelines">
      <h3 className="upload-guidelines__title">{GUIDELINES_TITLE}</h3>
      <div className="upload-guidelines__list">
        {GUIDELINES_ITEMS.map((item, index) => (
          <div key={index} className="upload-guidelines__item">
            <div className="upload-guidelines__dot"></div>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadGuidelines;
