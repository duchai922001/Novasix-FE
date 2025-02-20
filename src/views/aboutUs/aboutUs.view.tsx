import React from 'react'

const aboutUs: React.FC = () => {
  return (
    <div className="about-container">
      <div className="about-card">
        <h1 className="about-title">About Us</h1>
        <p>
          Welcome to ZenDo, a platform designed to help users manage their tasks and emotions more effectively.
          Our mission is to provide tools and insights that enhance productivity and well-being.
        </p>
        
        <h2 className="about-subtitle">Our Vision</h2>
        <p>
          We believe that a well-balanced life starts with efficient task management and emotional awareness.
          ZenDo aims to be the bridge between your goals and your personal well-being.
        </p>
        
        <h2 className="about-subtitle">Why Choose ZenDo?</h2>
        <ul className="about-list">
          <li>Smart task management features</li>
          <li>Personalized insights for better productivity</li>
          <li>Emotional tracking for mindfulness</li>
          <li>User-friendly and customizable interface</li>
        </ul>
        
        <h2 className="about-subtitle">Contact Us</h2>
        <p>
          Have questions or suggestions? Reach out to us at 
          <a href="mailto:support@zendoapp.com" className="about-link"> support@zendoapp.com</a>.
        </p>
      </div>
    </div>
  )
}

export default aboutUs