import {
  REQUEST_MATRIX_SOLUTION,
  FAILED_TO_GET_MATRIX_SOLUTION,
  GOT_MATRIX_SOLUTION,
} from '../constants/actionTypes';

/** @module actions/matrixSolutionActions */

/**
 * An action creator that creates a REQUEST_MATRIX_SOLUTION action.
 * Gets dispatched at application start and when the user modifies a matrix.
 * This action triggers an HTTP request to the matrix solver.
 * @param {simpleMatrix} matrix - A simple matrix that will be submitted to matrix solver API to get evaluated.
 */
export const requestMatrixSolution = matrix => ({
  type: REQUEST_MATRIX_SOLUTION,
  matrix,
});

/**
 * An action creator that creates a FAILED_TO_GET_MATRIX_SOLUTION action.
 * This action gets dispatched when the HTTP reques from the REQUEST_MATRIX_SOLUTION action has failed.
 * @param {string} error - The error message.
 */
export const failedToGetMatrixSolution = error => ({
  type: FAILED_TO_GET_MATRIX_SOLUTION,
  error,
});

/**
 * An action creator that creates a GOT_MATRIX_SOLUTION.
 * This action gets dispatched when the HTTP request from a REQUEST_MATRIX_SOLUTION has completed.
 * @param {solution} solution - The solution(s) to the matrix traversal.
 */
export const gotMatrixSolution = solution => ({
  type: GOT_MATRIX_SOLUTION,
  solution,
});
