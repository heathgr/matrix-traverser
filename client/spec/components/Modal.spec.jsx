import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import React from 'react';
import { spy } from 'sinon';
import Modal from '../../src/components/Modal';

describe('<Modal />', () => {
  chai.use(chaiEnzyme());

  const TestChild = () => <div>test child</div>;
  const testWrapper = mount(
    <Modal>
      <TestChild />
    </Modal>
  );

  it('Should render correctly render its children.', () => expect(testWrapper.find(TestChild)).to.exist);
});
