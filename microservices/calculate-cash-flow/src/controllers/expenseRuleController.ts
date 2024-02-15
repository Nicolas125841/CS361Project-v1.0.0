import ExpenseRule, { IExpenseRule } from "../models/expenseRule";

const internalGetExpenseRules = async (): Promise<IExpenseRule[]> => {
  try {
    return await ExpenseRule.find();
  } catch (error) {
    throw error;
  }
};

export { internalGetExpenseRules };
