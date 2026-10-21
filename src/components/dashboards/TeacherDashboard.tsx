import React from 'react';
import { useApp } from '../../context/AppContext';
import { Breadcrumb } from '../common/Breadcrumb';
import { 
  CheckCircle2, FileEdit, BookOpen, MessageSquare, 
  Clock, AlertCircle, Check, Users, ArrowRight, 
  Calendar, FileText, Sparkles 
} from 'lucide-react';

export const TeacherDashboard: React.FC = () => {
  const { setActiveRoute, addToast } = useApp();

  const scheduleSlots = [
    { time: '08:00 AM', subject: 'Math (10-A)', room: 'Room 301', status: 'Active', isCurrent: true, remaining: '23 mins left' },
    { time: '09:00 AM', subject: 'Math (10-B)', room: 'Room 302', status: 'Upcoming' },
    { time: '10:15 AM', subject: 'Planning Period', room: 'Faculty Lounge', status: 'Free' },
    { time: '11:15 AM', subject: 'Calculus (11-A)', room: 'Room 301', status: 'Upcoming' },
    { time: '12:15 PM', subject: 'Math (10-C)', room: 'Room 305', status: 'Upcoming' },
    { time: '01:15 PM', subject: 'Department Meeting', room: 'Conference A', status: 'Meeting' }
  ];

  const myClasses = [
    { grade: 'Grade 10-A Math', students: 32, avg: '78.4%', atRisk: 2, nextExam: 'Oct 28', color: 'border-indigo-200' },
    { grade: 'Grade 10-B Math', students: 30, avg: '82.1%', atRisk: 0, nextExam: 'Oct 28', color: 'border-emerald-200' },
    { grade: 'Grade 10-C Math', students: 31, avg: '75.6%', atRisk: 4, nextExam: 'Oct 28', color: 'border-amber-200' }
  ];

  const pendingTasks = [
    { id: 1, title: 'Grade Unit 3 Quadratic Test', due: 'Oct 23', papers: 32, subject: 'Grade 10-A' },
    { id: 2, title: 'Submit Weekly Lesson Plan (Week 9)', due: 'Oct 24', papers: 1, subject: 'Secondary Math' },
    { id: 3, title: 'Review Individual Education Plan (Sara M.)', due: 'Oct 25', papers: 1, subject: 'SEN Dept' }
  ];

  const recentSubmissions = [
    { student: 'Ahmed Al-Rashid', task: 'Homework Ch. 5 Problems', status: 'On time', time: 'Yesterday 4:15 PM', score: 'Pending' },
    { student: 'Fatima Khan', task: 'Homework Ch. 5 Problems', status: 'Late', time: 'Yesterday 10:30 PM', score: 'Pending' },
    { student: 'Rohan Sharma', task: 'Desmos Trajectory Modeling', status: 'On time', time: 'Oct 19', score: '48 / 50' },
    { student: 'Omar Suleiman', task: 'Homework Ch. 5 Problems', status: 'Missing', time: 'Overdue by 2d', score: '0 / 20' }
  ];

  const handleMarkAttendanceQuick = () => {
    setActiveRoute('/attendance/daily');
    addToast({
      type: 'info',
      title: 'Class Register Opened',
      message: 'Marking attendance for Grade 10-A (Room 301).'
    });
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Teacher Classroom Hub' }]} />

      {/* Top Today's Schedule Strip */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-100 gap-2">
          <div>
            <h2 className="text-base font-bold text-gray-900">Today's Class Schedule</h2>
            <p className="text-xs text-gray-500">Tuesday, October 21, 2026 · Ms. Ayesha Khan (Department of Mathematics)</p>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
            <span>Current: Math (10-A) in Room 301 (ends in 23 min)</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-4">
          {scheduleSlots.map((slot, i) => (
            <div
              key={i}
              className={`p-3 rounded-xl border text-left transition-all ${
                slot.isCurrent
                  ? 'bg-linear-to-b from-indigo-50 to-white border-indigo-300 ring-2 ring-indigo-500/20 shadow-xs'
                  : 'bg-gray-50/60 border-gray-200/80 hover:bg-white'
              }`}
            >
              <div className="text-[11px] font-mono text-gray-500 font-semibold">{slot.time}</div>
              <div className="text-xs font-bold text-gray-900 mt-1 truncate">{slot.subject}</div>
              <div className="text-[11px] text-gray-500 mt-0.5">{slot.room}</div>
              {slot.isCurrent ? (
                <span className="inline-block mt-2 text-[10px] font-bold text-indigo-600 bg-indigo-100/60 px-1.5 py-0.5 rounded">
                  {slot.remaining}
                </span>
              ) : (
                <span className="inline-block mt-2 text-[10px] text-gray-400">
                  {slot.status}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Row 1: Fast Action Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={handleMarkAttendanceQuick}
          className="p-4 bg-white rounded-xl border border-gray-100 hover:border-indigo-200 shadow-xs hover:shadow-md transition-all text-left group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-gray-900">Mark Attendance</h4>
          <p className="text-xs text-gray-500 mt-0.5">Quick roll call for Grade 10-A (32 students)</p>
        </button>

        <button
          onClick={() => setActiveRoute('/exams/gradebook')}
          className="p-4 bg-white rounded-xl border border-gray-100 hover:border-indigo-200 shadow-xs hover:shadow-md transition-all text-left group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <FileEdit className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-gray-900">Enter Grades</h4>
          <p className="text-xs text-gray-500 mt-0.5">Unit 3 Test mark entry & auto grading</p>
        </button>

        <button
          onClick={() => setActiveRoute('/academics/assignments')}
          className="p-4 bg-white rounded-xl border border-gray-100 hover:border-indigo-200 shadow-xs hover:shadow-md transition-all text-left group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-gray-900">Assign Homework</h4>
          <p className="text-xs text-gray-500 mt-0.5">Publish assignment to student & parent portals</p>
        </button>

        <button
          onClick={() => setActiveRoute('/communications/messages')}
          className="p-4 bg-white rounded-xl border border-gray-100 hover:border-indigo-200 shadow-xs hover:shadow-md transition-all text-left group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-gray-900">Parent Messaging</h4>
          <p className="text-xs text-gray-500 mt-0.5">3 unread parent questions from yesterday</p>
        </button>
      </div>

      {/* Row 2: My Classes Overview */}
      <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <h3 className="text-base font-bold text-gray-900">My Teaching Cohorts</h3>
            <p className="text-xs text-gray-500">Term 1 syllabus completion & performance monitoring</p>
          </div>
          <button 
            onClick={() => setActiveRoute('/academics/subjects')}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
          >
            Curriculum Map →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {myClasses.map((cls, idx) => (
            <div key={idx} className={`p-4 rounded-xl border bg-gray-50/50 hover:bg-white hover:shadow-xs transition-all ${cls.color}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-gray-900">{cls.grade}</span>
                <span className="text-xs font-mono font-bold text-indigo-600 bg-white px-2 py-0.5 rounded border border-gray-200">
                  {cls.students} students
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-gray-200/60 my-2 font-mono">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">Class Average</span>
                  <span className="font-bold text-gray-900 text-sm">{cls.avg}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">At-Risk Count</span>
                  <span className={`font-bold text-sm ${cls.atRisk > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                    {cls.atRisk} students
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
                <span>Next exam: {cls.nextExam}</span>
                <button
                  onClick={() => setActiveRoute('/exams/gradebook')}
                  className="text-indigo-600 font-medium hover:underline cursor-pointer"
                >
                  Gradebook
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 3: Pending Tasks + Recent Submissions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Pending Tasks */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="text-base font-bold text-gray-900">Action Required Checklist</h3>
            <span className="text-xs text-gray-400 font-mono">3 Pending</span>
          </div>

          <div className="divide-y divide-gray-100 mt-2">
            {pendingTasks.map(task => (
              <div key={task.id} className="py-3 flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <input type="checkbox" className="mt-1 rounded text-indigo-600 focus:ring-indigo-500" />
                  <div>
                    <p className="text-xs font-semibold text-gray-900">{task.title}</p>
                    <p className="text-[11px] text-gray-500">{task.subject} · {task.papers} items</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded shrink-0">
                  Due {task.due}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Submissions */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="text-base font-bold text-gray-900">Recent Student Homework Submissions</h3>
            <button 
              onClick={() => setActiveRoute('/academics/assignments')}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer"
            >
              All Assignments →
            </button>
          </div>

          <div className="divide-y divide-gray-100 mt-2">
            {recentSubmissions.map((sub, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-gray-900">{sub.student}</p>
                  <p className="text-[11px] text-gray-500">{sub.task} · {sub.time}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                    sub.status === 'On time' ? 'bg-emerald-50 text-emerald-700' :
                    sub.status === 'Late' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'
                  }`}>
                    {sub.status}
                  </span>
                  <div className="text-[10px] text-gray-400 font-mono mt-0.5">{sub.score}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
