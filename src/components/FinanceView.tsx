import React, { useState } from 'react';
import {
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  Plus,
  Search,
  TrendingUp,
  PiggyBank,
  CreditCard,
  Filter,
  Trash2,
  X,
} from 'lucide-react';

interface Transaction {
  id: string;
  title: string;
  category: string;
  date: string;
  amount: number;
  type: 'Income' | 'Expense';
}

const initialTransactions: Transaction[] = [
  { id: '1', title: 'Freelance Web Project Milestone', category: 'Income', date: 'Nov 15, 2026', amount: 65000, type: 'Income' },
  { id: '2', title: 'Monthly Allowance', category: 'Income', date: 'Nov 01, 2026', amount: 45000, type: 'Income' },
  { id: '3', title: 'SLT Fiber Internet & Data', category: 'Bills', date: 'Nov 12, 2026', amount: 4850, type: 'Expense' },
  { id: '4', title: 'Groceries & Essentials', category: 'Food', date: 'Nov 10, 2026', amount: 8400, type: 'Expense' },
  { id: '5', title: 'Fuel & Transport', category: 'Transport', date: 'Nov 08, 2026', amount: 3200, type: 'Expense' },
  { id: '6', title: 'Cloud Hosting & Domain', category: 'Development', date: 'Nov 05, 2026', amount: 5500, type: 'Expense' },
];

const formatLKR = (amount: number) =>
  new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
    maximumFractionDigits: 0,
  }).format(amount);

