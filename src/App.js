import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const ModalApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const modalRef = useRef(null);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.includes('@')) {
      alert('Invalid email. Please check your email address.');
    } else if (phone.length !== 10 || !/^\d+$/.test(phone)) {
      alert('Invalid phone number. Please enter a 10-digit phone number.');
    } else if (new Date(dob) > new Date()) {
      alert('Invalid date of birth. Please enter a valid date.');
    } else {
      alert('Form submitted successfully!');
      setUsername('');
      setEmail('');
      setPhone('');
      setDob('');
      closeModal();
    }
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const closeIconStyle = {
    cursor: 'pointer',
    position: 'absolute',
    top: '10px',
    right: '10px',
    fontSize: '24px',
    backgroundColor: '#4f4f4f',
    color: '#fff',
    borderRadius: '50%',
    padding: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-app">
      <button onClick={openModal}>Open Form</button>

      {isOpen && (
        <div className="modal" ref={modalRef} onClick={closeModal}>
          <div className="modal-content" onClick={handleModalClick}>
            <span style={closeIconStyle} onClick={closeModal}>
              &times;
            </span>
            <form onSubmit={handleSubmit} onClick={handleModalContentClick}>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label htmlFor="phone">Phone Number:</label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />

              <label htmlFor="dob">Date of Birth:</label>
              <input
                type="date"
                id="dob"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
              />

              <button type="submit" className="submit-button">
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
