import React from 'react';
import PropTypes from 'prop-types';
import Style from 'style-it';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PureImmutable from '../helpers/hocs/PureImmutable';
import SolutionsListItem from './SolutionListItem';
import { PRIMARY_BORDER_COLOR } from '../constants/uiColors';

const SolutionsList = ({
  solutions,
  activeSolution,
  previewSolution,
  onSolutionClicked,
  onSolutionHover,
  onNextSolutionClicked,
  onPreviousSolutionClicked,
}) => Style.it(`
    .root {
      width: 100%;
      height: 60px;
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

    .prevNextButtons {
      width: 15px;
      height: 30px;
      margin: 3px;
      flex 0 0 auto;
      background: ${PRIMARY_BORDER_COLOR};
      border: none;
      outline: none;
    }

    .prevButton {
      border-radius: 15px 0px 0px 15px;
    }

    .nextButton {
      border-radius: 0px 15px 15px 0px;
    }

    .solutionButtonContainer {
      display: flex;
      flex-direction: row;
    }
  `,
  (<div className='root'>
    <div className='solutionsToolbar'>
      <button
        className='prevNextButtons prevButton'
        onClick={() => onPreviousSolutionClicked()}
      >
        {'<'}
      </button>
      <div className='scrollBox'>
        <div className='solutionButtonContainer'>
          {
            solutions.map(
              (solution, id) => <SolutionsListItem
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
      <button
        className='prevNextButtons nextButton'
        onClick={() => onNextSolutionClicked()}
      >
        {'>'}
      </button>
    </div>
  </div>)
);

SolutionsList.propTypes = {
  activeSolution: PropTypes.number.isRequired,
  solutions: ImmutablePropTypes.listOf(
    ImmutablePropTypes.listOf(
      PropTypes.number
    )
  ).isRequired,
  onSolutionClicked: PropTypes.func.isRequired,
  onNextSolutionClicked: PropTypes.func.isRequired,
  onPreviousSolutionClicked: PropTypes.func.isRequired,
};

export default PureImmutable()(SolutionsList);
