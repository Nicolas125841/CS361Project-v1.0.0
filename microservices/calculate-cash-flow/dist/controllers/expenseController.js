"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.internalClearExpenses = exports.internalGetExpenses = void 0;
const expense_1 = __importDefault(require("../models/expense"));
const internalGetExpenses = async () => {
    try {
        return await expense_1.default.find();
    }
    catch (error) {
        throw error;
    }
};
exports.internalGetExpenses = internalGetExpenses;
const internalClearExpenses = async () => {
    try {
        await expense_1.default.deleteMany({});
    }
    catch (error) {
        throw error;
    }
};
exports.internalClearExpenses = internalClearExpenses;
