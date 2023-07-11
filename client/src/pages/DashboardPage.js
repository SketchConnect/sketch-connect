import React, { useState } from 'react';
import ProfilePhoto from '../components/ProfilePhoto';
import HallOfFame from '../components/HallOfFame';
import './DashboardPage.css';

const DashboardPage = () => {
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleSave = () => {
    fetch('e', {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }) 
    })
    .then(response => response.json())
    .then(data => {
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="dashboard">
      <div className="profile-section">
        <ProfilePhoto />
        <div className="profile-details">
          {editable ? (
            <>
              <input className="name" value={name} onChange={handleNameChange} />
              <input className="email" value={email} onChange={handleEmailChange} />
            </>
          ) : (
            <>
              <h2 className="name">{name}</h2>
              <p className="email">{email}</p>
            </>
          )}
          <button onClick={() => {
            if(editable) {
              handleSave();
            }
            setEditable(!editable);
          }}>
            {editable ? 'Save' : 'Edit'}
          </button>
        </div>
      </div>
      <div className="hall-of-fame-section">
        <h3>Hall of Fame</h3>
        <HallOfFame />
      </div>
    </div>
  );
};

export default DashboardPage;
