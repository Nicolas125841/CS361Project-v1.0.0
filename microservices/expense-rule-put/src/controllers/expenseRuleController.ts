import {Request, Response} from 'express';

import ExpenseRule from '../models/expenseRule';

const putExpenseRules = async(req: Request, res: Response): Promise<void> => {
  try {
    // TODO: (READ THESE NOTES; THEN YOU'LL SEE BELOW WHERE TO EDIT CODE)
    //
    // API ROUTING IS:
    // - CLIENT FRONT END CALLS API IN SERVER.TS FILE AND SENDS A JSON
    // "EXPENSERULE"
    //    (THIS CLIENT CODE IS OUT OF SCOPE OF YOUR MICROSERVICE;
    //    I HAVEN'T YET WRITTEN IT, BUT I WILL SOON SO THAT WE CAN
    //    TEST YOUR MICROSERVICE)
    // - SERVER.TS API LINE POINTS TO ROUTES/EXPENSERULEROUTES.TS
    // - EXPENSERULEROUTES ROUTER LINE POINTS TO THIS PUTEXPENSERULES FUNCTION
    // - THIS PUTEXPENSERULES FUNCTION NEEDS TO PUT/"SAVE" THE EXPENSERULE JSON
    //    TO THE MONGODB
    //
    // ASSUME FOR YOUR API THAT THE SCENARIO IS ADDING A NEW EXPENSE RULE
    // TO THE MONGODB. I'LL LATER CONSIDER THE CASE OF EDITING AN EXISTING RULE,
    // AND SINCE WE USED PUT, I HOPE THAT IF I MAKE A MINOR MOD TO INCLUDING A
    // MONGODB INTERNAL _ID, IT CAN FIND AND CHANGE THE EXISTING ENTRY.
    // BUT DON'T WORRY ABOUT THIS "EDIT" IDEA FOR NOW.
    //
    // YOU CAN FIND THE EXPENSE RULE MONGOOSE SCHEMA WITHIN THIS MICROSERVICE
    // AT: MODELS/EXPENSERULE.TS
    //
    // HERE'S AN EXAMPLE EXPENSE RULE JSON FROM THE MONGODB:
    // {
    //   '_id': {'$oid': '65ab45473bf311450147d61b'},
    //   'name': 'Mortgage',
    //   'amount': -7667,
    //   'onDate': 2,
    //   'typeOfDay': 'Non-holiday weekday after',
    //   'freq': 'Monthly',
    //   'startDate': null,
    //   'endDate': null,
    //   'account': 'S Chk'
    // }
    //
    // THE _ID FIELD WILL BE AUTO-POPULATED BY MONGODB WHEN YOU "PUT"
    //
    // HERE'S AN EXAMPLE PUT ("SAVE") FROM THE CALCULATE-CASH-FLOW MICROSERVICE
    // AT CALCULATE-CASH-FLOW/SRC/SERVICES/CALCULATECASHFLOW.TS:
    //
    // for (const expenseData of calculatedExpensesJSON) {
    //   const expense = new Expense(expenseData);
    //   await expense.save();
    // }
    //
    // THE ABOVE EXAMPLE IS FOR PUTTING EXPENSES, NOT EXPENSE RULES,
    // SO YOU CAN PROBABLY JUST MAKE MINOR CHANGES TO MAKE IT WORK ON
    // EXPENSE RULES
    //
    // HERE'S THE START OF THE CODE I THINK YOU NEED TO EDIT,
    // FOCUSING ON CHANGING GET/"FIND" TO PUT/"SAVE" PER THE ABOVE EXAMPLE
    // "SAVE", AND CHANGING "EXPENSE" TO "EXPENSERULE"
    await new ExpenseRule.create(req.body);

    // PROBABLY THE END OF THE AREA YOU NEED TO EDIT

    res.json({ message: "Expense rule validated and saved to expense rules" });
  } catch (error) {
    res.status(500).send(error);
  }
};

export {putExpenseRules};
