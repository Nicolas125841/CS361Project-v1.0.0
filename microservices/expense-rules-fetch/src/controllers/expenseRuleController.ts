import { Request, Response } from "express";
import ExpenseRule from "../models/expenseRule";

const getExpenseRules = async (req: Request, res: Response): Promise<void> => {
  try {
    const expenseRules = await ExpenseRule.find();
    res.json(expenseRules);
  } catch (error) {
    res.status(500).send(error);
  }
};

// TO DO: Add expenseRule create, update, delete

export { getExpenseRules };
