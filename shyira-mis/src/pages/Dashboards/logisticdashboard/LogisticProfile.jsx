import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './logisticProfile.css'

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    positionName: '',
    serviceName: '',
    departmentName: '',
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUser(response.data);
        setFormData({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          phone: response.data.phone,
          positionName: response.data.positionName,
          serviceName: response.data.serviceName,
          departmentName: response.data.departmentName,
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put('http://localhost:5000/api/profile/update', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUser(response.data);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      {isEditing ? (
        <>
          <h1>Edit Profile</h1>
          <form className="profile-form">
            <div className="form-group">
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone:</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Position:</label>
              <input
                type="text"
                name="positionName"
                value={formData.positionName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Service:</label>
              <input
                type="text"
                name="serviceName"
                value={formData.serviceName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Department:</label>
              <input
                type="text"
                name="departmentName"
                value={formData.departmentName}
                onChange={handleChange}
              />
            </div>
            <button type="button" className="save-button" onClick={handleSave}>
              Save Changes
            </button>
            <button type="button" className="cancel-button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </form>
        </>
      ) : (
        <>
          <h1>{user.firstName} {user.lastName}</h1>
          <p className="profile-detail"><strong>Email:</strong> {user.email}</p>
          <p className="profile-detail"><strong>Phone:</strong> {user.phone}</p>
          <p className="profile-detail"><strong>Position:</strong> {user.positionName}</p>
          <p className="profile-detail"><strong>Service:</strong> {user.serviceName}</p>
          <p className="profile-detail"><strong>Department:</strong> {user.departmentName}</p>
          {user.signature && <img className="profile-signature" src={`http://localhost:5000/${user.signature}`} alt="Signature" />}
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>
        </>
      )}
    </div>
  );
};

export default UserProfile;
