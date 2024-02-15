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

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
const mongoUri =
  process.env.MONGO_URI || "mongodb://localhost:27017/finanticizer";
mongoose
  .connect(mongoUri)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// Expense rules routes
app.use("/api/calculateCashFlow", expenseRuleRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Calculate Cash Flow microservice running on port ${PORT}`);
});

export default app;
