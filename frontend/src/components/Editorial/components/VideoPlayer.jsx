import React from 'react';
import { Pause, Play } from 'lucide-react';
import { PLAY_ARIA_LABEL, PAUSE_ARIA_LABEL } from '../constants';
import './VideoPlayer.scss';

const VideoPlayer = ({ 
  videoRef, secureUrl, thumbnailUrl, duration, 
  isPlaying, currentTime, isHovering, setIsHovering,
  formatTime, togglePlayPause, handleSeek 
}) => {
  return (
    <div 
      className="video-player"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <video
        ref={videoRef}
        src={secureUrl}
        poster={thumbnailUrl}
        onClick={togglePlayPause}
        className="video-player__video"
      />
      
      <div 
        className={`video-player__controls ${isHovering || !isPlaying ? 'video-player__controls--visible' : 'video-player__controls--hidden'}`}
      >
        <button
          onClick={togglePlayPause}
          className="video-player__play-btn"
          aria-label={isPlaying ? PAUSE_ARIA_LABEL : PLAY_ARIA_LABEL}
        >
          {isPlaying ? <Pause /> : <Play />}
        </button>
        
        <div className="video-player__timeline">
          <span className="video-player__time video-player__time--current">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="video-player__progress"
          />
          <span className="video-player__time video-player__time--duration">
            {formatTime(duration)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
