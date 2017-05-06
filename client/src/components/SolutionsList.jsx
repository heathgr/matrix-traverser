import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PureImmutable from '../helpers/hocs/PureImmutable';

const SolutionsList = ({
  solutions,
  activeSolution,
  previewSolution,
  onSolutionClicked,
  onNextSolutionClicked,
  onPreviousSolutionClicked,
}) => {
  const wrapperStyle = {
    width: '100%',
    height: '20%',
    maxHeight: 50,
    background: 'tomato',
    color: 'white',
    flex: '0 0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };
  const flexRowStyle = {
    display: 'flex',
    flexDirection: 'row',
  };

  return (<div style={wrapperStyle}>
    <div style={flexRowStyle}>
      <button onClick={() => onPreviousSolutionClicked()}>Prev</button>
      <div>{`Viewing solution ${activeSolution + 1} of ${solutions.size}`}</div>
      <button onClick={() => onNextSolutionClicked()}>Next</button>
    </div>
    <div style={flexRowStyle}>
      {
        solutions.map(
          (solution, i) => <div key={i}>{`${i === activeSolution ? '*' : i + 1}`}</div>
        )
      }
    </div>
  </div>);
};

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
