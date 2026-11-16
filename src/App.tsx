
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import Dashboard from './components/Dashboard';
import { Bell, Search, Command } from 'lucide-react';
import TaskNotes from './components/TaskNotes';
import CalendarView from './components/CalenderView';
import FinancesView from './components/FinanceView';

export function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const pageTitles: Record<string, string> = {
    dashboard: 'Dashboard',
    tasks: 'Tasks & Notes',
    calendar: 'Calendar',
    finances: 'Finances',
    settings: 'Settings',
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#080d19] text-slate-100">

      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      <main className="relative flex min-w-0 flex-1 flex-col overflow-hidden">

        {/* Background decoration */}
        <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-cyan-500/[0.06] blur-[120px]" />

        {/* Top Navigation */}
        <header className="relative z-10 flex h-[76px] shrink-0 items-center justify-between border-b border-white/[0.06] bg-[#0b1220]/80 px-5 backdrop-blur-xl md:px-8">

          <div className="flex items-center gap-3">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
                Workspace
              </p>
              <h2 className="mt-0.5 text-lg font-semibold text-white">
                {pageTitles[activeTab] || 'LifeOS'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">

            <div className="hidden items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2 lg:flex">
              <Search size={15} className="text-slate-500" />
              <span className="text-xs text-slate-500">Search workspace...</span>
              <kbd className="ml-6 rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-slate-400">
                <Command size={10} />
              </kbd>
            </div>

            <button
              aria-label="Notifications"
              className="relative rounded-xl border border-white/[0.07] bg-white/[0.03] p-2.5 text-slate-400 transition hover:bg-white/[0.08] hover:text-white"
            >
              <Bell size={17} />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-cyan-400" />
            </button>

            <div className="flex items-center gap-2.5 border-l border-white/[0.08] pl-3">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-sm font-bold text-white shadow-lg shadow-cyan-500/20">
                CN
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-semibold text-white">My Workspace</p>
                <p className="text-[10px] text-slate-500">Personal account</p>
              </div>
            </div>

          </div>
        </header>

        {/* Main Content */}
        <div className="relative flex-1 overflow-y-auto p-5 md:p-8">
          <div className="mx-auto w-full max-w-[1600px]">
            {activeTab === 'dashboard' ? (
              <Dashboard />
            ) : activeTab === 'tasks' ? (
              <TaskNotes />) :
              activeTab === 'calendar' ? (
                <CalendarView />) :
                activeTab === 'finances' ? (
                  <FinancesView />) : (
                  <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
                    <div className="mb-4 rounded-2xl border border-cyan-400/10 bg-cyan-400/10 p-5 text-cyan-400">
                      <Command size={30} />
                    </div>
                    <h1 className="text-2xl font-bold text-white">
                      {pageTitles[activeTab] || activeTab}
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                      This module is coming soon.
                    </p>
                  </div>
                )}
          </div>
        </div>

      </main>
    </div>
  );
}

export default App;
