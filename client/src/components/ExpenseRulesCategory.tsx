import React, { useState, useEffect } from "react";
import ExpenseRule from "./ExpenseRule";

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

interface IExpenseRulesCategory {
  setIsOverlayVisible: (isVisible: boolean) => void;
}

const ExpenseRulesCategory: React.FC<IExpenseRulesCategory> = ({
  setIsOverlayVisible,
}) => {
  const [expenseRules, setExpenseRules] = useState<ExpenseRuleData[]>([]);

  const calculatedHeight = Math.max(64, 31 + 127 * expenseRules.length);

  const categoryBox: React.CSSProperties = {
    height: calculatedHeight,
    width: 377,
    backgroundColor: "#9d9d9d",
    borderRadius: 10,
    position: "relative",
    top: 8,
    left: 8,
  };

  const chevronBox: React.CSSProperties = {
    height: 15,
    width: 15,
    position: "relative",
    top: 2,
    left: 8,
  };

  const chevronDownIcon: React.CSSProperties = {
    height: 8,
    width: 15,
    position: "relative",
    top: 4,
    left: 0,
  };

  /*const chevronRightIcon: React.CSSProperties = {
    height: 15,
    width: 8,
    position: "relative",
    top: 5,
    left: 4,
  };*/

  const categoryLabelText: React.CSSProperties = {
    height: 23,
    width: 84,
    position: "relative",
    top: 3,
    left: 14,
    color: "#000000",
    fontFamily: "Inter-Bold, Helvetica",
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: "-0.5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "left",
  };

  const categoryName: React.CSSProperties = {
    width: 232,
    left: 16,
  };

  const addIcon: React.CSSProperties = {
    height: 14,
    width: 14,
    position: "relative",
    top: 9,
    left: 0,
  };

  const editIcon: React.CSSProperties = {
    height: 20.31,
    width: 17.25,
    position: "relative",
    top: 5,
    left: 8,
  };

  const expenseBox: React.CSSProperties = {
    height: 25,
    width: 361,
    backgroundColor: "#d9d9d9",
    borderRadius: 10,
    position: "relative",
    top: 8,
    left: 8,
  };

  const expenseText: React.CSSProperties = {
    height: 23,
    position: "relative",
    top: 1,
    left: 8,
    color: "#000000",
    fontFamily: "Inter-Bold, Helvetica",
    fontSize: 12,
    letterSpacing: "-0.5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  useEffect(() => {
    const fetchExpenseRules = async () => {
      try {
        const response = await fetch(
          //localhost:5002 for local machine, expense-rules-fetch:5002 for Docker
          "http://192.168.1.56:5002/api/expenseRules"
          //"http://localhost:5002/api/expenseRules"
        );
        if (!response.ok) {
          throw new Error(`HTTP error. Status: ${response.status}`);
        }
        const data = await response.json();
        setExpenseRules(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchExpenseRules();
  }, []);
  return (
    <div style={categoryBox}>
      <div style={{ display: "flex" }}>
        <div style={chevronBox}>
          <img
            style={chevronDownIcon}
            alt="Chevron down icon"
            src="./images/chevron-down-icon.png"
          />
        </div>
        <div style={categoryLabelText}>Category:</div>
        <div style={{ ...categoryLabelText, ...categoryName }}>
          Uncategorized
        </div>
        <div>
          <img
            style={addIcon}
            alt="Add icon"
            src="./images/add-icon.png"
            onClick={() => setIsOverlayVisible(true)}
          />
        </div>
        <div>
          <img style={editIcon} alt="Edit icon" src="./images/edit-icon.png" />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {expenseRules.length > 0 ? (
          expenseRules.map((rule, index) => (
            <ExpenseRule key={index} {...rule} />
          ))
        ) : (
          <div style={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                ...expenseBox,
                ...expenseText,
                top: 9,
              }}
            >
              No expense rules found. Check that microservice is running.
            </div>
          </div>
        )}
        <div style={{ height: 16 }}></div>
      </div>
    </div>
  );
};

export default ExpenseRulesCategory;
