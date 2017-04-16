/**
 * Takes an array of point objects (matrix points) and returns data that will be used to render an SVG path.
 * This function is essentialy a catmul-rom spline to bezier spline converter.  It is adapted from a routine by Nate Vack, https://gist.github.com/njvack/6925609.
 * @param {array} points - An array of point objects.  The shape of a point object is: {x: integer, y: integer }.
 * @param {number} tension - The tension of the path.  Higher values will produce a curve that is closer to a straight line.
 * @returns {array} - An array used to define a bezier path.
 * The first index of the array is a single point object used to define the paths anchor point.
 * The rest of the array is filled with arrays of three point objects used to define cubic bezier curves.
 */
const bezierPathFromMatrixPoints = (points, tension = 3) => {
  const bezierCurves = [points[0]];

  for (let i = 0; i < points.length - 1; i += 1) {
    const rSeg = [];

    switch (i) {
      case 0: {
        rSeg.push(points[i]);
        rSeg.push(points[i]);
        rSeg.push(points[i + 1]);
        rSeg.push(points[i + 2]);
        break;
      }
      case (points.length - 2): {
        rSeg.push(points[i - 1]);
        rSeg.push(points[i]);
        rSeg.push(points[i + 1]);
        rSeg.push(points[i + 1]);
        break;
      }
      default: {
        rSeg.push(points[i - 1]);
        rSeg.push(points[i]);
        rSeg.push(points[i + 1]);
        rSeg.push(points[i + 2]);
        break;
      }
    }

    const bCurve = [];

    bCurve.push({
      x: rSeg[1].x,
      y: rSeg[1].y,
    });
    bCurve.push({
      x: (-rSeg[0].x + (tension * rSeg[1].x) + rSeg[2].x) / tension,
      y: (-rSeg[0].y + (tension * rSeg[1].y) + rSeg[2].y) / tension,
    });
    bCurve.push({
      x: (rSeg[1].x + (tension * rSeg[2].x) + -rSeg[3].x) / tension,
      y: (rSeg[1].y + (tension * rSeg[2].y) + -rSeg[3].y) / tension,
    });
    bCurve.push({ x: rSeg[2].x, y: rSeg[2].y });

    bezierCurves.push([bCurve[1], bCurve[2], bCurve[3]]);
  }

  return bezierCurves;
};

export default bezierPathFromMatrixPoints;
