import React from 'react';
import './Menu.css';

const Menu = ({ options, onSelect }) => {
  return (
    <div className="menu">
      {options.map((option, index) => (
        <div
          key={index}
          className="menu-option"
          onClick={() => onSelect(option)}
        >
          {option.label}
        </div>
      ))}
    </div>
  );
};

export default Menu;

