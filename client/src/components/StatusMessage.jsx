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
  ERROR_MESSAGE,
} from '../constants/statusMessageTypes';

const StatusMessage = ({
  messageType,
  solutions,
  error,
}) => Style.it(
  `
    .statusMessage {
      color: ${PRIMARY_BORDER_COLOR};
      padding: 8px;
      font-size: 11px;
    }
  `,
  (
    <div className='statusMessage'>
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

export default StatusMessage;
