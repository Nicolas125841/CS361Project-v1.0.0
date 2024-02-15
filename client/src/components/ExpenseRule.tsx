import React from "react";

interface ExpenseRuleProps {
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

const getAmountWithDollarSign = (amount: number): string => {
  const sign = amount < 0 ? "-" : "";
  return `${sign}$${Math.abs(amount)}`;
};

const getFreqAbbreviation = (freq: string): string => {
  const abbreviations: { [key: string]: string } = {
    Weekly: "Week",
    Monthly: "Month",
    Yearly: "Year",
    Once: "Once",
  };
  return abbreviations[freq] || freq;
};

const getOrdinalNumber = (n: number): string => {
  let suffix = "th";

  if (n % 100 < 11 || n % 100 > 13) {
    switch (n % 10) {
      case 1:
        suffix = "st";
        break;
      case 2:
        suffix = "nd";
        break;
      case 3:
        suffix = "rd";
        break;
    }
  }

  return n + suffix;
};

const formatOnDate = (onDate: number): string => {
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
  const day = onDate % 100;
  const month = months[Math.floor(onDate / 100) - 1];
  return `${day} ${month}`;
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  if (date.getFullYear() < 1970) {
    return "-";
  }
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
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

const ExpenseRule: React.FC<ExpenseRuleProps> = (props) => {
  const expenseRuleBox: React.CSSProperties = {
    height: 119,
    width: 361,
    backgroundColor: "#d9d9d9",
    borderRadius: 10,
    position: "relative",
    top: 8,
    left: 8,
  };

  const expenseRuleText: React.CSSProperties = {
    height: 23,
    position: "relative",
    top: 4,
    left: 8,
    color: "#000000",
    fontFamily: "Inter-Bold, Helvetica",
    fontSize: 16,
    letterSpacing: "-0.5px",
    display: "block",
    alignItems: "center",
    justifyContent: "left",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  };

  const expenseRuleTextBold: React.CSSProperties = {
    fontWeight: 700,
  };

  const editIcon: React.CSSProperties = {
    height: 20.31,
    width: 17.25,
    position: "relative",
    top: 5,
    left: 19,
  };

  const row1top = 28;
  const row2top = 51;
  const row3top = 74;
  const row4top = 97;
  const col1left = 18;
  const col2left = 84;
  const col3left = 194;
  const col4left = 236;

  return (
    <div style={expenseRuleBox}>
      <div style={{ display: "flex" }}>
        <div
          style={{
            ...expenseRuleText,
            ...expenseRuleTextBold,
            width: 52,
          }}
        >
          Name:
        </div>
        <div
          style={{
            ...expenseRuleText,
            ...expenseRuleTextBold,
            width: 267,
          }}
        >
          {props.name}
        </div>
        <div>
          <img style={editIcon} alt="Edit icon" src="./images/edit-icon.png" />
        </div>
      </div>
      <div
        style={{
          ...expenseRuleText,
          position: "absolute",
          top: row1top,
          left: col1left,
        }}
      >
        Account:
      </div>
      <div
        style={{
          ...expenseRuleText,
          position: "absolute",
          top: row2top,
          left: col1left,
        }}
      >
        Amount:
      </div>
      <div
        style={{
          ...expenseRuleText,
          position: "absolute",
          top: row3top,
          left: col1left,
        }}
      >
        Every:
      </div>
      <div
        style={{
          ...expenseRuleText,
          position: "absolute",
          top: row4top,
          left: col1left,
        }}
      >
        On:
      </div>
      <div
        style={{
          ...expenseRuleText,
          position: "absolute",
          top: row1top,
          left: col2left,
        }}
      >
        {props.account}
      </div>
      <div
        style={{
          ...expenseRuleText,
          position: "absolute",
          top: row2top,
          left: col2left,
        }}
      >
        {getAmountWithDollarSign(props.amount)}
      </div>
      <div
        style={{
          ...expenseRuleText,
          position: "absolute",
          top: row3top,
          left: col2left,
        }}
      >
        {props.every && props.every > 1 ? props.every : ""}{" "}
        {props.every && props.every > 1
          ? getFreqAbbreviation(props.freq).toLowerCase()
          : getFreqAbbreviation(props.freq)}
        {props.every && props.every > 1 ? "s" : ""}
      </div>
      <div
        style={{
          ...expenseRuleText,
          position: "absolute",
          top: row4top,
          left: col2left,
        }}
      >
        {props.onDate
          ? props.onDate <= 100
            ? getOrdinalNumber(props.onDate)
            : formatOnDate(props.onDate)
          : "-"}
        {props.typeOfDay ? " (" + props.typeOfDay.toLowerCase() + ")" : ""}
      </div>
      <div
        style={{
          ...expenseRuleText,
          position: "absolute",
          top: row1top,
          left: col3left,
        }}
      >
        Start:
      </div>
      <div
        style={{
          ...expenseRuleText,
          position: "absolute",
          top: row2top,
          left: col3left,
        }}
      >
        End:
      </div>
      <div
        style={{
          ...expenseRuleText,
          position: "absolute",
          top: row1top,
          left: col4left,
        }}
      >
        {props.startDate ? formatDate(props.startDate) : "-"}
      </div>
      <div
        style={{
          ...expenseRuleText,
          position: "absolute",
          top: row2top,
          left: col4left,
        }}
      >
        {props.endDate ? formatDate(props.endDate) : "-"}
      </div>
    </div>
  );
};

export default ExpenseRule;
