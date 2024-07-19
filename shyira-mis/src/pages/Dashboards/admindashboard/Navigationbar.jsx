import React, { useState } from 'react';
import './css/Navigationbar.css';


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

  return (
    <div className="navbar">
      <h2>Admin Dashboard</h2>
      <ul>
        <li onClick={() => setCurrentPage('adminoverview')}>Overview</li>

        <li onClick={() => toggleDropdown('usersAction')} className="dropdown">
          USERS
          {dropdownsOpen.usersAction && (
            <ul className="dropdown-menu">
            <li onClick={() => setCurrentPage('add-user')}> Add new User</li>
            <li onClick={() => setCurrentPage('view-Users')}> View All users</li>
            
              
            </ul>
          )}
        </li>
        <li onClick={() => toggleDropdown('serviceAction')} className="dropdown">
          SERVICES
          {dropdownsOpen.serviceAction && (
            <ul className="dropdown-menu">
        <li onClick={() => setCurrentPage('add-service')}>Add Service</li>
        <li onClick={() => setCurrentPage('view-service')}>View Sevices</li>
        </ul>
          )}
          </li>
          <li onClick={() => toggleDropdown('positionAction')} className="dropdown">
          POSITIONS
          {dropdownsOpen.positionAction && (
            <ul className="dropdown-menu">
        <li onClick={() => setCurrentPage('add-position')}>Add Position</li>
        <li onClick={() => setCurrentPage('view-position')}>View Positions</li>
        </ul>
          )}
          </li>
          <li onClick={() => toggleDropdown('departmentAction')} className="dropdown">
          DEPARTMENTS
          {dropdownsOpen.departmentAction && (
            <ul className="dropdown-menu">
        <li onClick={() => setCurrentPage('add-department')}>Add Department</li>
        <li onClick={() => setCurrentPage('view-department')}>View Departments</li>
        </ul>
          )}
          </li>
      </ul>
      <u><h2>Settings</h2></u>
      <ul>
        <li onClick={() => setCurrentPage('logistic-profile')}>Profile</li>
        <li onClick={() => setCurrentPage('logistic-profile')}>Help Center</li>
        <button >Logout</button>
      </ul>
    </div>
  );
};

export default Navbar;
