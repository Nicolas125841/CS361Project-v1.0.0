import express from "express";
import { putExpenseRules } from "../controllers/expenseRuleController";

const router = express.Router();

router.put("/", putExpenseRules);

export default router;
