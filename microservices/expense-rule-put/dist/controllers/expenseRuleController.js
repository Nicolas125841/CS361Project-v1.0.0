"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExpenseRules = void 0;
const expenseRule_1 = __importDefault(require("../models/expenseRule"));
const getExpenseRules = async (req, res) => {
    try {
        const expenseRules = await expenseRule_1.default.find();
        res.json(expenseRules);
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.getExpenseRules = getExpenseRules;
