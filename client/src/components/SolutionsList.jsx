import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import glamorous from 'glamorous';
import PureImmutable from '../helpers/hocs/PureImmutable';

const SolutionsList = ({
  solutions,
  activeSolution,
  previewSolution,
  onSolutionClicked,
  onNextSolutionClicked,
  onPreviousSolutionClicked,
}) => {
  const Wrapper = glamorous.div({
    width: '100%',
    height: '20%',
    maxHeight: 50,
    background: 'tomato',
    flex: '0 0 auto',
  });

  return (<Wrapper>
    <div>{`Viewing solution ${activeSolution + 1} of ${solutions.size}`}</div>
    <button onClick={() => onPreviousSolutionClicked()}>Prev</button>
    <button onClick={() => onNextSolutionClicked()}>Next</button>
  </Wrapper>);
};

SolutionsList.propTypes = {
  onSolutionClicked: PropTypes.func.isRequired,
  onNextSolutionClicked: PropTypes.func.isRequired,
  onPreviousSolutionClicked: PropTypes.func.isRequired,
};

export default PureImmutable()(SolutionsList);
