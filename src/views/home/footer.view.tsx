import React from 'react'
import { FaFacebook, FaYoutube, FaTiktok, FaLinkedin } from "react-icons/fa";

interface SocialMediaIcon {
  key: string,
  link: string,
  icon: React.ReactNode,
}
interface ProductList {
  key: string,
  link: string,
  icon: React.ReactNode,
}

const Footer: React.FC = () => {
  const ListSocialMediaIcon: SocialMediaIcon[] = [
    {
      key: "facenook",
      link: "#",
      icon: <FaFacebook />,
    },
    {
      key: "youtube",
      link: "#",
      icon: <FaYoutube />,
    },
    {
      key: "tiktok",
      link: "#",
      icon: <FaTiktok />,
    },
    {
      key: "linkedin",
      link: "#",
      icon: <FaLinkedin />,
    },
  ]
  const ListProduct: SocialMediaIcon[] = [
    {
      key: "facenook",
      link: "#",
      icon: <FaFacebook />,
    },
    {
      key: "youtube",
      link: "#",
      icon: <FaYoutube />,
    },
    {
      key: "tiktok",
      link: "#",
      icon: <FaTiktok />,
    },
    {
      key: "linkedin",
      link: "#",
      icon: <FaLinkedin />,
    },
  ]
  const renderSocialMediaIcon = (Item: SocialMediaIcon) => {
    return (
        <a href={Item.link}>{Item.icon}</a>
    )

  }
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <h3>The Collaborative Sales CRM</h3>
          <div className="social-icons">
            {ListSocialMediaIcon.map((item)=>renderSocialMediaIcon(item))}
          </div>
          <div className="email-signup">
            <input type="email" placeholder="work@email.com" />
            <button>Sign Up</button>
          </div>
        </div>
        <div className="footer-links">
          <div>
            <h4>Product</h4>
            <ul>
              <li><a href="#">Product</a></li>
              <li><a href="#">Changelog</a></li>
              <li><a href="#">Guide</a></li>
            </ul>
          </div>
          <div>
            <h4>Learn</h4>
            <ul>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">한국어</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer