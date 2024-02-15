import express from "express";
import { getExpenseRules } from "../controllers/expenseRuleController";

const router = express.Router();

router.get("/", getExpenseRules);

// TO DO: Add other routes: POST, PUT, DELETE

export default router;
