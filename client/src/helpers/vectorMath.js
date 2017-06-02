import { Map } from 'immutable';

export const calcVectorFromPoints = (point1, point2) => {
  const x = point1.get('x') - point2.get('x');
  const y = point1.get('y') - point2.get('y');
  const length = Math.sqrt((x * x) + (y * y));

  return Map({
    x: x / length,
    y: y / length,
  });
};

export const rotateVector90 = vector => Map({
  x: -vector.get('y'),
  y: vector.get('x'),
});

export const multiplyVectorByScalar = (vector, scalar) => Map({
  x: vector.get('x') * scalar,
  y: vector.get('y') * scalar,
});

export const addVectors = (vector1, vector2) => Map({
  x: vector1.get('x') + vector2.get('x'),
  y: vector1.get('y') + vector2.get('y'),
});
