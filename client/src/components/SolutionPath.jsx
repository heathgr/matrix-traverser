import React from 'react';
import PropTypes from 'prop-types';
import PureImmutable from '../helpers/hocs/PureImmutable';
import {
  SOLUTION_PATH,
  SOLUTION_PATH_ACTIVE,
  SOLUTION_PATH_PREVIEW,
  SOLUTION_PATH_INACTIVE,
} from '../constants/styleNames';

const SolutionPath = ({
  pathData,
  isActive,
  isPreview,
}) => {
  const pathStyle = (
      () => {
        if (isActive) {
          return `${SOLUTION_PATH} ${SOLUTION_PATH_ACTIVE}`;
        } else if (isPreview) {
          return `${SOLUTION_PATH} ${SOLUTION_PATH_PREVIEW}`;
        }
        return `${SOLUTION_PATH} ${SOLUTION_PATH_INACTIVE}`;
      }
    )();

  return (
    <svg className={pathStyle}>
      <path d={pathData} />
    </svg>
  );
};

SolutionPath.propTypes = {
  pathData: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  isPreview: PropTypes.bool.isRequired,
};

export default PureImmutable()(SolutionPath);
