import React from "react";

interface IExpenseProps {
  date: string;
  name: string;
  account: string;
  amount: number;
  sChkBalance?: number;
  yChkBalance?: number;
}

const getAmountWithDollarSign = (amount: number): string => {
  const sign = amount < 0 ? "-" : "";
  return `${sign}$${Math.abs(amount)}`;
};

const formatDate = (dateString: string): string => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = new Date(dateString);
  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];

  return `${day} ${month}`;
};

const Expense: React.FC<IExpenseProps> = (props) => {
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

  const expenseName: React.CSSProperties = {
    top: 5,
    display: "block",
    textAlign: "center",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  };

  return (
    <div style={{ display: "flex", ...expenseBox }}>
      <div style={{ ...expenseText, width: 41 }}>{formatDate(props.date)}</div>
      <div style={{ width: 4 }}></div>
      <div style={{ ...expenseText, ...expenseName, width: 104 }}>
        {props.name}
      </div>
      <div style={{ width: 4 }}></div>
      <div style={{ ...expenseText, width: 33 }}>{props.account}</div>
      <div style={{ width: 4 }}></div>
      <div style={{ ...expenseText, width: 49 }}>
        {getAmountWithDollarSign(props.amount)}
      </div>
      <div style={{ width: 4 }}></div>
      <div
        style={{
          ...expenseText,
          width: 49,
          color: (props.sChkBalance ?? 0) < 0 ? "red" : "black",
        }}
      >
        ${props.sChkBalance}
      </div>
      <div style={{ width: 4 }}></div>
      <div
        style={{
          ...expenseText,
          width: 49,
          color: (props.yChkBalance ?? 0) < 0 ? "red" : "black",
        }}
      >
        ${props.yChkBalance}
      </div>
    </div>
  );
};

export default Expense;
