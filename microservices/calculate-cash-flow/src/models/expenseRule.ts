import mongoose from "mongoose";

export interface IExpenseRule {
  name: string;
  account: string;
  amount: number;
  freq: string;
  onDate?: number;
  typeOfDay?: string;
  every?: number;
  startDate?: string;
  endDate?: string;
}

const expenseRuleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  account: { type: String, required: true },
  amount: { type: Number, required: true },
  freq: { type: String, required: true },
  onDate: Number,
  typeOfDay: String,
  every: Number,
  startDate: String,
  endDate: String,
});

const ExpenseRule = mongoose.model(
  "ExpenseRules",
  expenseRuleSchema,
  "expenseRules"
);

export default ExpenseRule;
