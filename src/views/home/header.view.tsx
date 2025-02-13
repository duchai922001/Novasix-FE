import React from 'react'

const Header: React.FC = () => {
  return (
    <header className="header">
    <img src="/src/assets/images/auth/logo-zendo.png" alt="NovaSix Logo" className="logo-auth "/>
    <nav className="nav">
        <a href="#" className="nav-link">Guideline</a>
        <a href="#" className="nav-link">About Us</a>
        <a href="#" className="nav-link">FAQS</a>
        <a href="#" className="nav-link">Policies & Terms</a>
    </nav>
    <div className="auth-links">
    <button className="join-button">Login</button>
        <button className="join-button">Join Us Now</button>
    </div>
</header>
  )
}

export default Header