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

export const testDetailedMatrix = Map({
  cells: List([
    Map({
      value: 3,
      activePosition: 0,
      previewPosition: 1,
    }),
    Map({
      value: 9,
      activePosition: 1,
      previewPosition: 2,
    }),
    Map({
      value: 0,
      activePosition: 2,
      previewPosition: 3,
    }),
    Map({
      value: 8,
      activePosition: 3,
      previewPosition: 4,
    }),
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
