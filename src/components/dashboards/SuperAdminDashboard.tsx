import React from 'react';
import { useApp } from '../../context/AppContext';
import { Breadcrumb } from '../common/Breadcrumb';
import { StatCard } from '../common/StatCard';
import { 
  Building2, Users, DollarSign, TrendingUp, 
  AlertTriangle, CheckCircle2, ShieldCheck, Download, 
  ArrowRight, School as SchoolIcon 
} from 'lucide-react';
import { AreaTrendChart, BarComparisonChart } from '../common/ChartComponents';
import { schoolsData } from '../../data/mockData';

export const SuperAdminDashboard: React.FC = () => {
  const { setActiveSchool, setActiveRoute, addToast } = useApp();

  const enrollmentTrend = [
    { label: 'Nov 25', value: 16800, secondary: 15400 },
    { label: 'Jan 26', value: 17200, secondary: 15900 },
    { label: 'Mar 26', value: 17500, secondary: 16200 },
    { label: 'Jun 26', value: 17900, secondary: 16800 },
    { label: 'Sep 26', value: 18250, secondary: 17100 },
    { label: 'Oct 26', value: 18450, secondary: 17300 }
  ];

  const collectionRates = [
    { label: 'Emirates Intl (Al Barsha)', value: 92.1, color: '#6366F1' },
    { label: 'Dubai Modern Academy', value: 88.7, color: '#0EA5E9' },
    { label: 'Al Noor Academy (Silicon)', value: 94.5, color: '#10B981' },
    { label: 'Deira Heritage School', value: 86.2, color: '#F59E0B' },
    { label: 'Abu Dhabi Elite Academy', value: 91.0, color: '#8B5CF6' }
  ];

  const schoolMatrix = [
    { name: 'Emirates International School', branch: 'Al Barsha, Dubai', students: 3200, attendance: '94.7%', avgGrade: 'A-', collection: '92.1%', khda: 'Outstanding' },
    { name: 'Dubai Modern Academy', branch: 'Jumeirah 3, Dubai', students: 1800, attendance: '96.1%', avgGrade: 'A', collection: '88.7%', khda: 'Very Good' },
    { name: 'Al Noor Academy', branch: 'Silicon Oasis, Dubai', students: 2400, attendance: '95.3%', avgGrade: 'B+', collection: '94.5%', khda: 'Very Good' },
    { name: 'Deira Heritage Academy', branch: 'Deira Waterfront, Dubai', students: 1950, attendance: '93.8%', avgGrade: 'B', collection: '86.2%', khda: 'Good' },
    { name: 'Abu Dhabi Elite Academy', branch: 'Al Bateen, Abu Dhabi', students: 2800, attendance: '95.0%', avgGrade: 'A-', collection: '91.0%', khda: 'Very Good' },
    { name: 'Sharjah Scholars Academy', branch: 'University City, Sharjah', students: 2100, attendance: '94.1%', avgGrade: 'B+', collection: '89.4%', khda: 'Good' },
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Emirates Education Group — Multi-Campus Oversight' }]} />

      {/* Group Header */}
      <div className="bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-7 shadow-xl border border-indigo-900/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>Group Executive Oversight · 12 Campuses in UAE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Emirates Education Group — Board Cockpit
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Consolidated operational, academic, regulatory, and financial indicators across all group assets.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              addToast({
                type: 'success',
                title: 'Consolidated Board Deck Compiled',
                message: 'Monthly portfolio report ready for dispatch.'
              });
            }}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-sm flex items-center gap-2 cursor-pointer transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export Group Audit</span>
          </button>
        </div>
      </div>

      {/* Row 1: Platform KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Group Schools"
          value="12"
          trend={{ value: "+2 this year", isPositive: true }}
          icon={SchoolIcon}
          iconColor="text-indigo-600"
          bgColor="bg-indigo-50"
          subtext="Dubai (8) · Abu Dhabi (2) · Sharjah (2)"
        />
        <StatCard
          label="Total Enrolled Students"
          value="18,450"
          trend={{ value: "↑ 8.3% YoY", isPositive: true }}
          icon={Users}
          iconColor="text-sky-600"
          bgColor="bg-sky-50"
          subtext="Overall group capacity at 91.4%"
        />
        <StatCard
          label="Total Faculty & Staff"
          value="2,340"
          trend={{ value: "↑ 3.1% YoY", isPositive: true }}
          icon={ShieldCheck}
          iconColor="text-emerald-600"
          bgColor="bg-emerald-50"
          subtext="Student to teacher ratio 11.2:1"
        />
        <StatCard
          label="Revenue MTD"
          value="AED 4.2M"
          trend={{ value: "↑ 12.4% vs budget", isPositive: true }}
          icon={DollarSign}
          iconColor="text-purple-600"
          bgColor="bg-purple-50"
          subtext="AED 148M Annualized Collection"
        />
      </div>

      {/* Row 2: Enrollment Trend by School & Collection Rate */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Enrollment Trend */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h3 className="text-base font-bold text-gray-900">Total Group Enrollment Trajectory</h3>
              <p className="text-xs text-gray-500">12-month net additions across primary and secondary schools</p>
            </div>
            <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
              +1,150 Students
            </span>
          </div>

          <div className="pt-4">
            <AreaTrendChart 
              data={enrollmentTrend} 
              valuePrefix=""
              valueSuffix=" students"
              height={220}
            />
          </div>
        </div>

        {/* Collection Rate by School */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
            <div>
              <h3 className="text-base font-bold text-gray-900">Fee Collection Rate by Campus</h3>
              <p className="text-xs text-gray-500">Term 1 recovery target vs actual collection benchmark (90%)</p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              91.8% Group Avg
            </span>
          </div>

          <div className="pt-2">
            <BarComparisonChart 
              data={collectionRates} 
              horizontal={true}
              valueSuffix="%" 
            />
          </div>
        </div>

      </div>

      {/* Row 3: School Health Matrix */}
      <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <h3 className="text-base font-bold text-gray-900">Campus Health & Performance Matrix</h3>
            <p className="text-xs text-gray-500">Cross-institutional comparative metrics and regulatory ratings</p>
          </div>
          <button 
            onClick={() => setActiveRoute('/reports/khda')}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
          >
            KHDA Regulatory Files →
          </button>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/60 text-gray-500 uppercase tracking-wider font-semibold">
                <th className="py-3 px-3">School Name</th>
                <th className="py-3 px-3">Enrolled</th>
                <th className="py-3 px-3">Attendance</th>
                <th className="py-3 px-3">Avg Cohort Grade</th>
                <th className="py-3 px-3">Fee Collection</th>
                <th className="py-3 px-3">KHDA Rating</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {schoolMatrix.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-3.5 px-3">
                    <div className="font-semibold text-gray-900">{item.name}</div>
                    <div className="text-[11px] text-gray-500">{item.branch}</div>
                  </td>
                  <td className="py-3.5 px-3 font-mono font-semibold text-gray-800">
                    {item.students.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-3 font-mono font-medium text-emerald-600">
                    {item.attendance}
                  </td>
                  <td className="py-3.5 px-3 font-mono font-semibold text-indigo-600">
                    {item.avgGrade}
                  </td>
                  <td className="py-3.5 px-3 font-mono font-semibold text-gray-800">
                    {item.collection}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      item.khda === 'Outstanding' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      item.khda === 'Very Good' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' :
                      'bg-sky-50 text-sky-700 border border-sky-200'
                    }`}>
                      {item.khda}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <button
                      onClick={() => {
                        const targetSchool = schoolsData.find(s => s.name === item.name) || schoolsData[0];
                        setActiveSchool(targetSchool);
                        setActiveRoute('/dashboard');
                        addToast({
                          type: 'info',
                          title: 'Campus Focused',
                          message: `Loaded operational dashboard for ${item.name}`
                        });
                      }}
                      className="text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
                    >
                      View Campus →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Row 4: Critical Alerts + Recent Platform Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Critical Alerts */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="text-base font-bold text-gray-900">Group Critical Alerts & Compliance</h3>
            <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
              3 Items Require Action
            </span>
          </div>

          <div className="mt-3 space-y-3">
            <div className="p-3 rounded-lg border border-rose-200 bg-rose-50/40 text-xs">
              <div className="font-semibold text-rose-900 mb-0.5 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Deira Heritage Attendance Below 90% (88.4%)</span>
              </div>
              <p className="text-gray-600">Automated warning triggered. Head of School requested to submit corrective action plan before Monday.</p>
            </div>

            <div className="p-3 rounded-lg border border-amber-200 bg-amber-50/40 text-xs">
              <div className="font-semibold text-amber-900 mb-0.5 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>2 Pending KHDA Periodic Submission Files</span>
              </div>
              <p className="text-gray-600">Emirates International and Dubai Modern Academy staff qualification rosters pending final board signoff.</p>
            </div>

            <div className="p-3 rounded-lg border border-indigo-200 bg-indigo-50/40 text-xs">
              <div className="font-semibold text-indigo-900 mb-0.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Educational Trade License Renewal (Al Noor Academy)</span>
              </div>
              <p className="text-gray-600">Renewal due in 30 days. Legal documentation package pre-verified with Department of Economic Development.</p>
            </div>
          </div>
        </div>

        {/* Platform Activity */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="text-base font-bold text-gray-900">Recent Group Activity</h3>
            <span className="text-xs text-gray-400 font-mono">Consolidated</span>
          </div>

          <div className="divide-y divide-gray-100 mt-2">
            {[
              { title: 'New Campus Onboarded: Al Noor Intl (Phase 2)', desc: '1,200 additional student seat allocation configured.', time: 'Today 06:30 AM' },
              { title: '145 New Admissions Finalized Group-wide', desc: 'Term 2 spring enrollments accepted across Dubai campuses.', time: 'Yesterday' },
              { title: 'Unified Faculty Payroll Executed', desc: 'AED 18.2M distributed to 2,340 accounts via UAE WPS system.', time: 'Oct 18' },
              { title: 'Fleet Maintenance Certificate Renewals Approved', desc: '142 RTA compliant school buses cleared for operation.', time: 'Oct 15' }
            ].map((item, idx) => (
              <div key={idx} className="py-3 text-xs">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-gray-900">{item.title}</p>
                  <span className="text-[10px] text-gray-400 font-mono">{item.time}</span>
                </div>
                <p className="text-gray-500 mt-0.5">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
