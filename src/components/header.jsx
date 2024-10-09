import React, { useState } from 'react';
import './header.css';

const ExpenseTracker = () => {
  const [balance, setBalance] = useState(0.00);
  const [income, setIncome] = useState(0.00);
  const [expenses, setExpenses] = useState(0.00);
  const [transactions, setTransactions] = useState([]);

  const handleSetIncome = (incomeAmount) => {
    const newIncome = parseFloat(incomeAmount);
    setIncome(newIncome);
    setBalance(prevBalance => prevBalance + newIncome);
    setTransactions([{ id: Math.random(), text: 'Income', category: 'Income', amount: newIncome }, ...transactions]);
  };

  const handleAddTransaction = (text, amount, category) => {
    const newAmount = parseFloat(amount);

    setTransactions([{ id: Math.random(), text, category, amount: newAmount }, ...transactions]);

    if (text === 'Income') {
      setIncome(prevIncome => prevIncome + Math.abs(newAmount));
      setBalance(prevBalance => prevBalance + Math.abs(newAmount));
    } else if (text === 'Expense') {
      setExpenses(prevExpenses => prevExpenses + Math.abs(newAmount));
      setBalance(prevBalance => prevBalance - Math.abs(newAmount));
    }
  };

  const handleSubmitIncome = (e) => {
    e.preventDefault();
    const incomeAmount = e.target.elements.income.value;
    handleSetIncome(incomeAmount);
  };

  const handleSubmitTransaction = (e) => {
    e.preventDefault();

    const textInput = e.target.elements.text.value;
    const amountInput = e.target.elements.amount.value;
    const categoryInput = e.target.elements.category.value;

    if (textInput && amountInput) {
      const text = textInput;
      const amount = amountInput;
      const category = categoryInput || 'Other'; 

      handleAddTransaction(text, amount, category);
      e.target.reset();
    }
  };

  return (
    <div>
      <h2>Expense Tracker</h2>

      {!income ? (
        <div className="container">
          <h3>Set Your Mothly Income</h3>
          <form onSubmit={handleSubmitIncome}>
            <div className="form-control">
              <label htmlFor="income">Income</label>
              <input type="number" id="income" placeholder="Enter your income..." required />
            </div>
            <button type="submit" className="btn">Set Income</button>
          </form>
        </div>
      ) : (
        <div className="container">
          <div className="balance-container">
            <h4>Your Balance</h4>
            <h1 id="balance">${balance.toFixed(2)}</h1>
          </div>

          <div className="inc-exp-container">
            <div>
              <h4>Income</h4>
              <p id="money-plus" className="money plus">+${income.toFixed(2)}</p>
            </div>
            <div>
              <h4>Expense</h4>
              <p id="money-minus" className="money minus">-${expenses.toFixed(2)}</p>
            </div>
          </div>
          <h3>Add new transaction</h3>
          <form id="form" onSubmit={handleSubmitTransaction}>
            <div className="form-control">
              <label>Transaction Type</label>
              <div className="radio-group">
                <input type="radio" id="income" name="text" value="Income" required />
                <label htmlFor="income">Income</label>
                <input type="radio" id="expense" name="text" value="Expense" required />
                <label htmlFor="expense">Expense</label>
              </div>
            </div>

            <div className="form-control">
              <label htmlFor="amount">Amount</label>
              <input type="number" id="amount" name="amount" placeholder="Enter amount..." required />
            </div>

            <div className="form-control">
              <label htmlFor="category">Category</label>
              <input type="text" id="category" name="category" placeholder="Enter category (optional)" />
            </div>

            <button type="submit" className="btn">
              Add transaction
            </button>
          </form>

          <h3>History</h3>
          <ul id="list" className="list">
            {transactions.map(transaction => (
              <li key={transaction.id} className={transaction.text.toLowerCase()}>
                {transaction.text} ({transaction.category}) <span style={{ color: transaction.text.toLowerCase() === 'expense' ? '#c0392b' : '#2ecc71' }}>
                  ${Math.abs(transaction.amount).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ExpenseTracker;
