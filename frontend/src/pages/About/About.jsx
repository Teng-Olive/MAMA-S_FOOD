import React from 'react'
import './About.css'

const About = () => {
  const dishesOffered = [
    { name: "Ndolé", icon: "🍃" },
    { name: "Achu & Yellow Soup", icon: "🍲" },
    { name: "Fufu-corn & Njama Njama", icon: "🥘" }
  ]

  const values = [
    {
      title: "Fresh & local",
      description: "Sourced from Douala's markets daily"
    },
    {
      title: "Authentic",
      description: "Recipes passed down through generations"
    },
    {
      title: "Convenient",
      description: "Order anytime, delivered to your door"
    }
  ]

  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Us</h1>
        <p className="about-subtitle">Where tradition meets your doorstep</p>
      </div>
      
      <div className="about-content">
        {/* Mission Section */}
        <section className="about-section">
          <h2 className="section-title">OUR MISSION</h2>
          <div className="about-text">
            <p>
              We exist to bring <span className="highlight">nutritious, home-cooked Cameroonian meals</span> to busy professionals, students, and families across Douala's neighborhoods. Every dish is prepared with the freshest local ingredients — the way it's always been done, just now available at the tap of a button.
            </p>
            <p>
              We bridge the gap between <span className="highlight">traditional kitchen values</span> and modern digital convenience, so that a healthy, <span className="highlight italic">"Mama-made"</span> meal is always just a click away.
            </p>
          </div>
          
          <div className="dishes-offered">
            {dishesOffered.map((dish, index) => (
              <span key={index} className="dish-badge">{dish.name}</span>
            ))}
          </div>
        </section>

        {/* Values Section */}
        <section className="about-section values-section">
          <h2 className="section-title">OUR VALUES</h2>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">
                  {index === 0 && "🌿"}
                  {index === 1 && "�️"}
                  {index === 2 && "📦"}
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default About
