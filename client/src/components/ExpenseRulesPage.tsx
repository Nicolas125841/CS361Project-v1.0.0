import React, { useState } from "react";
import ExpenseRulesCategory from "./ExpenseRulesCategory";
import Overlay from "./Overlay";
import EditExpenseRuleModal from "./EditExpenseRuleModal";
import "../App.css";

interface ExpenseRuleData {
  name: string;
  account: string;
  amount: number;
  freq: string;
  every?: number;
  onDate?: number;
  typeOfDay?: string;
  startDate?: string;
  endDate?: string;
}

const ExpenseRulesPage: React.FC = () => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const expenseRuleData: ExpenseRuleData = {
    name: "",
    account: "S Chk",
    amount: 0,
    freq: "Monthly",
    every: 1,
    onDate: 1,
    typeOfDay: "",
    startDate: "2023-11-02",
    endDate: "2024-11-01",
  };

  return (
    <div>
      <ExpenseRulesCategory setIsOverlayVisible={setIsOverlayVisible} />
      {isOverlayVisible && (
        <>
          <Overlay setIsOverlayVisible={setIsOverlayVisible} />
          <EditExpenseRuleModal {...expenseRuleData} />
        </>
      )}
    </div>
  );
};

export default ExpenseRulesPage;
