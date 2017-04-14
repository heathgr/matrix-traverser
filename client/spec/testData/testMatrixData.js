import { Map, List } from 'immutable';

export const testMatrix = Map({
  cells: List([
    3,
    9,
    0,
    8,
  ]),
  columnCount: 2,
  rowCount: 2,
});

export const testMatrixWithModifiedCell = Map({
  cells: List([
    3,
    9,
    0,
    72,
  ]),
  columnCount: 2,
  rowCount: 2,
});
