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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.username || !formData.email || !formData.phone || !formData.dob) {
      alert('Please fill in all fields');
      return;
    }

    if (!isValidEmail(formData.email)) {
      alert('Invalid email. Please check your email address.');
      return;
    }

    if (!isValidPhoneNumber(formData.phone)) {
      alert('Invalid phone number. Please enter a 10-digit phone number.');
      return;
    }

    const dobDate = new Date(formData.dob);
    const currentDate = new Date();
    if (dobDate > currentDate) {
      alert('Invalid date of birth. Please enter a valid date.');
      return;
    }
    closeModal();
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
      <button onClick={openModal}>Open Form</button>

      {isModalOpen && (
        <div className="modal" id="root">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <form>
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" onChange={handleInputChange} />

              <label htmlFor="email">Email:</label>
              <input type="text" id="email" onChange={handleInputChange} />

              <label htmlFor="phone">Phone:</label>
              <input type="text" id="phone" onChange={handleInputChange} />

              <label htmlFor="dob">Date of Birth:</label>
              <input type="date" id="dob" onChange={handleInputChange} />

              <button type="button" className="submit-button" onClick={handleSubmit}>
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
