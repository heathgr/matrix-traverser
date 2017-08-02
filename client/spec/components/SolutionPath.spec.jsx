import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import React from 'react';
import SolutionPath from '../../src/components/SolutionPath';
import {
  SOLUTION_PATH,
  SOLUTION_PATH_ACTIVE,
  SOLUTION_PATH_PREVIEW,
  SOLUTION_PATH_INACTIVE,
} from '../../src//constants/styleNames';

describe('<SolutionPath />', () => {
  chai.use(chaiEnzyme());

  const performance = {
    now: () => 0,
  };

  const testWrapper = mount(
    <SolutionPath
      pathData={'M0,0 C1,0 C1,1 C0,1'}
      id={2}
      isActive={false}
      isPreview={false}
      width={200}
      height={200}
    />,
    {
      context: {
        performance,
      },
    }
  );

  it('Should render an SVG path with the correct properties.', () => {
    expect(testWrapper).to.have.exactly(1).descendants('svg');
    expect(testWrapper).to.have.exactly(1).descendants('path');
    expect(testWrapper).to.have.prop('pathData');
    expect(testWrapper).to.have.prop('isActive');
    expect(testWrapper).to.have.prop('isPreview');
  });

  it('Should style the path based what solutions are active or being previewed.', () => {

    testWrapper.setProps({ isActive: false, isPreview: false });

    expect(testWrapper.hasClass(SOLUTION_PATH_ACTIVE)).to.equal(false);
    expect(testWrapper.hasClass(SOLUTION_PATH_PREVIEW)).to.equal(false);
    expect(testWrapper.hasClass(SOLUTION_PATH_INACTIVE)).to.equal(true);

    testWrapper.setProps({ isActive: true, isPreview: false });

    expect(testWrapper.hasClass(SOLUTION_PATH_ACTIVE)).to.equal(true);
    expect(testWrapper.hasClass(SOLUTION_PATH_PREVIEW)).to.equal(false);
    expect(testWrapper.hasClass(SOLUTION_PATH_INACTIVE)).to.equal(false);

    testWrapper.setProps({ isActive: false, isPreview: true });

    expect(testWrapper.hasClass(SOLUTION_PATH_ACTIVE)).to.equal(false);
    expect(testWrapper.hasClass(SOLUTION_PATH_PREVIEW)).to.equal(true);
    expect(testWrapper.hasClass(SOLUTION_PATH_INACTIVE)).to.equal(false);

    testWrapper.setProps({ isActive: true, isPreview: true });

    expect(testWrapper.hasClass(SOLUTION_PATH_ACTIVE)).to.equal(true);
    expect(testWrapper.hasClass(SOLUTION_PATH_PREVIEW)).to.equal(false);
    expect(testWrapper.hasClass(SOLUTION_PATH_INACTIVE)).to.equal(false);
  });
});
