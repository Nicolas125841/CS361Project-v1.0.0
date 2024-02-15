import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import expenseRuleRoutes from "./routes/expenseRuleRoutes";

/* 
To preview web app:
- Split terminal
- Client Terminal:
  - "cd client"
  - "npm run build"
  - "npm run start"
- Server Terminals:
  - "cd microservice/[name]"
  - "npm run build"
  - "npm run start"
  - Should see "Connected to MongoDB..."
- Safari to http://localhost:3000 or http://192.168.1.56:3000
*/

// NOTE: THIS FILE PROBABLY DOESN'T REQUIRE ANY MORE CHANGES

const app = express();
const PORT = process.env.PORT || 5004;
// NOTE: I ALREADY DECONFLICTED THIS PORT NUMBER FROM THE OTHER MICROSERVICES; RECOMMEND NOT CHANGING

const mongoUri =
  process.env.MONGO_URI || "mongodb://localhost:27017/finanticizer";

mongoose
  .connect(mongoUri)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB: ", err));

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
// NOTE: I CHANGED THIS FROM "/API/EXPENSERULES TO /API/PUTEXPENSERULE"
app.use("/api/putExpenseRule", expenseRuleRoutes);

// Start the server
app.listen(PORT, () => {
  // NOTE: I ADDED "PUT" TO THIS MESSAGE 
  // TO DIFFERENTIATE IT FROM THE OTHER EXPENSE RULE (FETCH) MICROSERVICE
  console.log(`Put Expense Rule microservice is running on port ${PORT}`);
});

export default app;
