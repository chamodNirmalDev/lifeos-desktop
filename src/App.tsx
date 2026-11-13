import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import Dashboard from './components/Dashboard';

export function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* වම්පස Sidebar එක */}
      <Sidebar 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      isCollapsed={isCollapsed}
      setIsCollapsed={setIsCollapsed} />

      {/* දකුණුපස Main Content එක */}
      <div className="flex-1 flex flex-col p-8 overflow-y-auto">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab !== 'dashboard' && (
          <div>
            <h1 className="text-2xl font-bold capitalize">
              {activeTab} Page
            </h1>
            <p className="text-slate-400 mt-2">
              Content for the selected page.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;