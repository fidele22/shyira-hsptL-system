import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <div className='footer'>
        <div className="footer-logo">
            <img src="" alt="" />
            <p>Shyira district hospital</p>
        </div>
        <ul className='footer-links'>
            <li>users</li>
            <li>services</li>
            <li>departments</li>
            <li>postions</li>
        </ul>
     
     <div className="footer-copyright">
        <hr />
        <p>Copyright@2024 | All right reserved</p>
     </div>
    </div>
  )
}

export default Footer