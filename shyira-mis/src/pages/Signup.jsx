import React, { useState } from 'react';
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

  return (
    <div className={`container ${isSignUp ? 'right-panel-active' : ''}`} id="container">
      <div className="form-container sign-up-container">
        <form action="#">
          <h1>Create Account</h1>
         
          <span>use your email for registration</span>
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
          <input type="text" placeholder="service" />
          <input type="text" placeholder="position" />
          <input type="text" placeholder="department" />
          <input type="text" placeholder="phone number" />
          <input type="text" placeholder="email" />
          <input type="text" placeholder="password" />
          <button>Sign Up</button>
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
            <button className="ghost" onClick={handleSignInClick}>Sign In</button>
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
