import { motion } from 'framer-motion';
import { useState } from 'react';
import axios from 'axios';

function AddExpense() {
  const [expense, setExpense] = useState({
    title: '',
    amount: '',
    category: '',
    date: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    'Food & Dining',
    'Transportation',
    'Entertainment',
    'Shopping',
    'Bills & Utilities',
    'Others',
  ];

  let user=localStorage.getItem('user');
  let userId=null;
  if(user!='undefined'){
    user=JSON.parse(user);
    userId=user._id;
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`http://localhost:8080/expense/addExpense/${userId}`, expense);
      
      if (response.data.success) {
        console.log('New expense added:', response.data);
        setExpense({
          title: '',
          amount: '',
          category: '',
          date: '',
          notes: '',
        });
      } else {
        setError('Failed to add expense');
      }
    } catch (err) {
      console.error('Error adding expense:', err);
      setError('Error adding expense');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h2 className="text-2xl font-bold mb-6">Add New Expense</h2>
        
        {/* Show error message if there's an error */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Title</label>
            <input
              type="text"
              className="input-field"
              value={expense.title}
              onChange={(e) => setExpense({ ...expense, title: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-500">$</span>
              <input
                type="number"
                step="0.01"
                className="input-field pl-8"
                value={expense.amount}
                onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Category</label>
            <select
              className="input-field"
              value={expense.category}
              onChange={(e) => setExpense({ ...expense, category: e.target.value })}
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Date</label>
            <input
              type="date"
              className="input-field"
              value={expense.date}
              onChange={(e) => setExpense({ ...expense, date: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Notes (Optional)</label>
            <textarea
              className="input-field min-h-[100px]"
              value={expense.notes}
              onChange={(e) => setExpense({ ...expense, notes: e.target.value })}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300"
              onClick={() => setExpense({
                title: '',
                amount: '',
                category: '',
                date: '',
                notes: '',
              })}
            >
              Clear
            </button>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Adding...' : 'Add Expense'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default AddExpense;
