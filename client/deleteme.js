#!user/bin/env node

const bezierFromPoints = (points, tension = 4) => {
  let pathData = `M${points[0].x},${points[0].y}`;

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

    const bSegment = [];

    bSegment.push({
      x: rSeg[1].x,
      y: rSeg[1].y,
    });
    bSegment.push({
      x: (-rSeg[0].x + (tension * rSeg[1].x) + rSeg[2].x) / tension,
      y: (-rSeg[0].y + (tension * rSeg[1].y) + rSeg[2].y) / tension,
    });
    bSegment.push({
      x: (rSeg[1].x + (tension * rSeg[2].x) + -rSeg[3].x) / tension,
      y: (rSeg[1].y + (tension * rSeg[2].y) + -rSeg[3].y) / tension,
    });
    bSegment.push({ x: rSeg[2].x, y: rSeg[2].y });

    pathData += `C${bSegment[1].x},${bSegment[1].y} ${bSegment[2].x},${bSegment[2].y} ${bSegment[3].x},${bSegment[3].y} `;
  }

  return pathData;
};

const result = bezierFromPoints([
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: 1, y: 2 },
  { x: 1, y: 1 },
  { x: 2, y: 1 },
]);

console.log(`result: ${result}`);

/*
console.log('please work, I don\'t want any trouble today.');

const bezierFromPoints = (points) => {
  const fracExp = 2;
  let pathData = [];

  for (let i = 0; i < points.length - 2; i += 2) {
    const rSeg = [];

    switch (i) {
      case 0: {
        rSeg.push({ x: points[i], y: points[i + 1] });
        rSeg.push({ x: points[i], y: points[i + 1] });
        rSeg.push({ x: points[i + 2], y: points[i + 3] });
        rSeg.push({ x: points[i + 4], y: points[i + 5] });
        break;
      }
      case (points.length - 4): {
        rSeg.push({ x: points[i - 2], y: points[i - 1] });
        rSeg.push({ x: points[i], y: points[i + 1] });
        rSeg.push({ x: points[i + 2], y: points[i + 3] });
        rSeg.push({ x: points[i + 2], y: points[i + 3] });
        break;
      }
      default: {
        rSeg.push({ x: points[i - 2], y: points[i - 1] });
        rSeg.push({ x: points[i], y: points[i + 1] });
        rSeg.push({ x: points[i + 2], y: points[i + 3] });
        rSeg.push({ x: points[i + 4], y: points[i + 5] });
        break;
      }
    }

    console.log('rsegement: ', rSeg);

    const bSegment = [];

    bSegment.push({
      x: rSeg[1].x,
      y: rSeg[1].y,
    });
    bSegment.push({
      x: (-rSeg[0].x + fracExp * rSeg[1].x + rSeg[2].x) / fracExp,
      y: (-rSeg[0].y + fracExp * rSeg[1].y + rSeg[2].y) / fracExp,
    });
    bSegment.push({
      x: (rSeg[1].x + fracExp * rSeg[2].x - rSeg[3].x) / fracExp,
      y: (rSeg[1].y + fracExp * rSeg[2].y - rSeg[3].y) / fracExp,
    });
    bSegment.push({ x: rSeg[2].x, y: rSeg[2].y });

    console.log(`bSegment: ${  bSegment}`);

    pathData += 'C' + bSegment[1].x + ',' + bSegment[1].y + ' ' + bSegment[2].x + ',' + bSegment[2].y + ' ' + bSegment[3].x + ',' + bSegment[3].y + ' ';
  }

  return pathData;
};

console.log('path data: ', bezierFromPoints([0, 1, 2, 3, 4, 5, 6, 7]));

console.log('path data: ', bezierFromPoints([
  0, 0,
  100, 100,
  100, 200,
  200, 100,
]));
*/
