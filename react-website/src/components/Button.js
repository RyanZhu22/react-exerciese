import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

// there are different styles and size of button property
const STYLES = ['btn--primary', 'btn--outline', 'btn--test'];

const SIZES = ['btn--medium', 'btn--large'];


export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize
}) => {
  // Determine if there is a buttonstyle property involving  in  Button
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

    // Determine if there is a buttonsize property in  Button
  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <Link to='/sign-up' className='btn-mobile'>
      <button
        className={`btn ${checkButtonStyle} ${checkButtonSize}`}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    </Link>
  );
};
