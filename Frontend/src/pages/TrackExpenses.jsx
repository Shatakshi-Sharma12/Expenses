import { motion } from 'framer-motion';
import { useState } from 'react';

function TrackExpenses() {
  const [filter, setFilter] = useState({
    category: '',
    dateRange: 'month',
    sortBy: 'date',
  });

  // Mock data - replace with real data later
  const expenses = [
    { id: 1, title: 'Groceries', amount: 120.50, date: '2024-03-10', category: 'Food & Dining' },
    { id: 2, title: 'Netflix', amount: 15.99, date: '2024-03-09', category: 'Entertainment' },
    { id: 3, title: 'Gas', amount: 45.00, date: '2024-03-08', category: 'Transportation' },
    { id: 4, title: 'Internet', amount: 79.99, date: '2024-03-07', category: 'Bills & Utilities' },
    { id: 5, title: 'Shopping', amount: 250.00, date: '2024-03-06', category: 'Shopping' },
  ];

  const categories = [
    'All',
    'Food & Dining',
    'Transportation',
    'Entertainment',
    'Shopping',
    'Bills & Utilities',
    'Others',
  ];

  const dateRanges = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' },
  ];

  const sortOptions = [
    { value: 'date', label: 'Date' },
    { value: 'amount', label: 'Amount' },
    { value: 'category', label: 'Category' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-dark">Track Expenses</h1>
        <p className="text-gray-600">Monitor and analyze your spending patterns</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card mb-8"
      >
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Category</label>
            <select
              className="input-field"
              value={filter.category}
              onChange={(e) => setFilter({ ...filter, category: e.target.value })}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Date Range</label>
            <select
              className="input-field"
              value={filter.dateRange}
              onChange={(e) => setFilter({ ...filter, dateRange: e.target.value })}
            >
              {dateRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Sort By</label>
            <select
              className="input-field"
              value={filter.sortBy}
              onChange={(e) => setFilter({ ...filter, sortBy: e.target.value })}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-3">Title</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Date</th>
                <th className="pb-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <motion.tr
                  key={expense.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="border-b last:border-0 hover:bg-gray-50"
                >
                  <td className="py-3">{expense.title}</td>
                  <td className="py-3">{expense.category}</td>
                  <td className="py-3">{expense.date}</td>
                  <td className="py-3 text-right">${expense.amount.toFixed(2)}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

export default TrackExpenses;