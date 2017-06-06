import { Map, Range } from 'immutable';

const generateRandomMatrix = () => {
  const rowCount = Math.round(Math.random() * 10);
  const columnCount = Math.round(Math.random() * 10);

  return Map({
    columnCount,
    rowCount,
    cells: Range(0, columnCount * rowCount).toList().map(
      () => Math.round(Math.random() * 10)
    ),
  });
};

export default generateRandomMatrix;
