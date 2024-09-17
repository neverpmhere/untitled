import React from 'react';

const Line = ({ from, to }) => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  const style = {
    position: 'absolute',
    transform: `rotate(${angle}deg)`,
    width: `${length}px`,
    top: `${from.y}px`,
    left: `${from.x}px`,
    transformOrigin: '0 0',
    borderBottom: '2px solid black',
    zIndex: 1, // Ensure lines are beneath the boxes
    outline: '2px solid white', // Add outline to the line
    outlineOffset: '2px'
  };

  return <div style={style} />;
};

export default Line;





