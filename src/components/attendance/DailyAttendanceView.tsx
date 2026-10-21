import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Breadcrumb } from '../common/Breadcrumb';
import { 
  CheckCircle2, XCircle, Clock, AlertCircle, 
  Save, Send, Users, Sparkles, Filter 
} from 'lucide-react';

export const DailyAttendanceView: React.FC = () => {
  const { students, addToast } = useApp();
  const [selectedClass, setSelectedClass] = useState('Grade 10-A');
  const [attendanceDate, setAttendanceDate] = useState('2026-10-21');
  
  // Attendance records state
  const classStudents = students.filter(s => s.grade === 'Grade 10' && s.section === 'A');
  
  const [records, setRecords] = useState<Record<string, { status: 'Present' | 'Absent' | 'Late' | 'Excused'; note: string }>>(() => {
    const initial: Record<string, any> = {};
    classStudents.forEach(s => {
      initial[s.id] = { status: 'Present', note: '' };
    });
    // simulate a couple of realistic states
    if (classStudents[1]) initial[classStudents[1].id] = { status: 'Late', note: 'Arrived 8:12 AM due to bus delay' };
    return initial;
  });

  const handleStatusChange = (id: string, status: 'Present' | 'Absent' | 'Late' | 'Excused') => {
    setRecords(prev => ({
      ...prev,
      [id]: { ...prev[id], status }
    }));
  };

  const handleMarkAllPresent = () => {
    const updated: Record<string, any> = {};
    classStudents.forEach(s => {
      updated[s.id] = { status: 'Present', note: '' };
    });
    setRecords(updated);
    addToast({
      type: 'info',
      title: 'Bulk Roll Call',
      message: 'All 32 students in Grade 10-A marked Present.'
    });
  };

  const handleSubmitRegister = () => {
    const presentCount = Object.values(records).filter(r => r.status === 'Present').length;
    addToast({
      type: 'success',
      title: 'Daily Register Locked & Submitted',
      message: `Attendance synchronized with KHDA e-portal. ${presentCount} present.`
    });
  };

  const presentCount = Object.values(records).filter(r => r.status === 'Present').length;
  const absentCount = Object.values(records).filter(r => r.status === 'Absent').length;
  const lateCount = Object.values(records).filter(r => r.status === 'Late').length;
  const excusedCount = Object.values(records).filter(r => r.status === 'Excused').length;

  return (
    <div className="space-y-6">
      <Breadcrumb items={[
        { label: 'Attendance', route: '/attendance/daily' },
        { label: 'Daily Attendance Marking' }
      ]} />

      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200/80 gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Daily Attendance Register</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Morning homeroom roll call and period-wise presence verification
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleMarkAllPresent}
            className="px-3.5 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-lg text-xs font-semibold shadow-2xs flex items-center gap-1.5 cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Mark All Present</span>
          </button>

          <button
            onClick={handleSubmitRegister}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Register</span>
          </button>
        </div>
      </div>

      {/* Filter Selector & Summary Bar */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div>
            <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Class Section</label>
            <select
              value={selectedClass}
              onChange={e => setSelectedClass(e.target.value)}
              className="px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg text-gray-800 font-semibold cursor-pointer"
            >
              <option value="Grade 10-A">Grade 10-A (Homeroom: Ms. Ayesha)</option>
              <option value="Grade 10-B">Grade 10-B (Homeroom: Mr. David)</option>
              <option value="Grade 9-A">Grade 9-A (Homeroom: Dr. Vikram)</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Attendance Date</label>
            <input
              type="date"
              value={attendanceDate}
              onChange={e => setAttendanceDate(e.target.value)}
              className="px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg text-gray-800 font-mono font-semibold"
            />
          </div>
        </div>

        {/* Live Counters */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="text-center">
            <span className="text-[10px] uppercase text-gray-400 block font-sans">Present</span>
            <span className="text-base font-bold text-emerald-600">{presentCount}</span>
          </div>
          <div className="text-center border-l border-gray-100 pl-3">
            <span className="text-[10px] uppercase text-gray-400 block font-sans">Absent</span>
            <span className="text-base font-bold text-rose-600">{absentCount}</span>
          </div>
          <div className="text-center border-l border-gray-100 pl-3">
            <span className="text-[10px] uppercase text-gray-400 block font-sans">Late</span>
            <span className="text-base font-bold text-amber-600">{lateCount}</span>
          </div>
          <div className="text-center border-l border-gray-100 pl-3">
            <span className="text-[10px] uppercase text-gray-400 block font-sans">Excused</span>
            <span className="text-base font-bold text-indigo-600">{excusedCount}</span>
          </div>
        </div>
      </div>

      {/* Roster Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/70 text-gray-500 uppercase tracking-wider font-semibold">
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Student ID</th>
                <th className="py-3 px-4 text-center">Mark Status</th>
                <th className="py-3 px-4">Notes / Lateness Justification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {classStudents.map((student) => {
                const rec = records[student.id] || { status: 'Present', note: '' };
                return (
                  <tr key={student.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-linear-to-tr from-indigo-500 to-purple-600 text-white font-bold flex items-center justify-center text-xs">
                          {student.firstName[0]}{student.lastName[0]}
                        </div>
                        <div>
                          <span className="font-semibold text-gray-900 block">{student.firstName} {student.lastName}</span>
                          {student.arabicName && <span className="text-[10px] text-gray-400 font-arabic">{student.arabicName}</span>}
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-mono text-gray-600">
                      {student.studentId}
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-1.5">
                        {(['Present', 'Late', 'Absent', 'Excused'] as const).map((st) => {
                          const isSelected = rec.status === st;
                          let selectedColor = 'bg-emerald-600 text-white shadow-xs';
                          if (st === 'Late') selectedColor = 'bg-amber-500 text-white shadow-xs';
                          if (st === 'Absent') selectedColor = 'bg-rose-600 text-white shadow-xs';
                          if (st === 'Excused') selectedColor = 'bg-indigo-600 text-white shadow-xs';

                          return (
                            <button
                              key={st}
                              onClick={() => handleStatusChange(student.id, st)}
                              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold cursor-pointer transition-all ${
                                isSelected 
                                  ? selectedColor 
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              {st}
                            </button>
                          );
                        })}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <input
                        type="text"
                        placeholder="Add note (e.g. Bus delay, clinic visit)..."
                        value={rec.note}
                        onChange={(e) => {
                          const val = e.target.value;
                          setRecords(prev => ({
                            ...prev,
                            [student.id]: { ...prev[student.id], note: val }
                          }));
                        }}
                        className="w-full px-2.5 py-1 text-xs border border-gray-200 rounded bg-gray-50 focus:bg-white focus:outline-hidden focus:border-indigo-500"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
