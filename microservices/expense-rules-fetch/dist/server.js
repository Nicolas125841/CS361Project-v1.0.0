"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const expenseRuleRoutes_1 = __importDefault(require("./routes/expenseRuleRoutes"));
/*
To preview web app:
- Split terminal
- Client Terminal:
  - "cd client"
  - "npm run build"
  - "npm run start"
- Server Terminal:
  - "cd microservice/[name]"
  - "npm run build"
  - "npm run start"
  - Should see "Connected to MongoDB..."
- Safari to http://localhost:3000 or http://192.168.1.57:3000
*/
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5002;
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/finanticizer";
mongoose_1.default
    .connect(mongoUri)
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.error("Could not connect to MongoDB: ", err));
// Middlewares
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Routes
app.use("/api/expenseRules", expenseRuleRoutes_1.default);
// Start the server
app.listen(PORT, () => {
    console.log(`Expense Rule microservice is running on port ${PORT}`);
});
exports.default = app;
