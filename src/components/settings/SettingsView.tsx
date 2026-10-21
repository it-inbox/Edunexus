import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Breadcrumb } from '../common/Breadcrumb';
import { 
  Building2, Shield, History, Save, CheckCircle2, 
  Sparkles, Check, Key, Bell, Lock 
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { activeSchool, setActiveSchool, addToast } = useApp();
  const [activeTab, setActiveTab] = useState<'profile' | 'roles' | 'audit'>('profile');

  // School profile form
  const [schoolName, setSchoolName] = useState(activeSchool.name);
  const [address, setAddress] = useState(activeSchool.address);
  const [khdaLicense, setKhdaLicense] = useState(activeSchool.khdaLicense);
  const [curriculum, setCurriculum] = useState(activeSchool.curriculum);

  const handleSaveProfile = () => {
    setActiveSchool({
      ...activeSchool,
      name: schoolName,
      address,
      khdaLicense,
      curriculum: curriculum as any
    });
    addToast({
      type: 'success',
      title: 'School Profile Saved',
      message: 'Campus details updated across institutional letterheads.'
    });
  };

  const auditLogs = [
    { time: '2026-10-21 09:15:22', user: 'Dr. Sarah Al-Maktoum (Principal)', action: 'Published Grade 10-A Exam Results', module: 'Examinations', ip: '192.168.1.104' },
    { time: '2026-10-21 08:32:10', user: 'Ms. Ayesha Khan (Teacher)', action: 'Marked Homeroom Attendance (10-A)', module: 'Attendance', ip: '192.168.2.45' },
    { time: '2026-10-21 07:45:00', user: 'Ahmed Raza (Driver)', action: 'Bus Route 4 GPS Commenced', module: 'Transport', ip: '10.0.4.12' },
    { time: '2026-10-20 16:20:18', user: 'Rashid Al-Khouri (Bursar)', action: 'Reconciled Term 1 Online Gateway Batch', module: 'Finance', ip: '192.168.1.50' },
    { time: '2026-10-20 14:10:44', user: 'Zaid Al-Bitar (Counselor)', action: 'Updated Confidential Case Note (INC-029)', module: 'Safeguarding', ip: '192.168.1.88' },
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb items={[
        { label: 'Configuration', route: '/settings/school-profile' },
        { label: 'Institutional Settings & Governance' }
      ]} />

      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200/80 gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Institutional Configuration</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Campus branding, KHDA certification numbers, granular role-based permissions & tamper-proof audit trail
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl text-xs">
          {[
            { id: 'profile', label: 'School Profile', icon: Building2 },
            { id: 'roles', label: 'Roles & RBAC Matrix', icon: Shield },
            { id: 'audit', label: 'Audit Trail Log', icon: History }
          ].map(tab => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
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

      {/* Tab 1: Profile */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-5 max-w-3xl">
          <h3 className="text-base font-bold text-gray-900 pb-2 border-b border-gray-100">Campus Identity & Licensing</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="sm:col-span-2">
              <label className="block font-semibold text-gray-700 mb-1">Official School Name</label>
              <input
                type="text"
                value={schoolName}
                onChange={e => setSchoolName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-hidden focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Curriculum Framework</label>
              <select
                value={curriculum}
                onChange={e => setCurriculum(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg"
              >
                <option value="British (IGCSE/A-Levels)">British (IGCSE/A-Levels)</option>
                <option value="IB (PYP/MYP/DP)">IB (PYP/MYP/DP)</option>
                <option value="CBSE">CBSE</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">KHDA License Number</label>
              <input
                type="text"
                value={khdaLicense}
                onChange={e => setKhdaLicense(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg font-mono"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block font-semibold text-gray-700 mb-1">Physical Campus Address</label>
              <input
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 flex justify-end">
            <button
              onClick={handleSaveProfile}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Campus Profile</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Roles Matrix */}
      {activeTab === 'roles' && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h3 className="text-base font-bold text-gray-900">Role-Based Access Control (RBAC) Permission Grid</h3>
              <p className="text-xs text-gray-500">Security enforcement across all 14 software modules</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
              Granular Scopes Enforced
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/70 text-gray-500 uppercase tracking-wider font-semibold">
                  <th className="py-3 px-3">Role Designation</th>
                  <th className="py-3 px-3 text-center">Students</th>
                  <th className="py-3 px-3 text-center">Academics</th>
                  <th className="py-3 px-3 text-center">Exams</th>
                  <th className="py-3 px-3 text-center">Finance</th>
                  <th className="py-3 px-3 text-center">Health</th>
                  <th className="py-3 px-3 text-center">Safeguarding</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { role: 'Super Admin', st: 'Full', ac: 'Full', ex: 'Full', fi: 'Full', he: 'Audit', sg: 'Audit' },
                  { role: 'Principal', st: 'Full', ac: 'Full', ex: 'Full', fi: 'Full', he: 'View', sg: 'Full' },
                  { role: 'Teacher', st: 'Class Only', ac: 'Edit Own', ex: 'Enter Marks', fi: 'No Access', he: 'Emergency Only', sg: 'Report Only' },
                  { role: 'Bursar / Accountant', st: 'View', ac: 'No Access', ex: 'No Access', fi: 'Full', he: 'No Access', sg: 'No Access' },
                  { role: 'School Nurse', st: 'Medical Tab', ac: 'No Access', ex: 'No Access', fi: 'No Access', he: 'Full Clinical', sg: 'Injury Log' },
                  { role: 'Parent', st: 'Own Children', ac: 'View Own', ex: 'Report Cards', fi: 'Pay Own', he: 'Own Medical', sg: 'Conduct View' },
                  { role: 'Student', st: 'Self', ac: 'Own Classes', ex: 'Own Grades', fi: 'No Access', he: 'No Access', sg: 'Own Merits' },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="py-3 px-3 font-bold text-gray-900">{row.role}</td>
                    <td className="py-3 px-3 text-center font-mono text-gray-600">{row.st}</td>
                    <td className="py-3 px-3 text-center font-mono text-gray-600">{row.ac}</td>
                    <td className="py-3 px-3 text-center font-mono text-gray-600">{row.ex}</td>
                    <td className="py-3 px-3 text-center font-mono text-gray-600">{row.fi}</td>
                    <td className="py-3 px-3 text-center font-mono text-gray-600">{row.he}</td>
                    <td className="py-3 px-3 text-center font-mono text-gray-600">{row.sg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Audit Log */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h3 className="text-base font-bold text-gray-900">Cryptographically Chained Audit Trail</h3>
              <p className="text-xs text-gray-500">Immutable record of data modifications and executive actions</p>
            </div>
            <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
              Tamper-Evident Active
            </span>
          </div>

          <div className="divide-y divide-gray-100 font-mono text-xs">
            {auditLogs.map((log, i) => (
              <div key={i} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <span className="font-sans font-bold text-gray-900">{log.action}</span>
                  <div className="text-[11px] text-gray-500 font-sans mt-0.5">
                    User: {log.user} · Module: {log.module}
                  </div>
                </div>
                <div className="text-right text-[11px] text-gray-400">
                  <div>{log.time}</div>
                  <div>IP: {log.ip}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
