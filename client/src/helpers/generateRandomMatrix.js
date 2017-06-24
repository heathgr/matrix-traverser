import { Map, Range } from 'immutable';

const generateRandomMatrix = (rowCount, columnCount) => {
  const actualRowCount = !rowCount ? 1 + Math.round(Math.random() * 5) : rowCount;
  const actualColumnCount = !columnCount ? 1 + Math.round(Math.random() * 5) : columnCount;

  return Map({
    rowCount: actualRowCount,
    columnCount: actualColumnCount,
    cells: Range(0, actualRowCount * actualColumnCount).toList().map(
      () => Math.round(Math.random() * 10)
    ),
  });
};

export default generateRandomMatrix;
