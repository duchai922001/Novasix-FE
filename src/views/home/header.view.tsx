import React from "react";
import { Link } from "react-router-dom";

interface NavLink {
  key: string;
  route: string;
  text: string;
}

const Header: React.FC = () => {
  const ListNavLink: NavLink[] = [
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
  ];
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  return (
    <header className="home-header">
      <img
        className="h-logo"
        src="https://res.cloudinary.com/didb3lzdt/image/upload/v1743155958/WEBBLUETOOTH/s3wxl3iw8przscbh5bmy.png"
        alt="NovaSix Logo"
      />

      <nav className="h-nav">
        {ListNavLink.map((item) => (
          <Link className="h-nav-link" to={item.route}>
            {item.text}
          </Link>
        ))}
      </nav>

      <div className="h-bth-join-container">
        <Link
          to={
            user?.role === "customer"
              ? "/dashboard"
              : user?.role === "admin"
              ? "/admin"
              : "/login"
          }
          style={{ textDecoration: "none" }}
        >
          <button className="h-btn-join">
            <div className="h-btn-content-1">
              <span className="h-btn-span-1">
                <p className="h-btn-p-1">Login</p>
              </span>
            </div>
            <div className="h-btn-content-2">
              <span className="h-btn-span-2">
                <p className="h-btn-p-2">➤</p>
              </span>
            </div>
          </button>
        </Link>
        <Link to={"/register"} style={{ textDecoration: "none" }}>
          <button className="h-btn-join">
            <div className="h-btn-content-1">
              <span className="h-btn-span-1">
                <p className="h-btn-p-1">Register</p>
              </span>
            </div>
            <div className="h-btn-content-2">
              <span className="h-btn-span-2">
                <p className="h-btn-p-2">➤</p>
              </span>
            </div>
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
