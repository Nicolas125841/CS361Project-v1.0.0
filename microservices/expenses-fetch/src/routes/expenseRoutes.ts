import express from "express";
import { getExpenses } from "../controllers/expenseController";

const router = express.Router();

router.get("/", getExpenses);

// TO DO: Add other routes: POST, PUT, DELETE

export default router;
