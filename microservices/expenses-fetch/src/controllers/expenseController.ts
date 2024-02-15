import { Request, Response } from "express";
import Expense from "../models/expense";

const getExpenses = async (req: Request, res: Response): Promise<void> => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).send(error);
  }
};

// TO DO: Add expenseRule create, update, delete

export { getExpenses };
