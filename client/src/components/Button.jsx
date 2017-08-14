import React from 'react';
import Style from 'style-it';
import { PRIMARY_BORDER_COLOR, ACCENT_BORDER_COLOR } from '../constants/uiColors';

const Button = ({ children, onClick }) => Style.it(
  `
    .wrapper {
      min-width: 25px;
      width: auto;
      height: 25px;
      margin: 3px;
      flex: 0 0 auto;
      color: ${PRIMARY_BORDER_COLOR};
      background: none;
      border: solid;
      border-color: ${ACCENT_BORDER_COLOR};
      border-width: 1px;
      border-radius: 5px;
      outline: none;
      transition: ease 1s;
      position: relative;
      font-size: 13px;
    }

    .wrapper:hover {
      border-color: ${PRIMARY_BORDER_COLOR};
    }
  `,
  <button onClick={onClick} className='wrapper'>
    {children}
  </button>
);

export default Button;
