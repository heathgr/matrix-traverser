import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import Button from './Button';

const Introduction = ({ onToggleIntroductionUI }) => (
  <Modal>
    <div>Hello There</div>
    <div>This will be a description of what this app is all about...</div>
    <Button onClick={() => onToggleIntroductionUI()}>OK</Button>
  </Modal>
);

Introduction.propTypes = {
  onToggleIntroductionUI: PropTypes.func.isRequired,
};

export default Introduction;
