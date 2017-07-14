import React from 'react';
import Style from 'style-it';
import { BACKGROUND_COLOR } from '../constants/uiColors';

const Modal = ({ children }) => Style.it(
  `
    .wrapper {
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      color: white;
      z-index: 20;
    }

    .background {
      background: ${BACKGROUND_COLOR};
      opacity: 0.8;
      width: 100%;
      height: 100%;
      position: absolute;
    }

    .centerContent {
      width: 100%;
      height: 100%;
      position: absolute;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  `,
  <div className='wrapper'>
    <div className='background' />
    <div className='centerContent'>
      {children}
    </div>
  </div>
);

export default Modal;
