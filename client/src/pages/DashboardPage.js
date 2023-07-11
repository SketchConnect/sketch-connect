
import React from 'react';
import ProfilePhoto from '../components/ProfilePhoto';
import HallOfFame from '../components/HallOfFame';
import "./DashboardPage.css";

const DashboardPage = () => {
  return (
    <div className="dashboard">
      <div className="profile-section">
        <ProfilePhoto />
        <div className="profile-details">
          <h2 className="name">John Doe</h2>
          <p className="email">johndoe@example.com</p>
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




