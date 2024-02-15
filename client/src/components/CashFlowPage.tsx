import React, { useState } from "react";
import AccountBalances from "./AccountBalances";
import Expenses from "./Expenses";
import "../App.css";

interface IAccountBalance {
  name: string;
  balance: number;
}

interface IExpenseData {
  date: string;
  name: string;
  account: string;
  amount: number;
  sChkBalance?: number;
  yChkBalance?: number;
}

const CashFlowPage: React.FC = () => {
  const accountNames: string[] = ["S Chk", "Y Chk"];

  const initialBalances = accountNames.map((name) => ({
    name: name,
    balance: 0,
  }));

  const [nowBalances, setBalances] =
    useState<IAccountBalance[]>(initialBalances);
  const [minBalanceExpense, setMinBalanceExpense] = useState<
    IExpenseData | undefined
  >(undefined);

  const handleBalancesChange = (newBalances: IAccountBalance[]) => {
    setBalances(newBalances);
  };

  const handleMinBalanceChange = (expense: IExpenseData) => {
    setMinBalanceExpense(expense);
  };

  return (
    <div>
      <div>
        <AccountBalances
          nowBalances={nowBalances}
          onBalancesChange={handleBalancesChange}
          minBalanceExpense={minBalanceExpense}
        />
      </div>
      <div style={{ height: 8 }}></div>
      <div>
        <Expenses
          nowBalances={nowBalances}
          onMinBalanceChange={handleMinBalanceChange}
        />
      </div>
    </div>
  );
};

export default CashFlowPage;
