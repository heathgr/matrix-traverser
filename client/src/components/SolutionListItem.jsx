import React from 'react';
import Style from 'style-it';
import {
  PRIMARY_BORDER_COLOR,
  BACKGROUND_COLOR,
  ACCENT_BORDER_COLOR,
  INACTIVE_COLOR,
} from '../constants/uiColors';

const SolutionListItem = ({
  solutionId,
  onSolutionClicked,
  onSolutionHover,
  isActive,
  isPreview,
}) => {
  const itemColor = (() => {
    if (isActive) {
      return PRIMARY_BORDER_COLOR;
    } else if (isPreview) {
      return ACCENT_BORDER_COLOR;
    }
    return INACTIVE_COLOR;
  })();

  return Style.it(`
    .wrapper {
      width: 60px;
      height: 60px;
      position: relative;
    }

    .textPositioner {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0px;
      left: 0px;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1;
      color: ${BACKGROUND_COLOR};
    }

    .mainCircle {
      stroke: none;
      fill: ${itemColor};
      width: 60px;
      height: 60px;
      transition: fill ease 1s;
    }
  `, (
    <div
      className='wrapper'
      onClick={() => onSolutionClicked(solutionId)}
      onMouseEnter={() => onSolutionHover(solutionId)}
      onMouseLeave={() => onSolutionHover(null)}
    >
      <svg className='mainCircle'>
        <circle cx={30} cy={30} r={15} />
      </svg>
      <div className='textPositioner'>
        {solutionId + 1}
      </div>
    </div>
  ));
};

export default SolutionListItem;
