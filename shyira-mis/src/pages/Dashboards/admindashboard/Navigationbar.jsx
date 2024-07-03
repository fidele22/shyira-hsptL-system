import React, { useState } from 'react';
import './css/Navigationbar.css';


const Navbar = ({ setCurrentPage }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

const toggleDropdown = () => {
  setDropdownOpen(!dropdownOpen);
};

  return (
    <div className="navbar">
      <h2>Admin Dashboard</h2>
      <ul>
        <li onClick={() => setCurrentPage('adminoverview')}>Overview</li>

        <li onClick={toggleDropdown} className="dropdown">
          USERS
          {dropdownOpen && (
            <ul className="dropdown-menu">
            <li onClick={() => setCurrentPage('add-user')}> Add new User</li>
            <li onClick={() => setCurrentPage('view-Users')}> View All users</li>
            
              
            </ul>
          )}
        </li>
      
      </ul>
    </div>
  );
};

export default Navbar;
