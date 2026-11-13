import React from 'react';
import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  Wallet,
  Settings,
  ChevronLeft,
  ChevronRight,
  Activity
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
  setIsCollapsed
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks', label: 'Tasks & Notes', icon: CheckSquare },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'finances', label: 'Finances', icon: Wallet },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    // isCollapsed අනුව පළල w-20 (හැකිළුණු විට) හෝ w-64 (දිගහැරුණු විට) ලෙස වෙනස් වේ
    <div
      className={`relative bg-slate-900 border-r border-slate-800 flex flex-col h-screen select-none transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'
        }`}
    >

      {/* Sidebar එක හකුලුවන සහ දිගහරින පොඩි බටන් එක */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        className="absolute -right-3 top-7 z-20 bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-cyan-500 hover:border-cyan-400 rounded-full p-1 shadow-md transition-colors"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Header කොටස */}
      <div className={`p-6 border-b border-slate-800 flex items-center ${isCollapsed ? 'justify-center px-2' : ''}`}>
        {isCollapsed ? (
          // හැකිළුණු විට කෙටි Logo එක පමණක් පෙන්වයි
          <div className='p-2 bg-cyan-500/10 text-cyan-400 rounded-xl shrink-0'>
            <Activity size={22} />
          </div>
        ) : (
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              LifeOS
            </h1>
            <p className="text-xs text-slate-400 mt-1">Desktop Workspace</p>
          </div>
        )}
      </div>

      {/* මෙනු බටන්ස් කොටස */}
      <div className="flex-1 py-4 space-y-1.5 px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              title={isCollapsed ? item.label : undefined} // හැකිළුණු විට Hover කළ විට නම පෙන්වයි
              className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0' : 'gap-3 px-4'
                } py-3 rounded-xl text-sm font-medium transition-all ${isActive
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
            >
              <Icon size={20} className="shrink-0" />
              {/* දිගහැරී ඇති විට පමණක් මෙනු නම පෙන්වයි */}
              {!isCollapsed && <span className="truncate">{item.label}</span>}
            </button>
          );
        })}
      </div>

      {/* Footer කොටස */}
      <div className={`p-4 border-t border-slate-800 text-xs text-slate-500 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'
        }`}>
        {!isCollapsed && <span>v0.1.0-alpha</span>}
        <span className="flex items-center gap-1.5 text-emerald-400" title="Connected">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          {!isCollapsed && 'Connected'}
        </span>
      </div>

    </div>
  );
};