import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './stylingpages/loginForm.css'; // Make sure to adjust your CSS file path

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false); // State to track whether it's sign up or sign in
  
  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/login', { email, password });
      const { token, role } = res.data;

      // Save the token in session storage
      localStorage.setItem('token', token);

      // Redirect to the appropriate dashboard
      if (role === 'admin') {
        navigate('/admin-dashboard');
      } 
      else if(role === 'logistic') {
        navigate('/logistic');
      }
      else if(role === 'accountant') {
        navigate('/accountant');
      }
      else if(role === 'daf') {
        navigate('/daf');
      }
      else if(role === 'hod') {
        navigate('/hod');
      }
      else {
        navigate('/login');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Invalid email or password');
    }
  };
// register codes

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

const handleSubmitRegister = async (e) => {
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
   alert('Registration successful')
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
    alert('Error for registratiion')
  }
};



  return (
    <div className={`container ${isSignUp ? 'right-panel-active' : ''}`} id="container">
      <div className="form-container sign-up-container">
        <form onSubmit={handleSubmitRegister}>
          <h1>Register</h1>
         
          <span>use your email for registration</span>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder='First name' required />
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder='Last name' required />
          <select name="positionName" value={formData.positionName} onChange={handleChange} required>
                  <option value="">Select Position</option>
                  {positions.map((position) => (
                    <option key={position._id} value={position.name}>{position.name}</option>
                  ))}
                </select>
         <select name="serviceName" value={formData.serviceName} onChange={handleChange}>
           <option value="">Select Service</option>
           {services.map((service) => (
             <option key={service._id} value={service.name}>{service.name}</option>
           ))}
         </select>
         <select name="departmentName" value={formData.departmentName} onChange={handleChange}>
                  <option value="">Select Department</option>
                  {departments.map((department) => (
                    <option key={department._id} value={department.name}>{department.name}</option>
                  ))}
                </select>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder='phone number' required />
          <h5>Signature</h5>
          <input type="file" placeholder='signature' />
          <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder='Email address'  />
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder='Enter password' />
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder='Enter confirm password' />
          <button className='register-btn'>Register</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="social-container">
            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <span> use your account</span>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email address' required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter password' required />
          <a href="#">Forgot your password?</a>
          <button type="submit">Login</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button className="ghost" onClick={handleSignInClick}>Login</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, User!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button className="ghost" onClick={handleSignUpClick}>Rigister</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
