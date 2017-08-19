import React from 'react';
import Style from 'style-it';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import FaderGroup from './FaderGroup';
import Fader from './Fader';
import {
  PRIMARY_BORDER_COLOR,
} from '../constants/uiColors';
import {
  LOADING_MESSAGE,
  LOADED_MESSAGE,
} from '../constants/statusMessageTypes';
import PureImmutable from '../helpers/hocs/PureImmutable';

const StatusMessage = ({
  messageType,
  solutions,
  error,
}) => Style.it(
  `
    .statusMessage {
      color: ${PRIMARY_BORDER_COLOR};
      margin: 8px;
      width: 100%;
      height: 13px;
      font-size: 13px;
    }

    .messagePositioner {
      position: absolute;
      left: 0px;
      right: 0px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `,
  (
    <div className='statusMessage'>
      <FaderGroup>
        {
          (
            () => {
              switch (messageType) {
                case LOADING_MESSAGE: {
                  return (
                    <Fader key={0}>
                      <div className='messagePositioner'>
                        Loading
                      </div>
                    </Fader>
                  );
                }
                case LOADED_MESSAGE: {
                  return (
                    <Fader key={1}>
                      <div className='messagePositioner'>
                        {`Found ${solutions.size} solution${solutions.size < 2 ? '' : 's'} with a length of ${solutions.get(0).size}.`}
                      </div>
                    </Fader>
                  );
                }
                default: {
                  return (
                    <Fader key={2}>
                      <div className='messagePositioner'>
                        {error}
                      </div>
                    </Fader>
                  );
                }
              }
            }
          )()
        }
      </FaderGroup>
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
