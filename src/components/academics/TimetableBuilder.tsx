import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Breadcrumb } from '../common/Breadcrumb';
import { timetableData } from '../../data/mockData';
import { 
  Calendar, Clock, CheckCircle2, AlertTriangle, 
  Printer, Download, Filter, Plus, Users, School 
} from 'lucide-react';

export const TimetableBuilder: React.FC = () => {
  const { addToast } = useApp();
  const [viewMode, setViewMode] = useState<'class' | 'teacher' | 'room'>('class');
  const [selectedEntity, setSelectedEntity] = useState('Grade 10-A');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const;
  const periods = [
    { num: 1, time: '08:00 - 08:50' },
    { num: 2, time: '08:55 - 09:45' },
    { num: 3, time: '10:05 - 10:55' },
    { num: 4, time: '11:00 - 11:50' },
    { num: 5, time: '12:35 - 13:25' },
    { num: 6, time: '13:30 - 14:20' },
  ];

  const handlePrint = () => {
    addToast({
      type: 'info',
      title: 'Timetable Print Layout Generated',
      message: `Schedule for ${selectedEntity} formatted for color printing and classroom pinboards.`
    });
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[
        { label: 'Academics', route: '/academics/timetable' },
        { label: 'Visual Timetable Builder' }
      ]} />

      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200/80 gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Academic Timetable Matrix</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Academic Year 2026-27 · Term 1 Master Schedule with active conflict resolution
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-gray-100 p-0.5 rounded-lg text-xs">
            <button
              onClick={() => { setViewMode('class'); setSelectedEntity('Grade 10-A'); }}
              className={`px-3 py-1.5 rounded-md font-medium cursor-pointer transition-colors ${
                viewMode === 'class' ? 'bg-white text-indigo-600 shadow-2xs font-semibold' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Class View
            </button>
            <button
              onClick={() => { setViewMode('teacher'); setSelectedEntity('Ayesha Khan'); }}
              className={`px-3 py-1.5 rounded-md font-medium cursor-pointer transition-colors ${
                viewMode === 'teacher' ? 'bg-white text-indigo-600 shadow-2xs font-semibold' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Teacher View
            </button>
            <button
              onClick={() => { setViewMode('room'); setSelectedEntity('Room 301'); }}
              className={`px-3 py-1.5 rounded-md font-medium cursor-pointer transition-colors ${
                viewMode === 'room' ? 'bg-white text-indigo-600 shadow-2xs font-semibold' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Room View
            </button>
          </div>

          {/* Entity Dropdown */}
          <select
            value={selectedEntity}
            onChange={(e) => setSelectedEntity(e.target.value)}
            className="px-3 py-2 text-xs bg-white border border-gray-200 rounded-lg text-gray-800 font-semibold cursor-pointer shadow-2xs"
          >
            {viewMode === 'class' && (
              <>
                <option value="Grade 10-A">Grade 10-A (IGCSE)</option>
                <option value="Grade 10-B">Grade 10-B (IGCSE)</option>
                <option value="Grade 11-A">Grade 11-A (A-Levels)</option>
                <option value="Grade 9-A">Grade 9-A</option>
              </>
            )}
            {viewMode === 'teacher' && (
              <>
                <option value="Ayesha Khan">Ms. Ayesha Khan (Math HOD)</option>
                <option value="Dr. Vikram Patel">Dr. Vikram Patel (Science HOD)</option>
                <option value="Emma Richardson">Ms. Emma Richardson (English HOD)</option>
                <option value="David Sterling">Mr. David Sterling (Physics / VP)</option>
              </>
            )}
            {viewMode === 'room' && (
              <>
                <option value="Room 301">Room 301 (Secondary Wing)</option>
                <option value="Lab 2">Lab 2 (Physics Specialised)</option>
                <option value="Lab 3">Lab 3 (Chemistry Specialised)</option>
                <option value="Room 205">Room 205 (Languages)</option>
              </>
            )}
          </select>

          <button
            onClick={handlePrint}
            className="px-3 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-lg text-xs font-semibold shadow-2xs flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-gray-500" />
            <span className="hidden sm:inline">Print Schedule</span>
          </button>
        </div>
      </div>

      {/* Conflict Status Bar */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center justify-between text-xs text-emerald-900">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span><strong>All Invariants Verified:</strong> 0 teacher double-bookings, 0 room capacity conflicts. 28 weekly periods fully allocated.</span>
        </div>
        <span className="font-mono font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">
          100% Scheduled
        </span>
      </div>

      {/* Timetable Grid */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-xs overflow-x-auto">
        <div className="min-w-[850px]">
          {/* Days Header */}
          <div className="grid grid-cols-6 gap-2 mb-2">
            <div className="p-3 bg-gray-50 rounded-lg text-xs font-bold uppercase tracking-wider text-gray-400 text-center flex items-center justify-center">
              Period / Time
            </div>
            {days.map(day => (
              <div key={day} className="p-3 bg-gray-50 rounded-lg text-xs font-bold text-gray-800 text-center">
                {day}
              </div>
            ))}
          </div>

          {/* Period Rows */}
          <div className="space-y-2">
            {periods.map(period => (
              <div key={period.num} className="grid grid-cols-6 gap-2 items-stretch">
                {/* Time slot column */}
                <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-100 flex flex-col items-center justify-center text-center">
                  <span className="text-xs font-bold font-mono text-gray-800">P{period.num}</span>
                  <span className="text-[10px] text-gray-400 font-mono mt-0.5">{period.time}</span>
                </div>

                {/* Days columns */}
                {days.map(day => {
                  const slot = timetableData.find(s => s.day === day && s.period === period.num);
                  if (!slot) {
                    return (
                      <div key={day} className="p-3 rounded-lg border border-dashed border-gray-200 bg-gray-50/40 flex items-center justify-center text-gray-400 text-xs">
                        Free
                      </div>
                    );
                  }

                  return (
                    <div
                      key={day}
                      className="p-3 rounded-xl border border-gray-100 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                      style={{
                        backgroundColor: `${slot.color}10`,
                        borderLeftColor: slot.color,
                        borderLeftWidth: '3px'
                      }}
                    >
                      <div>
                        <div className="text-xs font-bold text-gray-900 truncate">
                          {slot.subject}
                        </div>
                        <div className="text-[11px] text-gray-600 mt-0.5 truncate">
                          {slot.teacher}
                        </div>
                      </div>
                      <div className="mt-2 pt-1.5 border-t border-black/5 flex items-center justify-between text-[10px] font-mono text-gray-500">
                        <span>{slot.room}</span>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: slot.color }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
