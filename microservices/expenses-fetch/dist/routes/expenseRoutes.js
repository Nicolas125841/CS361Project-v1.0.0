"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const expenseController_1 = require("../controllers/expenseController");
const router = express_1.default.Router();
router.get("/", expenseController_1.getExpenses);
// Add other routes: POST, PUT, DELETE
exports.default = router;
