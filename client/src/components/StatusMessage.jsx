import React from 'react';
import Style from 'style-it';
import PropTypes from 'prop-types';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import Transition from 'react-transition-group/Transition';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {
  PRIMARY_BORDER_COLOR,
} from '../constants/uiColors';
import {
  LOADING_MESSAGE,
  LOADED_MESSAGE,
} from '../constants/statusMessageTypes';
import PureImmutable from '../helpers/hocs/PureImmutable';


const fadeDuration = 500;
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

const StatusMessage = ({
  messageType,
  solutions,
  error,
}) => Style.it(
  `
    @keyframes transitionInKeyframes {
      0% {opacity: 0; }
      100% {opacity: 1; }
    }

    @keyframes transitionOutKeyframes {
      0% {opacity: 1; }
      100% {opacity: 0; }
    }

    .statusMessage {
      color: ${PRIMARY_BORDER_COLOR};
      margin: 8px;
      width: 100%;
      height: 13px;
      font-size: 13px;
    }

    .transitionItem {
      position: absolute;
      left: 0px;
      right: 0px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .entering {
      animation: 500ms ease transitionInKeyframes;
    }

    .entered {
      opacity: 1;
    }

    .exiting {
      animation: 500ms ease transitionOutKeyframes;
    }

    .exited {
      opacity: 0;
    }
  `,
  (
    <div className='statusMessage'>
      <TransitionGroup>
        {
          (
            () => {
              switch (messageType) {
                case LOADING_MESSAGE: {
                  return (
                    <Fader key={0}>
                      Loading
                    </Fader>
                  );
                }
                case LOADED_MESSAGE: {
                  return (
                    <Fader key={1}>
                      {`Found ${solutions.size} solutions with a length of ${solutions.get(0).size}.`}
                    </Fader>
                  );
                }
                default: {
                  return (
                    <Fader key={2}>
                      {error}
                    </Fader>
                  );
                }
              }
            }
          )()
        }
      </TransitionGroup>
    </div>
  )
);

StatusMessage.defaultProps = {
  solutions: null,
  error: null,
};

StatusMessage.propTypes = {
  messageType: PropTypes.string.isRequired,
  solutions: ImmutablePropTypes.listOf(
    ImmutablePropTypes.listOf(
      PropTypes.number
    )
  ),
  error: PropTypes.string,
};

export default PureImmutable()(StatusMessage);
