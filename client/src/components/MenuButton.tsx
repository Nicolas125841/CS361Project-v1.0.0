import React from "react";

interface MenuProps {
  isActive: boolean;
  onClick: () => void;
}

const MenuButton: React.FC<MenuProps> = ({ isActive, onClick }) => {
  const menuButtonBox: React.CSSProperties = {
    height: 50,
    width: 53,
    backgroundColor: "#9d9d9d",
  };

  const roundedMenuButton: React.CSSProperties = {
    backgroundColor: isActive ? "#ffffff" : "#9d9d9d",
    borderRadius: "10px 10px 0 0",
    height: 50,
    width: 53,
    position: "relative",
    top: 0,
    left: 0,
  };

  const menuIcon: React.CSSProperties = {
    height: 18,
    width: 23,
    position: "relative",
    left: 15,
    top: 16,
  };

  return (
    <div style={menuButtonBox} onClick={onClick}>
      <div style={roundedMenuButton}>
        <img style={menuIcon} alt="Menu icon" src="./images/menu-icon.png" />
      </div>
    </div>
  );
};

export default MenuButton;
