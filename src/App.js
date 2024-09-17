import React, { useEffect, useState, useRef } from 'react';
import './styles.css';
import Line from './components/Line';
import VideoBackground from './components/VideoBackground';
import icons from './assets/icons';
import audioFile from './assets/background.m4a';
import Box1Info from './components/Box1Info';
import Box2Info from './components/Box2Info';
import Box3Info from './components/Box3Info';
import Box4Info from './components/Box4Info';
import Box5Info from './components/Box5Info';
import Box6Info from './components/Box6Info';
import Box7Info from './components/Box7Info';
import Box8Info from './components/Box8Info';
import Box9Info from './components/Box9Info';
import telegramIcon from './assets/telegram.png';
import discordIcon from './assets/discord.png';

const initialBoxes = [
  { id: 'box1', top: 10, left: 50, initialTop: 10, initialLeft: 50, icon: '1.jpeg', infoComponent: Box1Info },
  { id: 'box2', top: 30, left: 30, initialTop: 30, initialLeft: 30, icon: '2.jpeg', infoComponent: Box2Info },
  { id: 'box3', top: 30, left: 70, initialTop: 30, initialLeft: 70, icon: '3.jpeg', infoComponent: Box3Info },
  { id: 'box4', top: 50, left: 50, initialTop: 50, initialLeft: 50, icon: '4.jpeg', infoComponent: Box4Info },
  { id: 'box5', top: 70, left: 30, initialTop: 70, initialLeft: 30, icon: '5.jpeg', infoComponent: Box5Info },
  { id: 'box6', top: 70, left: 70, initialTop: 70, initialLeft: 70, icon: '6.jpeg', infoComponent: Box6Info },
  { id: 'box7', top: 90, left: 50, initialTop: 90, initialLeft: 50, icon: '7.jpeg', infoComponent: Box7Info },
  { id: 'box8', top: 50, left: 20, initialTop: 50, initialLeft: 20, icon: '8.jpeg', infoComponent: Box8Info },
  { id: 'box9', top: 50, left: 80, initialTop: 50, initialLeft: 80, icon: '9.jpeg', infoComponent: Box9Info },
];

const lines = [
  { from: 'box4', to: 'box1', fromSide: 'top', toSide: 'bottom' },
  { from: 'box4', to: 'box2', fromSide: 'left-top', toSide: 'right' },
  { from: 'box4', to: 'box3', fromSide: 'right-top', toSide: 'left' },
  { from: 'box4', to: 'box5', fromSide: 'left-bottom', toSide: 'right' },
  { from: 'box4', to: 'box6', fromSide: 'right-bottom', toSide: 'left' },
  { from: 'box4', to: 'box7', fromSide: 'bottom', toSide: 'top' },
  { from: 'box4', to: 'box8', fromSide: 'left', toSide: 'right' },
  { from: 'box4', to: 'box9', fromSide: 'right', toSide: 'left' }
];

const getBoxCoordinates = (box, side) => {
  const element = document.getElementById(box.id);
  if (element) {
    const rect = element.getBoundingClientRect();
    const center = {
      x: rect.left + window.scrollX + rect.width / 2,
      y: rect.top + window.scrollY + rect.height / 2,
    };
    switch (side) {
      case 'top':
        return { x: center.x, y: rect.top + window.scrollY };
      case 'bottom':
        return { x: center.x, y: rect.bottom + window.scrollY };
      case 'left':
        return { x: rect.left + window.scrollX, y: center.y };
      case 'right':
        return { x: rect.right + window.scrollX, y: center.y };
      case 'left-top':
        return { x: rect.left + window.scrollX, y: center.y - rect.height / 4 };
      case 'right-top':
        return { x: rect.right + window.scrollX, y: center.y - rect.height / 4 };
      case 'left-bottom':
        return { x: rect.left + window.scrollX, y: center.y + rect.height / 4 };
      case 'right-bottom':
        return { x: rect.right + window.scrollX, y: center.y + rect.height / 4 };
      default:
        return center;
    }
  }
  return { x: 0, y: 0 };
};

