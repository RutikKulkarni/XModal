import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    dob: '',
  });
  const [validationMessages, setValidationMessages] = useState({
    email: '',
    phone: '',
    dob: '',
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setValidationMessages({ ...validationMessages, [e.target.id]: '' });
  };

  const handleSubmit = () => {
    let validationErrors = {};
    if (!formData.username || !formData.email || !formData.phone || !formData.dob) {
      validationErrors = {
        email: !formData.email ? 'Please fill in all fields' : '',
        phone: !formData.phone ? 'Please fill in all fields' : '',
        dob: !formData.dob ? 'Please fill in all fields' : '',
      };
    } else {
      if (!isValidEmail(formData.email)) {
        validationErrors.email = 'Invalid email. Please check your email address.';
      }

      if (!isValidPhoneNumber(formData.phone)) {
        validationErrors.phone = 'Invalid phone number. Please enter a 10-digit phone number.';
      }

      const dobDate = new Date(formData.dob);
      const currentDate = new Date();
      if (dobDate > currentDate) {
        validationErrors.dob = 'Invalid date of birth. Please enter a valid date.';
      }
    }

    if (Object.keys(validationErrors).length === 0) {
      closeModal();
    } else {
      setValidationMessages(validationErrors);
    }
  };

  const isValidEmail = (email) => {
    return email.includes('@');
  };

  const isValidPhoneNumber = (phone) => {
    return /^\d{10}$/.test(phone);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isModalOpen && e.target.id === 'root') {
        closeModal();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <div className="App">
      <h1>User Details Model</h1>
      <button onClick={openModal}>Open Form</button>

      <div id="root">
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <form>
                <h3>Fill Details</h3>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" onChange={handleInputChange} />

                <label htmlFor="email">Email:</label>
                <input type="text" id="email" onChange={handleInputChange} />
                <span className="validation-message">{validationMessages.email}</span>

                <label htmlFor="phone">Phone:</label>
                <input type="text" id="phone" onChange={handleInputChange} />
                <span className="validation-message">{validationMessages.phone}</span>

                <label htmlFor="dob">Date of Birth:</label>
                <input type="date" id="dob" onChange={handleInputChange} />
                <span className="validation-message">{validationMessages.dob}</span>

                <button type="button" className="submit-button" onClick={handleSubmit}>
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
