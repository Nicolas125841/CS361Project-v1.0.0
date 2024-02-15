import { IExpenseRule } from "../models/expenseRule";
import { IExpense } from "../models/expense";

const holidays: string[] = [
  "2023-01-01",
  "2023-01-16",
  "2023-02-20",
  "2023-05-29",
  "2023-07-04",
  "2023-09-04",
  "2023-10-09",
  "2023-11-10",
  "2023-11-23",
  "2023-12-25",
  "2024-01-01",
  "2024-01-15",
  "2024-02-19",
  "2024-05-27",
  "2024-06-19",
  "2024-07-04",
  "2024-09-02",
  "2024-10-14",
  "2024-11-11",
  "2024-11-28",
  "2024-12-25",
  "2025-01-01",
  "2025-01-20",
  "2025-02-17",
  "2025-05-26",
  "2025-06-19",
  "2025-07-04",
  "2025-09-01",
  "2025-10-13",
  "2025-11-11",
  "2025-11-27",
  "2025-12-25",
  "2026-01-01",
  "2026-01-19",
  "2026-02-16",
  "2026-05-25",
  "2026-06-19",
  "2026-07-03",
  "2026-09-07",
  "2026-10-12",
  "2026-11-11",
  "2026-11-26",
  "2026-12-25",
  "2027-01-01",
  "2027-01-18",
  "2027-02-15",
  "2027-05-31",
  "2027-06-18",
  "2027-07-05",
  "2027-09-06",
  "2027-10-11",
  "2027-11-11",
  "2027-11-25",
  "2027-12-24",
  "2028-01-01",
  "2028-01-17",
  "2028-02-21",
  "2028-05-29",
  "2028-06-17",
  "2028-07-04",
  "2028-09-04",
  "2028-10-09",
  "2028-11-10",
  "2028-11-23",
  "2028-12-25",
  "2029-01-01",
  "2029-01-15",
  "2029-02-19",
  "2029-05-28",
  "2029-06-19",
  "2029-07-04",
  "2029-09-03",
  "2029-10-08",
  "2029-11-11",
  "2029-11-22",
  "2029-12-25",
];

function dateMod(date: Date, typeOfDay: string): Date {
  let newDate: Date = date;

  let dayInc = 0;
  if (typeOfDay == "Non-holiday weekday before") dayInc = -1;
  else if (typeOfDay == "Non-holiday weekday after") dayInc = 1;

  if (dayInc != 0) {
    while (true) {
      // Determine whether date is on a holiday
      let onHoliday: Boolean = false;
      for (const holiday of holidays) {
        if (customDateString(newDate) == holiday) {
          onHoliday = true;
          break;
        }
      }

      // Move date earlier or later until not on a weekend or holiday
      if (onHoliday || newDate.getUTCDay() == 0 || newDate.getUTCDay() == 6) {
        newDate = dateAdd(newDate, "Daily", dayInc);
      } else {
        break;
      }
    }
  }

  return newDate;
}

