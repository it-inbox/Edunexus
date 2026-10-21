import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Breadcrumb } from '../common/Breadcrumb';
import { 
  Trophy, CheckCircle2, Flame, Clock, BookOpen, 
  Sparkles, Award, FileText, ChevronRight, CheckSquare, 
  Square 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const StudentDashboard: React.FC = () => {
  const { setActiveRoute, addToast } = useApp();

  const [completedHomework, setCompletedHomework] = useState<Record<string, boolean>>({
    'hw-3': true,
    'hw-4': true
  });

  const homeworkList = [
    { id: 'hw-1', title: 'Math Ch. 5 Quadratic Problems', subject: 'Mathematics', due: 'Tomorrow (Oct 22)', points: 20 },
    { id: 'hw-2', title: 'Science Enthalpy Lab Report', subject: 'Chemistry', due: 'Thursday (Oct 23)', points: 40 },
    { id: 'hw-3', title: 'Macbeth Soliloquy Commentary', subject: 'English Lit', due: 'Submitted', points: 100 },
    { id: 'hw-4', title: 'Arabic Sustainable Cities Worksheet', subject: 'Arabic', due: 'Graded: 18/20', points: 20 }
  ];

  const termGrades = [
    { subject: 'Science & Physics', grade: 'A', score: 91, progress: 91, color: 'bg-emerald-500' },
    { subject: 'Mathematics (IGCSE)', grade: 'A-', score: 87, progress: 87, color: 'bg-indigo-600' },
    { subject: 'English Language', grade: 'B+', score: 84, progress: 84, color: 'bg-sky-500' },
    { subject: 'Social Studies', grade: 'B+', score: 83, progress: 83, color: 'bg-purple-500' },
    { subject: 'Arabic Language', grade: 'B', score: 80, progress: 80, color: 'bg-amber-500' }
  ];

  const toggleHomework = (id: string) => {
    const isNowDone = !completedHomework[id];
    setCompletedHomework(prev => ({ ...prev, [id]: isNowDone }));
    if (isNowDone) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
      addToast({
        type: 'success',
        title: 'Task Completed!',
        message: 'Great work Ahmed! +10 House Merits added to your streak.'
      });
    }
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Student Portal' }]} />

      {/* Top Welcome Banner */}
      <div className="bg-linear-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white rounded-2xl p-6 sm:p-7 shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-indigo-200 text-xs font-medium mb-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
              <span>Emirates International School · Grade 10-A</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Hey Ahmed! 👋 Here's your Tuesday
            </h1>
            <p className="text-xs sm:text-sm text-indigo-200 mt-1">
              You have 6 classes scheduled today. Next exam: Mathematics Midterms on Oct 28.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-white/10 rounded-xl border border-white/15 backdrop-blur-md text-center">
              <span className="text-[10px] uppercase font-bold text-indigo-300 block">House Points</span>
              <span className="text-xl font-bold font-mono text-white flex items-center justify-center gap-1">
                <Flame className="w-4 h-4 text-amber-400" /> 340 pts
              </span>
            </div>
            <div className="px-4 py-2 bg-white/10 rounded-xl border border-white/15 backdrop-blur-md text-center">
              <span className="text-[10px] uppercase font-bold text-indigo-300 block">Cohort Rank</span>
              <span className="text-xl font-bold font-mono text-white">#12 / 96</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 1: Today's Timeline View */}
      <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-600" />
            <h3 className="text-base font-bold text-gray-900">Today's Class Schedule</h3>
          </div>
          <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
            Live Class in Progress (23 min left)
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { time: '08:00 AM', name: 'Mathematics', room: 'Rm 301', teacher: 'Ms. Ayesha', active: true },
            { time: '09:00 AM', name: 'English Lang', room: 'Rm 205', teacher: 'Ms. Emma' },
            { time: '10:00 AM', name: 'Morning Break', room: 'Courtyard', break: true },
            { time: '11:15 AM', name: 'Chemistry Lab', room: 'Lab 3', teacher: 'Dr. Vikram' },
            { time: '12:15 PM', name: 'Arabic Native', room: 'Rm 301', teacher: 'Sheikh Abdullah' },
            { time: '01:15 PM', name: 'Physical Ed', room: 'Sports Arena', teacher: 'Coach Marcus' }
          ].map((period, i) => (
            <div
              key={i}
              className={`p-3 rounded-xl border transition-all ${
                period.active 
                  ? 'bg-indigo-50 border-indigo-300 ring-2 ring-indigo-500/20 shadow-xs' 
                  : period.break
                  ? 'bg-amber-50/50 border-amber-200/80 text-amber-900'
                  : 'bg-gray-50 border-gray-200/80'
              }`}
            >
              <div className="text-[10px] font-mono font-semibold text-gray-500">{period.time}</div>
              <div className="text-xs font-bold text-gray-900 mt-1 truncate">{period.name}</div>
              <div className="text-[11px] text-gray-500 mt-0.5 truncate">{period.room}</div>
              {period.teacher && (
                <div className="text-[10px] text-indigo-600 font-medium mt-1 truncate">{period.teacher}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Grades Progress + Homework Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Grades Progress */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
            <div>
              <h3 className="text-base font-bold text-gray-900">Term 1 Grade Progress</h3>
              <p className="text-xs text-gray-500">Cumulative average: 3.85 GPA (High Honors)</p>
            </div>
            <button
              onClick={() => setActiveRoute('/exams/report-cards')}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
            >
              Report Card →
            </button>
          </div>

          <div className="space-y-3.5">
            {termGrades.map((g, i) => (
              <div key={i}>
                <div className="flex justify-between items-center text-xs mb-1 font-medium">
                  <span className="text-gray-800">{g.subject}</span>
                  <span className="font-mono font-bold text-gray-900">
                    {g.grade} ({g.score}%)
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${g.color}`}
                    style={{ width: `${g.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Homework Checklist */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
              <h3 className="text-base font-bold text-gray-900">My Homework & Assignments</h3>
              <span className="text-xs font-mono font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                {Object.values(completedHomework).filter(Boolean).length} / {homeworkList.length} Done
              </span>
            </div>

            <div className="divide-y divide-gray-100">
              {homeworkList.map((hw) => {
                const isDone = completedHomework[hw.id];
                return (
                  <div
                    key={hw.id}
                    onClick={() => toggleHomework(hw.id)}
                    className="py-2.5 flex items-start gap-3 cursor-pointer group select-none"
                  >
                    <button className="mt-0.5 text-indigo-600">
                      {isDone ? (
                        <CheckSquare className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Square className="w-4 h-4 text-gray-400 group-hover:text-indigo-600" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-semibold ${isDone ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                        {hw.title}
                      </p>
                      <p className="text-[11px] text-gray-500">{hw.subject} · {hw.due}</p>
                    </div>
                    <span className="text-[11px] font-mono text-gray-400">{hw.points} pts</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 text-xs text-gray-500 flex items-center justify-between">
            <span>Click any box to mark submission complete</span>
            <span className="text-indigo-600 font-medium">Streak: 14 Days 🔥</span>
          </div>
        </div>

      </div>

      {/* Row 3: Achievements & Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Achievements */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500" />
              <h3 className="text-base font-bold text-gray-900">My Achievements & Badges</h3>
            </div>
            <span className="text-xs text-indigo-600 font-semibold font-mono">Level 4 Scholar</span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-linear-to-b from-amber-50 to-white rounded-xl border border-amber-200 text-center">
              <div className="text-2xl mb-1">⭐</div>
              <h4 className="text-xs font-bold text-gray-900">Star Student</h4>
              <p className="text-[10px] text-gray-500">Science Dept</p>
            </div>
            <div className="p-3 bg-linear-to-b from-indigo-50 to-white rounded-xl border border-indigo-200 text-center">
              <div className="text-2xl mb-1">📚</div>
              <h4 className="text-xs font-bold text-gray-900">Perfect Streak</h4>
              <p className="text-[10px] text-gray-500">2 Weeks Homework</p>
            </div>
            <div className="p-3 bg-linear-to-b from-emerald-50 to-white rounded-xl border border-emerald-200 text-center">
              <div className="text-2xl mb-1">🏃</div>
              <h4 className="text-xs font-bold text-gray-900">Track Varsity</h4>
              <p className="text-[10px] text-gray-500">Falcon House</p>
            </div>
          </div>
        </div>

        {/* School Announcements */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
            <h3 className="text-base font-bold text-gray-900">Student Body Bulletin</h3>
            <span className="text-xs text-gray-400">All Campuses</span>
          </div>

          <div className="space-y-2.5">
            {[
              { tag: 'Sports', title: 'Sports Day 2026: Falcon House Trials this Thursday', date: 'Oct 25' },
              { tag: 'Academics', title: 'Exam Hall Seating Plan published on portal', date: 'Oct 28' },
              { tag: 'Club', title: 'Robotics Club registration open for VEX Dubai Regionals', date: 'Nov 04' }
            ].map((bulletin, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-[10px] uppercase font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                    {bulletin.tag}
                  </span>
                  <span className="font-medium text-gray-800 truncate">{bulletin.title}</span>
                </div>
                <span className="text-[10px] font-mono text-gray-400 shrink-0 ml-2">{bulletin.date}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
