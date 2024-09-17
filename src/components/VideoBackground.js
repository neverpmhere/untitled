import React from 'react';
import '../styles/VideoBackground.css'; // Путь к вашему файлу стилей
import video from '../assets/wallpaper.mp4'; // Путь к вашему видео

const VideoBackground = () => {
  return (
    <div className="video-background">
      <video autoPlay loop muted>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoBackground;

