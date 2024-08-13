import React, { useState } from 'react';
import './Navigationbar.css';
import axios from 'axios';
import { FaHome, FaPlus, FaFileExcel, FaList, FaBoxOpen, FaClipboardCheck, FaClipboardList, FaChartBar, FaUser, FaSignOutAlt } from 'react-icons/fa';

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
      await axios.post('http://localhost:5000/api/logout'); // Notify the server of the logout
  
      // Remove token from local storage or cookies
      localStorage.removeItem('authToken'); // Adjust based on how you store tokens
  
      // Optionally, redirect to login page
      window.location.href = '/'; // Adjust the URL as needed
    } catch (error) {
      console.error('Logout failed:', error);
      // Handle errors (e.g., show a message to the user)
    }
  };

  return (
    <div className="navigation">
      <h2>Logistic Dashboard</h2>
      <ul>
        <li onClick={() => setCurrentPage('overview')}>
          <FaHome /> Overview
        </li>
        <li onClick={() => toggleDropdown('itemAction')} className="dropdown">
          <FaBoxOpen /> Item Action
          {dropdownsOpen.itemAction && (
            <ul className="dropdown-menu">
              <li onClick={() => setCurrentPage('add-item')}>
                <FaPlus /> Add new Item
              </li>
              <li onClick={() => setCurrentPage('import-items')}>
                <FaFileExcel /> Import Excel
              </li>
              <li onClick={() => setCurrentPage('view-items')}>
                <FaList /> View Items
              </li>
            </ul>
          )}
        </li>
        <li onClick={() => setCurrentPage('make-requist')}>
          <FaBoxOpen /> Order Supplies
        </li>
        <li onClick={() => toggleDropdown('requisitions')} className="dropdown">
          <FaClipboardList /> Requisitions
          {dropdownsOpen.requisitions && (
            <ul className="dropdown-menu">
              <li onClick={() => setCurrentPage('requisition-receive')}>
                <FaClipboardCheck /> Requist Received
              </li>
              <li onClick={() => setCurrentPage('approved-request')}>
                <FaClipboardCheck /> Approved Request
              </li>
              <li onClick={() => setCurrentPage('data')}>
                <FaClipboardList /> Requist Status
              </li>
            </ul>
          )}
        </li>
        <li onClick={() => setCurrentPage('report')}>
          <FaChartBar /> Reports
        </li>
      </ul>

      <u><h2>Settings</h2></u>
      <ul>
        <li onClick={() => setCurrentPage('logistic-profile')}>
          <FaUser /> Profile
        </li>
        <li onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