const App = () => {
  const [boxes, setBoxes] = useState(initialBoxes);
  const [lineCoords, setLineCoords] = useState([]);
  const [visibleInfoBox, setVisibleInfoBox] = useState(null);
  const [menuClass, setMenuClass] = useState('');
  const [contentClass, setContentClass] = useState('');
  const audioRef = useRef(null);

  useEffect(() => {
    const updatePositions = () => {
      const newBoxes = boxes.map((box) => {
        const directionX = Math.random() < 0.5 ? -1 : 1;
        const directionY = Math.random() < 0.5 ? -1 : 1;
        const speedX = Math.random() * 0.4;
        const speedY = Math.random() * 0.4;

        const newTop = box.initialTop + directionY * speedY;
        const newLeft = box.initialLeft + directionX * speedX;

        return {
          ...box,
          top: Math.max(box.initialTop - 8, Math.min(box.initialTop + 8, newTop)),
          left: Math.max(box.initialLeft - 8, Math.min(box.initialLeft + 8, newLeft))
        };
      });

      setBoxes(newBoxes);

      const coords = lines.map(line => {
        const fromBox = newBoxes.find(box => box.id === line.from);
        const toBox = newBoxes.find(box => box.id === line.to);
        const fromCoords = getBoxCoordinates(fromBox, line.fromSide);
        const toCoords = getBoxCoordinates(toBox, line.toSide);
        return { from: fromCoords, to: toCoords };
      });

      setLineCoords(coords);
    };

    const interval = setInterval(updatePositions, 100);
    return () => clearInterval(interval);
  }, [boxes]);

  useEffect(() => {
    const handleUserInteraction = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.05;
        audioRef.current.play();
        document.removeEventListener('click', handleUserInteraction);
      }
    };

    document.addEventListener('click', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
    };
  }, []);

  const handleMouseEnter = (box) => {
    console.log(`Mouse entered ${box.id}`);
    setVisibleInfoBox(box.id);
    setMenuClass('visible');
    setTimeout(() => setContentClass('content-visible'), 200); 
  };

  const handleMouseLeave = (box) => {
    console.log('Mouse left');
    setContentClass('content-hidden');
    setTimeout(() => {
      setMenuClass('hidden');
      setTimeout(() => setVisibleInfoBox(null), 600); 
    }, 200); 
  };

  return (
    <div className="container">
      <VideoBackground />
      <audio ref={audioRef} src={audioFile} loop />
      {boxes.map((box) => (
        <div
          key={box.id}
          id={box.id}
          className="box"
          style={{ top: `${box.top}%`, left: `${box.left}%` }}
          onMouseEnter={() => handleMouseEnter(box)}
        >
          <img src={icons[box.icon]} alt={box.id} className="icon" />
        </div>
      ))}
      {lineCoords.map((line, index) => (
        <Line key={index} from={line.from} to={line.to} />
      ))}
      {visibleInfoBox && (
        <div
          className={`full-screen-menu ${menuClass}`}
          onMouseEnter={() => setMenuClass('visible')}
          onMouseLeave={() => handleMouseLeave(boxes.find(box => box.id === visibleInfoBox))}
        >
          <div className={`menu-content ${contentClass}`}>
            <p className="typing-text">{React.createElement(boxes.find(box => box.id === visibleInfoBox).infoComponent)}</p>
          </div>
        </div>
      )}
      <div className="bottom-right-icons">
        <a href="https://t.me/hubidea" target="_blank" rel="noopener noreferrer">
          <img src={telegramIcon} alt="Telegram" className="social-icon" />
        </a>
        <a href="https://discord.gg/5RGZY3FANr" target="_blank" rel="noopener noreferrer">
          <img src={discordIcon} alt="Discord" className="social-icon" />
        </a>
      </div>
      <p className="beta-text">v 0.1</p>
    </div>
  );
};

export default App;





































