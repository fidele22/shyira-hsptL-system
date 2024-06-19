import React from 'react'
import './stylingpages/Login.css'
import { Link } from 'react-router-dom'

function loginsignup() {
  return (
    
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        <h1>Sign Up</h1>
        <div className='loginsignup-fields'>
          <input type="text" name="" id="" placeholder='Your Name' />
          <input type="email" name="" id="" placeholder='Enter email address'/>
          <input type="password" placeholder='Enter password'/>
        </div>
        <button>Continue</button>
        <p className='login'>Already a have account? <Link style={{textDecoration:'none'}} to='/login'><span >login </span></Link></p>
        <div className='loginsignup-agree'>
          <input type="checkbox" />
          <p>by continue, agree terms and conditions</p>
        </div>
      </div>
    </div>
  
  )
}

export default loginsignup