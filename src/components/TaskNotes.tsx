import React, { useState } from 'react';
import { 
  CheckSquare, 
  Plus, 
  Search, 
  CheckCircle2, 
  Circle, 
  Trash2, 
  Pencil, 
  FileText, 
  Tag, 
  Calendar,
  AlertCircle
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  due: string;
  completed: boolean;
}

export default function TasksAndNotes() {
  const [activeTab, setActiveTab] = useState<'tasks' | 'notes'>('tasks');
  const [filter, setFilter] = useState<'All' | 'Active' | 'Completed'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // UI Mock Tasks
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Design Database Schema for LifeOS', category: 'Development', priority: 'High', due: '2026-11-20', completed: false },
    { id: '2', title: 'Complete Cloud Computing Assignment', category: 'Academics', priority: 'High', due: '2026-11-22', completed: false },
    { id: '3', title: 'Setup Tauri Backend Rust Integration', category: 'Development', priority: 'Medium', due: '2026-11-25', completed: true },
    { id: '4', title: 'Monthly Financial & Budget Review', category: 'Finance', priority: 'Low', due: '2026-11-30', completed: false },
  ]);

  // UI Mock Notes
  const [notes, setNotes] = useState([
    { id: '1', title: 'Project Architecture Ideas', date: 'Nov 15, 2026', snippet: 'Keep components modular. Use React state for layout prototyping first...' },
    { id: '2', title: 'API & AI Endpoints', date: 'Nov 12, 2026', snippet: 'Plan local LLM integration or REST wrappers for smart assistance features.' },
  ]);

  const [newNoteText, setNewNoteText] = useState('');

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'All' ? true : filter === 'Active' ? !t.completed : t.completed;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-7 pb-8">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <CheckSquare size={16} />
            Productivity Hub
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Tasks & Notes</h1>
          <p className="text-sm text-slate-400 mt-1">Manage your detailed to-do lists, priorities, and quick notes.</p>
        </div>

        {/* TOP TABS (Tasks / Notes Switcher) */}
        <div className="flex bg-[#101a2b] border border-white/[0.07] p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('tasks')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${
              activeTab === 'tasks' ? 'bg-cyan-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Tasks ({tasks.filter(t => !t.completed).length})
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${
              activeTab === 'notes' ? 'bg-cyan-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Notes ({notes.length})
          </button>
        </div>
      </div>

      {activeTab === 'tasks' ? (
        /* TASKS VIEW */
        <div className="space-y-5">
          
          {/* CONTROLS BAR (Filters & Search) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#101a2b] border border-white/[0.07] p-4 rounded-2xl">
            <div className="flex items-center gap-2">
              {(['All', 'Active', 'Completed'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                    filter === f ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-400/30' : 'bg-[#0b1423] text-slate-400 border border-white/[0.05] hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="relative flex-1 max-w-sm">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search tasks or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0b1423] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* TASK CARDS LIST */}
          <div className="grid gap-3">
            {filteredTasks.length > 0 ? (
              filteredTasks.map(task => (
                <div 
                  key={task.id}
                  className="flex items-center justify-between gap-4 bg-[#101a2b] border border-white/[0.07] p-4 rounded-2xl hover:border-cyan-400/20 transition"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <button 
                      onClick={() => toggleTask(task.id)}
                      className="text-slate-500 hover:text-cyan-400 transition shrink-0"
                    >
                      {task.completed ? (
                        <CheckCircle2 size={20} className="text-emerald-400" />
                      ) : (
                        <Circle size={20} />
                      )}
                    </button>
                    <div className="min-w-0">
                      <p className={`text-sm font-semibold truncate ${task.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                        {task.title}
                      </p>
                      <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-500">
                        <span className="flex items-center gap-1 text-cyan-400/80">
                          <Tag size={11} /> {task.category}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Calendar size={11} /> Due {task.due}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold ${
                      task.priority === 'High' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                      task.priority === 'Medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                      'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {task.priority}
                    </span>
                    <button 
                      onClick={() => deleteTask(task.id)}
                      className="p-2 text-slate-600 hover:text-rose-400 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-[#101a2b] border border-white/[0.07] rounded-2xl p-12 text-center text-slate-500">
                <AlertCircle size={28} className="mx-auto mb-2 text-slate-600" />
                <p className="text-sm">No tasks found matching your criteria.</p>
              </div>
            )}
          </div>

        </div>
      ) : (
        /* NOTES VIEW */
        <div className="space-y-6">
          
          {/* CREATE NOTE BOX */}
          <div className="bg-[#101a2b] border border-white/[0.07] p-5 rounded-2xl space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <FileText size={16} className="text-cyan-400" />
              Quick Scratchpad Note
            </h3>
            <textarea
              rows={3}
              placeholder="Jot down a quick thought or meeting note..."
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
              className="w-full bg-[#0b1423] border border-white/10 rounded-xl p-3.5 text-xs text-white outline-none focus:border-cyan-400 resize-none"
            />
            <div className="flex justify-end">
              <button
                onClick={() => {
                  if (!newNoteText.trim()) return;
                  setNotes([{ id: String(Date.now()), title: 'Quick Note', date: 'Today', snippet: newNoteText }, ...notes]);
                  setNewNoteText('');
                }}
                className="flex items-center gap-2 px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-xl transition shadow-lg shadow-cyan-500/20"
              >
                <Plus size={15} /> Save Note
              </button>
            </div>
          </div>

          {/* NOTES GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {notes.map(note => (
              <div key={note.id} className="bg-[#101a2b] border border-white/[0.07] p-5 rounded-2xl flex flex-col justify-between space-y-4 hover:border-cyan-400/20 transition">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-white">{note.title}</h4>
                    <span className="text-[10px] text-slate-500">{note.date}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{note.snippet}</p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-white/[0.05] text-slate-500 text-[11px]">
                  <span>Local storage ready</span>
                  <button className="hover:text-cyan-400 transition"><Pencil size={14} /></button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}