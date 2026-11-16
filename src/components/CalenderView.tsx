import React, { useState } from 'react';
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  MapPin,
  Tag,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

interface EventItem {
  id: string;
  title: string;
  time: string;
  category: 'Academics' | 'Development' | 'Personal';
  location?: string;
  date: number; // Day of month
}

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// November 2026 starts on a Sunday (offset 6 for Monday-start grid)
const MOCK_DAYS = Array.from({ length: 30 }, (_, i) => i + 1);

const initialEvents: EventItem[] = [
  { id: '1', title: 'Cloud Computing Quiz', time: '10:00 AM - 11:30 AM', category: 'Academics', location: 'Online Portal', date: 19 },
  { id: '2', title: 'LifeOS UI Architecture Review', time: '02:00 PM - 03:30 PM', category: 'Development', location: 'Local Workspace', date: 16 },
  { id: '3', title: 'Database Assignment Submission', time: '11:59 PM', category: 'Academics', location: 'LMS', date: 22 },
  { id: '4', title: 'Weekly Planning & Review', time: '06:00 PM - 07:00 PM', category: 'Personal', date: 29 },
];

const categoryBadge: Record<EventItem['category'], string> = {
  Academics: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  Development: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  Personal: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
};

export default function CalendarView() {
  const [selectedDay, setSelectedDay] = useState<number>(16); // Default to Nov 16
  const [events] = useState<EventItem[]>(initialEvents);

  const selectedDayEvents = events.filter((e) => e.date === selectedDay);

  return (
    <div className="space-y-7 pb-8">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <CalendarDays size={16} />
            Schedule & Timeline
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Calendar</h1>
          <p className="text-sm text-slate-400 mt-1">Plan your month, track deadlines, and organize events.</p>
        </div>

        <button
          onClick={() => alert('Add Event Modal UI coming soon!')}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 text-xs font-bold text-white shadow-lg shadow-cyan-500/20 transition hover:brightness-110 self-start sm:self-auto"
        >
          <Plus size={16} />
          New Event
        </button>
      </div>

      {/* MAIN CALENDAR GRID + SIDE SCHEDULE */}
      <div className="grid gap-6 xl:grid-cols-[1.65fr_1fr]">
        
        {/* LEFT: MONTHLY CALENDAR GRID */}
        <div className="rounded-2xl border border-white/[0.07] bg-[#101a2b]/90 p-6 shadow-xl">
          
          {/* Month Navigation */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">November 2026</h2>
              <p className="text-xs text-slate-500">Click any date to view scheduled events</p>
            </div>

            <div className="flex items-center gap-2">
              <button className="rounded-xl border border-white/10 bg-[#0b1423] p-2 text-slate-400 transition hover:bg-white/5 hover:text-white">
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setSelectedDay(16)}
                className="rounded-xl border border-white/10 bg-[#0b1423] px-3.5 py-2 text-xs font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                Today
              </button>
              <button className="rounded-xl border border-white/10 bg-[#0b1423] p-2 text-slate-400 transition hover:bg-white/5 hover:text-white">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Days Header */}
          <div className="mb-3 grid grid-cols-7 gap-2 text-center">
            {DAYS_OF_WEEK.map((day) => (
              <div key={day} className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Cells */}
          <div className="grid grid-cols-7 gap-2">
            {/* Empty offset cells for Nov 1 (Sunday -> 6 empty slots before it) */}
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={`empty-${idx}`} className="h-20 rounded-xl bg-white/[0.01] border border-transparent" />
            ))}

            {MOCK_DAYS.map((day) => {
              const isSelected = day === selectedDay;
              const isToday = day === 16;
              const dayEvents = events.filter((e) => e.date === day);

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`group relative flex h-20 flex-col justify-between rounded-xl border p-2.5 text-left transition-all ${
                    isSelected
                      ? 'border-cyan-400 bg-cyan-500/[0.12] shadow-lg shadow-cyan-500/10'
                      : 'border-white/[0.05] bg-[#0b1423]/80 hover:border-white/15 hover:bg-[#0b1423]'
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <span
                      className={`grid h-6 w-6 place-items-center rounded-lg text-xs font-bold ${
                        isToday
                          ? 'bg-cyan-500 text-slate-950'
                          : isSelected
                          ? 'text-cyan-300'
                          : 'text-slate-300'
                      }`}
                    >
                      {day}
                    </span>

                    {dayEvents.length > 0 && (
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    )}
                  </div>

                  {/* Mini Event Dots / Titles */}
                  <div className="w-full space-y-1 overflow-hidden">
                    {dayEvents.slice(0, 2).map((ev) => (
                      <div
                        key={ev.id}
                        className="truncate rounded bg-white/[0.06] px-1.5 py-0.5 text-[9px] font-medium text-slate-300"
                      >
                        {ev.title}
                      </div>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT: SELECTED DAY SCHEDULE */}
        <div className="space-y-5">
          <div className="rounded-2xl border border-white/[0.07] bg-[#101a2b]/90 p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between border-b border-white/[0.06] pb-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-cyan-400">
                  Selected Date
                </p>
                <h3 className="mt-1 text-xl font-bold text-white">
                  November {selectedDay}, 2026
                </h3>
              </div>
              <span className="rounded-full bg-white/[0.05] px-3 py-1 text-xs font-medium text-slate-400">
                {selectedDayEvents.length} {selectedDayEvents.length === 1 ? 'Event' : 'Events'}
              </span>
            </div>

            {selectedDayEvents.length > 0 ? (
              <div className="space-y-3.5">
                {selectedDayEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className="rounded-xl border border-white/[0.06] bg-[#0b1423] p-4 transition hover:border-cyan-400/30"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-semibold text-white">{ev.title}</h4>
                      <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${categoryBadge[ev.category]}`}>
                        {ev.category}
                      </span>
                    </div>

                    <div className="mt-3 space-y-1.5 text-xs text-slate-400">
                      <div className="flex items-center gap-2">
                        <Clock size={13} className="text-cyan-400" />
                        <span>{ev.time}</span>
                      </div>
                      {ev.location && (
                        <div className="flex items-center gap-2">
                          <MapPin size={13} className="text-slate-500" />
                          <span>{ev.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-white/10 py-10 text-center">
                <CheckCircle2 size={26} className="mx-auto mb-2 text-slate-600" />
                <p className="text-sm font-medium text-slate-400">No events scheduled</p>
                <p className="mt-1 text-xs text-slate-600">You have a free schedule for this day.</p>
              </div>
            )}
          </div>

          {/* UPCOMING HIGHLIGHTS CARD */}
          <div className="rounded-2xl border border-cyan-400/10 bg-gradient-to-br from-cyan-500/[0.08] to-[#101a2b] p-5">
            <div className="flex items-center gap-2.5 text-cyan-400">
              <Sparkles size={17} />
              <h4 className="text-sm font-semibold text-white">Upcoming Deadlines</h4>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-400">
              You have <strong className="text-white">2 academic deadlines</strong> coming up later this month. Stay ahead by blocking focus sessions on your dashboard.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}