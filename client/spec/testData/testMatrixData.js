import { Map, List } from 'immutable';

export const testMatrix = Map({
  cells: List([
    Map({
      column: 0,
      row: 0,
      value: 3,
    }),
    Map({
      column: 1,
      row: 0,
      value: 9,
    }),
    Map({
      column: 0,
      row: 1,
      value: 0,
    }),
    Map({
      column: 1,
      row: 1,
      value: 8,
    }),
  ]),
  columnCount: 2,
});

export const testMatrixWithModifiedCell = Map({
  cells: List([
    Map({
      column: 0,
      row: 0,
      value: 3,
    }),
    Map({
      column: 1,
      row: 0,
      value: 9,
    }),
    Map({
      column: 0,
      row: 1,
      value: 0,
    }),
    Map({
      column: 1,
      row: 1,
      value: 72,
    }),
  ]),
  columnCount: 2,
});
