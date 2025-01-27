import express from "express";
import { addExpense, getExpenses } from "../controllers/expenseController.js";

const expenseRouter=express.Router();

expenseRouter.post('/addExpense/:userId',addExpense);
expenseRouter.get('/getExpense',getExpenses);


export default expenseRouter;