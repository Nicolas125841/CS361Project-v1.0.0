import React from "react";
import Tab from "./Tab";
import MenuButton from "./MenuButton";
import UndoButton from "./UndoButton";

interface TabBarProps {
  setActiveTab: (index: number) => void;
  activeTab: number;
}

const TabBar: React.FC<TabBarProps> = ({ setActiveTab, activeTab }) => {
  const tabs: string[] = ["Cash Flow", "Expense Rules"];

  return (
    <div style={{ display: "flex" }}>
      <MenuButton
        key={2}
        isActive={2 === activeTab}
        onClick={() => setActiveTab(2)}
      ></MenuButton>
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          isActive={index === activeTab}
          onClick={() => setActiveTab(index)}
        >
          {tab}
        </Tab>
      ))}
      <UndoButton></UndoButton>
    </div>
  );
};

export default TabBar;
