import React from "react";

interface TabProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const Tab: React.FC<TabProps> = ({ isActive, onClick, children }) => {
  const tabBox: React.CSSProperties = {
    height: 50,
    width: 144,
    backgroundColor: "#9d9d9d",
  };

  const roundedTab: React.CSSProperties = {
    height: 50,
    width: 144,
    backgroundColor: isActive ? "#ffffff" : "#d9d9d9",
    borderRadius: "10px 10px 0 0",
  };

  const tabText: React.CSSProperties = {
    height: 50,
    width: 144,
    position: "relative",
    top: 0,
    left: 0,
    color: "#000000",
    fontFamily: "Inter-Bold, Helvetica",
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: "-0.56px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={tabBox} onClick={onClick}>
      <div style={roundedTab}>
        <div style={tabText}>{children}</div>
      </div>
    </div>
  );
};

export default Tab;
