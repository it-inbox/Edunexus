import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Breadcrumb } from '../common/Breadcrumb';
import { 
  FileText, Download, CheckCircle2, ShieldCheck, 
  BarChart3, Filter, Sparkles, Building2, Layers 
} from 'lucide-react';
import { BarComparisonChart, DonutBreakdownChart } from '../common/ChartComponents';

export const ReportsCenterView: React.FC = () => {
  const { addToast } = useApp();
  const [activeReportTab, setActiveReportTab] = useState<'khda' | 'builder' | 'exports'>('khda');

  // Nationality composition for KHDA
  const nationalityData = [
    { label: 'Emirati Nationals (20%)', value: 640, color: '#10B981' },
    { label: 'Indian Expatriates (25%)', value: 800, color: '#6366F1' },
    { label: 'Pakistani (15%)', value: 480, color: '#0EA5E9' },
    { label: 'British & European (12%)', value: 384, color: '#8B5CF6' },
    { label: 'Arab Expatriates (18%)', value: 576, color: '#F59E0B' },
    { label: 'Other Nationalities (10%)', value: 320, color: '#EC4899' },
  ];

  const handleDownloadKHDA = (docTitle: string) => {
    addToast({
      type: 'success',
      title: 'KHDA Compliance Dossier Exported',
      message: `${docTitle} generated with official cryptographic school seal.`
    });
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[
        { label: 'Reports', route: '/reports/khda' },
        { label: 'KHDA Compliance & Analytics Center' }
      ]} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200/80 gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Regulatory Compliance & Reports</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Knowledge and Human Development Authority (KHDA) periodic submissions and executive report builder
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl text-xs">
          {[
            { id: 'khda', label: 'KHDA Audit Files', icon: ShieldCheck },
            { id: 'builder', label: 'Custom Report Builder', icon: Layers },
            { id: 'exports', label: 'Export Center', icon: Download },
          ].map(tab => {
            const Icon = tab.icon;
            const isSelected = activeReportTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveReportTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold cursor-pointer transition-colors ${
                  isSelected ? 'bg-white text-indigo-600 shadow-2xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: KHDA Dossier */}
      {activeReportTab === 'khda' && (
        <div className="space-y-6">
          <div className="bg-linear-to-r from-emerald-950 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-xl border border-emerald-900/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>KHDA Rating: Outstanding · License #KHDA-EDU-2012-089</span>
              </div>
              <h2 className="text-xl font-bold text-white">Annual DSIB Inspection Preparedness</h2>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                All 6 key performance domains (Student Achievement, Personal Development, Teaching Quality, Curriculum, Care & Support, Leadership) pre-populated for Dubai inspectorate review.
              </p>
            </div>
            <button
              onClick={() => handleDownloadKHDA('Complete KHDA DSIB 2026 Master Dossier')}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-2 cursor-pointer transition-colors shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>Download Master Audit Package</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Nationality breakdown */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
                <div>
                  <h3 className="text-base font-bold text-gray-900">Student Demographic Composition</h3>
                  <p className="text-xs text-gray-500">National and expatriate representation (3,200 Cohort)</p>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  20% Emirati Target Met
                </span>
              </div>
              <DonutBreakdownChart data={nationalityData} size={170} centerValue="3,200" centerLabel="Total Students" />
            </div>

            {/* Standard Inspection Pre-sets */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs space-y-3">
              <h3 className="text-base font-bold text-gray-900 pb-3 border-b border-gray-100">
                Official Regulatory Document Downloads
              </h3>

              {[
                { title: 'Standard Attendance Roster (Form AT-01)', desc: '94.7% verified presence across all FS to Year 13 sections.', size: '1.4 MB' },
                { title: 'Faculty Qualifications & Ministry Equivalence Register', desc: '310 certified teachers with attested degrees.', size: '3.8 MB' },
                { title: 'Safeguarding & Wellbeing Bi-Annual Register', desc: 'Child protection case resolutions and restorative audit.', size: '890 KB' },
                { title: 'SEN & Gifted / Talented Inclusion Census', desc: '142 individual education plans (IEP) with specialist tracking.', size: '2.1 MB' }
              ].map((doc, idx) => (
                <div key={idx} className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-gray-900">{doc.title}</h4>
                    <p className="text-[11px] text-gray-500 mt-0.5">{doc.desc}</p>
                  </div>
                  <button
                    onClick={() => handleDownloadKHDA(doc.title)}
                    className="px-2.5 py-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-white border border-gray-200 rounded-lg shrink-0 ml-3 cursor-pointer shadow-2xs"
                  >
                    PDF ({doc.size})
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Custom Report Builder */}
      {activeReportTab === 'builder' && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-4">
          <div className="pb-3 border-b border-gray-100">
            <h3 className="text-base font-bold text-gray-900">Custom Institutional Metric Query Builder</h3>
            <p className="text-xs text-gray-500">Filter parameters to produce specialized cohort and financial reports</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Data Source</label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50">
                <option>Academic Exam Results & Moderation</option>
                <option>Daily Student Attendance Log</option>
                <option>Fee Collection & Aging Ledgers</option>
                <option>Faculty Leave & Substitution History</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Target Cohort</label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50">
                <option>All High School (Grades 9-12)</option>
                <option>Middle School (Grades 6-8)</option>
                <option>Primary School (Grades 1-5)</option>
                <option>Entire School Campus</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Time Horizon</label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50">
                <option>Current Term 1 (Aug - Dec 2026)</option>
                <option>Past 30 Days Rolling</option>
                <option>Full Academic Year 2025-26</option>
              </select>
            </div>
          </div>

          <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100 flex items-center justify-between text-xs">
            <span className="text-indigo-950 font-medium">Query ready: 3,200 rows with 8 computed statistical columns.</span>
            <button
              onClick={() => {
                addToast({
                  type: 'success',
                  title: 'Custom Report Compiled',
                  message: 'Dataset visualizer populated and spreadsheet ready.'
                });
              }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow-xs cursor-pointer"
            >
              Execute Query
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: Export Center */}
      {activeReportTab === 'exports' && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-gray-900 pb-3 border-b border-gray-100">
            Export Center & Archive
          </h3>
          <div className="divide-y divide-gray-100 text-xs">
            {[
              { name: 'Student Master Registry 2026.csv', date: 'Today at 08:30 AM', records: '3,200 rows', format: 'CSV' },
              { name: 'Term 1 Fee Invoices & Payment Audit.xlsx', date: 'Yesterday at 04:15 PM', records: '1,840 rows', format: 'Excel' },
              { name: 'RTA Approved Bus Fleet Register.pdf', date: 'Oct 15, 2026', records: '12 routes', format: 'PDF' },
            ].map((exp, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">{exp.name}</h4>
                  <p className="text-[11px] text-gray-500">{exp.date} · {exp.records}</p>
                </div>
                <button
                  onClick={() => {
                    addToast({
                      type: 'success',
                      title: 'Download Initiated',
                      message: `Saved ${exp.name}`
                    });
                  }}
                  className="px-3 py-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 rounded-lg cursor-pointer"
                >
                  Download ({exp.format})
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
