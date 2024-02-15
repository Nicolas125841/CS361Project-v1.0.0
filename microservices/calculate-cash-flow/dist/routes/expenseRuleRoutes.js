"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const expenseRuleController_1 = require("../controllers/expenseRuleController");
const expenseController_1 = require("../controllers/expenseController");
const calculateCashFlow_1 = require("../services/calculateCashFlow");
const expense_1 = __importDefault(require("../models/expense"));
const router = express_1.default.Router();
router.get("/", async (req, res) => {
    try {
        const expenseRules = await (0, expenseRuleController_1.internalGetExpenseRules)();
        const calculatedExpensesJSON = (0, calculateCashFlow_1.calculateCashFlow)(expenseRules);
        // Clear all existing expenses so that they aren't mixed in with fresh cash flow expenses
        await (0, expenseController_1.internalClearExpenses)();
        // PUT each newly calculated expense into the database "expenses" collection
        for (const expenseData of calculatedExpensesJSON) {
            const expense = new expense_1.default(expenseData);
            await expense.save();
        }
        res.json({ message: "Cash flow calculated and data saved to expenses" });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send("Error calculating cash flow: " + error.message);
        }
        else {
            res.status(500).send("An unknown error occurred.");
        }
    }
});
exports.default = router;
