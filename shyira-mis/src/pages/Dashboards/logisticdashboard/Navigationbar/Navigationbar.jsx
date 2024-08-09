import React, { useState } from 'react';
import './Navigationbar.css';
import axios from 'axios';

const Navbar = ({ setCurrentPage }) => {
  const [dropdownsOpen, setDropdownsOpen] = useState({
    itemAction: false,
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
      <h2>Logistic Dashboard</h2>
      <ul>
        <li onClick={() => setCurrentPage('overview')}>Overview</li>
        <li onClick={() => toggleDropdown('itemAction')} className="dropdown">
          Item Action
          {dropdownsOpen.itemAction && (
            <ul className="dropdown-menu">
              <li onClick={() => setCurrentPage('add-item')}>Add new Item</li>
              <li onClick={() => setCurrentPage('import-items')}>import Excel</li>
              <li onClick={() => setCurrentPage('view-items')}>View Items</li>
            </ul>
          )}
        </li>
        <li onClick={() => setCurrentPage('make-requist')}>Order Supplies</li>
        <li onClick={() => toggleDropdown('requisitions')} className="dropdown">
          Requisitions
          {dropdownsOpen.requisitions && (
            <ul className="dropdown-menu">
              
              <li onClick={() => setCurrentPage('requisition-receive')}>Requist Received</li>
              <li onClick={() => setCurrentPage('approved-request')}>Approved Request</li>
              <li onClick={() => setCurrentPage('data')}>Requist stutas</li>
            </ul>
          )}
        </li>
        <li onClick={() => setCurrentPage('report')}>Reports</li>
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
