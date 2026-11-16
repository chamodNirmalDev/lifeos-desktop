import React from 'react';
import {
  LayoutDashboard,
  CheckSquare,
  CalendarDays,
  Wallet,
  Settings,
  ChevronLeft,
  ChevronRight,
  Activity,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks', label: 'Tasks & Notes', icon: CheckSquare },
    { id: 'calendar', label: 'Calendar', icon: CalendarDays },
    { id: 'finances', label: 'Finances', icon: Wallet },
  ];

  const isSettingsActive = activeTab === 'settings';

  return (
    <aside
      className={`relative z-20 flex h-screen shrink-0 flex-col border-r border-white/[0.06] bg-[#0b1220] transition-all duration-300 ${
        isCollapsed ? 'w-[78px]' : 'w-[260px]'
      }`}
    >
      {/* Brand */}
      <div
        className={`flex h-[76px] shrink-0 items-center border-b border-white/[0.06] ${
          isCollapsed ? 'justify-center px-2' : 'gap-3 px-6'
        }`}
      >
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-lg shadow-cyan-500/20">
          <Activity size={22} />
        </div>

        {!isCollapsed && (
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              Life<span className="text-cyan-400">OS</span>
            </h1>
            <p className="text-[10px] font-medium tracking-[0.16em] text-slate-500">
              PERSONAL WORKSPACE
            </p>
          </div>
        )}
      </div>

      {/* Collapse button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className="absolute -right-3 top-[88px] z-30 grid h-7 w-7 place-items-center rounded-full border border-white/10 bg-[#172235] text-slate-400 shadow-lg transition hover:border-cyan-400/50 hover:bg-cyan-500 hover:text-white"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Navigation */}
      <nav className="flex-1 space-y-7 overflow-y-auto px-3 py-7">
        {/* Workspace Section */}
        <div>
          {!isCollapsed && (
            <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">
              Workspace
            </p>
          )}

          <div className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  title={isCollapsed ? item.label : undefined}
                  className={`group relative flex w-full items-center rounded-xl py-3 text-sm font-medium transition-all duration-200 ${
                    isCollapsed ? 'justify-center px-0' : 'gap-3 px-3.5'
                  } ${
                    active
                      ? 'bg-cyan-500/[0.12] text-cyan-300'
                      : 'text-slate-400 hover:bg-white/[0.04] hover:text-white'
                  }`}
                >
                  {active && (
                    <span className="absolute bottom-2 left-0 top-2 w-[3px] rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.7)]" />
                  )}

                  <Icon
                    size={19}
                    className={`shrink-0 transition-transform duration-200 ${
                      active
                        ? 'text-cyan-400'
                        : 'text-slate-500 group-hover:scale-110 group-hover:text-slate-200'
                    }`}
                  />

                  {!isCollapsed && (
                    <span className="truncate">{item.label}</span>
                  )}

                  {!isCollapsed && active && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Preferences Section (Settings Tab) */}
        <div>
          {!isCollapsed && (
            <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600">
              Preferences
            </p>
          )}

          <button
            onClick={() => setActiveTab('settings')}
            title={isCollapsed ? 'Settings' : undefined}
            className={`group relative flex w-full items-center rounded-xl py-3 text-sm font-medium transition-all duration-200 ${
              isCollapsed ? 'justify-center px-0' : 'gap-3 px-3.5'
            } ${
              isSettingsActive
                ? 'bg-cyan-500/[0.12] text-cyan-300'
                : 'text-slate-400 hover:bg-white/[0.04] hover:text-white'
            }`}
          >
            {isSettingsActive && (
              <span className="absolute bottom-2 left-0 top-2 w-[3px] rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.7)]" />
            )}

            <Settings
              size={19}
              className={`shrink-0 transition-transform duration-200 ${
                isSettingsActive
                  ? 'text-cyan-400'
                  : 'text-slate-500 group-hover:scale-110 group-hover:text-slate-200'
              }`}
            />

            {!isCollapsed && <span className="truncate">Settings</span>}

            {!isCollapsed && isSettingsActive && (
              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-cyan-400" />
            )}
          </button>
        </div>
      </nav>

      {/* Upgrade / workspace card */}
      {!isCollapsed && (
        <div className="mx-3 mb-4 rounded-2xl border border-cyan-400/10 bg-gradient-to-br from-cyan-500/[0.10] to-blue-500/[0.04] p-4">
          <div className="mb-2 flex items-center gap-2 text-cyan-400">
            <Activity size={16} />
            <span className="text-xs font-semibold">LifeOS Workspace</span>
          </div>
          <p className="text-[11px] leading-5 text-slate-400">
            Keep your goals, tasks and daily progress in one place.
          </p>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
          </div>
        </div>
      )}

      {/* Footer */}
      <div
        className={`flex shrink-0 items-center border-t border-white/[0.06] py-4 ${
          isCollapsed ? 'justify-center px-2' : 'justify-between px-5'
        }`}
      >
        {!isCollapsed && (
          <span className="text-[10px] text-slate-600">LifeOS v0.2.0</span>
        )}
        <div className="flex items-center gap-2" title="Application connected">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
          {!isCollapsed && (
            <span className="text-[10px] font-medium text-emerald-400">
              System Online
            </span>
          )}
        </div>
      </div>
    </aside>
  );
};