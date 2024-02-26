import mongoose from "mongoose";

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
  "ExpenseRule",
  expenseRuleSchema,
  "expenseRules"
);

export default ExpenseRule;
