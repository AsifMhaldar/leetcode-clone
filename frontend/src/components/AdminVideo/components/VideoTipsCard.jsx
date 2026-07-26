import React from 'react';
import { Plus } from 'lucide-react';
import { TIPS_TITLE, TIPS } from '../constants';
import './VideoTipsCard.scss';

const VideoTipsCard = () => {
  return (
    <div className="video-tips">
      <div className="video-tips__inner">
        <div className="video-tips__icon-wrap">
          <Plus className="video-tips__icon" />
        </div>
        <div>
          <h4 className="video-tips__title">{TIPS_TITLE}</h4>
          <p className="video-tips__text">
            {TIPS.map((tip, i) => (
              <React.Fragment key={i}>
                {i > 0 && <br />}
                • {tip}
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoTipsCard;
