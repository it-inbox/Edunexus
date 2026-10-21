import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../common/StatCard';
import { 
  Users, CheckCircle2, UserCheck, Clock, 
  TrendingUp, Calendar, AlertTriangle, ArrowRight, 
  Sparkles, Download, Bell, FileSpreadsheet, PlusCircle 
} from 'lucide-react';
import { AreaTrendChart, DonutBreakdownChart, AttendanceHeatmap } from '../common/ChartComponents';
import { Breadcrumb } from '../common/Breadcrumb';

export const PrincipalDashboard: React.FC = () => {
  const { activeSchool, setActiveRoute, addToast } = useApp();

  // Academic trend data across subjects over assessments
  const academicTrendData = [
    { label: 'Baseline', value: 74, secondary: 71 },
    { label: 'Unit 1', value: 78, secondary: 75 },
    { label: 'Midterm', value: 82, secondary: 79 },
    { label: 'Unit 2', value: 84, secondary: 81 },
    { label: 'Unit 3', value: 87, secondary: 83 }
  ];

  // Fee collection donut breakdown
  const feeBreakdown = [
    { label: 'Collected (AED 32.4M)', value: 78, color: '#10B981' },
    { label: 'Pending Term 1 (AED 6.2M)', value: 15, color: '#F59E0B' },
    { label: 'Overdue >30d (AED 2.9M)', value: 7, color: '#EF4444' }
  ];

  // Attendance Heatmap: Grades (KG to Year 13) x Days
  const heatmapGrades = ['Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];
  const heatmapDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const heatmapMatrix = [
    [96, 97, 95, 94, 91],
    [94, 96, 95, 93, 89],
    [95, 98, 97, 95, 92],
    [97, 98, 96, 95, 93],
    [92, 94, 93, 91, 86],
    [95, 96, 95, 94, 90]
  ];

  const handleExportDailyReport = () => {
    addToast({
      type: 'success',
      title: 'Daily Briefing Compiled',
      message: 'PDF summary generated for Executive Board inspection.'
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Principal Command Center' }]} />

      {/* Top Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-indigo-900/40">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-indigo-500/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 text-indigo-300 text-xs font-medium mb-3 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>{activeSchool.name} · Academic Year 2026-27</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Good Morning, Dr. Sarah Al-Maktoum 👋
            </h1>
            <p className="mt-1 text-sm text-slate-300 max-w-xl">
              Tuesday, October 21, 2026 · Term 1, Week 8. All campus security and morning bus transports verified normal.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setActiveRoute('/attendance/daily')}
              className="px-3.5 py-2 text-xs font-semibold bg-white text-slate-900 rounded-lg hover:bg-slate-100 transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
              <span>Attendance Register</span>
            </button>
            <button
              onClick={() => setActiveRoute('/communications/announcements')}
              className="px-3.5 py-2 text-xs font-semibold bg-indigo-600/80 hover:bg-indigo-600 text-white rounded-lg transition-all border border-indigo-400/30 flex items-center gap-1.5 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Broadcast Notice</span>
            </button>
            <button
              onClick={handleExportDailyReport}
              className="p-2 text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors"
              title="Download Daily Brief"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Row 1: KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Today's Attendance"
          value="94.7%"
          trend={{ value: "+1.2% vs yesterday", isPositive: true }}
          icon={CheckCircle2}
          iconColor="text-emerald-600"
          bgColor="bg-emerald-50"
          subtext="Target KHDA threshold: 94.0%"
        />
        <StatCard
          label="Students Present"
          value="3,024"
          icon={Users}
          iconColor="text-indigo-600"
          bgColor="bg-indigo-50"
          subtext="170 absent · 18 excused"
        />
        <StatCard
          label="Faculty & Staff on Duty"
          value="287 / 298"
          icon={UserCheck}
          iconColor="text-sky-600"
          bgColor="bg-sky-50"
          subtext="11 on leave · 100% substitutes assigned"
        />
        <StatCard
          label="Pending Approvals"
          value="14"
          trend={{ value: "5 urgent", isPositive: false }}
          icon={Clock}
          iconColor="text-amber-600"
          bgColor="bg-amber-50"
          subtext="8 leave · 4 fee waivers · 2 circulars"
        />
      </div>

      {/* Row 2: Performance Trend (2/3) + Fee Collection Status (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 cols: Academic Score Trend */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-2">
            <div>
              <h3 className="text-base font-semibold text-gray-900">Academic Cohort Performance Trajectory</h3>
              <p className="text-xs text-gray-500">IGCSE / A-Level assessment averages compared against previous academic cycle</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 font-medium text-indigo-700">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" /> Current Year (87%)
              </span>
              <span className="flex items-center gap-1.5 text-gray-400">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400" /> Previous Year (83%)
              </span>
            </div>
          </div>

          <div className="pt-4">
            <AreaTrendChart 
              data={academicTrendData} 
              valueSuffix="%" 
              height={220}
            />
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span>Intervention programs in Grade 8 & 10 Mathematics show +4.2% lift.</span>
            <button 
              onClick={() => setActiveRoute('/exams/analytics')}
              className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 cursor-pointer"
            >
              Cohort Breakdown →
            </button>
          </div>
        </div>

        {/* Right 1 col: Fee Collection Status */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base font-semibold text-gray-900">Term 1 Fee Realization</h3>
              <span className="text-xs font-mono font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                AED 41.5M Total
              </span>
            </div>
            <div className="py-4 flex justify-center">
              <DonutBreakdownChart 
                data={feeBreakdown}
                centerLabel="Collected"
                centerValue="78%"
                size={160}
              />
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-500">23 reminders pending automated dispatch</span>
            <button 
              onClick={() => setActiveRoute('/finance')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
            >
              Finance Ledger →
            </button>
          </div>
        </div>

      </div>

      {/* Row 3: Weekly Attendance Heatmap + Upcoming Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Attendance Heatmap 2 cols */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <h3 className="text-base font-semibold text-gray-900">Weekly Attendance Matrix (Grades 7 - 12)</h3>
              <p className="text-xs text-gray-500">Daily presence tracking highlighting Friday drop trends</p>
            </div>
            <button 
              onClick={() => setActiveRoute('/attendance/heatmap')}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer"
            >
              Detailed Analytics →
            </button>
          </div>

          <div className="pt-4">
            <AttendanceHeatmap 
              grades={heatmapGrades} 
              days={heatmapDays} 
              matrix={heatmapMatrix} 
            />
          </div>
        </div>

        {/* Upcoming Institutional Calendar 1 col */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="text-base font-semibold text-gray-900">Executive Milestones</h3>
            <Calendar className="w-4 h-4 text-indigo-600" />
          </div>

          <div className="divide-y divide-gray-100 mt-2">
            {[
              { date: 'Oct 22', title: 'Parent Consultation Evening', time: '4:00 PM - 8:00 PM', badge: 'Secondary' },
              { date: 'Oct 25', title: 'Annual Inter-House Sports Day', time: '8:00 AM - 1:30 PM', badge: 'Campus-wide' },
              { date: 'Oct 28', title: 'KHDA DSIB Comprehensive Inspection', time: 'All Week', badge: 'Regulatory', urgent: true },
              { date: 'Nov 01', title: 'Term 1 Midterm Exam Series', time: 'Exam Halls A-D', badge: 'Academics' },
            ].map((event, i) => (
              <div key={i} className="py-2.5 flex items-start gap-3">
                <div className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center shrink-0 ${
                  event.urgent ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-gray-100 text-gray-700'
                }`}>
                  <span className="text-[10px] uppercase font-bold">{event.date.split(' ')[0]}</span>
                  <span className="text-sm font-bold font-mono">{event.date.split(' ')[1]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-gray-900 truncate">{event.title}</p>
                  </div>
                  <p className="text-[11px] text-gray-500">{event.time}</p>
                  <span className="text-[10px] font-medium text-indigo-600 bg-indigo-50 px-1.5 py-0.2 rounded mt-1 inline-block">
                    {event.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Row 4: Recent Activity Feed + AI Actionable Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Activity Feed */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="text-base font-semibold text-gray-900">Live Campus Operations Feed</h3>
            <span className="text-xs text-gray-400 font-mono">Updated just now</span>
          </div>

          <div className="divide-y divide-gray-100 mt-2">
            {[
              { icon: '📝', title: 'Ms. Ayesha Khan submitted Q1 grades', desc: 'Grade 10-A Mathematics marks finalized and ready for moderation.', time: '12 mins ago' },
              { icon: '🚌', title: 'Bus 07 reported roadworks delay', desc: 'Traffic obstruction on Al Saada Street. Estimated arrival at 8:12 AM.', time: '28 mins ago' },
              { icon: '💰', title: 'Fee collection batch reconciled', desc: 'AED 124,500 processed through payment gateway without error.', time: '1 hour ago' },
              { icon: '📢', title: 'Circular published: Winter Uniform', desc: 'Dispatched to 1,840 parents with read receipts active.', time: '2 hours ago' },
            ].map((act, i) => (
              <div key={i} className="py-3 flex items-start gap-3">
                <span className="text-lg shrink-0 mt-0.5">{act.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-900">{act.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{act.desc}</p>
                </div>
                <span className="text-[10px] text-gray-400 font-mono shrink-0">{act.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Actionable Insights */}
        <div className="bg-linear-to-br from-indigo-50/70 via-white to-purple-50/50 rounded-xl border border-indigo-100 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-indigo-100/70">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <h3 className="text-base font-semibold text-indigo-950">Intelligent Operational Intelligence</h3>
            </div>
            <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-100/60 px-2 py-0.5 rounded-full">
              4 Active Prompts
            </span>
          </div>

          <div className="mt-3 space-y-3">
            <div className="p-3 bg-white rounded-lg border border-amber-200/80 shadow-2xs">
              <div className="flex items-center gap-2 text-amber-800 text-xs font-semibold mb-1">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Attendance Anomaly: 12 Students Approaching 85% Cutoff</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Grade 11-B shows a 3.4% attendance dip specifically on Thursday afternoons. Proactive parent check-ins recommended before KHDA audit lock.
              </p>
              <button 
                onClick={() => setActiveRoute('/attendance/reports')}
                className="mt-2 text-xs font-semibold text-amber-700 hover:text-amber-900 inline-flex items-center gap-1 cursor-pointer"
              >
                Inspect Cohort Roster →
              </button>
            </div>

            <div className="p-3 bg-white rounded-lg border border-emerald-200/80 shadow-2xs">
              <div className="flex items-center gap-2 text-emerald-800 text-xs font-semibold mb-1">
                <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Curriculum Intervention Success: Grade 8 Math</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Following the morning peer-tutoring initiative, Grade 8 formative quiz performance elevated from 74% to 81.2% over 3 weeks.
              </p>
            </div>

            <div className="p-3 bg-white rounded-lg border border-indigo-200/80 shadow-2xs">
              <div className="flex items-center gap-2 text-indigo-900 text-xs font-semibold mb-1">
                <Bell className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Automated Fee Reminder Trigger Ready</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                23 accounts are due for polite Term 1 settlement notifications via SMS and WhatsApp. Estimated recovery: AED 184,000 within 48h.
              </p>
              <button 
                onClick={() => setActiveRoute('/finance')}
                className="mt-2 text-xs font-semibold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1 cursor-pointer"
              >
                Dispatch Scheduled Batch →
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
