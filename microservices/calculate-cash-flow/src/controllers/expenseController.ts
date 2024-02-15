import Expense, { IExpense } from "../models/expense";

const internalGetExpenses = async (): Promise<IExpense[]> => {
  try {
    return await Expense.find();
  } catch (error) {
    throw error;
  }
};

const internalClearExpenses = async (): Promise<void> => {
  try {
    await Expense.deleteMany({});
  } catch (error) {
    throw error;
  }
};

export { internalGetExpenses, internalClearExpenses };
