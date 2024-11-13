import React from "react";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";

interface IconComponentProps {
  iconName?: string;
  library?: "fa" | "md";
  style?: React.CSSProperties;
}

const IconComponent: React.FC<IconComponentProps> = ({
  iconName,
  library = "fa",
  style,
}) => {
  const icons = library === "fa" ? FaIcons : MdIcons;

  const SelectedIcon = iconName
    ? (icons[iconName as keyof typeof icons] as React.ComponentType<
        React.SVGProps<SVGSVGElement>
      >)
    : null;

  return SelectedIcon ? <SelectedIcon style={style} /> : null;
};

export default IconComponent;
