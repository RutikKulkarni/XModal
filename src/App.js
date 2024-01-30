import React, { useState, useRef } from "react";
import "./App.css";

const App = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const dobRef = useRef(null);
  const formRef = useRef(null);

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const handleClickOutside = (e) => {
    if (formRef.current && !formRef.current.contains(e.target)) {
      closeForm();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const phone = phoneRef.current.value;
    const dob = dobRef.current.value;

    if (!email.includes("@")) {
      alert("Invalid email");
      return;
    }

    if (phone.length !== 10 || isNaN(phone)) {
      alert("Invalid phone number");
      return;
    }

    const currentDate = new Date();
    const inputDate = new Date(dob);

    if (inputDate > currentDate) {
      alert("Invalid date of birth");
      return;
    }

    closeForm();
  };

  return (
    <div className={`app ${isFormOpen ? "dimmed" : ""}`} onClick={handleClickOutside}>
      <h1>User Details Modal</h1>
      <button className="submit-button" onClick={openForm}>
        Open Form
      </button>

      {isFormOpen && (
        <div className="modal" onClick={handleClickOutside}>
          <div className="modal-content" ref={formRef}>
            <form>
              <h3>Fill Details</h3>
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" ref={usernameRef} required />

              <label htmlFor="email">Email:</label>
              <input type="email" id="email" ref={emailRef} required />

              <label htmlFor="phone">Phone Number:</label>
              <input type="tel" id="phone" ref={phoneRef} required />

              <label htmlFor="dob">Date of Birth:</label>
              <input type="date" id="dob" ref={dobRef} required />

              <button
                type="button"
                className="submit-button"
                onClick={handleSubmit}
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
