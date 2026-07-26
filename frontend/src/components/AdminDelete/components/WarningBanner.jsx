import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { WARNING_TITLE, WARNING_TEXT } from '../constants';
import './WarningBanner.scss';

const WarningBanner = () => {
  return (
    <div className="warning-banner">
      <div className="warning-banner__inner">
        <AlertTriangle className="warning-banner__icon" />
        <div>
          <h4 className="warning-banner__title">{WARNING_TITLE}</h4>
          <p className="warning-banner__text">
            {WARNING_TEXT}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WarningBanner;
