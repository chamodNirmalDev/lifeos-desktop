
import React, { useEffect, useMemo, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';

import {
  Activity,
  ArrowDownLeft,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronDown,
  Clock,
  Flame,
  ListTodo,
  Plus,
  Search,
  Sparkles,
  Target,
  Trash2,
  X,
  Zap,
  Wallet,
  TrendingUp,
  BookOpen,
  MoreHorizontal,
  Play,
  Pause,
  RotateCcw,
  Pencil,
} from 'lucide-react';

/* =====================================================
   TYPES
===================================================== */

type Task = {
  id: string;
  title: string;
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  due: string;
  completed: boolean;
};

type Transaction = {
  id: string;
  title: string;
  category: string;
  date: string;
  amount: number;
  type: 'Income' | 'Expense';
};

type Habit = {
  id: string;
  name: string;
  icon: string;
  days: boolean[];
};

/* =====================================================
   HELPERS
===================================================== */

const getLocalDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const today = getLocalDate();

const money = (value: number) =>
  new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
    maximumFractionDigits: 0,
  }).format(value);

const initialTasks: Task[] = [
  {
    id: 't1',
    title: 'Finish LifeOS dashboard UI',
    category: 'Personal Project',
    priority: 'High',
    due: today,
    completed: false,
  },
  {
    id: 't2',
    title: 'Study TypeScript generics',
    category: 'Learning',
    priority: 'Medium',
    due: today,
    completed: false,
  },
  {
    id: 't3',
    title: 'Review database assignment',
    category: 'Academics',
    priority: 'High',
    due: today,
    completed: true,
  },
  {
    id: 't4',
    title: 'Read 10 pages',
    category: 'Personal',
    priority: 'Low',
    due: today,
    completed: false,
  },
];

const initialTransactions: Transaction[] = [
  {
    id: 'x1',
    title: 'Monthly allowance',
    category: 'Income',
    date: today,
    amount: 45000,
    type: 'Income',
  },
  {
    id: 'x2',
    title: 'Internet bill',
    category: 'Bills',
    date: today,
    amount: 3500,
    type: 'Expense',
  },
  {
    id: 'x3',
    title: 'Groceries',
    category: 'Food',
    date: today,
    amount: 6200,
    type: 'Expense',
  },
];

const initialHabits: Habit[] = [
  {
    id: 'h1',
    name: 'Reading',
    icon: '📚',
    days: [true, true, true, false, true, false, false],
  },
  {
    id: 'h2',
    name: 'Exercise',
    icon: '🏃',
    days: [true, false, true, true, false, false, false],
  },
  {
    id: 'h3',
    name: 'Coding',
    icon: '💻',
    days: [true, true, true, true, true, false, false],
  },
];

function readStore<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function useStoredState<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(() => readStore(key, fallback));

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage unavailable
    }
  }, [key, value]);

  return [value, setValue] as const;
}

/* =====================================================
   REUSABLE UI COMPONENTS
===================================================== */

function Card({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`
        rounded-2xl
        border border-white/[0.07]
        bg-[#101a2b]/90
        p-5
        shadow-[0_8px_30px_rgba(0,0,0,0.12)]
        transition-all duration-300
        hover:border-cyan-400/20
        ${className}
      `}
    >
      {children}
    </section>
  );
}

function SectionTitle({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-5 flex items-center justify-between gap-3">
      <div>
        <h2 className="text-sm font-semibold text-white">{title}</h2>
        {subtitle && (
          <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
        )}
      </div>

      {action}
    </div>
  );
}

