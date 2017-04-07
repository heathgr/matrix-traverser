/* eslint react/prefer-stateless-function: 0 */

import React, { PureComponent } from 'react';

const Pure = Composed => class extends PureComponent {
  render() {
    return <Composed {...this.props} />;
  }
};

export default Pure;
