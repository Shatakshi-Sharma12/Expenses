import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [monthlyAverage, setMonthlyAverage] = useState(0);
  const [lastMonthExpenses, setLastMonthExpenses] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:8080/expense/getExpense');
        console.log(response);
        
        const data = response.data;

        if (data.success) {
          const allExpenses = data.data;
          setExpenses(allExpenses);

          // Calculate total expenses
          const total = allExpenses.reduce((sum, expense) => sum + expense.amount, 0);
          setTotalExpenses(total);

          // Calculate monthly average
          const currentMonth = new Date().getMonth();
          const filteredExpenses = allExpenses.filter(
            (expense) => new Date(expense.date).getMonth() === currentMonth
          );
          const average = filteredExpenses.length
            ? filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0) / filteredExpenses.length
            : 0;
          setMonthlyAverage(average);

          // Calculate last month's expenses
          const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
          const lastMonthExpenses = allExpenses.filter(
            (expense) => new Date(expense.date).getMonth() === lastMonth
          );
          const lastMonthTotal = lastMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
          setLastMonthExpenses(lastMonthTotal);
        }
      } catch (error) {
        console.error('Error fetching expenses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  // Get top 5 recent expenses
  const recentExpenses = expenses.slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
            <h1 className="text-3xl font-bold text-dark">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's your expense overview.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card"
            >
              <h3 className="text-lg text-gray-600">Total Expenses</h3>
              <p className="text-3xl font-bold text-primary mt-2">${totalExpenses.toFixed(2)}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card"
            >
              <h3 className="text-lg text-gray-600">Monthly Average</h3>
              <p className="text-3xl font-bold text-primary mt-2">${monthlyAverage.toFixed(2)}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card"
            >
              <h3 className="text-lg text-gray-600">Last Month's Expenses</h3>
              <p className="text-3xl font-bold text-primary mt-2">${lastMonthExpenses.toFixed(2)}</p>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card">
            <h2 className="text-xl font-semibold mb-4">Recent Expenses</h2>
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
                  {recentExpenses.map((expense) => (
                    <tr key={expense.id} className="border-b last:border-0">
                      <td className="py-3">{expense.title}</td>
                      <td className="py-3">{expense.category}</td>
                      <td className="py-3">{expense.date}</td>
                      <td className="py-3 text-right">${expense.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
