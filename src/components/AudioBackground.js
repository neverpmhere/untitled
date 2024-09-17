// src/components/AudioBackground.js
import React, { useRef, useEffect } from 'react';
import './AudioBackground.css';
import audioSrc from '../assets/background.m4a';

const AudioBackground = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.05; // Начальная громкость 50%
      audioRef.current.play();
    }
  }, []);

  return (
    <audio ref={audioRef} src={audioSrc} autoPlay loop />
  );
};

export default AudioBackground;



