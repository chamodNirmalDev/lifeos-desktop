import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';

export function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* වම්පස Sidebar එක */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* දකුණුපස Main Content එක */}
      <div className="flex-1 flex flex-col p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold capitalize">
          {activeTab} Page
        </h1>
        <p className="text-slate-400 mt-2">
          LifeOS ඩිස්ක්ටොප් ඇප් එකේ ප්‍රධාන පිටුව මෙහි පෙන්වනු ලැබේ.
        </p>
      </div>
    </div>
  );
}

export default App;