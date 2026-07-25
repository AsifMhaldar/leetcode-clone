import React from 'react';
import { useVideoPlayer } from './hooks/useVideoPlayer';
import VideoPlayer from './components/VideoPlayer';

const Editorial = ({ secureUrl, thumbnailUrl, duration }) => {
  const {
    videoRef,
    isPlaying,
    currentTime,
    isHovering,
    setIsHovering,
    formatTime,
    togglePlayPause,
    handleSeek
  } = useVideoPlayer(duration);

  return (
    <VideoPlayer
      videoRef={videoRef}
      secureUrl={secureUrl}
      thumbnailUrl={thumbnailUrl}
      duration={duration}
      isPlaying={isPlaying}
      currentTime={currentTime}
      isHovering={isHovering}
      setIsHovering={setIsHovering}
      formatTime={formatTime}
      togglePlayPause={togglePlayPause}
      handleSeek={handleSeek}
    />
  );
};

export default Editorial;
