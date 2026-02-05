import React from 'react'
import './About.css'

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About us.</h1>
      </div>
      
      <div className="about-content">
        <section className="about-section">
          <div className="about-text">
            <p>
              Mama's Delight Kitchen is more than just a restaurant; it is a digital gateway to the authentic flavors of Cameroon. Founded on the principle of "Health meets Heritage," we utilize modern MERN stack technology to solve the traditional problems of long wait times and manual ordering errors.
            </p>
            <p>
              Our mission is to provide busy professionals, students, and families in Douala and beyond with nutritious, home-cooked meals—like our signature Ndolé and Achu—prepared with the freshest local ingredients. We bridge the gap between traditional kitchen values and 2026 digital convenience, ensuring that a healthy, "Mama-made" meal is always just a click away.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default About
