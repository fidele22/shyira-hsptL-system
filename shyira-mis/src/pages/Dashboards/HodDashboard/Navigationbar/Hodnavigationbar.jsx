import React, { useState } from 'react';
import './Hodnavigationbar.css';
import axios from 'axios';

const Navbar = ({ setCurrentPage }) => {
  const [dropdownsOpen, setDropdownsOpen] = useState({
    request: false,
    requisitions: false,
  });

  const toggleDropdown = (dropdownName) => {
    setDropdownsOpen((prevState) => ({
      ...prevState,
      [dropdownName]: !prevState[dropdownName],
    }));
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/logout');
      // Clear any user data from state or context
      // Redirect to login page or home page
      window.location.href = '/'; // Adjust as needed
    } catch (error) {
      alert('error to logout')
    }
  };

  return (
    <div className="navigation">
      <h2>HOD Dashboard</h2>
      <ul>
        <li onClick={() => setCurrentPage('overview')}>Overview</li>
        <li onClick={() => toggleDropdown('request')} className="dropdown">
          Items
          {dropdownsOpen.request && (
            <ul className="dropdown-menu">
              <li onClick={() => setCurrentPage('view-items')}>Available Items</li>
             
            </ul>
          )}
        </li>
        
        <li onClick={() => toggleDropdown('requisitions')} className="dropdown">
          Requisitions
          {dropdownsOpen.requisitions && (
            <ul className="dropdown-menu">
              <li onClick={() => setCurrentPage('requisition')}>Make request</li>

              <li onClick={() => setCurrentPage('view-items')}>Requist Made</li>
              <li onClick={() => setCurrentPage('view-request')}>Requist Received</li>
            </ul>
          )}
        </li>
      </ul>
      <u><h2>Settings</h2></u>
      <ul>
        <li onClick={() => setCurrentPage('logistic-profile')}>Profile</li>
        <button onClick={handleLogout}>Logout</button>
      </ul>
    </div>
  );
};

export default Navbar;
