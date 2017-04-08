/* eslint react/prefer-stateless-function: 0 */

import React, { PureComponent } from 'react';
import { is } from 'immutable';

// TODO use hoist-non-react-statics?

const PureImmutable = () => Composed => class extends PureComponent {
  shouldComponentUpdate(nextProps, nextState) {
    const nextStateKeys = Object.keys(nextState || {});
    const nextPropKeys = Object.keys(nextProps || {});
    const state = this.state || {};

    return !nextStateKeys.every(
      key => is(nextState[key], state[key])
    ) || !nextPropKeys.every(
      key => is(nextProps[key], this.props[key])
    );
  }
  render() {
    return <Composed {...this.props} />;
  }
};

export default PureImmutable;