function customDateString(date: Date): string {
  const year: string = String(date.getUTCFullYear());
  const month: string = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day: string = String(date.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function dateAdd(date: Date, freq: string, every: number): Date {
  let nextDate: Date = new Date(date);

  switch (freq) {
    case "Daily":
      nextDate.setUTCDate(nextDate.getUTCDate() + every);
      break;
    case "Weekly":
      nextDate.setUTCDate(nextDate.getUTCDate() + every * 7);
      break;
    case "Monthly":
      nextDate.setUTCMonth(nextDate.getUTCMonth() + every);
      break;
    case "Yearly":
      nextDate.setUTCFullYear(nextDate.getUTCFullYear() + every);
      break;
    default:
      throw new Error("Invalid interval");
  }

  return nextDate;
}

const calculateCashFlow = (expenseRules: IExpenseRule[]): any => {
  let cashFlowExpenses = [];
  const today: Date = new Date();

  // Save credit card and tax return customized values
  /*
  TO DO:
  - GET EXPENSES, SORTED BY DATE
  - FIND FIRST USAACC AND SAVE AMOUNT/DATE TO A VARIABLE
  - FIND FIRST AMAZONCC AND SAVE AMOUNT/DATE TO A VARIABLE
  - FIND FIRST TAXRETURN AND SAVE AMOUNT/DATE TO A VARIABLE
  let usaaCCAmount: number = 0;
  let amazonCCAmount: number = 0;
  let taxReturnAmount: number = 0;
  let usaaCCDate: string = "";
  let amazonCCDate: string = "";
  let taxReturnDate: string = "";
  for (const expense of expenses) {
    if (expense.name == "USAA CC" && usaaCCAmount == 0) {
      usaaCCAmount = expense.amount;
      usaaCCDate = expense.date;
    }
    if (expense.name == "Amazon CC" && amazonCCAmount == 0) {
      amazonCCAmount = expense.amount;
      amazonCCDate = expense.date;
    }
    if (expense.name == "Tax Return" && taxReturnAmount == 0) {
      taxReturnAmount = expense.amount;
      taxReturnDate = expense.date;
    }
  }
  */

  const relevantStartDate: Date = new Date();
  relevantStartDate.setUTCDate(today.getUTCDate() - 4);

  const relevantEndDate: Date = new Date();
  relevantEndDate.setUTCDate(today.getUTCDate() + 184);

  for (let rule of expenseRules) {
    if (!rule.startDate) rule.startDate = customDateString(relevantStartDate);
    if (!rule.endDate) rule.endDate = customDateString(relevantEndDate);

    if (new Date(`${rule.startDate}T00:00`) >= relevantEndDate) {
      continue;
    } else if (new Date(`${rule.endDate}T00:00`) <= relevantStartDate) {
      continue;
    }

    if (!rule.every) rule.every = 1;

    if (!rule.typeOfDay) rule.typeOfDay = "";

    // Set start date based on "onDate" if there is one
    let expenseDate: Date = new Date();
    if (rule.freq == "Yearly" && rule.onDate && rule.onDate > 99) {
      const year: number = relevantStartDate.getFullYear();

      // Typescript uses months 0-11, while database is 1-12
      const ruleOnMonth: number = Math.floor(rule.onDate / 100) - 1;
      const ruleOnDay: number = rule.onDate % 100;
      
      // Days past end of month will automatically roll to proper date next month
      expenseDate = new Date(Date.UTC(year, ruleOnMonth, ruleOnDay, 0, 0, 0));

      // Skip rule if onDate day is past the end of the month
      if (expenseDate.getUTCMonth() != ruleOnMonth) {
        // Allow 29 Feb (month 1) to roll over to 1 Mar for non-leap years
        if (ruleOnMonth != 1 || ruleOnDay != 29) {
          continue;
        }
      }
    } else if (rule.freq == "Monthly" && rule.onDate) {
      // Determine last day of starting month
      const year: number = new Date(`${rule.startDate}T00:00`).getUTCFullYear();
      const month: number = new Date(`${rule.startDate}T00:00`).getUTCMonth();

      // 0th day of next month is last day of this month
      const lastDayOfMonth: number = new Date(
        Date.UTC(year, month + 1, 0, 0, 0, 0)
      ).getUTCDate();

      let effectiveDay: number = lastDayOfMonth;
      if (effectiveDay > rule.onDate) effectiveDay = rule.onDate;

      expenseDate = new Date(Date.UTC(year, month, effectiveDay, 0, 0, 0));
    } else {
      expenseDate = new Date(`${rule.startDate}T00:00`);
    }

    // Adjust date if desired to be on non-holiday weekday before/after
    expenseDate = dateMod(expenseDate, rule.typeOfDay);

    // Create expenses
    while (
      expenseDate <= relevantEndDate &&
      expenseDate <= new Date(`${rule.endDate}T00:00`)
    ) {
      if (
        expenseDate >= new Date(`${rule.startDate}T00:00`) &&
        expenseDate >= relevantStartDate
      ) {
        let expense: IExpense = {
          date: customDateString(expenseDate),
          name: rule.name,
          account: rule.account,
          amount: rule.amount,
        };

        // TO DO: Check if expense is the saved USAA CC, Amazon CC, or Tax Return amount by looking at the date;
        //        if so, restore that saved amount as the amount

        cashFlowExpenses.push(expense);
      }

      if (rule.freq == "Once") break;

      // Advance to next expense date
      expenseDate = dateAdd(expenseDate, rule.freq, rule.every);

      // Adjust monthly expense date to match desired day
      if (
        rule.freq == "Monthly" &&
        rule.onDate &&
        expenseDate.getUTCDate() != rule.onDate
      ) {
        // Determine last day of starting month
        const year: number = expenseDate.getUTCFullYear();
        const month: number = expenseDate.getUTCMonth();

        // 0th day of next month is last day of this month
        const lastDayOfMonth: number = new Date(
          Date.UTC(year, month + 1, 0, 0, 0, 0)
        ).getUTCDate();

        let effectiveDay: number = lastDayOfMonth;
        if (effectiveDay > rule.onDate) effectiveDay = rule.onDate;

        expenseDate = new Date(Date.UTC(year, month, effectiveDay, 0, 0, 0));
      }

      // Adjust as required for weekends/holidays
      expenseDate = dateMod(expenseDate, rule.typeOfDay);
    }
  }

  cashFlowExpenses = cashFlowExpenses.sort((a, b) => {
    return a.date.localeCompare(b.date);
  });

  return cashFlowExpenses;
};

export { calculateCashFlow };
