"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const expenseSchema = new mongoose_1.default.Schema({
    date: { type: String, required: true },
    name: { type: String, required: true },
    account: { type: String, required: true },
    amount: { type: Number, required: true },
});
const Expense = mongoose_1.default.model("Expense", expenseSchema, "expenses");
exports.default = Expense;
