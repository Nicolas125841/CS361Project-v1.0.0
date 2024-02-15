import React, { useState, useEffect } from "react";
import Expense from "./Expense";

interface IExpenseData {
  date: string;
  name: string;
  account: string;
  amount: number;
  sChkBalance?: number;
  yChkBalance?: number;
}

interface IAccountBalance {
  name: string;
  balance: number;
}

interface IExpensesProps {
  nowBalances: IAccountBalance[];
  onMinBalanceChange: (expense: IExpenseData) => void;
}

const Expenses: React.FC<IExpensesProps> = ({
  nowBalances,
  onMinBalanceChange,
}) => {
  const [expenses, setExpenses] = useState<IExpenseData[]>([]);

  const calculatedHeight = Math.max(87, 54 + 33 * expenses.length);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        // Trigger calculate-cash-flow microservice
        //localhost:5003 for local machine, expenses-fetch:5003 for Docker
        const calculateCashFlowResponse = await fetch(
          "http://192.168.1.56:5001/api/calculateCashFlow"
        );
        //const response = await fetch("http://localhost:5003/api/calculateCashFlow");
        if (!calculateCashFlowResponse.ok) {
          throw new Error(
            `HTTP error. Status: ${calculateCashFlowResponse.status}`
          );
        }

        //localhost:5003 for local machine, expenses-fetch:5003 for Docker
        const response = await fetch("http://192.168.1.56:5003/api/expenses");
        //const response = await fetch("http://localhost:5003/api/expenses");
        if (!response.ok) {
          throw new Error(`HTTP error. Status: ${response.status}`);
        }
        const data = await response.json();
        setExpenses(data);
        calculateRollingBalances(data, nowBalances);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchExpenses();
  }, []);

  const calculateRollingBalances = (
    expenses: IExpenseData[],
    nowBalances: IAccountBalance[]
  ) => {
    let sChkBalance = nowBalances.find((b) => b.name === "S Chk")?.balance || 0;
    let yChkBalance = nowBalances.find((b) => b.name === "Y Chk")?.balance || 0;
    let minBalance = sChkBalance + yChkBalance;
    let minIndex = 0;

    const updatedExpenses = expenses.map((expense, index) => {
      if (expense.account === "S Chk") {
        sChkBalance += expense.amount;
      } else {
        yChkBalance += expense.amount;
      }
      expense.sChkBalance = sChkBalance;
      expense.yChkBalance = yChkBalance;

      if (sChkBalance + yChkBalance < minBalance) {
        minBalance = sChkBalance + yChkBalance;
        minIndex = index;
      }

      return { ...expense };
    });

    setExpenses(updatedExpenses);
    if (onMinBalanceChange) {
      onMinBalanceChange(expenses[minIndex]);
    }
  };

  useEffect(() => {
    if (expenses.length > 0) {
      calculateRollingBalances(expenses, nowBalances);
    }
  }, [nowBalances, expenses]);

  const expensesBox: React.CSSProperties = {
    height: calculatedHeight,
    width: 377,
    backgroundColor: "#9d9d9d",
    borderRadius: 10,
    position: "relative",
    top: 8,
    left: 8,
  };

  const expensesLabelText: React.CSSProperties = {
    height: 23,
    width: 84,
    position: "relative",
    top: 3,
    left: 8,
    color: "#000000",
    fontFamily: "Inter-Bold, Helvetica",
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: "-0.5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "left",
  };

  const expensesHeaderText: React.CSSProperties = {
    height: 23,
    position: "relative",
    top: 4,
    left: 8,
    color: "#000000",
    fontFamily: "Inter-Bold, Helvetica",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "-0.5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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

  return (
    <div style={expensesBox}>
      <div style={expensesLabelText}>Expenses</div>
      <div style={{ display: "flex" }}>
        <div style={{ width: 8 }}></div>
        <div style={{ ...expensesHeaderText, width: 41 }}>Date</div>
        <div style={{ width: 4 }}></div>
        <div style={{ ...expensesHeaderText, width: 104 }}>Name</div>
        <div style={{ width: 4 }}></div>
        <div style={{ ...expensesHeaderText, width: 33 }}>Acct</div>
        <div style={{ width: 4 }}></div>
        <div style={{ ...expensesHeaderText, width: 49 }}>Amount</div>
        <div style={{ width: 4 }}></div>
        <div style={{ ...expensesHeaderText, width: 49 }}>S Chk</div>
        <div style={{ width: 4 }}></div>
        <div style={{ ...expensesHeaderText, width: 49 }}>Y Chk</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {expenses.length > 0 ? (
          expenses.map((expense, index) => <Expense key={index} {...expense} />)
        ) : (
          <div
            style={{ display: "flex", ...expenseBox, ...expenseText, top: 9 }}
          >
            No expenses found. Check that microservice is running.
          </div>
        )}
        <div style={{ height: 16 }}></div>
      </div>
    </div>
  );
};

export default Expenses;
