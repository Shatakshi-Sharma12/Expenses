import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
    {
      userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
      },
      title: {
        type: String,
        required: true,
        trim: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      category: {
        type: String,
        required: true,
        enum: [
          'Food & Dining',
          'Transportation',
          'Entertainment',
          'Shopping',
          'Bills & Utilities',
          'Others',
        ],
      },
      date: {
        type: Date,
        required: true,
      },
      notes: {
        type: String,
        trim: true,
      },
    },
    { timestamps: true }
  );

  const Expense=mongoose.model.Expense || mongoose.model('Expense',expenseSchema);

  export default Expense