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

Fader.defaultProps = {
  in: false,
  out: false,
};

Fader.propTypes = {
  in: PropTypes.bool,
  out: PropTypes.bool,
};

export default Fader;
