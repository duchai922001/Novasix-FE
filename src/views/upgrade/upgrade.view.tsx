import React, { useState } from "react";
import { Card, Button, Switch } from "antd";
import { CheckOutlined } from "@ant-design/icons";

const Upgrade = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    { title: "Basic", price: 29.99, bg: "#2C1D64", highlight: true },
    { title: "Profesional", price: 69.99, bg: "#fff", highlight: false },
    { title: "Ultimate", price: 99.99, bg: "#fff", highlight: false },
  ];

  return (
    <div className="pricing-container">
      <h2 className="pricing-title">
        Unlock Your Best Self with <span>ZenDo’s</span> Premium Plans!
      </h2>
      <h2 className="pricing-title">
        Take control of your tasks and emotions with <span>ZenDo’s</span>{" "}
        tailored service packages
      </h2>
      <div className="toggle-switch">
        <span>Monthly</span>
        <Switch onChange={() => setIsYearly(!isYearly)} />
        <span>Yearly</span>
        {isYearly && <span className="discount-badge">$20 OFF</span>}
      </div>

      <div className="pricing-cards">
        {plans.map((plan, index) => (
          <Card
            key={index}
            className={`pricing-card ${plan.highlight ? "highlight" : ""}`}
            style={{ backgroundColor: plan.bg }}
          >
            {plan.highlight && <div className="discount">-70% OFF TODAY</div>}
            <h3 className="plan-title">{plan.title}</h3>
            <h2 className="plan-price">
              ${isYearly ? plan.price * 12 - 20 : plan.price}{" "}
              <span>per {isYearly ? "year" : "month"}</span>
            </h2>
            <p>
              <CheckOutlined /> Unlimited Updates & Projects
            </p>
            <p>
              <CheckOutlined /> Unlimited Updates & Projects
            </p>
            <p>
              <CheckOutlined /> Unlimited Updates & Projects
            </p>
            <Button className="save-button">Save 40%</Button>
            <Button type="primary" className="get-started-button">
              Get Started
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Upgrade;
