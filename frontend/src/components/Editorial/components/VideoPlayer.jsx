import React from 'react';
import { Pause, Play } from 'lucide-react';

const VideoPlayer = ({ 
  videoRef, secureUrl, thumbnailUrl, duration, 
  isPlaying, currentTime, isHovering, setIsHovering,
  formatTime, togglePlayPause, handleSeek 
}) => {
  return (
    <div 
      className="relative w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-lg"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <video
        ref={videoRef}
        src={secureUrl}
        poster={thumbnailUrl}
        onClick={togglePlayPause}
        className="w-full aspect-video bg-black cursor-pointer"
      />
      
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity ${
          isHovering || !isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <button
          onClick={togglePlayPause}
          className="btn btn-circle btn-primary mr-3"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause /> : <Play />}
        </button>
        
        <div className="flex items-center w-full mt-2">
          <span className="text-white text-sm mr-2">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="range range-primary range-xs flex-1"
          />
          <span className="text-white text-sm ml-2">
            {formatTime(duration)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
