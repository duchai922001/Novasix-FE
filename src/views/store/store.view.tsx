import React, { useEffect, useState } from "react";
import { handleError } from "@/utils/catch-error";
import { PackageService } from "@/services/package.service";
import { UserPackageService } from "@/services/user-package.service";
import { message } from "antd";
import Loader from "@/components/loading";
import { MdOutlineDashboardCustomize, MdVerified, MdCalendarMonth, MdOutlineWorkspacePremium} from "react-icons/md";
import { FaCalendarWeek } from "react-icons/fa6";
import { AiFillHeart } from "react-icons/ai";

const Store: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [packages, setPackage] = useState([]);
  const [userPacakge, setUserPackage] = useState([]);
  const [activeTab, setActiveTab] = useState("Khung ảnh đại diện");

  const tabs = ["Khung ảnh đại diện", "Template màu sắc", "Biểu tượng"]; 

  const getPackageIcon = (name: string) => {
    switch (name) {
      case "Dashboard":
        return <MdOutlineDashboardCustomize />;
      case "Weekly":
        return <FaCalendarWeek />;
      case "Monthly":
        return <MdCalendarMonth />;
      case "Premium":
        return <MdOutlineWorkspacePremium />;
      default:
        return <AiFillHeart />;
    }
  };
  
  const asyncPackage = async () => {
    try {
      setIsLoading(true);
      const response = await PackageService.getPackage();
      setPackage(response);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };
  const asyncUserPackage = async () => {
    try {
      setIsLoading(true);
      const response = await UserPackageService.getPackagesUser();
      const mappedUserPackage = response.map(
        (item: any) => item.packageId.typePackage
      );
      setUserPackage(mappedUserPackage);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleBuyPackage = async (typePackage: string) => {
    try {
      const payload = {
        typePackage,
      };
      await UserPackageService.buyPackage(payload);
      message.success("Bạn đã đăng ký gói thành công");
      window.location.reload();
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    asyncPackage();
    asyncUserPackage();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="package-title">Enjoy your moment with your package</div>
          <div className="package-container">
            {packages.map((item, index) => (
              <div key={index} className={
                userPacakge.includes(item.typePackage)
                      ? "card card-button-isPaid"
                      : "card"
              }>
                <div className="card-details">
                  {
                    userPacakge.includes(item.typePackage) 
                    ?  <p className="text-verifi"><MdVerified /></p> 
                    : null
                  }
                  <p className="text-icon">{getPackageIcon(item.name)}</p> 
                  <p className="text-title">{item.name}</p>
                  <p className="text-price">{item.price}💰 / <span className="text-price-span">{item.timeExp} tháng</span></p>
                  <p className="text-body">{item.description}</p>
                </div>
                <button
                  className={
                    userPacakge.includes(item.typePackage)
                      ? "card-button card-button-disable"
                      : "card-button"
                  }
                  onClick={() => handleBuyPackage(item.typePackage)}
                >
                  Mua Ngay
                </button>
              </div>
            ))}
          </div>
          {/* <div className="shop-container">
        <nav className="nav-bar">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`nav-btn ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>
        <div className="grid-container">
          {gemPacks.map((pack) => (
            <div
              key={pack.id}
              className={`card ${pack.highlight ? "highlight" : ""}`}
            >
              {pack.bonus && <div className="badge">{pack.bonus}</div>}
              {pack.popular && (
                <div className="popular-badge">Most Popular</div>
              )}
              {pack.best && <div className="best-badge">Best Price</div>}
              <img src={pack.img} alt="gem" className="icon" />
              <h3 className="card-title">{pack.label}</h3>
              <button className="btn">{pack.price}</button>
            </div>
          ))}
        </div>

        <div className="grid-container">
          {cashPacks.map((pack) => (
            <div key={pack.id} className="card">
              <img src={pack.img} alt="cash" className="icon" />
              <h3 className="card-title">{pack.amount}</h3>
              <button className="btn">{pack.price}</button>
            </div>
          ))}
        </div>

        <button className="back-btn">⬅ Back</button>
      </div> */}
        </>
      )}
    </>
  );
};

export default Store;
