"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExpenses = void 0;
const expense_1 = __importDefault(require("../models/expense"));
const getExpenses = async (req, res) => {
    try {
        const expenses = await expense_1.default.find();
        res.json(expenses);
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.getExpenses = getExpenses;
