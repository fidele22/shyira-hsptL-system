import React, { useState } from 'react';
import './stylingpages/register.css'
import axios from 'axios';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    position: '',
    service: '',
    department: '',
    phone: '',
    email: '',
    signature: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', formData);
      console.log('User registered:', response.data);
       // Optionally reset form fields after successful submission
       setFormData({
    firstName: '',
    lastName: '',
    position: '',
    service: '',
    department: '',
    phone: '',
    email: '',
    signature: '',
    password: '',
    confirmPassword: '',
    role: 'pending' 
      });
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className='loginsignup-fields'>
            <div className='flex-container'>
              <div className='left'>
                <label>First Name</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder='First name' required />
              </div>
              <div className='right'>
                <label>Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder='Last name' required />
              </div>
            </div>
            <div className='flex-container'>
              <div className='left'>
                <label>Position</label>
                <select name="position" value={formData.position} onChange={handleChange} required>
                  <option value="">Select Position</option>
                  <option value="position1">Position 1</option>
                  <option value="position2">Position 2</option>
                  <option value="position3">Position 3</option>
                </select>
              </div>
              <div className='right'>
                <label>Service</label>
                <select name="service" value={formData.service} onChange={handleChange}>
                  <option value="">Select Service</option>
                  <option value="service1">Service 1</option>
                  <option value="service2">Service 2</option>
                  <option value="service3">Service 3</option>
                </select>
              </div>
            </div>
            <div className='flex-container'>
              <div className='left'>
                <label>Department</label>
                <select name="department" value={formData.department} onChange={handleChange}>
                  <option value="">Select Department</option>
                  <option value="department1">Department 1</option>
                  <option value="department2">Department 2</option>
                  <option value="department3">Department 3</option>
                </select>
              </div>
              <div className='right'>
                <label>Phone number</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange}  placeholder='phone number' required />
              </div>
            </div>
            <div className='flex-container'>
              <div className='left'>
                <label>Email address</label>
                <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder='Email address' />
              </div>
              <div className='right'>
                <label>Signature</label>
                <input type="text" name="signature" value={formData.signature} onChange={handleChange} placeholder='signature'/>
              </div>
            </div>
            <div className='flex-container'>
              <div className='left'>
                <label>Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder='Enter password' />
              </div>
              <div className='right'>
                <label>Confirm Password</label>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder='Enter confirm password' />
              </div>
            </div>
          </div>
          <button type="submit">Register</button>
        </form>
        <p className='login'>Already have an account? <a href='/login'>Login</a></p>
        <div className='loginsignup-agree'>
          <input type="checkbox" />
          <p>By continuing, agree to terms and conditions</p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
