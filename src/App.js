import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [dobError, setDobError] = useState('');
  const modalRef = useRef(null);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
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

  const handleSubmit = () => {
    // Validate email
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError('Invalid email');
      return;
    }

    // Validate phone number
    if (!/^\d{10}$/.test(phone)) {
      setPhoneError('Invalid phone number');
      return;
    }

    // Validate date of birth
    const currentDate = new Date();
    const selectedDate = new Date(dob);
    if (selectedDate >= currentDate) {
      setDobError('Invalid date of birth');
      return;
    }

    // Submit the form (not implemented in this example)
    // For simplicity, assume the form is successfully submitted.

    // Close the modal after successful form submission
    closeModal();
  };

  return (
    <div id="root" className="App">
      <button onClick={openModal}>Open Form</button>
      {modalOpen && (
        <div className="modal" ref={modalRef}>
          <div className="modal-content">
            <button className="close" onClick={closeModal}>
              &times;
            </button>
            <form onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError('');
                }}
              />
              <div className="error">{emailError}</div>
              <label htmlFor="phone">Phone:</label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setPhoneError('');
                }}
              />
              <div className="error">{phoneError}</div>
              <label htmlFor="dob">Date of Birth:</label>
              <input
                type="text"
                id="dob"
                value={dob}
                onChange={(e) => {
                  setDob(e.target.value);
                  setDobError('');
                }}
              />
              <div className="error">{dobError}</div>
              <button
                className="submit-button"
                onClick={handleSubmit}
                type="button"
              >
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