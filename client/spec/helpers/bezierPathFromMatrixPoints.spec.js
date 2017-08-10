// M100,0C75,25 0,50 0,100 C0,150 75,200 100,200 C125,200 75,125 100,100 C125,75 175,100 200,100
import { fromJS, is } from 'immutable';
import { expect } from 'chai';
import bezierPathFromMatrixPoints from '../../src/helpers/bezierPathFromMatrixPoints';

describe('The Bezier Points From Matrix Points helper.', () => {
  it('Should correctly calculate a bezier path from matrix points', () => {
    const testPoints = fromJS([
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 2 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
    ]);
    const expectedResult = fromJS([
      [
        { x: 1, y: 0 },
      ],
      [
        { x: 0.75, y: 0.25 },
        { x: 0, y: 0.5 },
        { x: 0, y: 1 },
      ],
      [
        { x: 0, y: 1.5 },
        { x: 0.75, y: 2 },
        { x: 1, y: 2 },
      ],
      [
        { x: 1.25, y: 2 },
        { x: 0.75, y: 1.25 },
        { x: 1, y: 1 },
      ],
      [
        { x: 1.25, y: 0.75 },
        { x: 1.75, y: 1 },
        { x: 2, y: 1 },
      ],
    ]);
    const result = bezierPathFromMatrixPoints(testPoints, 4);

    expect(is(result, expectedResult)).to.equal(true);
  });

  it('Should correctly calculate a bezier path from only two matrix points.', () => {
    const testPoints = fromJS([
      { x: 1, y: 0 },
      { x: 0, y: 1 },
    ]);
    const expectedResult = fromJS(
      [
        [{ x: 1, y: 0 }],
        [
          { x: 0.6666666666666667, y: 0.3333333333333333 },
          { x: 0.33333333333333337, y: 0.6666666666666666 },
          { x: 0, y: 1 },
        ],
      ]
    );
    const result = bezierPathFromMatrixPoints(testPoints, 4);

    expect(is(expectedResult, result)).to.equal(true);
  });
});
