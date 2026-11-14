import { Activity, Bell, CalendarDays, CheckCircle2, Clock3, Flame, Plus, Search, Sparkles, TrendingUp, X } from 'lucide-react';
import React, { useState } from 'react';

const TZ = 'Asia/Colombo'; // Sri Lanka Time Zone

const colomboHour = () =>
    parseInt(
        new Date().toLocaleString('en-US', {
            timeZone: TZ,
            hour: 'numeric',
            hour12: false,
        }),
        10
    ) % 24;

const Dashboard: React.FC = () => {

    const [showNotification, setShowNotifications] = useState(false); // Notification එක දැක්වීමේ state එක
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false); // Task Modal එක open/close කිරීමේ state එක

    // දත්ත හා ප්‍රස්තාර සදහා අවශය සාම්පල දත්ත
    const stats = [
        {
            label: 'Active Tasks',
            value: 12,
            change: '3 completed today',
            icon: CheckCircle2,
            color: 'text-cyan-400',
            bg: 'bg-cyan-400/10',
        },
        {
            label: 'Focuc Sessions',
            value: 4,
            change: '100 min focused',
            icon: Clock3,
            color: 'text-blue-400',
            bg: 'bg-blue-400/10',
        },
        {
            label: 'Habit Streak',
            value: '5 d',
            change: 'Consistent build',
            icon: Flame,
            color: 'text-amber-400',
            bg: 'bg-amber-400/10',
        },
        {
            label: 'Productivity',
            value: '88%',
            change: '+5% this week',
            icon: TrendingUp,
            color: 'text-emerald-400',
            bg: 'bg-emerald-400/10',
        },
    ];

    const weeklyActivity = [
        { day: 'Mon', value: 65 },
        { day: 'Tue', value: 80 },
        { day: 'Wed', value: 55 },
        { day: 'Thu', value: 90 },
        { day: 'Fri', value: 70 },
        { day: 'Sat', value: 85 },
        { day: 'Sun', value: 60 },
    ];

    const todayIdx = 4;

    const formattedDate = new Date().toLocaleDateString('en-US', {
        timeZone: TZ,
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    const hour = colomboHour();
    const greeting = hour < 12 ? 'Good Mornaing' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

    const notifications = [
        { id: '1', text: 'Welcome to LifeOS Desktop Workspace!', warn: false },
        { id: '2', text: 'System running smoothly on Tauri & React.', warn: false },
    ];

    return (
        <div className='min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-7'>
            <header className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5'>
                <div>
                    <div className='flex items-center gap-2 text-sm text-cyan-400 mb-2'>
                        <Sparkles size={15} />
                        <span>PERSONAL WORKSPACE</span>
                    </div>
                    <h1 className='text-2xl sm:text-3xl font-bold tracking-tight'>
                        {greeting}, Welcome Back!
                    </h1>
                    <p className='text-sm text-slate-400 mt-2'>
                        Here's what's happening with your life today.
                    </p>
                    <p className='text-xs text-slate-500 mt-2'>
                        <CalendarDays size={13} className='inline mr-2' />
                        {formattedDate}
                    </p>
                </div>

                <div className='flex items-center gap-3 relative'>
                    <button
                        className='p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 transition'
                        aria-label='Search'>
                        <Search size={19} />
                    </button>

                    <button
                        className='relative p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition'
                        aria-label='Notifications'
                        onClick={() => setShowNotifications((v) => !v)}>
                        <Bell size={19} />
                        <span className='absolute top-2 right-2 w-2 h-2 bg-cyan-400 rounded-full'></span>
                    </button>

                    {showNotification && (
                        <div className='absolute right-0 top-14 z-40 w-72 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-2xl space-y-3'>
                            <div className='flex items-center justify-between'>
                                <h4 className='text-sm font-semibold'>
                                    Notifications
                                </h4>
                                <button
                                    onClick={() => setShowNotifications(false)}
                                    className='text-slate-500 hover:text-white'>
                                    <X size={16} />
                                </button>
                            </div>
                            {notifications.map((n) => (
                                <div key={n.id} className='flex gap-2 text-xs text-slate-300'>
                                    <Bell size={14} className='text-cyan-400 shrink-0 mt-0.5' />
                                    <span>{n.text}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    <button
                        onClick={() => setIsTaskModalOpen(true)}
                        className='flex items-center gap-2 px-4 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-sm font-semibold rounded-xl transition shadow-lg shadow-cyan-500/10 whitespace-nowrap'>
                        <Plus size={18} />
                        Add Task
                    </button>
                </div>
            </header>

            <section className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4'>
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={stat.label}
                            className='bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 hover:-translate-y-1 transition-all duration-300'>
                            <div className='flex justify-between items-center'>
                                <p className='text-sm font-medium text-slate-400'>{stat.label}</p>
                                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                    <Icon size={21} />
                                </div>
                            </div>
                            <div className='mt-2'>
                                <h2 className='text-3xl font-bold tracking-tight'>{stat.value}</h2>
                                <p className='flex items-center gap-1 text-xs text-slate-500 mt-2'>
                                    <TrendingUp size={14} className="text-emerald-400" />
                                    {stat.change}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </section>

            <section className='bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6'>
                <div className='flex items-center justify-between mb-7'>
                    <div>
                        <h3 className='font-semibold text-lg'>Productivity Overview</h3>
                        <p className='text-xs text-slate-500 mt-1'>Your weekly activity summary</p>
                    </div>

                    <div className='flex items-center gap-2 text-xs text-cyan-400'>
                        <Activity size={15} />
                        Weekly
                    </div>
                </div>

                <div className='flex items-end justify-between gap-3 h-44'>
                    {weeklyActivity.map((item, i) => (
                        <div key={item.day}
                            className='flex-1 flex flex-col items-center justify-end gap-3 h-full'>
                            <div className='w-full flex-1 flex items-end justify-center'>
                                <div
                                    className={`w-full max-w-12 rounded-t-lg transition-all duration-500 ${i === todayIdx ? 'bg-cyan-400' : 'bg-cyan-500/25 hover:bg-cyan-500/50'
                                        }`}
                                    style={{ height: `${item.value}%` }}
                                    title={`${item.value}% activity`} />
                            </div>
                            <span className='text-xs text-slate-500'>{item.day}</span>
                        </div>
                    ))}
                </div>

                <div className='mt-6 pt-5 border-t border-slate-800 flex justify-between items-center'>
                    <div>
                        <p className='text-xs text-slate-500'>Weekly average</p>
                        <p className='text-xl font-bold mt-2'>
                            {Math.round(weeklyActivity.reduce((s, i) =>
                                s + i.value, 0) / weeklyActivity.length)}%
                        </p>
                    </div>
                    <div className='flex items-center gap-2 text-xs text-emerald-400'>
                        <TrendingUp size={16} />
                        Keep it up!
                    </div>
                </div>
            </section>

            <div className="p-8 border border-dashed border-slate-800 rounded-2xl text-center text-slate-500">
                Step 1 Complete! Header & Layout initialized successfully.
            </div>
        </div>
    );
}

export default Dashboard;