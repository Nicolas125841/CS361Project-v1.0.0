"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const expenseRuleSchema = new mongoose_1.default.Schema({
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
const ExpenseRule = mongoose_1.default.model("ExpenseRule", expenseRuleSchema, "expenseRules");
exports.default = ExpenseRule;
