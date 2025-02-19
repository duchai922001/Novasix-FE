import React from "react";
import frameDemo from '../../assets/images/storeDemo/frame.png'
import pedestal from '../../assets/images/storeDemo/pedestal.png'
import { Col, Row } from "antd";

interface storeItem {
  img: string;
  title: string;
  price: number;
}

const Store: React.FC = () => {

  const ItemDemo: storeItem = {
      img: frameDemo,
      title: "Angel Frame",
      price: 100000,
  }
  const renderItem = (item: storeItem) => {
    return (
      <Col className="store-card-item-col" xs={24} sm={12} md={8} lg={8} xl={6}>
          <div className="store-card-item">
            <img className="store-card-img" src={pedestal} alt="pedestal"/>
            <img className="store-card-img" src={item.img} alt="frame"/>
            <div className="store-card-info">
              <p className="store-card-title">{item.title}</p>
              <p className="store-card-price">{(item.price).toLocaleString("vi-VN")}🪙</p>
           </div>
        </div>
      </Col>
    )
  }

  return (
    <div className="store-conatiner">
      <div className="store-title-box">
        <p className="store-title">Enjoy your moment with colorful working environment 😍</p>
      </div>
      <div className="store-space">
        <Row gutter={[16, 16]} wrap>
          {renderItem(ItemDemo)}
          {renderItem(ItemDemo)}
          {renderItem(ItemDemo)}
          {renderItem(ItemDemo)}
          {renderItem(ItemDemo)}
        </Row>   
      </div>
    </div>
  ); 
};

export default Store;
