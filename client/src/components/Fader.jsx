import React from 'react';
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
      (state) => {
        return (<div className={`transitionItem ${fadeClassname[state]}`}>
          {
            children
          }
        </div>);
      }
    }
  </Transition>
);

export default Fader;
