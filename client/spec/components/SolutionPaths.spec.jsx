import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import React from 'react';
import { getSolutionPathsData } from '../../src/reducers/root';
import SolutionPaths from '../../src/components/SolutionPaths';
import SolutionPath from '../../src/components//SolutionPath';

describe('<SolutionPaths />', () => {
  chai.use(chaiEnzyme());

  const testState = {
    matrix: fromJS({
      cells: [1, 2, 3, 4],
      columnCount: 2,
      rowCount: 2,
    }),
    solutions: fromJS([
      [0, 1, 2, 3],
    ]),
  };

  const testPathsData = getSolutionPathsData(testState);
  const testWrapper = mount(<SolutionPaths solutionPathsData={testPathsData} width={100} height={100} cellSize={50} />);

  it('Should render the correct number of <SolutionPath /> components.', () => {
    expect(testWrapper).to.have.exactly(1).descendants(SolutionPath);
  });
});
