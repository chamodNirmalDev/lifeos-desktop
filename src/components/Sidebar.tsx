import React from 'react';
import { LayoutDashboard, CheckSquare, Calendar, Wallet, Settings } from 'lucide-react';

// 1. Sidebar එකට ලැබෙන Props වල වර්ග (Types) අර්ථ දැක්වීම
interface SidebarProps {
  activeTab: string; // දැනට තෝරාගෙන ඇති ටැබ් එකේ නම
  setActiveTab: (tab: string) => void; // ටැබ් එක වෙනස් කරන function එක
}

// 2. Props ලෙස activeTab සහ setActiveTab ලබා ගැනීම
export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks', label: 'Tasks & Notes', icon: CheckSquare },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'finances', label: 'Finances', icon: Wallet },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen select-none">
      
      {/* Header කොටස */}
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          LifeOS
        </h1>
        <p className="text-xs text-slate-400 mt-1">Desktop Workspace</p>
      </div>

      {/* මෙනු බටන්ස් කොටස */}
      <div className="flex-1 py-4 space-y-1 px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id; // දැනට ක්ලික් කර ඇති ටැබ් එක මෙය දැයි පරීක්ෂා කිරීම
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)} // බටන් එක ක්ලික් කළ විට activeTab එක වෙනස් කිරීම
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' // ටැබ් එක තෝරාගෙන ඇති විට පෙනෙන පාට
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60' // සාමාන්‍ය සහ Hover අවස්ථා
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Footer කොටස */}
      <div className="p-4 border-t border-slate-800 text-xs text-slate-500 flex items-center justify-between">
        <span>v0.1.0-alpha</span>
        <span className="flex items-center gap-1.5 text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Connected
        </span>
      </div>

    </div>
  );
};