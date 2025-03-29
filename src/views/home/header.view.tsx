import React from 'react'
import { Link } from 'react-router-dom';

interface NavLink {
  key: string;
  route: string;
  text: string;
}

interface HeaderBtn {
  key: string;
  route: string;
  mainText: string;
  subText: string;
}

const Header: React.FC = () => {

  const ListNavLink : NavLink[] = [
    {
      key: "Guideline",
      route: "/guideline",
      text: "Guideline",
    },
    {
      key: "AboutUs",
      route: "/aboutUs",
      text: "About Us",
    },
    {
      key: "Policies",
      route: "/policies",
      text: "Policies",
    },
    {
      key: "FAQS",
      route: "/FAQS",
      text: "FAQs",
    },
  ]

  const ListHeaderBtn : HeaderBtn[] = [
    {
      key: "login",
      route: "/login",
      mainText: "Login",
      subText: "➤",
    },
    {
      key: "register",
      route: "/register",
      mainText: "Register",
      subText: "➤",
    },
  ]

  return (
    <header className="home-header">
      <img className="h-logo" src="/src/assets/images/auth/logo-zendo.png" alt="NovaSix Logo"/>
      
      <nav className="h-nav">
        {ListNavLink.map((item)=>(
          <Link className="h-nav-link" to={item.route}>
            {item.text}
          </Link>
        ))}
      </nav>

      <div className="h-bth-join-container">
        {ListHeaderBtn.map((item)=>(
          <Link to = {item.route} style={{textDecoration: "none"}}>
            <button className="h-btn-join">
              <div className="h-btn-content-1">
                <span className="h-btn-span-1">
                  <p className="h-btn-p-1">{item.mainText}</p>
                </span>
              </div>
              <div className="h-btn-content-2">
                <span className="h-btn-span-2">
                  <p className="h-btn-p-2">{item.subText}</p>
                </span>
              </div>
            </button>
          </Link>
        ))}
      </div>
    </header>
  )
}

export default Header