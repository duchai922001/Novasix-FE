import React, { useState } from "react";

const Store = () => {
  const [activeTab, setActiveTab] = useState("Khung ảnh đại diện");

  const tabs = ["Khung ảnh đại diện", "Template màu sắc", "Biểu tượng"];
  const gemPacks = [
    {
      id: 1,
      label: "DISABLES ADS",
      price: "$2.99",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2-Ztv85gR3wX_SjiNIazlGynQwo_GzZs6jg&s",
      highlight: true,
    },
    {
      id: 2,
      label: "550",
      price: "$4.99",
      bonus: "10% FREE",
      img: "https://img.lovepik.com/png/20231103/Dinosaur-twibbon-border-cute-pink-avatar-frame-Child-dinosaur-anime_473504_wh1200.png",
    },
    {
      id: 3,
      label: "1200",
      price: "$9.99",
      bonus: "20% FREE",
      img: "https://png.pngtree.com/png-clipart/20220714/ourmid/pngtree-dinosaur-twibbon-border-cute-green-avatar-frame-png-image_5953331.png",
    },
    {
      id: 4,
      label: "2500",
      price: "$19.99",
      bonus: "25% FREE",
      img: "https://png.pngtree.com/png-clipart/20220621/ourmid/pngtree-orange-cat-animal-frame-cute-cartoon-avatar-social-media-border-png-image_5221239.png",
    },
    {
      id: 5,
      label: "6500",
      price: "$49.99",
      bonus: "30% FREE",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr_Ds-ixeo0F6WuL5vXWtDoKt0kABROaGldA&s",
      popular: true,
    },
    {
      id: 6,
      label: "15000",
      price: "$99.99",
      bonus: "50% FREE",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTOOefA3jbMmTTGjK20jDWh1UzKCVR8lS4rA&s",
      best: true,
    },
  ];

  const cashPacks = [
    {
      id: 1,
      amount: "10,000",
      price: "100",
      img: "https://png.pngtree.com/png-clipart/20210310/original/pngtree-new-year-festive-avatar-frame-png-image_5932506.jpg",
    },
    {
      id: 2,
      amount: "20,000",
      price: "200",
      img: "https://thiep.softvn.com/data/cards/40960314/40960314_637971024258269450.png",
    },
    {
      id: 3,
      amount: "150,000",
      price: "1000",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6Fk_LR29c8msFRAOxOXrrqKmJ8eSpYSc1o8Qtk1htMA574GRoElvB-gFM0ATanEhg0fM&usqp=CAU",
    },
  ];

  return (
    <div className="shop-container">
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
            {pack.popular && <div className="popular-badge">Most Popular</div>}
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
    </div>
  );
};

export default Store;
