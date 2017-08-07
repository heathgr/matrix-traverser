import React, { PureComponent } from 'react';
import { is } from 'immutable';

const PureImmutable = () => Composed => class Pure extends PureComponent {
  shouldComponentUpdate(nextProps) {
    const nextPropKeys = Object.keys(nextProps);

    return !nextPropKeys.every(
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
