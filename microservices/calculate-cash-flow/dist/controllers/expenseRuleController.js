"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.internalGetExpenseRules = void 0;
const expenseRule_1 = __importDefault(require("../models/expenseRule"));
const internalGetExpenseRules = async () => {
    try {
        return await expenseRule_1.default.find();
    }
    catch (error) {
        throw error;
    }
};
exports.internalGetExpenseRules = internalGetExpenseRules;
