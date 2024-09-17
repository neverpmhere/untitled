import React from 'react';
import './InfoPopup.css';

const InfoPopup = ({ info, style }) => {
  return (
    <div className="info-popup" style={style}>
      {info}
    </div>
  );
};

export default InfoPopup;