function Pill({
  children,
  tone = 'slate',
}: {
  children: ReactNode;
  tone?: 'slate' | 'green' | 'amber' | 'red' | 'blue' | 'purple';
}) {
  const styles = {
    slate: 'bg-slate-800 text-slate-300',
    green: 'bg-emerald-500/10 text-emerald-400',
    amber: 'bg-amber-500/10 text-amber-400',
    red: 'bg-rose-500/10 text-rose-400',
    blue: 'bg-blue-500/10 text-blue-400',
    purple: 'bg-violet-500/10 text-violet-400',
  };

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-semibold ${styles[tone]}`}
    >
      {children}
    </span>
  );
}

const inputClass =
  'w-full rounded-xl border border-white/10 bg-[#0b1423] px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10';

const labelClass = 'mb-2 block text-xs font-semibold text-slate-300';

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#101a2b] p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">{title}</h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

/* =====================================================
   DASHBOARD
===================================================== */

export default function Dashboard() {
  /* ---------- Persistent Data ---------- */

  const [tasks, setTasks] = useStoredState<Task[]>(
    'lifeos.tasks.v1',
    initialTasks
  );

  const [transactions, setTransactions] = useStoredState<Transaction[]>(
    'lifeos.transactions.v1',
    initialTransactions
  );

  const [habits, setHabits] = useStoredState<Habit[]>(
    'lifeos.habits.v1',
    initialHabits
  );

  const [note, setNote] = useStoredState(
    'lifeos.note.v1',
    'Plan the week, focus on your most important task, and keep learning.'
  );

  const [sessions, setSessions] = useStoredState<number>(
    'lifeos.focus.sessions.v1',
    6
  );

  /* ---------- UI States ---------- */

  const [query, setQuery] = useState('');

  const [filter, setFilter] = useState<
    'All' | 'Active' | 'Completed'
  >('All');

  const [taskModal, setTaskModal] = useState(false);
  const [transactionModal, setTransactionModal] = useState(false);

  /* ---------- Task Form ---------- */

  const [taskTitle, setTaskTitle] = useState('');
  const [taskCategory, setTaskCategory] = useState('Personal');
  const [taskPriority, setTaskPriority] =
    useState<Task['priority']>('Medium');
  const [taskDue, setTaskDue] = useState(today);

  /* ---------- Finance Form ---------- */

  const [txTitle, setTxTitle] = useState('');
  const [txAmount, setTxAmount] = useState('');
  const [txType, setTxType] =
    useState<Transaction['type']>('Expense');
  const [txCategory, setTxCategory] = useState('Other');

  /* ---------- Focus Timer ---------- */

  const [focusSeconds, setFocusSeconds] = useState(25 * 60);
  const [focusRunning, setFocusRunning] = useState(false);

  useEffect(() => {
    if (!focusRunning) return;

    const timer = window.setInterval(() => {
      setFocusSeconds((seconds) => {
        if (seconds <= 1) {
          window.clearInterval(timer);
          setFocusRunning(false);
          setSessions((count) => count + 1);
          return 25 * 60;
        }

        return seconds - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [focusRunning, setSessions]);

  /* =====================================================
     CALCULATIONS
  ===================================================== */

  const activeTasks = tasks.filter((t) => !t.completed).length;

  const completedTasks = tasks.length - activeTasks;

  const completion = tasks.length
    ? Math.round((completedTasks / tasks.length) * 100)
    : 0;

  const income = transactions
    .filter((t) => t.type === 'Income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === 'Expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;

  const habitCheckins = habits.reduce(
    (sum, habit) => sum + habit.days.filter(Boolean).length,
    0
  );

  const filteredTasks = useMemo(
    () =>
      tasks.filter((task) => {
        const matchesQuery = `${task.title} ${task.category}`
          .toLowerCase()
          .includes(query.toLowerCase());

        const matchesFilter =
          filter === 'All' ||
          (filter === 'Active' && !task.completed) ||
          (filter === 'Completed' && task.completed);

        return matchesQuery && matchesFilter;
      }),
    [tasks, query, filter]
  );

  const time = `${String(Math.floor(focusSeconds / 60)).padStart(2, '0')}:${String(
    focusSeconds % 60
  ).padStart(2, '0')}`;

  const todayLabel = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date());

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? 'Good morning'
      : hour < 17
        ? 'Good afternoon'
        : 'Good evening';

  /* =====================================================
     ACTIONS
  ===================================================== */

  const addTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!taskTitle.trim()) return;

    setTasks((items) => [
      {
        id: crypto.randomUUID(),
        title: taskTitle.trim(),
        category: taskCategory,
        priority: taskPriority,
        due: taskDue,
        completed: false,
      },
      ...items,
    ]);

    setTaskTitle('');
    setTaskCategory('Personal');
    setTaskPriority('Medium');
    setTaskDue(today);
    setTaskModal(false);
  };

  const addTransaction = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const amount = Number(txAmount);

    if (!txTitle.trim() || !Number.isFinite(amount) || amount <= 0) {
      return;
    }

    setTransactions((items) => [
      {
        id: crypto.randomUUID(),
        title: txTitle.trim(),
        category: txCategory,
        date: today,
        amount,
        type: txType,
      },
      ...items,
    ]);

    setTxTitle('');
    setTxAmount('');
    setTxType('Expense');
    setTxCategory('Other');
    setTransactionModal(false);
  };

  const toggleTask = (taskId: string) => {
    setTasks((items) =>
      items.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks((items) => items.filter((task) => task.id !== taskId));
  };

  const toggleHabitDay = (habitId: string, day: number) => {
    setHabits((items) =>
      items.map((habit) =>
        habit.id === habitId
          ? {
            ...habit,
            days: habit.days.map((value, index) =>
              index === day ? !value : value
            ),
          }
          : habit
      )
    );
  };

  const addHabit = () => {
    const name = window.prompt('Enter your new habit name');

    if (name?.trim()) {
      setHabits((items) => [
        ...items,
        {
          id: crypto.randomUUID(),
          name: name.trim(),
          icon: '✨',
          days: [false, false, false, false, false, false, false],
        },
      ]);
    }
  };

  const toggleFocus = () => {
    setFocusRunning((value) => !value);
  };

  const resetFocus = () => {
    setFocusRunning(false);
    setFocusSeconds(25 * 60);
  };

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div className="space-y-7 pb-8">

      {/* ================================================
          HEADER
      ================================================ */}

      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              {todayLabel}
            </p>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            {greeting}
            <span className="text-cyan-400">.</span>
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Stay focused, manage your priorities and make today count.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">

          <button
            onClick={() => setTransactionModal(true)}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs font-semibold text-slate-300 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
          >
            <Wallet size={15} />
            Add transaction
          </button>

          <button
            onClick={() => setTaskModal(true)}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 text-xs font-bold text-white shadow-lg shadow-cyan-500/20 transition hover:brightness-110"
          >
            <Plus size={16} />
            Add new task
          </button>

        </div>
      </div>

      {/* ================================================
          STATISTICS
      ================================================ */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {[
          {
            label: 'Active Tasks',
            value: activeTasks.toString(),
            detail: `${completedTasks} completed`,
            icon: ListTodo,
            color: 'text-cyan-400',
            bg: 'bg-cyan-500/10',
            trend: 'Tasks',
          },
          {
            label: 'Focus Sessions',
            value: sessions.toString(),
            detail: 'Completed sessions',
            icon: Zap,
            color: 'text-amber-400',
            bg: 'bg-amber-500/10',
            trend: 'Focus',
          },
          {
            label: 'Habit Check-ins',
            value: habitCheckins.toString(),
            detail: 'This week',
            icon: Flame,
            color: 'text-orange-400',
            bg: 'bg-orange-500/10',
            trend: 'Habits',
          },
          {
            label: 'Daily Completion',
            value: `${completion}%`,
            detail: `${completedTasks} of ${tasks.length} tasks`,
            icon: Target,
            color: 'text-emerald-400',
            bg: 'bg-emerald-500/10',
            trend: 'Progress',
          },
        ].map((item) => (
          <Card key={item.label} className="group relative overflow-hidden">

            <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-cyan-400/[0.04] blur-2xl transition group-hover:bg-cyan-400/[0.09]" />

            <div className="relative flex items-start justify-between">

              <div>
                <p className="text-xs font-medium text-slate-400">
                  {item.label}
                </p>

                <p className="mt-3 text-3xl font-bold tracking-tight text-white">
                  {item.value}
                </p>

                <p className="mt-2 text-[11px] text-slate-500">
                  {item.detail}
                </p>
              </div>

              <div className={`rounded-xl p-3 ${item.bg} ${item.color}`}>
                <item.icon size={21} />
              </div>

            </div>

            <div className="mt-5 flex items-center gap-2 border-t border-white/[0.06] pt-3">
              <Activity size={12} className={item.color} />
              <span className="text-[10px] font-medium text-slate-500">
                {item.trend} overview
              </span>
            </div>

          </Card>
        ))}

      </div>

      {/* ================================================
          WEEKLY ACTIVITY + DAILY PROGRESS
      ================================================ */}

      <div className="grid gap-5 xl:grid-cols-[1.55fr_1fr]">

        {/* Weekly Activity */}

        <Card>

          <SectionTitle
            title="Weekly Activity"
            subtitle="Your productivity overview across the week"
            action={
              <span className="flex items-center gap-1 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-[11px] text-slate-400">
                This week
                <ChevronDown size={13} />
              </span>
            }
          />

          <div className="flex h-48 items-end justify-between gap-3 pt-3">

            {[
              ['Mon', 42],
              ['Tue', 68],
              ['Wed', 53],
              ['Thu', 82],
              ['Fri', 61],
              ['Sat', 35],
              ['Sun', 48],
            ].map(([day, value]) => (
              <div
                key={day}
                className="flex h-full flex-1 flex-col items-center justify-end gap-3"
              >

                <div className="flex h-full w-full items-end overflow-hidden rounded-lg bg-slate-800/70">

                  <div
                    className="w-full rounded-lg bg-gradient-to-t from-blue-600 to-cyan-400 transition-all duration-500 hover:brightness-125"
                    style={{ height: `${value}%` }}
                  />

                </div>

                <span className="text-[10px] font-medium text-slate-500">
                  {day}
                </span>

              </div>
            ))}

          </div>

          <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">

            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              <span className="text-[11px] text-slate-400">
                Activity index
              </span>
            </div>

            <span className="text-[10px] text-slate-500">
              Illustrative demo data
            </span>

          </div>

        </Card>

        {/* Daily Progress */}

        <Card>

          <SectionTitle
            title="Daily Progress"
            subtitle="Your task completion overview"
          />

          <div className="flex flex-col items-center gap-6 py-4 sm:flex-row">

            <div
              className="grid h-36 w-36 shrink-0 place-items-center rounded-full"
              style={{
                background: `conic-gradient(#22d3ee ${completion * 3.6}deg, #1e293b 0deg)`,
              }}
            >

              <div className="grid h-28 w-28 place-items-center rounded-full bg-[#101a2b]">

                <div className="text-center">
                  <p className="text-3xl font-bold text-white">
                    {completion}%
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-wider text-slate-500">
                    Completed
                  </p>
                </div>

              </div>

            </div>

            <div className="w-full space-y-4">

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold text-white">
                    {completedTasks}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Completed tasks
                  </p>
                </div>

                <div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-500/10 text-emerald-400">
                  <Check size={17} />
                </div>
              </div>

              <div className="h-px bg-white/[0.06]" />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold text-white">
                    {activeTasks}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Remaining tasks
                  </p>
                </div>

                <div className="grid h-9 w-9 place-items-center rounded-xl bg-amber-500/10 text-amber-400">
                  <Clock size={17} />
                </div>
              </div>

            </div>

          </div>

          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500"
              style={{ width: `${completion}%` }}
            />
          </div>

        </Card>

      </div>

      {/* ================================================
          TASKS + HABITS
      ================================================ */}

      <div className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">

        {/* TASK MANAGEMENT */}

        <Card>

          <SectionTitle
            title="My Tasks"
            subtitle="Organize your priorities and stay productive"
            action={
              <button
                onClick={() => setTaskModal(true)}
                className="flex items-center gap-1 text-xs font-semibold text-cyan-400 transition hover:text-cyan-300"
              >
                <Plus size={15} />
                New task
              </button>
            }
          />

          {/* Filters */}

          <div className="mb-5 flex flex-wrap items-center gap-2">

            {(['All', 'Active', 'Completed'] as const).map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`rounded-lg px-3 py-2 text-[11px] font-semibold transition ${filter === item
                    ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                    : 'bg-white/[0.04] text-slate-400 hover:bg-white/[0.08] hover:text-white'
                  }`}
              >
                {item}
              </button>
            ))}

            <div className="ml-auto flex min-w-0 items-center gap-2 rounded-lg border border-white/[0.07] bg-[#0b1423] px-3 py-2">
              <Search size={13} className="shrink-0 text-slate-500" />

              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="w-24 min-w-0 bg-transparent text-[11px] text-white outline-none placeholder:text-slate-600 sm:w-32"
              />
            </div>

          </div>

          {/* Task List */}

          <div className="space-y-2">

            {filteredTasks.length === 0 && (
              <div className="rounded-xl border border-dashed border-white/10 py-10 text-center">
                <ListTodo size={25} className="mx-auto mb-3 text-slate-600" />
                <p className="text-sm text-slate-400">No tasks found</p>
                <p className="mt-1 text-xs text-slate-600">
                  Add a new task to get started.
                </p>
              </div>
            )}

            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="group flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.015] p-3 transition hover:border-cyan-400/20 hover:bg-white/[0.035]"
              >

                <button
                  onClick={() => toggleTask(task.id)}
                  aria-label="Toggle task completion"
                  className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border transition ${task.completed
                      ? 'border-emerald-500 bg-emerald-500 text-white'
                      : 'border-slate-600 text-transparent hover:border-cyan-400'
                    }`}
                >
                  <Check size={12} />
                </button>

                <div className="min-w-0 flex-1">

                  <p
                    className={`truncate text-xs font-semibold ${task.completed
                        ? 'text-slate-500 line-through'
                        : 'text-slate-200'
                      }`}
                  >
                    {task.title}
                  </p>

                  <p className="mt-1 text-[10px] text-slate-500">
                    {task.category} · Due {task.due}
                  </p>

                </div>

                <Pill
                  tone={
                    task.priority === 'High'
                      ? 'red'
                      : task.priority === 'Medium'
                        ? 'amber'
                        : 'slate'
                  }
                >
                  {task.priority}
                </Pill>

                <button
                  onClick={() => deleteTask(task.id)}
                  aria-label="Delete task"
                  className="rounded-lg p-2 text-slate-600 opacity-100 transition hover:bg-rose-500/10 hover:text-rose-400 sm:opacity-0 sm:group-hover:opacity-100"
                >
                  <Trash2 size={14} />
                </button>

              </div>
            ))}

          </div>

          <div className="mt-4 border-t border-white/[0.06] pt-4 text-center">
            <p className="text-[10px] text-slate-500">
              Showing {filteredTasks.length} of {tasks.length} tasks
            </p>
          </div>

        </Card>

        {/* HABIT TRACKER */}

        <Card>

          <SectionTitle
            title="Habit Tracker"
            subtitle="Build consistency through daily actions"
            action={<Pill tone="green">Weekly</Pill>}
          />

          <div className="mb-4 grid grid-cols-[1fr_repeat(7,minmax(18px,25px))] items-center gap-1">

            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-600">
              Habit
            </span>

            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
              <span
                key={index}
                className="text-center text-[10px] font-medium text-slate-500"
              >
                {day}
              </span>
            ))}

          </div>

          <div className="space-y-5">

            {habits.map((habit) => (
              <div
                key={habit.id}
                className="grid grid-cols-[1fr_repeat(7,minmax(18px,25px))] items-center gap-1"
              >

                <div className="flex min-w-0 items-center gap-2">
                  <span className="text-base">{habit.icon}</span>
                  <span className="truncate text-[11px] font-medium text-slate-300">
                    {habit.name}
                  </span>
                </div>

                {habit.days.map((checked, day) => (
                  <button
                    key={day}
                    onClick={() => toggleHabitDay(habit.id, day)}
                    aria-label={`Toggle ${habit.name} day ${day + 1}`}
                    className={`mx-auto grid h-5 w-5 place-items-center rounded-md transition ${checked
                        ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/20'
                        : 'bg-slate-800 text-transparent hover:bg-slate-700'
                      }`}
                  >
                    <Check size={12} />
                  </button>
                ))}

              </div>
            ))}

          </div>

          <div className="mt-6 rounded-xl bg-emerald-500/[0.06] p-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-slate-400">
                Weekly check-ins
              </span>
              <span className="text-sm font-bold text-emerald-400">
                {habitCheckins}
              </span>
            </div>
          </div>

          <button
            onClick={addHabit}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/10 py-3 text-xs font-semibold text-slate-400 transition hover:border-cyan-400/40 hover:text-cyan-400"
          >
            <Plus size={14} />
            Add new habit
          </button>

        </Card>

      </div>

      {/* ================================================
          FINANCES + FOCUS TIMER
      ================================================ */}

      <div className="grid gap-5 xl:grid-cols-3">

        {/* FINANCE OVERVIEW */}

        <Card className="xl:col-span-2">

          <SectionTitle
            title="Finance Overview"
            subtitle="Track your income, expenses and savings"
            action={
              <button
                onClick={() => setTransactionModal(true)}
                className="text-xs font-semibold text-cyan-400 transition hover:text-cyan-300"
              >
                + Add transaction
              </button>
            }
          />

          <div className="grid gap-3 sm:grid-cols-3">

            <div className="rounded-xl border border-white/[0.05] bg-white/[0.025] p-4">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Wallet size={15} />
                Net Balance
              </div>

              <p className="mt-3 break-words text-lg font-bold text-white">
                {money(balance)}
              </p>

              <p className="mt-2 text-[10px] text-slate-500">
                Based on saved transactions
              </p>
            </div>

            <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/[0.04] p-4">
              <div className="flex items-center gap-2 text-xs text-emerald-400">
                <ArrowDownLeft size={15} />
                Total Income
              </div>

              <p className="mt-3 break-words text-lg font-bold text-emerald-400">
                {money(income)}
              </p>

              <p className="mt-2 text-[10px] text-slate-500">
                Recorded income
              </p>
            </div>

            <div className="rounded-xl border border-rose-500/10 bg-rose-500/[0.04] p-4">
              <div className="flex items-center gap-2 text-xs text-rose-400">
                <ArrowUpRight size={15} />
                Total Expenses
              </div>

              <p className="mt-3 break-words text-lg font-bold text-rose-400">
                {money(expenses)}
              </p>

              <p className="mt-2 text-[10px] text-slate-500">
                Recorded expenses
              </p>
            </div>

          </div>

          {/* Recent Transactions */}

          <div className="mt-6">

            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xs font-semibold text-white">
                Recent Transactions
              </h3>

              <span className="text-[10px] text-slate-500">
                Latest activity
              </span>
            </div>

            <div className="space-y-3">

              {transactions.slice(0, 5).map((tx) => (
                <div
                  key={tx.id}
                  className="group flex items-center gap-3"
                >

                  <div
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${tx.type === 'Income'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-rose-500/10 text-rose-400'
                      }`}
                  >
                    {tx.type === 'Income' ? (
                      <ArrowDownLeft size={18} />
                    ) : (
                      <ArrowUpRight size={18} />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-slate-200">
                      {tx.title}
                    </p>

                    <p className="mt-1 text-[10px] text-slate-500">
                      {tx.category} · {tx.date}
                    </p>
                  </div>

                  <p
                    className={`whitespace-nowrap text-xs font-bold ${tx.type === 'Income'
                        ? 'text-emerald-400'
                        : 'text-rose-400'
                      }`}
                  >
                    {tx.type === 'Income' ? '+' : '-'}
                    {money(tx.amount)}
                  </p>

                  <button
                    onClick={() =>
                      setTransactions((items) =>
                        items.filter((item) => item.id !== tx.id)
                      )
                    }
                    aria-label="Delete transaction"
                    className="rounded-lg p-2 text-slate-600 transition hover:bg-rose-500/10 hover:text-rose-400"
                  >
                    <Trash2 size={14} />
                  </button>

                </div>
              ))}

              {transactions.length === 0 && (
                <p className="py-5 text-center text-xs text-slate-500">
                  No transactions yet.
                </p>
              )}

            </div>

          </div>

        </Card>

        {/* FOCUS TIMER + INSIGHT */}

        <div className="space-y-5">

          <Card>

            <SectionTitle
              title="Focus Timer"
              subtitle="Stay focused. Get things done."
              action={<Zap size={17} className="text-cyan-400" />}
            />

            <div className="py-3 text-center">

              <div
                className="mx-auto grid h-36 w-36 place-items-center rounded-full"
                style={{
                  background: `conic-gradient(#22d3ee ${(1500 - focusSeconds) / 1500 * 360}deg, #1e293b 0deg)`,
                }}
              >
                <div className="grid h-32 w-32 place-items-center rounded-full bg-[#101a2b]">

                  <div>
                    <p className="text-3xl font-bold tabular-nums text-white">
                      {time}
                    </p>

                    <p className="mt-1 text-[9px] font-semibold tracking-[0.2em] text-slate-500">
                      FOCUS TIME
                    </p>
                  </div>

                </div>
              </div>

              <p className="mt-4 text-[11px] text-slate-500">
                25-minute focus session
              </p>

              <div className="mt-5 flex justify-center gap-2">

                <button
                  onClick={toggleFocus}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-cyan-500/20 transition hover:brightness-110"
                >
                  {focusRunning ? <Pause size={14} /> : <Play size={14} />}
                  {focusRunning ? 'Pause' : 'Start Focus'}
                </button>

                <button
                  onClick={resetFocus}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-slate-400 transition hover:bg-white/[0.08] hover:text-white"
                  title="Reset timer"
                >
                  <RotateCcw size={15} />
                </button>

              </div>

            </div>

            <div className="mt-3 flex items-center justify-between border-t border-white/[0.06] pt-4">
              <span className="text-[10px] text-slate-500">
                Completed sessions
              </span>
              <span className="text-xs font-bold text-cyan-400">
                {sessions}
              </span>
            </div>

          </Card>

          {/* LIFEOS INSIGHT */}

          <Card className="border-violet-500/10 bg-gradient-to-br from-violet-500/[0.08] to-[#101a2b]">

            <div className="flex items-center gap-3">

              <div className="grid h-10 w-10 place-items-center rounded-xl bg-violet-500/10 text-violet-400">
                <Sparkles size={19} />
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  LifeOS Insight
                </p>
                <p className="text-[10px] text-slate-500">
                  Productivity suggestion
                </p>
              </div>

            </div>

            <p className="mt-4 text-xs leading-6 text-slate-300">
              Choose one high-priority task and complete a focused
              25-minute session before switching to something else.
            </p>

            <div className="mt-4 flex items-center gap-2 text-[10px] font-semibold text-violet-400">
              <Sparkles size={12} />
              AI integration coming later
            </div>

          </Card>

        </div>

      </div>

      {/* ================================================
          ACADEMICS + UPCOMING EVENTS
      ================================================ */}

      <div className="grid gap-5 md:grid-cols-2">

        {/* ACADEMICS */}

        <Card>

          <SectionTitle
            title="Academics"
            subtitle="Monitor your learning journey"
            action={<BookOpen size={18} className="text-cyan-400" />}
          />

          {[
            ['Software Engineering', 78],
            ['Database Systems', 62],
            ['Artificial Intelligence', 34],
          ].map(([name, progress]) => (
            <div key={name} className="mb-6 last:mb-0">

              <div className="mb-2 flex items-center justify-between gap-3">

                <span className="text-xs font-medium text-slate-200">
                  {name}
                </span>

                <span className="text-xs font-semibold text-cyan-400">
                  {progress}%
                </span>

              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-800">

                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />

              </div>

            </div>
          ))}

          <p className="mt-5 text-[10px] text-slate-600">
            Sample course data. Academic module integration coming later.
          </p>

        </Card>

        {/* UPCOMING EVENTS */}

        <Card>

          <SectionTitle
            title="Upcoming Events"
            subtitle="Important dates and reminders"
            action={<CalendarDays size={18} className="text-cyan-400" />}
          />

          {[
            {
              name: 'Assignment submission',
              date: 'Tomorrow · 10:00 AM',
              tone: 'red' as const,
            },
            {
              name: 'Project planning',
              date: 'Wednesday · 2:30 PM',
              tone: 'blue' as const,
            },
            {
              name: 'Weekly review',
              date: 'Sunday · 6:00 PM',
              tone: 'green' as const,
            },
          ].map((event) => (
            <div
              key={event.name}
              className="mb-4 flex items-center gap-3 rounded-xl border border-white/[0.04] p-3 last:mb-0"
            >

              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[0.04] text-slate-400">
                <CalendarDays size={18} />
              </div>

              <div className="min-w-0 flex-1">

                <p className="truncate text-xs font-semibold text-slate-200">
                  {event.name}
                </p>

                <p className="mt-1 text-[10px] text-slate-500">
                  {event.date}
                </p>

              </div>

              <Pill tone={event.tone}>Upcoming</Pill>

            </div>
          ))}

          <p className="mt-4 text-[10px] text-slate-600">
            Sample events. Calendar integration coming later.
          </p>

        </Card>

      </div>

      {/* ================================================
          QUICK NOTES
      ================================================ */}

      <Card>

        <div className="mb-4 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-500/10 text-amber-400">
              <Pencil size={18} />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-white">
                Quick Notes
              </h2>

              <p className="mt-1 text-[10px] text-slate-500">
                Capture your ideas and important thoughts
              </p>
            </div>

          </div>

          <MoreHorizontal size={18} className="text-slate-500" />

        </div>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={4}
          placeholder="Write your thoughts, ideas or reminders..."
          className="w-full resize-y rounded-xl border border-white/[0.07] bg-[#0b1423] p-4 text-sm leading-6 text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10"
        />

        <div className="mt-3 flex items-center justify-between">

          <span className="flex items-center gap-2 text-[10px] text-emerald-400">
            <Check size={12} />
            Automatically saved
          </span>

          <span className="text-[10px] text-slate-600">
            {note.length} characters
          </span>

        </div>

      </Card>

      {/* ================================================
          FOOTER
      ================================================ */}

      <footer className="flex flex-col justify-between gap-2 border-t border-white/[0.05] pt-5 text-[10px] text-slate-600 sm:flex-row">

        <span>
          © 2026 LifeOS · Personal Life Management
        </span>

        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Dashboard Prototype · Local Storage
        </span>

      </footer>

      {/* ================================================
          ADD TASK MODAL
      ================================================ */}

      {taskModal && (
        <Modal
          title="Create New Task"
          onClose={() => setTaskModal(false)}
        >

          <form onSubmit={addTask}>

            <label className={labelClass}>
              Task Title
            </label>

            <input
              autoFocus
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              required
              placeholder="What do you need to accomplish?"
              className={`${inputClass} mb-5`}
            />

            <div className="grid grid-cols-2 gap-3">

              <div>
                <label className={labelClass}>Category</label>

                <select
                  value={taskCategory}
                  onChange={(e) => setTaskCategory(e.target.value)}
                  className={inputClass}
                >
                  <option>Personal</option>
                  <option>Academics</option>
                  <option>Learning</option>
                  <option>Work</option>
                  <option>Project</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Priority</label>

                <select
                  value={taskPriority}
                  onChange={(e) =>
                    setTaskPriority(e.target.value as Task['priority'])
                  }
                  className={inputClass}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>

            </div>

            <label className={`mt-5 ${labelClass}`}>
              Due Date
            </label>

            <input
              type="date"
              value={taskDue}
              onChange={(e) => setTaskDue(e.target.value)}
              className={inputClass}
            />

            <div className="mt-7 flex justify-end gap-2">

              <button
                type="button"
                onClick={() => setTaskModal(false)}
                className="rounded-xl border border-white/10 px-4 py-2.5 text-xs font-semibold text-slate-300 transition hover:bg-white/5"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-xl bg-cyan-500 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-cyan-600"
              >
                Create Task
              </button>

            </div>

          </form>

        </Modal>
      )}

      {/* ================================================
          ADD TRANSACTION MODAL
      ================================================ */}

      {transactionModal && (
        <Modal
          title="Add Transaction"
          onClose={() => setTransactionModal(false)}
        >

          <form onSubmit={addTransaction}>

            <label className={labelClass}>
              Transaction Description
            </label>

            <input
              value={txTitle}
              onChange={(e) => setTxTitle(e.target.value)}
              required
              placeholder="e.g. Monthly allowance"
              className={`${inputClass} mb-5`}
            />

            <label className={labelClass}>
              Amount (LKR)
            </label>

            <input
              type="number"
              min="1"
              step="1"
              value={txAmount}
              onChange={(e) => setTxAmount(e.target.value)}
              required
              placeholder="Enter amount"
              className={`${inputClass} mb-5`}
            />

            <div className="grid grid-cols-2 gap-3">

              <div>
                <label className={labelClass}>Type</label>

                <select
                  value={txType}
                  onChange={(e) =>
                    setTxType(e.target.value as Transaction['type'])
                  }
                  className={inputClass}
                >
                  <option>Expense</option>
                  <option>Income</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Category</label>

                <select
                  value={txCategory}
                  onChange={(e) => setTxCategory(e.target.value)}
                  className={inputClass}
                >
                  <option>Other</option>
                  <option>Food</option>
                  <option>Bills</option>
                  <option>Transport</option>
                  <option>Education</option>
                  <option>Salary</option>
                  <option>Shopping</option>
                </select>
              </div>

            </div>

            <div className="mt-7 flex justify-end gap-2">

              <button
                type="button"
                onClick={() => setTransactionModal(false)}
                className="rounded-xl border border-white/10 px-4 py-2.5 text-xs font-semibold text-slate-300 transition hover:bg-white/5"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-xl bg-cyan-500 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-cyan-600"
              >
                Save Transaction
              </button>

            </div>

          </form>

        </Modal>
      )}

    </div>
  );
}
