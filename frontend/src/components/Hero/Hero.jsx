import React from 'react'
import hero_img from '../../assets/pasta2.png'
import './Hero.css'
import { FaShippingFast } from 'react-icons/fa'
import { BiSupport } from 'react-icons/bi'
import { MdPayment } from 'react-icons/md'
import { FiSend } from "react-icons/fi";

const Hero = () => {
  return (
    <div>
      <div className="hero">
      <div className="hero_top">
        <div className="hero_left">
          <h2>Enjoy Your Delicious Meal</h2>
          <h1>Discover Delicious Healthy Meal</h1>
          <p>Taste the perfect balance of home-cooked heart and modern health. Discover delicious, wholesome meals crafted to fuel your lifestyle at Mama’s Delight Kitchen.</p>
          <button>Explore Our Menu</button>
          
        </div>
        <div className="hero_right">
        <img src={hero_img} alt="" />
          {/* <div className="shape"></div> */}
          
        </div>
      </div>
      <div className="hero_bottom">
        <div className="hero_content">
          <div className="info_icon"><FaShippingFast className='hero_cc-icon'/></div>
          <div className="detail">
            <h3>Freshly Prepared</h3>
            <p>Made to order for maximum nutrients</p>
          </div>
        </div>
        <div className="hero_content">
          <div className="info_icon"><FiSend className='hero_cc-icon'/></div>
          <div className="detail">
            <h3>Live Tracking</h3>
            <p>Get notified the moment food is ready</p>
          </div>
        </div>
        <div className="hero_content">
          <div className="info_icon"><BiSupport className='hero_cc-icon'/></div>
          <div className="detail">
            <h3>24/7 Support</h3>
            <p>Full support on process</p>
          </div>
        </div>
        <div className="hero_content">
          <div className="info_icon"><MdPayment className='hero_cc-icon'/></div>
          <div className="detail">
            <h3>Secure Payment</h3>
            <p>Verified payments via secure gateway</p>
          </div>
        </div>
        
      </div>
      </div>
    </div>
  )
}

export default Hero