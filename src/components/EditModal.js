import React, { useContext, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { UserContext } from '../contexts/UserContext';
import { regexPatterns, errorMessages } from '../utils/constants';
import './styles/EditModal.css';

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
      error = errorMessages.required(name);
    } else {
      if (name === 'email' && !regexPatterns.email.test(value)) {
        error = errorMessages.emailInvalid;
      }
      if (name === 'website' && !regexPatterns.website.test(value)) {
        error = errorMessages.websiteInvalid;
      }
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = errorMessages.required('name');
    if (!formData.email) newErrors.email = errorMessages.required('email');
    else if (!regexPatterns.email.test(formData.email)) newErrors.email = errorMessages.emailInvalid;
    if (!formData.phone) newErrors.phone = errorMessages.required('phone');
    if (!formData.website) newErrors.website = errorMessages.required('website');
    else if (!regexPatterns.website.test(formData.website)) newErrors.website = errorMessages.websiteInvalid;
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
          <Form.Group className="mb-4 d-flex align-items-center">
            <Form.Label className="me-2 label"><span className='text-danger'>*</span> Name</Form.Label>
            <div className="flex-grow-1">
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.name}
                className="w-100"
              />
              {errors.name && <div className="error-message">{errors.name}</div>}
            </div>
          </Form.Group>
          <Form.Group className="mb-4 d-flex align-items-center">
            <Form.Label className="me-2 label"><span className='text-danger'>*</span> Email</Form.Label>
            <div className="flex-grow-1">
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.email}
                className="w-100"
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>
          </Form.Group>
          <Form.Group className="mb-4 d-flex align-items-center">
            <Form.Label className="me-2 label"><span className='text-danger'>*</span> Phone</Form.Label>
            <div className="flex-grow-1">
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.phone}
                className="w-100"
              />
              {errors.phone && <div className="error-message">{errors.phone}</div>}
            </div>
          </Form.Group>
          <Form.Group className="mb-4 d-flex align-items-center">
            <Form.Label className="me-2 label"><span className='text-danger'>*</span> Website</Form.Label>
            <div className="flex-grow-1">
              <Form.Control
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.website}
                className="w-100"
              />
              {errors.website && <div className="error-message">{errors.website}</div>}
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>OK</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
