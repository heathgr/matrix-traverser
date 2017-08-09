import { List, Map } from 'immutable';
import { multiplyVectorByScalar, addVectors } from '../helpers/vectorMath';

/**
 * Takes an array of point maps (matrix points) and returns data that will be used to render an SVG path.
 * This function is essentialy a catmul-rom spline to bezier spline converter.  It is adapted from a routine by Nate Vack, https://gist.github.com/njvack/6925609.
 * @param {array} points - An array of point maps.  The shape of a point map is: {x: integer, y: integer }.
 * @param {number} tension - The tension of the path.  Higher values will produce a curve that is closer to a straight line.
 * @returns {list} - A list used to define a bezier path.
 * The first index of the list is a single point map used to define the paths anchor point.
 * The rest of the list is filled with lists of three point maps used to define cubic bezier curves.
 */
const bezierPathFromMatrixPoints = (points, tension = 3) => {
  let bezierCurves = List([
    List([points.get(0)]),
  ]);

  // If there are only two matrix points, special handeling is requried.
  if (points.size === 2) {
    const first = points.get(0);
    const second = points.get(1);
    const offsetVector = Map({
      x: second.get('x') - first.get('x'),
      y: second.get('y') - first.get('y'),
    });
    const segment = List([
      addVectors(first, multiplyVectorByScalar(offsetVector, 1 / 3)),
      addVectors(first, multiplyVectorByScalar(offsetVector, 2 / 3)),
      second,
    ]);

    bezierCurves = bezierCurves.push(segment);

    return bezierCurves;
  }

  for (let i = 0; i < points.size - 1; i += 1) {
    let rSeg = List([]);

    switch (i) {
      case 0: {
        rSeg = rSeg
        .push(points.get(i))
        .push(points.get(i))
        .push(points.get(i + 1))
        .push(points.get(i + 2));
        break;
      }
      case (points.size - 2): {
        rSeg = rSeg
        .push(points.get(i - 1))
        .push(points.get(i))
        .push(points.get(i + 1))
        .push(points.get(i + 1));
        break;
      }
      default: {
        rSeg = rSeg
        .push(points.get(i - 1))
        .push(points.get(i))
        .push(points.get(i + 1))
        .push(points.get(i + 2));
        break;
      }
    }

    bezierCurves = bezierCurves.push(
      List([])
      .push(Map({
        x: (-rSeg.get(0).get('x') + (tension * rSeg.get(1).get('x')) + rSeg.get(2).get('x')) / tension,
        y: (-rSeg.get(0).get('y') + (tension * rSeg.get(1).get('y')) + rSeg.get(2).get('y')) / tension,
      }))
      .push(Map({
        x: (rSeg.get(1).get('x') + (tension * rSeg.get(2).get('x')) + -rSeg.get(3).get('x')) / tension,
        y: (rSeg.get(1).get('y') + (tension * rSeg.get(2).get('y')) + -rSeg.get(3).get('y')) / tension,
      }))
      .push(Map({ x: rSeg.get(2).get('x'), y: rSeg.get(2).get('y') }))
    );
  }

  return bezierCurves;
};

export default bezierPathFromMatrixPoints;
