import { Button } from "antd";
import React from "react";
import IconComponent from "./icon-component";

interface MButtonProps {
  title?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  icon?: string;
  className?: string;
  type?: "fill" | "outline";
  border?: "" | "round" | "circle";
}
const MButton: React.FC<MButtonProps> = ({
  title = "Button",
  onClick,
  style,
  icon,
  className,
  type,
  border,
}) => {
  const styleButton = {
    ...(type === "fill" ? { backgroundColor: "#058e21", color: "white" } : {}),
    ...(border === "circle" ? { borderRadius: "12px" } : {}),
    ...style,
  };
  return (
    <Button
      className={`m-button-normal ${className}`}
      onClick={onClick}
      style={styleButton}
    >
      {icon && <IconComponent iconName={icon} />}
      {title}
    </Button>
  );
};

export default MButton;
