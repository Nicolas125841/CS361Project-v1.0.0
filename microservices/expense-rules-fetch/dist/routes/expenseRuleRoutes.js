"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const expenseRuleController_1 = require("../controllers/expenseRuleController");
const router = express_1.default.Router();
router.get("/", expenseRuleController_1.getExpenseRules);
// Add other routes: POST, PUT, DELETE
exports.default = router;
