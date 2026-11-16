import React, { useState } from 'react';
import {
  Settings,
  User,
  Database,
  Sparkles,
  Bell,
  Shield,
  Palette,
  Check,
  HardDrive,
  Key,
  RefreshCw,
} from 'lucide-react';

export default function SettingsView() {
  const [activeSection, setActiveSection] = useState<'general' | 'database' | 'ai' | 'notifications'>('general');
  const [savedToast, setSavedToast] = useState(false);

  // UI Preview States
  const [workspaceName, setWorkspaceName] = useState('Personal Workspace');
  const [currency, setCurrency] = useState('LKR (Rs.)');
  const [timezone, setTimezone] = useState('Asia/Colombo (GMT+5:30)');
  const [dbType, setDbType] = useState<'sqlite' | 'postgres'>('sqlite');
  const [aiProvider, setAiProvider] = useState<'ollama' | 'gemini' | 'openai'>('gemini');
  const [apiKey, setApiKey] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [focusSoundEnabled, setFocusSoundEnabled] = useState(true);

  const triggerSaveFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  const navItems = [
    { id: 'general', label: 'General & Profile', icon: User },
    { id: 'database', label: 'Database & Storage', icon: Database },
    { id: 'ai', label: 'AI Integration', icon: Sparkles },
    { id: 'notifications', label: 'Notifications & Audio', icon: Bell },
  ] as const;

  return (
    <div className="space-y-7 pb-8">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
            <Settings size={16} />
            Preferences
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Settings</h1>
          <p className="mt-1 text-sm text-slate-400">
            Configure your workspace, database connections, and AI assistant preferences.
          </p>
        </div>

        {savedToast && (
          <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-xs font-semibold text-emerald-400 shadow-lg">
            <Check size={15} />
            UI preferences updated!
          </div>
        )}
      </div>

      {/* SETTINGS LAYOUT GRID */}
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        
        {/* LEFT SETTINGS MENU */}
        <div className="space-y-1.5 rounded-2xl border border-white/[0.07] bg-[#101a2b]/90 p-3 self-start">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-xs font-semibold transition ${
                  isActive
                    ? 'bg-cyan-500/[0.14] text-cyan-300'
                    : 'text-slate-400 hover:bg-white/[0.04] hover:text-white'
                }`}
              >
                <Icon size={17} className={isActive ? 'text-cyan-400' : 'text-slate-500'} />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* RIGHT SETTINGS PANEL */}
        <form
          onSubmit={triggerSaveFeedback}
          className="rounded-2xl border border-white/[0.07] bg-[#101a2b]/90 p-6 shadow-xl space-y-6"
        >
          {activeSection === 'general' && (
            <div className="space-y-6">
              <div className="border-b border-white/[0.06] pb-4">
                <h2 className="text-lg font-bold text-white">General & Workspace Profile</h2>
                <p className="mt-1 text-xs text-slate-500">Manage your personal workspace identity and regional formats.</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-xl font-bold text-white shadow-lg shadow-cyan-500/20">
                  CN
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Chamod Nirmal</h3>
                  <p className="text-xs text-slate-400">LifeOS Desktop · Local Edition</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-300">Workspace Name</label>
                  <input
                    type="text"
                    value={workspaceName}
                    onChange={(e) => setWorkspaceName(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#0b1423] px-3.5 py-2.5 text-sm text-white outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-300">Default Currency</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#0b1423] px-3.5 py-2.5 text-sm text-white outline-none focus:border-cyan-400"
                  >
                    <option>LKR (Rs.)</option>
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-semibold text-slate-300">Timezone</label>
                  <input
                    type="text"
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#0b1423] px-3.5 py-2.5 text-sm text-white outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="rounded-xl border border-white/[0.06] bg-[#0b1423] p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Palette size={18} className="text-cyan-400" />
                  <div>
                    <p className="text-xs font-semibold text-white">Interface Theme</p>
                    <p className="text-[11px] text-slate-500">Deep Slate & Cyan Dark Mode (Locked)</p>
                  </div>
                </div>
                <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-[10px] font-semibold text-cyan-400">
                  Active
                </span>
              </div>
            </div>
          )}

          {activeSection === 'database' && (
            <div className="space-y-6">
              <div className="border-b border-white/[0.06] pb-4">
                <h2 className="text-lg font-bold text-white">Database & Storage Architecture</h2>
                <p className="mt-1 text-xs text-slate-500">
                  Ready for backend integration (Tauri SQLite or PostgreSQL).
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setDbType('sqlite')}
                  className={`flex items-start gap-3 rounded-xl border p-4 text-left transition ${
                    dbType === 'sqlite'
                      ? 'border-cyan-400 bg-cyan-500/[0.08]'
                      : 'border-white/[0.06] bg-[#0b1423] hover:border-white/15'
                  }`}
                >
                  <HardDrive size={20} className="mt-0.5 text-cyan-400 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-white">Local SQLite (Tauri)</p>
                    <p className="mt-1 text-[11px] text-slate-400">Fast offline-first embedded storage.</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDbType('postgres')}
                  className={`flex items-start gap-3 rounded-xl border p-4 text-left transition ${
                    dbType === 'postgres'
                      ? 'border-cyan-400 bg-cyan-500/[0.08]'
                      : 'border-white/[0.06] bg-[#0b1423] hover:border-white/15'
                  }`}
                >
                  <Database size={20} className="mt-0.5 text-emerald-400 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-white">PostgreSQL Server</p>
                    <p className="mt-1 text-[11px] text-slate-400">Relational DB with JSONB support.</p>
                  </div>
                </button>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-300">Connection String / File Path</label>
                <input
                  type="text"
                  placeholder={
                    dbType === 'sqlite'
                      ? 'sqlite:lifeos_local.db'
                      : 'postgresql://user:password@localhost:5432/lifeos'
                  }
                  className="w-full rounded-xl border border-white/10 bg-[#0b1423] px-3.5 py-2.5 font-mono text-xs text-slate-300 outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex items-center justify-between rounded-xl border border-amber-500/20 bg-amber-500/[0.05] p-4">
                <div className="flex items-center gap-2.5 text-xs text-amber-300">
                  <Shield size={16} />
                  <span>UI Design Mode: Database driver not yet connected.</span>
                </div>
                <button
                  type="button"
                  className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold text-slate-300 hover:text-white"
                >
                  <RefreshCw size={12} /> Test UI
                </button>
              </div>
            </div>
          )}

          {activeSection === 'ai' && (
            <div className="space-y-6">
              <div className="border-b border-white/[0.06] pb-4">
                <h2 className="text-lg font-bold text-white">AI Assistant Configuration</h2>
                <p className="mt-1 text-xs text-slate-500">
                  Configure LLM endpoints for smart task insights and daily summaries.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-300">AI Provider</label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'gemini', label: 'Google Gemini' },
                    { id: 'ollama', label: 'Local Ollama' },
                    { id: 'openai', label: 'OpenAI API' },
                  ].map((provider) => (
                    <button
                      key={provider.id}
                      type="button"
                      onClick={() => setAiProvider(provider.id as 'ollama' | 'gemini' | 'openai')}
                      className={`rounded-xl border py-3 text-xs font-semibold transition ${
                        aiProvider === provider.id
                          ? 'border-cyan-400 bg-cyan-500/[0.12] text-cyan-300'
                          : 'border-white/[0.06] bg-[#0b1423] text-slate-400 hover:text-white'
                      }`}
                    >
                      {provider.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                  <Key size={13} className="text-cyan-400" />
                  {aiProvider === 'ollama' ? 'Local Endpoint URL' : 'API Key'}
                </label>
                <input
                  type={aiProvider === 'ollama' ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder={
                    aiProvider === 'ollama'
                      ? 'http://localhost:11434'
                      : 'Enter your API key when ready to connect...'
                  }
                  className="w-full rounded-xl border border-white/10 bg-[#0b1423] px-3.5 py-2.5 text-sm text-white outline-none focus:border-cyan-400"
                />
              </div>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="space-y-6">
              <div className="border-b border-white/[0.06] pb-4">
                <h2 className="text-lg font-bold text-white">Notifications & Audio</h2>
                <p className="mt-1 text-xs text-slate-500">Control desktop alerts and focus timer sound cues.</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-[#0b1423] p-4">
                  <div>
                    <p className="text-sm font-semibold text-white">Desktop Reminders</p>
                    <p className="text-xs text-slate-500">Show alerts for upcoming tasks and deadlines</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                    className={`h-6 w-11 rounded-full transition ${
                      notificationsEnabled ? 'bg-cyan-500' : 'bg-slate-700'
                    }`}
                  >
                    <span
                      className={`block h-4 w-4 rounded-full bg-white transition-transform ${
                        notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-[#0b1423] p-4">
                  <div>
                    <p className="text-sm font-semibold text-white">Focus Timer Chime</p>
                    <p className="text-xs text-slate-500">Play a subtle sound when a 25-minute session ends</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFocusSoundEnabled(!focusSoundEnabled)}
                    className={`h-6 w-11 rounded-full transition ${
                      focusSoundEnabled ? 'bg-cyan-500' : 'bg-slate-700'
                    }`}
                  >
                    <span
                      className={`block h-4 w-4 rounded-full bg-white transition-transform ${
                        focusSoundEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SAVE BUTTON */}
          <div className="flex justify-end border-t border-white/[0.06] pt-5">
            <button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-cyan-500/20 transition hover:brightness-110"
            >
              Save Preferences
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}