import { useState } from 'react'
import './App.css'

interface Expense {
  category: string;
  amount: number;
}

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [newAmount, setNewAmount] = useState('');

  const addExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory && newAmount) {
      setExpenses([...expenses, {
        category: newCategory,
        amount: parseFloat(newAmount)
      }]);
      setNewCategory('');
      setNewAmount('');
    }
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const averageDailyExpense = totalExpenses / 30;
  const top3Expenses = [...expenses]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3);

  return (
    <div className="container">
      <h1>Expense Calculator</h1>
      
      <form onSubmit={addExpense} className="expense-form">
        <div className="form-group">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Category"
            required
          />
          <input
            type="number"
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
            placeholder="Amount ($)"
            required
          />
          <button type="submit">Add Expense</button>
        </div>
      </form>

      <div className="expenses-list">
        <h2>Expenses List</h2>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount ($)</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={index}>
                <td>{expense.category}</td>
                <td>${expense.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="summary">
        <h2>Summary</h2>
        <div className="summary-item">
          <strong>Total Expenses:</strong> ${totalExpenses.toLocaleString()}
        </div>
        <div className="summary-item">
          <strong>Average Daily Expense:</strong> ${averageDailyExpense.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <div className="summary-item">
          <strong>Top 3 Expenses:</strong>
          <ul>
            {top3Expenses.map((expense, index) => (
              <li key={index}>
                {expense.category}: ${expense.amount.toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App 