import React from 'react';
import PropTypes from 'prop-types';
import Style from 'style-it';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PureImmutable from '../helpers/hocs/PureImmutable';
import SolutionListItem from './SolutionListItem';
import Button from './Button';
import {
  SOLUTION_LIST_ITEM,
  SOLUTION_LIST_ITEM_ACTIVE,
  SOLUTION_LIST_ITEM_INACTIVE,
  SOLUTION_LIST_ITEM_PREVIEW,
} from '../constants/styleNames';
import {
  PRIMARY_BORDER_COLOR,
  ACCENT_BORDER_COLOR,
  BACKGROUND_COLOR,
  PRIMARY_COLOR,
  ACCENT_COLOR,
} from '../constants/uiColors';

const SolutionList = ({
  solutions,
  activeSolution,
  previewSolution,
  onSolutionClicked,
  onSolutionHover,
  onNextSolutionClicked,
  onPreviousSolutionClicked,
  onToggleCreateMatrixUI,
  onToggleIntroductionUI,
}) => Style.it(`
    .root {
      width: 100%;
      height: 31px;
      color: white;
      flex: 0 0 auto;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }

    .solutionsToolbar {
      max-width: 100%;
      display: flex;
      flex: 0 1 auto;
      flex-direction: row;
      align-items: center;
    }

    .scrollBox {
      flex: 1 1 auto;
      flex-direction: row;
      overflow: auto;
      justify-content: center;
    }

    .solutionButtonContainer {
      display: flex;
      flex-direction: row;
    }

    .${SOLUTION_LIST_ITEM} {
      display: block;
      width: 25px;
      height: 25px;
      justify-content: center;
      align-items: center;
      border-style: 'solid';
      border-width: 1px;
      border-radius: 5px;
      margin: 3px;
      transition: 1s;
      flex: 0 0 25px;
      outline: none;
    }

    .${SOLUTION_LIST_ITEM_ACTIVE} {
      color: ${PRIMARY_BORDER_COLOR};
      border-color: ${PRIMARY_COLOR};
      background: ${PRIMARY_COLOR};
    }

    .${SOLUTION_LIST_ITEM_INACTIVE} {
      color: ${ACCENT_BORDER_COLOR};
      border-color: ${BACKGROUND_COLOR};
      background: ${BACKGROUND_COLOR};
    }

    .${SOLUTION_LIST_ITEM_PREVIEW} {
      color: ${PRIMARY_BORDER_COLOR};
      border-color: ${ACCENT_COLOR};
      background: ${ACCENT_COLOR};
    }
  `,
  (<div className='root'>
    <div className='solutionsToolbar'>
      <Button
        className='toolbarButton'
        onClick={() => onPreviousSolutionClicked()}
      >
        {'<'}
      </Button>
      <div className='scrollBox'>
        <div className='solutionButtonContainer'>
          {
            solutions.map(
              (solution, id) => <SolutionListItem
                {...{
                  key: id,
                  solutionId: id,
                  onSolutionClicked,
                  onSolutionHover,
                  isActive: activeSolution === id,
                  isPreview: previewSolution === id,
                }}
              />
            )
          }
        </div>
      </div>
      <Button
        className='toolbarButton'
        onClick={() => onNextSolutionClicked()}
      >
        {'>'}
      </Button>
      <Button
        className='toolbarButton'
        onClick={() => onToggleCreateMatrixUI()}
      >
        +
      </Button>
      <Button
        className='toolbarButton'
        onClick={() => onToggleIntroductionUI()}
      >
        ?
      </Button>
    </div>
  </div>)
);

SolutionList.propTypes = {
  activeSolution: PropTypes.number.isRequired,
  solutions: ImmutablePropTypes.listOf(
    ImmutablePropTypes.listOf(
      PropTypes.number
    )
  ).isRequired,
  onSolutionClicked: PropTypes.func.isRequired,
  onNextSolutionClicked: PropTypes.func.isRequired,
  onPreviousSolutionClicked: PropTypes.func.isRequired,
  onToggleCreateMatrixUI: PropTypes.func.isRequired,
  onToggleIntroductionUI: PropTypes.func.isRequired,
};

export default PureImmutable()(SolutionList);
