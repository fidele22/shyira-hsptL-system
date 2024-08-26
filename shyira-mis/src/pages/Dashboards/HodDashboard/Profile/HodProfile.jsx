import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './hodprofile.css'

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className='hod-profile'>
      <h1>{user.firstName} {user.lastName}</h1>
      <label htmlFor="">Email</label>
      <p>{user.email}</p>

      <label htmlFor="">Phone number</label>
      <p> {user.phone}</p>

      <label htmlFor="">Position</label>
      <p>{user.positionName}</p>

      <label htmlFor="">Service</label>
      <p>{user.serviceName}</p>

      <label htmlFor="">Department</label>
      <p>{user.departmentName}</p>
   
      <label htmlFor="">Your Signature</label>
      {user.signature && <img src={`http://localhost:5000/${user.signature}`} alt="Signature" />}

      <div className="edit-profile">
        <button className='edit-profile-btn'>Edit profile</button>
      </div>
    </div>
  );
};

export default UserProfile;
