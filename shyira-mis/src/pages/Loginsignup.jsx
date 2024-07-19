import React, { useState, useEffect } from 'react';
import './stylingpages/register.css';
import axios from 'axios';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    positionName: '',
    serviceName: '',
    departmentName: '',
    phone: '',
    email: '',
    signature: null, // Changed to accept file upload
    password: '',
    confirmPassword: '',
  });

  const [departments, setDepartments] = useState([]);
  const [services, setServices] = useState([]);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/departments');
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/services');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/positions');
        setPositions(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchPositions();
  }, []);



  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'signature') {
      setFormData({ ...formData, [name]: files[0] }); // Store the File object
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('positionName', formData.positionName);
      formDataToSend.append('serviceName', formData.serviceName);
      formDataToSend.append('departmentName', formData.departmentName);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('signature', formData.signature);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('confirmPassword', formData.confirmPassword);

      const response = await axios.post('http://localhost:5000/api/users/register', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('User registered:', response.data);
      
      localStorage.setItem('token', response.data.token);

      // Optionally reset form fields after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        positionName: '',
        serviceName: '',
        departmentName: '',
        phone: '',
        email: '',
        signature: null,
        password: '',
        confirmPassword: '',
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
                <select name="positionName" value={formData.positionName} onChange={handleChange} required>
                  <option value="">Select Position</option>
                  {positions.map((position) => (
                    <option key={position._id} value={position.name}>{position.name}</option>
                  ))}
                </select>
              </div>
              <div className='right'>
                <label>Service</label>
                <select name="serviceName" value={formData.serviceName} onChange={handleChange}>
                  <option value="">Select Service</option>
                  {services.map((service) => (
                    <option key={service._id} value={service.name}>{service.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className='flex-container'>
              <div className='left'>
                <label>Department</label>
                <select name="departmentName" value={formData.departmentName} onChange={handleChange}>
                  <option value="">Select Department</option>
                  {departments.map((department) => (
                    <option key={department._id} value={department.name}>{department.name}</option>
                  ))}
                </select>
              </div>
              <div className='right'>
                <label>Phone number</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder='phone number' required />
              </div>
            </div>
            <div className='flex-container'>
              <div className='left'>
                <label>Email address</label>
                <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder='Email address' />
              </div>
              <div className='right'>
                <label>Signature</label>
                <input type="file" name="signature" onChange={handleChange} accept="image/*" />
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
