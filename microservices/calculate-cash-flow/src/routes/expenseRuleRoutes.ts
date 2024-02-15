import express, { Request, Response } from "express";
import { internalGetExpenseRules } from "../controllers/expenseRuleController";
import { internalClearExpenses } from "../controllers/expenseController";
import { calculateCashFlow } from "../services/calculateCashFlow";
import Expense from "../models/expense";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const expenseRules = await internalGetExpenseRules();
    const calculatedExpensesJSON = calculateCashFlow(expenseRules);

    // Clear all existing expenses so that they aren't mixed in with fresh cash flow expenses
    await internalClearExpenses();

    // PUT each newly calculated expense into the database "expenses" collection
    for (const expenseData of calculatedExpensesJSON) {
      const expense = new Expense(expenseData);
      await expense.save();
    }

    res.json({ message: "Cash flow calculated and data saved to expenses" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send("Error calculating cash flow: " + error.message);
    } else {
      res.status(500).send("An unknown error occurred.");
    }
  }
});

export default router;
