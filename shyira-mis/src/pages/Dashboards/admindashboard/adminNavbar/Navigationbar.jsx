import React, { useState } from 'react';
import axios from 'axios';
import { FaHome, FaPlus, FaFileExcel, FaList, FaBoxOpen, FaClipboardCheck,
  FaClipboardList,FaBurn,FaPills, FaChartBar,FaAlignCenter, FaUser, FaSignOutAlt,
  FaGasPump,FaLifeRing,FaAngleDown } from 'react-icons/fa';
import './Navigationbar.css';


const Navbar = ({ setCurrentPage }) => {
  const [dropdownsOpen, setDropdownsOpen] = useState({
    usersAction: false,
    serviceAction: false,
    positionAction: false,
    departmentAction: false,
  });

  const toggleDropdown = (dropdownName) => {
    setDropdownsOpen((prevState) => ({
      ...prevState,
      [dropdownName]: !prevState[dropdownName],
    }));
  };
  //handle logout
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
    <div className="adminavbar">
      <h2>Admin Dashboard</h2>
      <ul>
        <li onClick={() => setCurrentPage('adminoverview')}><FaHome />Overview</li>

        <li onClick={() => toggleDropdown('usersAction')} className="dropdown">
          <FaUser />USERS
          {dropdownsOpen.usersAction && (
            <ul className="dropdown-menu">
            <li onClick={() => setCurrentPage('add-user')}><FaPlus /> Add new User</li>
            <li onClick={() => setCurrentPage('view-Users')}><FaList /> View All users</li>
            
              
            </ul>
          )}
        </li>
        <li onClick={() => setCurrentPage('user-roles')}><FaHome />User Roles</li>
        <li onClick={() => toggleDropdown('serviceAction')} className="dropdown">
         <FaAlignCenter /> SERVICES
          {dropdownsOpen.serviceAction && (
            <ul className="dropdown-menu">
        <li onClick={() => setCurrentPage('add-service')}><FaPlus /> Add Service</li>
        <li onClick={() => setCurrentPage('view-service')}><FaList /> View Sevices</li>
        </ul>
          )}
          </li>
          <li onClick={() => toggleDropdown('positionAction')} className="dropdown">
         <FaPills /> POSITIONS
          {dropdownsOpen.positionAction && (
            <ul className="dropdown-menu">
        <li onClick={() => setCurrentPage('add-position')}><FaPlus /> Add Position</li>
        <li onClick={() => setCurrentPage('view-position')}><FaList /> View Positions</li>
        </ul>
          )}
          </li>
          <li onClick={() => toggleDropdown('departmentAction')} className="dropdown">
         <FaBurn /> DEPARTMENTS
          {dropdownsOpen.departmentAction && (
            <ul className="dropdown-menu">
        <li onClick={() => setCurrentPage('add-department')}><FaPlus /> Add Department</li>
        <li onClick={() => setCurrentPage('view-department')}><FaList /> View Departments</li>
        </ul>
          )}
          </li>
      </ul>
      <u><h2>Settings</h2></u>
      <ul>
        <li onClick={() => setCurrentPage('logistic-profile')}><FaUser />Profile</li>
        <li onClick={() => setCurrentPage('logistic-profile')}><FaLifeRing />Help Center</li>
        <li onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
