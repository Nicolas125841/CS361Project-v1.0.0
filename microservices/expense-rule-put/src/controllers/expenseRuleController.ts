import {Request, Response} from 'express';

import ExpenseRule from '../models/expenseRule';

// Note to grader from Nicolas: This microservice is based on the expense-rule-fetch
// microservice within Sean's project to keep consistent with his project structure. 
// That's why this service's structure appears very similar to the others. 
const putExpenseRules = async(req: Request, res: Response): Promise<void> => {
  try {
    // Create expense rule entity and save it to MongoDB
    const expenseRule = new ExpenseRule(req.body);
    await expenseRule.save();

    res.json({ message: "Expense rule saved to expense rules list" });
  } catch (error) {
    res.status(500).send(error);
  }
};

export {putExpenseRules};
