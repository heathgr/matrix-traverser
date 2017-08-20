import React from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';

const fadeDuration = 300;
const fadeClassname = {
  entering: 'entering',
  entered: 'entered',
  exiting: 'exiting',
  exited: 'exited',
};

const Fader = ({ in: inProp, out: outProp, children }) => (
  <Transition in={inProp} out={outProp} timeout={fadeDuration} unmountOnExit>
    {
      state => (
        <div className={`${fadeClassname[state]}`}>
          {
            children
          }
        </div>
      )
    }
  </Transition>
);

Fader.propTypes = {
  in: PropTypes.bool.isRequired,
  out: PropTypes.bool.isRequired,
};

export default Fader;
