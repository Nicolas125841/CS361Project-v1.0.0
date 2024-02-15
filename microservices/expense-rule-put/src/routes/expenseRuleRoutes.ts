import express from "express";
import { putExpenseRules } from "../controllers/expenseRuleController";

const router = express.Router();

// NOTE: I CHANGED THIS FROM GET TO PUT
// THIS FILE PROBABLY DOESN'T NEED ANY MORE CHANGES
router.put("/", putExpenseRules);

export default router;
