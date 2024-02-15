import React from "react";
import NowBalanceTextField from "./NowBalanceTextField";

interface IAccountBalance {
  name: string;
  balance: number;
}

interface IAccountBalancesProps {
  nowBalances: IAccountBalance[];
  onBalancesChange: (newBalances: IAccountBalance[]) => void;
  minBalanceExpense?: IExpenseData;
}

interface IExpenseData {
  date: string;
  name: string;
  account: string;
  amount: number;
  sChkBalance?: number;
  yChkBalance?: number;
}

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

const AccountBalances: React.FC<IAccountBalancesProps> = ({
  nowBalances,
  onBalancesChange,
  minBalanceExpense,
}) => {
  const accountNames: string[] = ["S Chk", "Y Chk"];

  const balancesBox: React.CSSProperties = {
    height: 113,
    width: 377,
    backgroundColor: "#9d9d9d",
    borderRadius: 10,
    position: "relative",
    top: 8,
    left: 8,
  };

  const accountBox: React.CSSProperties = {
    height: 74,
    width: 177,
    backgroundColor: "#d9d9d9",
    borderRadius: 10,
    position: "relative",
    top: 8,
    left: 8,
    marginRight: 7,
  };

  const balancesLabelText: React.CSSProperties = {
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

  const accountText: React.CSSProperties = {
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
  };

  const accountTextBold: React.CSSProperties = {
    fontWeight: 700,
  };

  const handleInputChange = (accountName: string, newValue: number) => {
    const updatedBalances = nowBalances.map((balance) =>
      balance.name === accountName ? { ...balance, balance: newValue } : balance
    );
    onBalancesChange(updatedBalances);
  };

  return (
    <div style={balancesBox}>
      <div style={balancesLabelText}>Balances</div>
      <div style={{ display: "flex" }}>
        {accountNames.map((accountName, index) => (
          <div key={accountName}>
            <div style={accountBox}>
              <div style={{ ...accountText, ...accountTextBold }}>
                {accountName}
              </div>
              <div
                style={{
                  ...accountText,
                  position: "absolute",
                  top: 27,
                  left: 16,
                }}
              >
                Now:
              </div>
              <div
                style={{
                  ...accountText,
                  position: "absolute",
                  top: 52,
                  left: 16,
                }}
              >
                Low:
              </div>
              <div
                style={{
                  ...accountText,
                  position: "absolute",
                  top: 23,
                  left: 50,
                }}
              >
                <NowBalanceTextField
                  value={
                    nowBalances.find((balance) => balance.name === accountName)
                      ?.balance || 0
                  }
                  onChange={(newValue) =>
                    handleInputChange(accountName, newValue)
                  }
                />
              </div>
              <div
                style={{
                  ...accountText,
                  position: "absolute",
                  top: 52,
                  left: 60,
                }}
              >
                {" "}
                {minBalanceExpense ? (
                  <>
                    {formatDate(minBalanceExpense?.date ?? "")}{" "}
                    <span
                      style={{
                        color:
                          (accountName === "S Chk"
                            ? minBalanceExpense?.sChkBalance ?? 0
                            : minBalanceExpense?.yChkBalance ?? 0) < 0
                            ? "red"
                            : "black",
                      }}
                    >
                      {accountName === "S Chk"
                        ? (minBalanceExpense?.sChkBalance ?? 0) < 0
                          ? `-$${Math.abs(minBalanceExpense?.sChkBalance ?? 0)}`
                          : `$${minBalanceExpense?.sChkBalance ?? 0}`
                        : (minBalanceExpense?.yChkBalance ?? 0) < 0
                        ? `-$${Math.abs(minBalanceExpense?.yChkBalance ?? 0)}`
                        : `$${minBalanceExpense?.yChkBalance ?? 0}`}
                    </span>
                  </>
                ) : null}
              </div>
            </div>
            {index !== accountNames.length - 1 && (
              <div style={{ width: 7 }}></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountBalances;
