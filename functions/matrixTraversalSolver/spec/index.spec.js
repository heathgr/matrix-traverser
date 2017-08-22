const { expect } = require('chai');
const sinon = require('sinon');
const matrixTraversalSolver = require('../index.js').matrixTraversalSolver;
const {
  BAD_METHOD,
  BAD_CONTENT_TYPE,
  INVALID_REQUEST_SCHEMA,
} = require('../src/constants/errorMessages');
const expectedResult = require('./testData/testSolution');

class mockResponse {

  constructor() {
    this.statusSpy = sinon.spy();
    this.sendSpy = sinon.spy();
    this.jsonSpy = sinon.spy();
    this.status = this.status.bind(this);
    this.send = this.send.bind(this);
    this.json = this.json.bind(this);
  }

  status(code) {
    this.statusSpy(code);
    return this;
  }

  send(body) {
    this.sendSpy(body);
    return this;
  }

  json(body) {
    this.jsonSpy(body);
    return this;
  }
}

// TODO these tests are pending until I can find a way to test with the CORS middleware
describe('Matrix Traversal Solver Request Handler', () => {

  const sandbox = sinon.sandbox.create();
  let testResponse;

  before(
    () => console.warn('These tests are pending until I can find a way to test with the CORS middleware being used.')
  );

  beforeEach(
    () => {
      testResponse = new mockResponse();
    }
  );

  afterEach(
    () => {
      sandbox.restore();
    }
  );

  xit('Should reject requests not using the POST method.', () => {
    const testRequest = {
      method: 'GET',
      body: {},
      get: () => null,
    };

    matrixTraversalSolver(testRequest, testResponse);
    expect(testResponse.sendSpy.calledOnce).to.equal(true);
    expect(testResponse.sendSpy.calledWith(BAD_METHOD)).to.equal(true);
    expect(testResponse.statusSpy.calledWith(405)).to.equal(true);
  });
  xit('Should reject reqeusts not using a JSON content type.', () => {
    const testRequest = {
      method: 'POST',
      body: {},
      get: () => 'application/text',
    };

    matrixTraversalSolver(testRequest, testResponse);
    expect(testResponse.sendSpy.calledOnce).to.equal(true);
    expect(testResponse.sendSpy.calledWith(BAD_CONTENT_TYPE)).to.equal(true);
    expect(testResponse.statusSpy.calledWith(400)).to.equal(true);
  });
  xit('Should reject JSON not conforming to the proper schema.', () => {
    const testRequest = {
      method: 'POST',
      body: {
        cells: null,
        columnCount: 0,
      },
      get: () => 'application/json',
    };

    matrixTraversalSolver(testRequest, testResponse);
    expect(testResponse.sendSpy.calledOnce).to.equal(true);
    expect(testResponse.sendSpy.calledWithMatch(new RegExp(`^${INVALID_REQUEST_SCHEMA}`))).to.equal(true);
    expect(testResponse.statusSpy.calledWith(400)).to.equal(true);
  });
  xit('Should sucessfully calculate matrix traversal solutions.', () => {
    const testRequest = {
      method: 'POST',
      body: {
        cells: [0, 1, 2],
        columnCount: 3,
      },
      get: () => 'application/json',
    };

    matrixTraversalSolver(testRequest, testResponse);
    expect(testResponse.sendSpy.called).to.equal(false);
    expect(testResponse.jsonSpy.calledOnce).to.equal(true);
    expect(testResponse.jsonSpy.getCall(0).args[0]).to.deep.equal(expectedResult);
    expect(testResponse.statusSpy.calledWith(200)).to.equal(true);
  });
});
