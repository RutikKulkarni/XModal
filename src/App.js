import React, { useState } from 'react';
import './App.css';

const ModalApp = () => {
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
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = () => {
    if (formData.username === '' || formData.email === '' || formData.phone === '' || formData.dob === '') {
      alert('Please fill in all fields');
    } else if (!formData.email.includes('@')) {
      alert('Invalid email. Please check your email address.');
    } else if (!/^\d{10}$/.test(formData.phone)) {
      alert('Invalid phone number. Please enter a 10-digit phone number.');
    } else if (new Date(formData.dob) > new Date()) {
      alert('Invalid date of birth. Please enter a valid date.');
    } else {
      alert('Form submitted successfully');
      setFormData({
        username: '',
        email: '',
        phone: '',
        dob: '',
      });
      closeModal();
    }
  };

  const handleModalClick = (e) => {
    if (e.target.id === 'modal') {
      closeModal();
    }
  };

  return (
    <div>
      <button onClick={openModal}>Open Form</button>
      {isModalOpen && (
        <div id="modal" className="modal" onClick={handleModalClick}>
          <div className="modal-content">
            <form>
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" value={formData.username} onChange={handleInputChange} />

              <label htmlFor="email">Email:</label>
              <input type="text" id="email" value={formData.email} onChange={handleInputChange} />

              <label htmlFor="phone">Phone:</label>
              <input type="text" id="phone" value={formData.phone} onChange={handleInputChange} />

              <label htmlFor="dob">Date of Birth:</label>
              <input type="date" id="dob" value={formData.dob} onChange={handleInputChange} />

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

export default ModalApp;
