/* eslint react/prefer-stateless-function: 0 */

import React, { PureComponent, PropTypes } from 'react';
import { is } from 'immutable';

const PureImmutable = Composed => class extends PureComponent {
  shouldComponentUpdate(nextProps, nextState) {
    const checkStates = this.updateOnStates || Object.keys(nextState || {});
    const checkProps = this.updateOnProps || Object.keys(nextProps);
    const state = this.state || {};
 
    return !checkStates.every((s) => is(nextState[s], state[s]))
      || !checkProps.every((p) => is(nextProps[p], this.props[p]));
  }
  render() {
    return <Composed {...this.props} />;
  }
};

export default PureImmutable;
