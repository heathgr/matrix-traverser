import React from 'react';
import Modal from './Modal';
import Button from './Button';

const CreateMatrix = ({ onToggleCreateMatrixUI }) => (
  <Modal>
    <div>Create A New Matrix!!!</div>
    <Button onClick={() => onToggleCreateMatrixUI()}>Ok</Button>
  </Modal>
);

export default CreateMatrix;
