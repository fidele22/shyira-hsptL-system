import React from 'react'
import './stylingpages/Login.css'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        <h1>Sign In</h1>
        <div className='loginsignup-fields'>
         <label>Username</label>
          <input type="text" name="" id="" placeholder='Username' />
          <label>Password</label>
          <input type="password" placeholder='Enter password'/>
        </div>
        <button>Sign in</button>
        <p className='login'>If you don't have an account? <Link style={{textDecoration:'none'}} to='/signup' ><span>Create one</span></Link></p>
      </div>
    </div>
  )
}

export default Login