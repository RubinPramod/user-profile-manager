import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmationPopup = ({ show, onHide, onConfirm, message }) => {
  return (
    <Modal show={show} onHide={onHide} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Confirm Action</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={onHide}>No</Button>
        <Button variant="primary" onClick={onConfirm}>Yes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationPopup;
