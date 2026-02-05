import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
  return (
    <div>
        <div className="footer">
            <div className="ffoter-top">
                <h2>Need Update on Latest Offers?</h2>
                <p>Subscribe to our newsletter to get frequent update</p>
                <div className="input">
                    <input type="email" name="email" id="" placeholder='Enter your email' />
                    <button>Join Now</button>
                </div>
            </div>
            <div className="ffoter-bottom">
                <div className="footer-left">
                    <h2>Mama’s Delight Kitchen</h2>
                    <div className="socials">
                        <FaFacebook className='social-icon fb'/>
                        <FaInstagram className='social-icon ig'/>
                        <FaYoutube className='social-icon yt'/>
                        <FaWhatsapp className='social-icon wa'/>
                    </div>
                </div>
                <div className="footer-right">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/services">Services</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/">Privacy policy</Link></li>
                        
                    </ul>
                </div>
            </div>
            <p className="copy">© 2026. All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer