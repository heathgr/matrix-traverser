import React from 'react';
import PropTypes from 'prop-types';
import Style from 'style-it';
import TransitionGroup from 'react-transition-group/TransitionGroup';

const FaderStyles = ({ children }) => Style.it(
  `
    @keyframes transitionInKeyframes {
      0% {opacity: 0; }
      100% {opacity: 1; }
    }

    @keyframes transitionOutKeyframes {
      0% {opacity: 1; }
      100% {opacity: 0; }
    }

    .entering {
      animation: 300ms ease transitionInKeyframes;
    }

    .entered {
      opacity: 1;
    }

    .exiting {
      animation: 300ms ease transitionOutKeyframes;
    }

    .exited {
      opacity: 0;
    }
  `, (
    <div>
      <TransitionGroup>
        {
          children
        }
      </TransitionGroup>
    </div>
  )
);

export default FaderStyles;
