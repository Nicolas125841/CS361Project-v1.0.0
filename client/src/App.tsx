import React, { useState } from "react";
import TabBar from "./components/TabBar";
import MenuPage from "./components/MenuPage";
import CashFlowPage from "./components/CashFlowPage";
import ExpenseRulesPage from "./components/ExpenseRulesPage";
import "./App.css";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(1);

  let ActivePageComponent;

  switch (activeTab) {
    case 0:
      ActivePageComponent = CashFlowPage;
      break;
    case 1:
      ActivePageComponent = ExpenseRulesPage;
      break;
    case 2:
      ActivePageComponent = MenuPage;
      break;
    default:
      ActivePageComponent = CashFlowPage;
  }

  const pageBackground: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: 393,
    minHeight: "100vh",
    paddingBottom: 16,
    backgroundColor: "#ffffff",
  };

  return (
    <div>
      <TabBar setActiveTab={setActiveTab} activeTab={activeTab} />
      <div style={pageBackground}>
        <ActivePageComponent />
      </div>
    </div>
  );
};

export default App;
