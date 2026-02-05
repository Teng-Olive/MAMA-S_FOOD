import React from 'react'
import './Services.css'

const Services = () => {
  return (
    <div className="services-container">
      <div className="services-header">
        <h1>Our Services</h1>
      </div>
      
      <div className="services-content">
        <div className="service-card">
          <div className="service-number">1</div>
          <h2>Instant Digital Ordering</h2>
          <p>
            Skip the physical queue by browsing our interactive menu and placing orders directly through our web application. Our system processes your request instantly, notifying the kitchen staff in real-time to minimize your wait.
          </p>
        </div>

        <div className="service-card">
          <div className="service-number">2</div>
          <h2>Live Order Tracking</h2>
          <p>
            Stay informed from the moment you order until your meal is ready for pickup or delivery. Our Live Progress Tracker (Step 15 of our system logic) ensures you never have to guess the status of your food.
          </p>
        </div>

        <div className="service-card">
          <div className="service-number">3</div>
          <h2>Curated Cultural Menus</h2>
          <p>
            We offer specialized categories tailored to your needs, including the Village Roots feast for traditionalists and Business Express bowls for those on a tight schedule. From Waterfufu & Eru to Spaghetti, our menu is designed for variety and vitality.
          </p>
        </div>

        <div className="service-card">
          <div className="service-number">4</div>
          <h2>Secure Cashless Payments</h2>
          <p>
            Experience peace of mind with our integrated secure payment gateway. We provide a safe environment for digital transactions, allowing you to focus on savoring your meal rather than worrying about payment security.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Services
