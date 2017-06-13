import React from 'react';
import Style from 'style-it';
import {
  PRIMARY_BORDER_COLOR,
  ACCENT_BORDER_COLOR,
  BACKGROUND_COLOR,
  PRIMARY_COLOR,
  ACCENT_COLOR,
} from '../constants/uiColors';

const SolutionListItem = ({
  solutionId,
  onSolutionClicked,
  onSolutionHover,
  isActive,
  isPreview,
}) => {
  return Style.it(`
    .solutionItem {
      width: 25px;
      height: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: ${isActive || isPreview ? PRIMARY_BORDER_COLOR : ACCENT_BORDER_COLOR};
      border-style: 'solid';
      border-color: ${isPreview ? ACCENT_COLOR : BACKGROUND_COLOR};
      border-width: 1px;
      border-radius: 5px;
      background: ${isActive ? PRIMARY_COLOR : BACKGROUND_COLOR};
      transition: 1s;
      flex: 0 0 25px;
    }
  `, (
    <div
      className='solutionItem'
      onClick={() => onSolutionClicked(solutionId)}
      onMouseEnter={() => onSolutionHover(solutionId)}
      onMouseLeave={() => onSolutionHover(null)}
    >
      {solutionId + 1}
    </div>
  ));
};

export default SolutionListItem;
