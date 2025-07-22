import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2, DollarSign, Calendar, Tag, BarChart2, PieChart, X } from 'lucide-react';

// Card Component
const Card = ({ className, children, ...props }) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} {...props}>
    {children}
  </div>
);

const CardHeader = ({ className, children, ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ className, children, ...props }) => (
  <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h3>
);

const CardDescription = ({ className, children, ...props }) => (
  <p className={`text-sm text-muted-foreground ${className}`} {...props}>
    {children}
  </p>
);

const CardContent = ({ className, children, ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

// Alert Component
const Alert = ({ className, children, ...props }) => (
  <div className={`relative w-full rounded-lg border p-4 ${className}`} {...props}>
    {children}
  </div>
);

const AlertDescription = ({ className, children, ...props }) => (
  <div className={`text-sm opacity-70 ${className}`} {...props}>
    {children}
  </div>
);

// Dialog Component
const Dialog = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        {children}
      </div>
    </div>
  );
};

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newExpense, setNewExpense] = useState({
    amount: '',
    category: '',
    date: '',
    note: ''
  });
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Load expenses from localStorage on initial render
  useEffect(() => {
    const savedExpenses = localStorage.getItem('expenses');
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
  }, []);

  // Save expenses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const categories = ['Groceries', 'Utilities', 'Entertainment', 'Transport', 'Shopping', 'Other'];

  const addExpense = () => {
    if (!newExpense.amount || !newExpense.category || !newExpense.date) {
      return;
    }

    setExpenses([
      ...expenses,
      {
        id: Date.now(),
        ...newExpense
      }
    ]);

    setNewExpense({
      amount: '',
      category: '',
      date: '',
      note: ''
    });

    setIsDialogOpen(false);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const filteredExpenses = selectedCategory === 'All'
    ? expenses
    : expenses.filter(expense => expense.category === selectedCategory);

  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-blue-900">Expense Tracker</h1>
            <p className="text-blue-600 mt-1">Track your spending, stay on budget</p>
          </div>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusCircle className="w-5 h-5" />
            Add Expense
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-blue-900">
                Total Expenses
              </CardTitle>
              <DollarSign className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">
                ${totalAmount.toFixed(2)}
              </div>
              <p className="text-xs text-blue-600 mt-1">
                {selectedCategory === 'All' ? 'All categories' : selectedCategory}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-blue-900">
                Recent Activity
              </CardTitle>
              <BarChart2 className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">
                {expenses.length}
              </div>
              <p className="text-xs text-blue-600 mt-1">
                Total transactions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-blue-900">
                Category Analysis
              </CardTitle>
              <PieChart className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">
                {new Set(expenses.map(e => e.category)).size}
              </div>
              <p className="text-xs text-blue-600 mt-1">
                Different categories used
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Add Expense Dialog */}
        <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-blue-900">Add New Expense</h2>
            <button
              onClick={() => setIsDialogOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">Amount</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-blue-600" />
                <input
                  type="number"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                  className="pl-10 w-full rounded-md border border-blue-200 py-2 text-blue-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">Category</label>
              <select
                value={newExpense.category}
                onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                className="w-full rounded-md border border-blue-200 py-2 text-blue-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">Date</label>
              <input
                type="date"
                value={newExpense.date}
                onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                className="w-full rounded-md border border-blue-200 py-2 text-blue-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">Note</label>
              <input
                type="text"
                value={newExpense.note}
                onChange={(e) => setNewExpense({...newExpense, note: e.target.value})}
                className="w-full rounded-md border border-blue-200 py-2 text-blue-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Add a note"
              />
            </div>

            <button
              onClick={addExpense}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Expense
            </button>
          </div>
        </Dialog>

        {/* Expense List */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Recent Expenses</CardTitle>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-md border border-blue-200 py-1 px-2 text-sm text-blue-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="All">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredExpenses.length === 0 ? (
                <Alert>
                  <AlertDescription>
                    No expenses found. Add some expenses to get started!
                  </AlertDescription>
                </Alert>
              ) : (
                filteredExpenses.map(expense => (
                  <div
                    key={expense.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-blue-100 hover:border-blue-200 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-blue-100">
                        <Tag className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-blue-900">{expense.category}</p>
                        <p className="text-sm text-blue-600">{expense.note}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-medium text-blue-900">${parseFloat(expense.amount).toFixed(2)}</p>
                        <p className="text-sm text-blue-600">{expense.date}</p>
                      </div>
                      <button
                        onClick={() => deleteExpense(expense.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExpenseTracker;