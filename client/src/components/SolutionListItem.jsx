import React from 'react';
import PropTypes from 'prop-types';
import {
  SOLUTION_LIST_ITEM,
  SOLUTION_LIST_ITEM_ACTIVE,
  SOLUTION_LIST_ITEM_INACTIVE,
  SOLUTION_LIST_ITEM_PREVIEW,
} from '../constants/styleNames';

const SolutionListItem = ({
  solutionId,
  onSolutionClicked,
  onSolutionHover,
  isActive,
  isPreview,
}) => {
  const itemStyle = (
    () => {
      if (isActive) {
        return `${SOLUTION_LIST_ITEM} ${SOLUTION_LIST_ITEM_ACTIVE}`;
      } else if (isPreview) {
        return `${SOLUTION_LIST_ITEM} ${SOLUTION_LIST_ITEM_PREVIEW}`;
      }
      return `${SOLUTION_LIST_ITEM} ${SOLUTION_LIST_ITEM_INACTIVE}`;
    }
  )();

  return (
    <button
      className={itemStyle}
      onClick={() => onSolutionClicked(solutionId)}
      onMouseEnter={() => onSolutionHover(solutionId)}
      onMouseLeave={() => onSolutionHover(null)}
    >
      {solutionId + 1}
    </button>
  );
};

SolutionListItem.propTypes = {
  solutionId: PropTypes.number.isRequired,
  onSolutionClicked: PropTypes.func.isRequired,
  onSolutionHover: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  isPreview: PropTypes.bool.isRequired,
};

export default SolutionListItem;
