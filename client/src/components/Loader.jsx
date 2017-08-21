import React from 'react';
import Style from 'style-it';

const Loader = () => Style.it(
  `
    @keyframes loaderDot {
      0% {stroke-width: 0px; }
      100% {stroke-width: 5px; }
    }

    .loader {
      fill: white;
      width: 48px;
      height: 15px;
    }

    .dot1 {
      stroke: white;
      animation: 0.6s ease-in-out 0s infinite alternate loaderDot;
    }

    .dot2 {
      stroke: white;
      animation: 0.6s ease-in-out 0.15s infinite alternate loaderDot;
    }

    .dot3 {
      stroke: white;
      animation: 0.6s ease-in-out 0.3s infinite alternate loaderDot;
    }
  `,
  (
    <svg className='loader'>
      <circle cx={8} cy={8} r={1} className='dot1' />
      <circle cx={24} cy={8} r={1} className='dot2' />
      <circle cx={40} cy={8} r={1} className='dot3' />
    </svg>
  )
);

export default Loader;
