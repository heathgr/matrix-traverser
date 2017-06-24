import {
  REQUEST_SOLUTIONS,
  FAILED_TO_GET_SOLUTIONS,
  GOT_SOLUTIONS,
  RESET_SOLUTIONS,
  SET_ACTIVE_SOLUTION,
  SET_NEXT_ACTIVE_SOLUTION,
  SET_PREVIOUS_ACTIVE_SOLUTION,
  SET_PREVIEW_SOLUTION,
} from '../constants/actionTypes';

/** @module actions/solutionsActions */

/**
 * An action creator that creates a REQUESTSOLUTIONS action.
 * Gets dispatched at application start and when the user modifies a matrix.
 * This action triggers an HTTP request to the matrix solver.
 * @param {simpleMatrix} matrix - A simple matrix that will be submitted to matrix solver API to get evaluated.
 */
export const requestSolutions = () => ({
  type: REQUEST_SOLUTIONS,
});

/**
 * An action creator that creates a FAILED_TO_GET_SOLUTIONS action.
 * This action gets dispatched when the HTTP reques from the REQUEST_SOLUTIONS action has failed.
 * @param {string} error - The error message.
 */
export const failedToGetSolutions = error => ({
  type: FAILED_TO_GET_SOLUTIONS,
  error,
});

/**
 * An action creator that creates a GOT_MATRIX_SOLUTIONS.
 * This action gets dispatched when the HTTP request from a REQUEST_SOLUTIONS has completed.
 * @param {solution} solution - The solution(s) to the matrix traversal.
 */
export const gotSolutions = solutions => ({
  type: GOT_SOLUTIONS,
  solutions,
});

export const setActiveSolution = solution => ({
  type: SET_ACTIVE_SOLUTION,
  solution,
});

export const setNextActiveSolution = () => ({
  type: SET_NEXT_ACTIVE_SOLUTION,
});

export const setPreviousActiveSolution = () => ({
  type: SET_PREVIOUS_ACTIVE_SOLUTION,
});

export const setPreviewSolution = solution => ({
  type: SET_PREVIEW_SOLUTION,
  solution,
});

export const resetSolutions = () => ({
  type: RESET_SOLUTIONS,
});
