import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './stylingpages/Login.css'

const Login = () => {
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

  return (
    <div className='loginsignup'>
      <div className='login-container'>
        <h1>Login To MIS</h1>
        <p>Welcome to Shyira Hospital MIS</p>
        <form onSubmit={handleSubmit}>
          <div className='loginsignup-fields'>
            <label>Email address</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email address' required />
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter password' required />
          </div>
          <button type="submit">Login</button>
          <p className='login'>If you don't have an account? <Link style={{textDecoration:'none'}} to='/signup'><span>Create one</span></Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
