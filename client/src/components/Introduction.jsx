import React from 'react';
import Modal from './Modal';
import Button from './Button';

const Introduction = ({ onToggleIntroductionUI }) => (
  <Modal>
    <div>Hello There</div>
    <div>This will be a description of what this app is all about...</div>
    <Button onClick={() => onToggleIntroductionUI()}>OK</Button>
  </Modal>
);

export default Introduction;
