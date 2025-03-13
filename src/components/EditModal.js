import React, { useContext, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { UserContext } from '../contexts/UserContext';

const EditModal = ({ user, onClose }) => {
  const { updateUser } = useContext(UserContext);
  const [formData, setFormData] = useState({ ...user });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (errors[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = '';
    if (!value) {
      error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    } else {
      if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
        error = 'Email is invalid';
      }
      if (name === 'website' && !/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
        error = 'Website URL is invalid';
      }
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.website) newErrors.website = 'Website is required';
    else if (!/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.website)) newErrors.website = 'Website URL is invalid';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      updateUser(formData);
      onClose();
    }
  };

  return (
    <Modal show onHide={onClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Basic Modal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label><span style={{ color: 'red' }}>*</span> Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label><span style={{ color: 'red' }}>*</span> Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label><span style={{ color: 'red' }}>*</span> Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.phone}
            />
            <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label><span style={{ color: 'red' }}>*</span> Website</Form.Label>
            <Form.Control
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.website}
            />
            <Form.Control.Feedback type="invalid">{errors.website}</Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>OK</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
