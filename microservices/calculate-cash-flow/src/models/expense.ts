import mongoose from "mongoose";

export interface IExpense {
  date: string;
  name: string;
  account: string;
  amount: number;
}

const expenseSchema = new mongoose.Schema({
  date: { type: String, required: true },
  name: { type: String, required: true },
  account: { type: String, required: true },
  amount: { type: Number, required: true },
});

const Expense = mongoose.model("Expense", expenseSchema, "expenses");

export default Expense;
