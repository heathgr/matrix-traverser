import { expect } from 'chai';
import { is, Map } from 'immutable';
import {
  calcVectorFromPoints,
  rotateVector90,
  multiplyVectorByScalar,
  addVectors,
} from '../../src/helpers/vectorMath';

describe('Calculate Vector From Points Helper', () => {
  it('Should correctly calculate a vector.', () => {
    const point1 = Map({
      x: 0,
      y: 2,
    });
    const point2 = Map({
      x: 1,
      y: 3,
    });
    const testVector = calcVectorFromPoints(point2, point1);
    const expectedVector = Map({
      x: 0.7071067811865475,
      y: 0.7071067811865475,
    });

    expect(is(testVector, expectedVector)).to.equal(true);
  });

  it('Should correctly rorate a vector by 90 degrees.', () => {
    const testVector = rotateVector90(Map({ x: 1, y: 0 }));
    const expectedVector = Map({ x: 0, y: 1 });

    expect(is(testVector, expectedVector)).to.equal(true);
  });

  it('Should correctly multiply a vector by a scalar.', () => {
    const testVector = multiplyVectorByScalar(
      Map({
        x: 1,
        y: 1,
      }),
      -0.5
    );
    const expectedVector = Map({
      x: -0.5,
      y: -0.5,
    });

    expect(is(testVector, expectedVector)).to.equal(true);
  });

  it('Should correctly add two vectors.', () => {
    const testVector = addVectors(
      Map({
        x: 0,
        y: 2.5,
      }),
      Map({
        x: 0.75,
        y: -1,
      })
    );
    const expectedVector = Map({
      x: 0.75,
      y: 1.5,
    });

    expect(is(testVector, expectedVector)).to.equal(true);
  });
});
