import React, { useState } from 'react';
import './Navigationbar.css';
import axios from 'axios';
import { FaHome, FaPlus, FaFileExcel, FaList, FaBoxOpen, FaClipboardCheck,
   FaClipboardList, FaChartBar, FaUser, FaSignOutAlt,FaGasPump,FaLifeRing } from 'react-icons/fa';

const Navbar = ({ setCurrentPage }) => {
  const [dropdownsOpen, setDropdownsOpen] = useState({
    itemAction: false,
    supplyOrder:false,
    requisitions: false,
    fuelrequisitions:false,
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
        <li onClick={() => toggleDropdown('supplyOrder')} className="dropdown">
         <FaBoxOpen /> Order Supplies
          {dropdownsOpen.supplyOrder && (
            <ul className="dropdown-menu">
              <li onClick={() => setCurrentPage('make-order')}>
                <FaClipboardCheck /> Make Order
              </li>
              <li onClick={() => setCurrentPage('approved-order')}>
                <FaClipboardCheck /> Approved Order
              </li>
              <li onClick={() => setCurrentPage('received-order')}>
                <FaClipboardCheck /> Received Order
              </li>
            </ul>
          )}
        </li>
        <li onClick={() => toggleDropdown('requisitions')} className="dropdown">
          <FaClipboardList /> Item Requisitions
          {dropdownsOpen.requisitions && (
            <ul className="dropdown-menu">
              <li onClick={() => setCurrentPage('view-requisition')}>
                <FaClipboardCheck /> View Requisition
              </li>
              <li onClick={() => setCurrentPage('approved-request')}>
                <FaClipboardCheck /> Approved Request
              </li>
              <li onClick={() => setCurrentPage('requisition-receive')}>
                <FaClipboardList /> Requisition Status
              </li>
            </ul>
          )}
        </li>

        <li onClick={() => toggleDropdown('fuelrequisitions')} className="dropdown">
        <FaGasPump size={24} /> Fuel Requisitions
          {dropdownsOpen.fuelrequisitions && (
            <ul className="dropdown-menu">
              <li onClick={() => setCurrentPage('fuel-requisition')}>
                <FaClipboardCheck /> View Requisition
              </li>
              <li onClick={() => setCurrentPage('approved-request')}>
                <FaClipboardCheck /> Approved Fuel Request
              </li>
              <li onClick={() => setCurrentPage('carplaque')}>
          <FaChartBar /> Form Data
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
        <li onClick={() => setCurrentPage('logistic-profil')}> <FaLifeRing />Help Center</li>
        <li onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
