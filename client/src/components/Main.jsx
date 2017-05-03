/** @module components/Main */

import React from 'react';
import glamorous from 'glamorous';
import MatrixContainer from '../containers/MatrixContainer';

const Main = () => {
  const Wrapper = glamorous.div({
    width: '100%',
    height: '100%',
    background: 'papayawhip',
    display: 'flex',
    flexDirection: 'column',
  });

  const Header = glamorous.div({
    flex: 0,
  });

  const Footer = glamorous.div({
    flex: 0,
  });

  const Body = glamorous.div({
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  });

  return (<Wrapper>
    <Body>
      <MatrixContainer />
    </Body>
  </Wrapper>);
};

export default Main;
