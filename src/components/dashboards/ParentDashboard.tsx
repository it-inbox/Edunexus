import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Breadcrumb } from '../common/Breadcrumb';
import { 
  Users, CheckCircle2, Clock, DollarSign, Bus, 
  MessageSquare, FileText, Calendar, Award, 
  ChevronRight, Sparkles, AlertCircle 
} from 'lucide-react';
import { RadarSubjectChart } from '../common/ChartComponents';

export const ParentDashboard: React.FC = () => {
  const { setActiveRoute, addToast } = useApp();
  const [selectedChild, setSelectedChild] = useState<'ahmed' | 'layla'>('ahmed');

  const children = [
    { id: 'ahmed', name: 'Ahmed Al-Rashid', grade: 'Grade 10-A', school: 'Emirates International School', studentId: 'EIS-2024-0001', photoInitial: 'AR' },
    { id: 'layla', name: 'Layla Al-Rashid', grade: 'Grade 7-B', school: 'Emirates International School', studentId: 'EIS-2024-0002', photoInitial: 'LR' }
  ];

  const currentChild = children.find(c => c.id === selectedChild)!;

  // Radar chart subjects
  const subjectScores = selectedChild === 'ahmed' ? [
    { name: 'Mathematics', score: 88, classAvg: 78 },
    { name: 'Physics & Chem', score: 91, classAvg: 80 },
    { name: 'English Lang', score: 85, classAvg: 82 },
    { name: 'Arabic Native', score: 82, classAvg: 79 },
    { name: 'Computer Sci', score: 94, classAvg: 81 },
    { name: 'Social Studies', score: 86, classAvg: 83 }
  ] : [
    { name: 'Mathematics', score: 92, classAvg: 81 },
    { name: 'General Science', score: 89, classAvg: 79 },
    { name: 'English Lang', score: 95, classAvg: 84 },
    { name: 'Arabic Native', score: 88, classAvg: 82 },
    { name: 'Art & Design', score: 96, classAvg: 85 },
    { name: 'Social Studies', score: 90, classAvg: 80 }
  ];

  // Calendar days of October 2026
  const attendanceDays = Array.from({ length: 21 }, (_, i) => {
    const day = i + 1;
    // Weekends in UAE: Sat & Sun (in 2026). Let's simulate:
    if (day === 8) return { day, status: 'late', time: '8:05 AM' };
    if (day === 15) return { day, status: 'absent', reason: 'Flu' };
    return { day, status: 'present', time: '7:42 AM' };
  });

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Parent Portal Overview' }]} />

      {/* Child Selector Tabs */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {children.map(child => {
            const isSelected = selectedChild === child.id;
            return (
              <button
                key={child.id}
                onClick={() => setSelectedChild(child.id as any)}
                className={`flex-1 sm:flex-none flex items-center gap-3 px-4 py-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-50/80 border-indigo-300 ring-2 ring-indigo-500/20 shadow-2xs'
                    : 'bg-gray-50 border-gray-200/80 hover:bg-white text-gray-600'
                }`}
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${
                  isSelected ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}>
                  {child.photoInitial}
                </div>
                <div>
                  <h4 className={`text-xs font-bold ${isSelected ? 'text-indigo-950' : 'text-gray-800'}`}>
                    {child.name}
                  </h4>
                  <p className="text-[10px] text-gray-500 font-mono">{child.grade} · {child.studentId}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="text-right hidden md:block">
          <span className="text-xs text-gray-500 block">Parent Account:</span>
          <span className="text-xs font-bold text-gray-900">Mr. Tariq Al-Rashid (+971 50 234 5678)</span>
        </div>
      </div>

      {/* Row 1: Today's Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Attendance Today</span>
            <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 text-xl font-bold text-emerald-700 flex items-center gap-1.5">
            <span>Present on Campus</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Bus tap-in confirmed at 07:42 AM</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Today's Schedule</span>
            <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 text-xl font-bold text-gray-900 font-mono">
            6 Periods
          </div>
          <p className="text-xs text-gray-500 mt-1">Current: Math (Rm 301) · Next: Science</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Pending Homework</span>
            <span className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 text-xl font-bold text-gray-900 font-mono">
            3 Assignments
          </div>
          <p className="text-xs text-amber-600 font-medium mt-1">1 due tomorrow (Math Ch. 5)</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Term 1 Fee Balance</span>
            <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 text-xl font-bold text-gray-900 font-mono">
            AED 0.00
          </div>
          <p className="text-xs text-emerald-600 font-medium mt-1">All Term 1 tuition & transport settled</p>
        </div>
      </div>

      {/* Row 2: Academic Spider Chart + Monthly Attendance Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Subject Radar Mastery */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-base font-bold text-gray-900">Academic Competency Spider Graph</h3>
                <p className="text-xs text-gray-500">{currentChild.name} ({currentChild.grade}) vs Cohort Mean</p>
              </div>
              <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                Term 1 Diagnostics
              </span>
            </div>

            <div className="py-4">
              <RadarSubjectChart subjects={subjectScores} size={260} />
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-500">Top performance: Computer Science & Math</span>
            <button
              onClick={() => {
                setActiveRoute(`/students/${currentChild.id === 'ahmed' ? 'std-1' : 'std-2'}`);
              }}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
            >
              Full Academic Transcript →
            </button>
          </div>
        </div>

        {/* Attendance Heatmap Calendar */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h3 className="text-base font-bold text-gray-900">October 2026 Attendance Log</h3>
              <p className="text-xs text-gray-500">Daily campus arrival and gate timestamp validation</p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              96.8% Presence
            </span>
          </div>

          <div className="grid grid-cols-7 gap-2 my-4">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
              <div key={i} className="text-center text-[10px] font-bold text-gray-400 py-1">{day}</div>
            ))}
            {attendanceDays.map((d, i) => (
              <div
                key={i}
                className={`h-9 rounded-lg flex flex-col items-center justify-center text-xs font-mono font-semibold transition-transform hover:scale-105 cursor-pointer ${
                  d.status === 'present' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                  d.status === 'late' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                  'bg-rose-50 text-rose-700 border border-rose-200'
                }`}
                title={`Oct ${d.day}: ${d.status} (${d.time || d.reason})`}
              >
                <span>{d.day}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Present (19)</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Late (1)</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-400" /> Sick Leave (1)</span>
          </div>
        </div>

      </div>

      {/* Row 3: Latest Updates & Direct Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Updates 2 cols */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-5 shadow-xs">
          <h3 className="text-base font-bold text-gray-900 pb-3 border-b border-gray-100">
            Child Activity Stream & Notifications
          </h3>
          <div className="divide-y divide-gray-100 mt-2">
            {[
              { icon: '📝', title: 'Math Test Result Released: 88 / 100', desc: 'Unit 3 Algebra & Quadratic Functions. Class average was 78%. Teacher note: "Superb conceptual mastery."', date: 'Oct 18' },
              { icon: '🏆', title: 'Awarded "Star Student of the Week"', desc: 'Commended by Head of Science Dr. Vikram Patel for laboratory safety leadership.', date: 'Oct 15' },
              { icon: '📚', title: 'Homework Submitted: English Macbeth Soliloquy', desc: '1,200 words received on time by Ms. Emma Richardson.', date: 'Oct 14' },
              { icon: '💰', title: 'Payment Receipt Confirmed: AED 18,400', desc: 'Official receipt #REC-2026-0419 issued for Term 1 tuition and transport.', date: 'Sep 15' }
            ].map((item, idx) => (
              <div key={idx} className="py-3 flex items-start gap-3">
                <span className="text-xl shrink-0">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-900">{item.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
                <span className="text-[10px] text-gray-400 font-mono shrink-0">{item.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions 1 col */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs">
          <h3 className="text-base font-bold text-gray-900 pb-3 border-b border-gray-100">
            Direct Parent Services
          </h3>
          <div className="mt-3 space-y-2.5">
            <button
              onClick={() => setActiveRoute('/communications/messages')}
              className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/40 text-left transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-semibold text-gray-800">Message Class Teacher</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-indigo-600" />
            </button>

            <button
              onClick={() => setActiveRoute('/transport')}
              className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/40 text-left transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <Bus className="w-4 h-4 text-sky-600" />
                <span className="text-xs font-semibold text-gray-800">Track School Bus (Route 4)</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-sky-600" />
            </button>

            <button
              onClick={() => setActiveRoute('/exams/report-cards')}
              className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/40 text-left transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-semibold text-gray-800">Download Term Report Card</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-600" />
            </button>

            <button
              onClick={() => setActiveRoute('/communications/ptm')}
              className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/40 text-left transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-semibold text-gray-800">Book Parent Evening Slot</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-purple-600" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
