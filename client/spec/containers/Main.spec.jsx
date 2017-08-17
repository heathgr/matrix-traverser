import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import React from 'react';

import root from '../../src/reducers/root';
import Main from '../../src/containers/Main';
import MatrixResizer from '../../src/components/MatrixResizer';
import SolutionList from '../../src/components/SolutionList';
import CreateMatrix from '../../src/components/CreateMatrix';
import Introduction from '../../src/components/Introduction';

import {
  toggleCreateMatrixUI,
  toggleIntroductionUI,
  setCreateMatrixColumnCount,
  setCreateMatrixRowCount,
} from '../../src/actions/uiActions';
import {
  requestRandomMatrix,
  requestMatrixCellChange,
} from '../../src/actions/matrixActions';
import {
  setActiveSolution,
  setPreviewSolution,
  setPreviousActiveSolution,
  setNextActiveSolution,
} from '../../src/actions/solutionsActions';

describe('<Main />', () => {
  chai.use(chaiEnzyme());

  const testStore = createStore(root);
  const dispatchSpy = spy(testStore, 'dispatch');
  const componentWrapper = mount(
    <Provider store={testStore}>
      <Main />
    </Provider>
  );

  afterEach(() => {
    dispatchSpy.reset();
  });

  it('Should render a <MatrixResizer /> component with the matrix state and solutions state passed as a props.', () => {
    const matrixResizerWrapper = componentWrapper.find(MatrixResizer);

    expect(componentWrapper).to.have.exactly(1).descendants(MatrixResizer);
    expect(matrixResizerWrapper).to.have.prop('matrix');
    expect(matrixResizerWrapper).to.have.prop('solutionPathsData');
    expect(matrixResizerWrapper).to.have.prop('activeSolution');
    expect(matrixResizerWrapper).to.have.prop('previewSolution');
    expect(matrixResizerWrapper).to.have.prop('onSolutionClicked');
    expect(matrixResizerWrapper).to.have.prop('onRequestMatrixCellChange');
  });

  it('Should render a <SolutionList /> component with correct props passed from the app state.', () => {
    const solutionsListWrapper = componentWrapper.find(SolutionList);

    expect(componentWrapper).to.have.exactly(1).descendants(SolutionList);
    expect(solutionsListWrapper).to.have.prop('solutions');
    expect(solutionsListWrapper).to.have.prop('activeSolution');
    expect(solutionsListWrapper).to.have.prop('onSolutionClicked');
    expect(solutionsListWrapper).to.have.prop('onNextSolutionClicked');
    expect(solutionsListWrapper).to.have.prop('onPreviousSolutionClicked');
    expect(solutionsListWrapper).to.have.prop('onSolutionHover');
  });

  xit('Should render a <CreateMatrix /> modal if needed.', () => {
    testStore.dispatch(toggleCreateMatrixUI());
    expect(componentWrapper).to.have.descendants(CreateMatrix);

    const createMatrixWrapper = componentWrapper.find(CreateMatrix);
    expect(createMatrixWrapper).to.have.prop('onToggleCreateMatrixUI');
    expect(createMatrixWrapper).to.have.prop('onRequestRandomMatrix');
    expect(createMatrixWrapper).to.have.prop('createMatrixColumnCount');
    expect(createMatrixWrapper).to.have.prop('createMatrixRowCount');
    expect(createMatrixWrapper).to.have.prop('onSetCreateMatrixColumnCount');
    expect(createMatrixWrapper).to.have.prop('onSetCreateMatrixRowCount');

    testStore.dispatch(toggleCreateMatrixUI());
    expect(componentWrapper).to.not.have.descendants(CreateMatrix);
  });

  xit('Should render an <Introduction /> modal if needed.', () => {
    testStore.dispatch(toggleIntroductionUI());
    expect(componentWrapper).to.have.descendants(Introduction);

    const introductionWrapper = componentWrapper.find(Introduction);
    expect(introductionWrapper).to.have.prop('onToggleIntroductionUI');

    testStore.dispatch(toggleIntroductionUI());
    expect(componentWrapper).to.not.have.descendants(Introduction);
  });

  it('Should create the dispatchers for the <CreateMatrix /> component.', () => {
    testStore.dispatch(toggleCreateMatrixUI());
    const createMatrixWrapper = componentWrapper.find(CreateMatrix);

    // testing the request random matrix dispatcher
    const requestRandomMatrixAction = requestRandomMatrix(4, 3);

    createMatrixWrapper.props().onRequestRandomMatrix(4, 3);
    expect(dispatchSpy.calledWith(requestRandomMatrixAction)).to.equal(true);

    // testing the onSetCreateMatrixRowCount dispatcher
    const setCreateMatrixRowCountAction = setCreateMatrixRowCount(6);

    createMatrixWrapper.props().onSetCreateMatrixRowCount(6);
    expect(dispatchSpy.calledWith(setCreateMatrixRowCountAction)).to.equal(true);

    // testing the onSetCreateMatrixColumnCount dispatcher
    const setCreateMatrixColumnCountAction = setCreateMatrixColumnCount(5);

    createMatrixWrapper.props().onSetCreateMatrixColumnCount(5);
    expect(dispatchSpy.calledWith(setCreateMatrixColumnCountAction)).to.equal(true);

    // testing the onToggleCreateMatrixUI dispatcher
    const toggleCreateMatrixUIAction = toggleCreateMatrixUI();

    createMatrixWrapper.props().onToggleCreateMatrixUI();
    expect(dispatchSpy.calledWith(toggleCreateMatrixUIAction)).to.equal(true);
  });

  it('Should create the dispatchers for the <Introduction /> component.', () => {
    testStore.dispatch(toggleIntroductionUI());

    const introductionWrapper = componentWrapper.find(Introduction);
    const isIntroductionUIVisibleAction = toggleIntroductionUI();

    introductionWrapper.props().onToggleIntroductionUI();
    expect(dispatchSpy.calledWith(isIntroductionUIVisibleAction)).to.equal(true);
  });

  it('Should create the dispatchers for the <MatrixResizer /> component', () => {
    const matrixResizerWrapper = componentWrapper.find(MatrixResizer);

    const solutionClickedAction = setActiveSolution(2);

    matrixResizerWrapper.props().onSolutionClicked(2);
    expect(dispatchSpy.calledWith(solutionClickedAction)).to.equal(true);

    const solutionHoverAction = setPreviewSolution(4);

    matrixResizerWrapper.props().onSolutionHover(4);
    expect(dispatchSpy.calledWith(solutionHoverAction)).to.equal(true);

    const requestMatrixCellChangeAction = requestMatrixCellChange(3, 8);

    matrixResizerWrapper.props().onRequestMatrixCellChange(3, 8);
    expect(dispatchSpy.calledWith(requestMatrixCellChangeAction)).to.equal(true);
  });

  it('Should create the dispactchers for the <SolutionsList /> component', () => {
    const solutionListWrapper = componentWrapper.find(SolutionList);

    const solutionClickedAction = setActiveSolution(7);

    solutionListWrapper.props().onSolutionClicked(7);
    expect(dispatchSpy.calledWith(solutionClickedAction)).to.equal(true);

    const setPreviousActiveSolutionAction = setPreviousActiveSolution();

    solutionListWrapper.props().onPreviousSolutionClicked();
    expect(dispatchSpy.calledWith(setPreviousActiveSolutionAction));

    const setNextActiveSolutionAction = setNextActiveSolution();

    solutionListWrapper.props().onNextSolutionClicked();
    expect(dispatchSpy.calledWith(setNextActiveSolutionAction));
  });
});
