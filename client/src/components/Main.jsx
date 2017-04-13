/** @module components/Main */

import React from 'react';
import MatrixContainer from '../containers/MatrixContainer';

const MainStyle = {
  display: 'flex',
  flexDirection: 'column',
}

const Main = () => (
  <div style={MainStyle}>
    <div>
      <div>Title</div>
      <div>Sub Title</div> 
    </div>
    <MatrixContainer />
    <div>footer</div>
  </div>
);

export default Main;
