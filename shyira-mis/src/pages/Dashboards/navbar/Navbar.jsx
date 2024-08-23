import React, { useState,useEffect} from 'react'
import { FaUser } from 'react-icons/fa';
import './Navbar.css'

function Navbar() {
  
    const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      console.log('Token:', token); // Debug log

      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        console.log('Response status:', response.status); // Debug log

        if (response.ok) {
          const data = await response.json();
          console.log('User data:', data); // Debug log
          const fullName = `${data.firstName} ${data.lastName}`;
          setUserName(fullName);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className='Navbar'>
  
        <ul className='navbar-menu'>
        <h1> <FaUser /> {userName}</h1>    
            
        </ul>
       
    </div>
  )
}

export default Navbar