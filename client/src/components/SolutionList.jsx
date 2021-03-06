/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Style from 'style-it';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ContainerDimensions from 'react-container-dimensions';
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

class SolutionList extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.activeSolution !== this.props.activeSolution) {
      const didScroll = this.activeRef && this.activeRef.scrollIntoView && this.activeRef.scrollIntoView({ behavior: 'smooth' });

      if (!didScroll) {
        console.warn('element.scrollIntoView() is not supported in this browser.');
      }
    }
  }

  render() {
    const {
      solutions,
      activeSolution,
      previewSolution,
      onSolutionClicked,
      onSolutionHover,
      onNextSolutionClicked,
      onPreviousSolutionClicked,
      onToggleCreateMatrixUI,
      onToggleIntroductionUI,
    } = this.props;

    return (
      <ContainerDimensions>
        {
          ({ width }) => Style.it(`
            .root {
              width: 100%;
              height: 31px;
              color: white;
              flex: 0 0 auto;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;
              margin: 0px 8px 8px 8px;
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
              padding: 0px;
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
    
            .primaryList {
              max-width: ${width - 80}px;
              display: flex;
              flex-direction: row;
              opacity: 1;
              transition: max-width 300ms ease, opacity 300ms ease;
            }
    
            .primaryListHidden {
              max-width: 0;
              opacity: 0;
            }
          `,
          (<div className='root'>
            <div className='solutionsToolbar'>
              <div className={`primaryList ${solutions.size < 2 ? 'primaryListHidden' : ''}`}>
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
                        (solution, id) => (
                          <div
                            key={id}
                            ref={(solutionRef) => {
                              if (activeSolution === id) {
                                this.activeRef = solutionRef;
                              }
                            }}
                          >
                            <SolutionListItem
                              {...{
                                solutionId: id,
                                onSolutionClicked,
                                onSolutionHover,
                                isActive: activeSolution === id,
                                isPreview: previewSolution === id,
                              }}
                            />
                          </div>
                        )
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
              </div>
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
          </div>))
        }
      </ContainerDimensions>
    );
  }
}

SolutionList.defaultProps = {
  previewSolution: null,
};

SolutionList.propTypes = {
  activeSolution: PropTypes.number.isRequired,
  solutions: ImmutablePropTypes.listOf(
    ImmutablePropTypes.listOf(
      PropTypes.number
    )
  ).isRequired,
  previewSolution: PropTypes.number,
  onSolutionHover: PropTypes.func.isRequired,
  onSolutionClicked: PropTypes.func.isRequired,
  onNextSolutionClicked: PropTypes.func.isRequired,
  onPreviousSolutionClicked: PropTypes.func.isRequired,
  onToggleCreateMatrixUI: PropTypes.func.isRequired,
  onToggleIntroductionUI: PropTypes.func.isRequired,
};

export default PureImmutable()(SolutionList);
