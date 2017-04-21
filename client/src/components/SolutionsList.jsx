import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import glamorous from 'glamorous';
import PureImmutable from '../helpers/hocs/PureImmutable';

const SolutionsList = ({ solutions }) => {
  const Wrapper = glamorous.div({
    width: '100%',
    height: '20%',
    maxHeight: 100,
    background: 'tomato',
    flex: '0 0 auto',
  });

  return (<Wrapper>test</Wrapper>);
};

export default PureImmutable()(SolutionsList);
