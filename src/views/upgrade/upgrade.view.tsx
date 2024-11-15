import { Col, Row } from "antd";

const upgradeData = [
  {
    title: "Focus",
    price: "149.000",
    duration: "per/3 months",
    des: "An advanced package designed for users who want to optimize productivity",
    popular: true,
  },
  {
    title: "Focus",
    price: "149.000",
    duration: "per/3 months",
    des: "An advanced package designed for users who want to optimize productivity",
    popular: false,
  },
  {
    title: "Focus",
    price: "149.000",
    duration: "per/3 months",
    des: "An advanced package designed for users who want to optimize productivity",
    popular: false,
  },
];
const Upgrade = () => {
  return (
    <div className="upgrade-container">
      <div className="upgrade-header">
        <span>Unlock Your Best Self with ZenDo’s Premium Plans!</span>
        <span>
          Take control of your tasks and emotions with ZenDo’s tailored service
          packages
        </span>
      </div>
      <Row className="upgrade-plans">
        {upgradeData.map((item) => (
          <Col span={7} className="card">
            <div className="card-bg-1"></div>
            <div className="card-bg-2"></div>
            {item.popular && <div className="card-popular">Popular</div>}
            <div className="card-header">{item.title}</div>
            <div className="price">
              <span className="amount">{item.price}</span>
              <span className="duration">{item.duration}</span>
            </div>
            <div className="des">{item.des}</div>
            <button className="btn">Get Started</button>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Upgrade;
