import React, { useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
function Navbar() {
    const [menu,setMenu] = useState('shop')
  return (
    <div className='Navbar'>
  <div className='Navbar-logo'>
    <p>SHYIRA MIS</p>
  </div>
  <ul className='navbar-menu'>
    <li onClick={() => { setMenu('home') }}>
      <Link style={{ textDecoration: 'none' }} to='/'>Login</Link>
      {menu === 'home' ? <hr /> : <></>}
    </li>
  </ul>
  <div className='navbar-login'>
    <button>Login</button>
  </div>
</div>

  )
}

export default Navbar