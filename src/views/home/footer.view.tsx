import React from 'react'
import { FaFacebook, FaYoutube, FaTiktok, FaLinkedin } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

interface SocialMediaIcon {
  route: string,
  icon: React.ReactNode,
}

interface FooterRoute {
  route: string,
  text: string,
}

const Footer: React.FC = () => {
  const ListSocialMediaIcon: SocialMediaIcon[] = [
    {
      route: "#",
      icon: <FaFacebook />,
    },
    {
      route: "#",
      icon: <FaYoutube />,
    },
    {
      route: "#",
      icon: <FaTiktok />,
    },
    {
      route: "#",
      icon: <FaLinkedin />,
    },
  ]

  const ListProduct: FooterRoute[] = [
    {
      route: "#",
      text: "Package",
    },
    {
      route: "#",
      text: "Changelog",
    },
    {
      route: "#",
      text: "Guide",
    },
  ]

  const ListLearnMore: FooterRoute[] = [
    {
      route: "#",
      text: "Blog",
    },
  ]

  const ListCompanyRoute: FooterRoute[] = [
    {
      route: "#",
      text: "Terms of Service",
    },
    {
      route: "#",
      text: "Privacy Policy",
    },
    {
      route: "#",
      text: "한국어",
    },
  ]

  const navigate = useNavigate();
  
  const renderRoute = (Item: FooterRoute) => {
    return (
        <li 
          className="f-route-link" onClick={() => navigate(Item.route)}>
            {Item.text}
        </li>
    )
  }

  const renderFooterBlock = (title: string, list: FooterRoute[]) => {
    return (
      <div className="f-route-block" key={title}>
        <p className="f-route-title">{title}</p>
        <ul className="f-route-list">
          {list.map((item) => renderRoute(item))}
        </ul>
      </div>
    )
  }

  return (
    <footer className="footer">  
      <div className="footer-connect">
        <p className="f-connect-title">Connect With Us</p>
        <div className="f-social-icons">
          {ListSocialMediaIcon.map((item)=>(
            <a className="f-social-link" href={item.route}>{item.icon}</a>
          ))}
        </div>
        <div className="footer-email-signup">
          <input className="f-signup-input" type="email" placeholder="work@email.com" />
          <button className="f-signup-btn">
            <p>Sign Up</p>
          </button>
        </div>
      </div>
      <div className="footer-route">
        {renderFooterBlock("Product", ListProduct)}
        {renderFooterBlock("Learn", ListLearnMore)}
        {renderFooterBlock("Company", ListCompanyRoute)}
      </div>
    </footer>
  )
}

export default Footer