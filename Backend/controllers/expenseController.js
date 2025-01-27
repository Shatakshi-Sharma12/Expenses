import Expense from "../models/Expense.js";

export const addExpense = async (req, res) => {
  try {
    const { userId } = req.params;
    const { title, amount, category, date, notes } = req.body;
    const newExpense = new Expense({
      userId,
      title,
      amount,
      category,
      date,
      notes,
    });
    const savedExpense = await newExpense.save();
    return res.status(201).json({
      success: true,
      data: savedExpense,
    });
  } catch (error) {
    console.error('Error adding expense:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add expense',
      error: error.message,
    });
  }
};
  
  export const getExpenses = async (req, res) => {
    try {
      const expenses = await Expense.find().sort({ date: -1 });
      return res.status(200).json({
        success: true,
        data: expenses,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch expenses',
        error: error.message,
      });
    }
  };