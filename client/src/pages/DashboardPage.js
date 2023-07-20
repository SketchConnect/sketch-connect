import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import HallOfFame from '../components/HallOfFame';
import './DashboardPage.css';
import { Avatar } from "@mantine/core";

const DashboardPage = () => {
  const currentUser = useSelector((state) => state.user);

  const [editable, setEditable] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);

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
        <div className="profile-photo">
          <Avatar
            src={currentUser.profilePic || "/assets/images/user.png"}
            size={150}
            radius={150}
          />
        </div>
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
            {editable ? 'Save' : 'Edit Profile'}
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
