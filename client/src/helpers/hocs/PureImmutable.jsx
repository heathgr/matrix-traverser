/* eslint react/prefer-stateless-function: 0 */

import React, { PureComponent } from 'react';
import { is } from 'immutable';

// TODO use hoist-non-react-statics?

const PureImmutable = () => Composed => class Pure extends PureComponent {
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

/**
 * This is a higher order component that is designed to be used for components whose props are all immuable objects.
 * It enables pure rendering and may offer a substantial performance boost.
 *
 * Usage:
 * @example PureImmutable()(TheComponentToBeComposed);
 *
 * The "PureImmutable" function returns another function which takes the component that will be wrapped/composed as a paramater.
 * This pattern lets Pure immutable be used in composition functions for when a component needs to be wrapped in multiple HOCs.
 */
export default PureImmutable;
