import React from 'react';
import Style from 'style-it';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {
  PRIMARY_BORDER_COLOR,
} from '../constants/uiColors';
import {
  LOADING_MESSAGE,
  LOADED_MESSAGE,
} from '../constants/statusMessageTypes';
import Transitioner from './Transitioner';
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
  `,
  (
    <div className='statusMessage'>
      <Transitioner>
        {
          (
            () => {
              switch (messageType) {
                case LOADING_MESSAGE: {
                  return <div>Loading</div>;
                }
                case LOADED_MESSAGE: {
                  return <div>{`Found ${solutions.size} solutions with a length of ${solutions.get(0).size}.`}</div>;
                }
                default: {
                  return <div>{error}</div>;
                }
              }
            }
          )()
        }
      </Transitioner>
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