export default function FinancesView() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [filterType, setFilterType] = useState<'All' | 'Income' | 'Expense'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal Form States (UI Preview)
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'Income' | 'Expense'>('Expense');
  const [category, setCategory] = useState('Food');

  // Calculations for UI Display
  const totalIncome = transactions.filter((t) => t.type === 'Income').reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions.filter((t) => t.type === 'Expense').reduce((acc, t) => acc + t.amount, 0);
  const netBalance = totalIncome - totalExpense;

  const filteredTransactions = transactions.filter((t) => {
    const matchesType = filterType === 'All' || t.type === filterType;
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleAddMockTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = Number(amount);
    if (!title.trim() || isNaN(numAmount) || numAmount <= 0) return;

    const newTx: Transaction = {
      id: String(Date.now()),
      title: title.trim(),
      category,
      date: 'Nov 16, 2026',
      amount: numAmount,
      type,
    };

    setTransactions([newTx, ...transactions]);
    setTitle('');
    setAmount('');
    setIsModalOpen(false);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-7 pb-8">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Wallet size={16} />
            Personal Finance
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Finances</h1>
          <p className="text-sm text-slate-400 mt-1">Monitor your cash flow, expenses, and savings targets.</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 text-xs font-bold text-white shadow-lg shadow-cyan-500/20 transition hover:brightness-110 self-start sm:self-auto"
        >
          <Plus size={16} />
          Add Transaction
        </button>
      </div>

      {/* TOP SUMMARY CARDS */}
      <div className="grid gap-4 sm:grid-cols-3">
        
        {/* Net Balance */}
        <div className="rounded-2xl border border-white/[0.07] bg-[#101a2b]/90 p-5 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Net Balance</span>
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-500/10 text-cyan-400">
              <CreditCard size={19} />
            </div>
          </div>
          <p className="mt-4 text-2xl font-bold text-white sm:text-3xl">{formatLKR(netBalance)}</p>
          <p className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-500">
            <TrendingUp size={13} className="text-cyan-400" />
            Available workspace balance
          </p>
        </div>

        {/* Total Income */}
        <div className="rounded-2xl border border-emerald-500/15 bg-[#101a2b]/90 p-5 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-emerald-400">Total Income</span>
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <ArrowDownLeft size={19} />
            </div>
          </div>
          <p className="mt-4 text-2xl font-bold text-emerald-400 sm:text-3xl">{formatLKR(totalIncome)}</p>
          <p className="mt-2 text-[11px] text-slate-500">This month's earnings</p>
        </div>

        {/* Total Expenses */}
        <div className="rounded-2xl border border-rose-500/15 bg-[#101a2b]/90 p-5 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-rose-400">Total Expenses</span>
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-rose-500/10 text-rose-400">
              <ArrowUpRight size={19} />
            </div>
          </div>
          <p className="mt-4 text-2xl font-bold text-rose-400 sm:text-3xl">{formatLKR(totalExpense)}</p>
          <p className="mt-2 text-[11px] text-slate-500">This month's spending</p>
        </div>

      </div>

      {/* MAIN CONTENT GRID: TRANSACTIONS LIST + BUDGET / SAVINGS */}
      <div className="grid gap-6 xl:grid-cols-[1.65fr_1fr]">
        
        {/* LEFT: TRANSACTIONS HISTORY */}
        <div className="rounded-2xl border border-white/[0.07] bg-[#101a2b]/90 p-6 shadow-xl space-y-5">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-base font-bold text-white">Transaction History</h2>
              <p className="text-xs text-slate-500">Recent income and expense records</p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 rounded-xl border border-white/[0.06] bg-[#0b1423] p-1">
              {(['All', 'Income', 'Expense'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilterType(tab)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    filterType === tab
                      ? 'bg-cyan-500 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search by description or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#0b1423] pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:border-cyan-400"
            />
          </div>

          {/* Transactions Table/List */}
          <div className="space-y-2.5">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-white/[0.05] bg-[#0b1423]/70 p-3.5 transition hover:border-cyan-400/20"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
                        tx.type === 'Income'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-rose-500/10 text-rose-400'
                      }`}
                    >
                      {tx.type === 'Income' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-200">{tx.title}</p>
                      <p className="mt-0.5 text-[11px] text-slate-500">
                        {tx.category} · {tx.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`text-sm font-bold ${
                        tx.type === 'Income' ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {tx.type === 'Income' ? '+' : '-'} {formatLKR(tx.amount)}
                    </span>

                    <button
                      onClick={() => deleteTransaction(tx.id)}
                      className="rounded-lg p-1.5 text-slate-600 opacity-100 transition hover:bg-rose-500/10 hover:text-rose-400 sm:opacity-0 sm:group-hover:opacity-100"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-white/10 py-10 text-center text-xs text-slate-500">
                No transactions found matching your filter.
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: SAVINGS GOALS & SPENDING BREAKDOWN */}
        <div className="space-y-5">
          
          {/* Savings Goals */}
          <div className="rounded-2xl border border-white/[0.07] bg-[#101a2b]/90 p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-amber-500/10 text-amber-400">
                  <PiggyBank size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Savings Goals</h3>
                  <p className="text-[11px] text-slate-500">Target milestones</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { name: 'Workstation RAM Upgrade', current: 24000, target: 35000, color: 'from-cyan-400 to-blue-500' },
                { name: 'Emergency Reserve', current: 85000, target: 150000, color: 'from-emerald-400 to-teal-500' },
                { name: 'Cloud Certification Exam', current: 18000, target: 30000, color: 'from-violet-400 to-purple-500' },
              ].map((goal) => {
                const pct = Math.min(100, Math.round((goal.current / goal.target) * 100));
                return (
                  <div key={goal.name} className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-slate-200">{goal.name}</span>
                      <span className="font-semibold text-cyan-400">{pct}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${goal.color}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>{formatLKR(goal.current)} saved</span>
                      <span>Target: {formatLKR(goal.target)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Monthly Budget Indicator */}
          <div className="rounded-2xl border border-white/[0.07] bg-[#101a2b]/90 p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Monthly Budget Limit</h3>
              <Filter size={15} className="text-slate-500" />
            </div>

            <div className="rounded-xl border border-white/[0.05] bg-[#0b1423] p-4">
              <div className="flex items-baseline justify-between">
                <span className="text-xl font-bold text-white">{formatLKR(totalExpense)}</span>
                <span className="text-xs text-slate-500">of {formatLKR(50000)} limit</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                  style={{ width: `${Math.min(100, (totalExpense / 50000) * 100)}%` }}
                />
              </div>
              <p className="mt-2.5 text-[11px] text-emerald-400">
                You are within your healthy monthly spending limit.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ADD TRANSACTION MODAL (UI Preview) */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#101a2b] p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">New Transaction</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-white/5 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddMockTransaction} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-300">Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Client payment or Groceries"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#0b1423] px-3.5 py-2.5 text-sm text-white outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-300">Amount (LKR)</label>
                <input
                  type="number"
                  required
                  min="1"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#0b1423] px-3.5 py-2.5 text-sm text-white outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-300">Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as 'Income' | 'Expense')}
                    className="w-full rounded-xl border border-white/10 bg-[#0b1423] px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400"
                  >
                    <option value="Expense">Expense</option>
                    <option value="Income">Income</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-300">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#0b1423] px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400"
                  >
                    <option>Food</option>
                    <option>Bills</option>
                    <option>Transport</option>
                    <option>Development</option>
                    <option>Income</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-white/10 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-cyan-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-cyan-400"
                >
                  Add Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}