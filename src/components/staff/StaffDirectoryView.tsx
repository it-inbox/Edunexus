import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Breadcrumb } from '../common/Breadcrumb';
import { StatusBadge } from '../common/StatusBadge';
import { 
  Users, UserCheck, Calendar, Clock, 
  Search, Filter, Plus, Phone, Mail, Check, X 
} from 'lucide-react';

export const StaffDirectoryView: React.FC = () => {
  const { staff, addToast } = useApp();
  const [activeTab, setActiveTab] = useState<'directory' | 'leave' | 'substitutes'>('directory');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  const [leaveRequests, setLeaveRequests] = useState([
    { id: 'lv-1', staffName: 'Ms. Ayesha Khan', dept: 'Mathematics', type: 'Sick Leave', dates: 'Oct 24 - Oct 25 (2 Days)', reason: 'Seasonal viral influenza', substitute: 'Mr. Siddhesh (Allocated)', status: 'Pending' },
    { id: 'lv-2', staffName: 'Mr. David Sterling', dept: 'Leadership', type: 'Personal Leave', dates: 'Nov 02 (1 Day)', reason: 'Attending British Council Education Summit', substitute: 'Dr. Vikram Patel', status: 'Approved' },
    { id: 'lv-3', staffName: 'Nurse Fatima Al-Zahra', dept: 'Clinic', type: 'Annual Leave', dates: 'Dec 18 - Dec 28', reason: 'Winter school holiday break', substitute: 'Nurse Relief Assigned', status: 'Approved' }
  ]);

  const handleApproveLeave = (id: string) => {
    setLeaveRequests(prev => prev.map(l => l.id === id ? { ...l, status: 'Approved' } : l));
    addToast({
      type: 'success',
      title: 'Leave Approved',
      message: 'Faculty leave recorded and automatic substitute timetable activated.'
    });
  };

  const filteredStaff = staff.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === 'All' || s.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-6">
      <Breadcrumb items={[
        { label: 'Staff & HR', route: '/staff' },
        { label: 'Faculty Directory & Leave Management' }
      ]} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200/80 gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Staff & Faculty Management</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            310 educational & operational staff members · Leave approvals & substitute cover orchestration
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl text-xs">
          {[
            { id: 'directory', label: 'Faculty Directory', icon: Users },
            { id: 'leave', label: 'Leave Requests', icon: Calendar },
            { id: 'substitutes', label: 'Substitutes', icon: UserCheck }
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

      {/* Tab 1: Staff Directory */}
      {activeTab === 'directory' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-xs flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search staff by name, role, department..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-indigo-500 focus:bg-white"
              />
            </div>
            <select
              value={selectedDept}
              onChange={e => setSelectedDept(e.target.value)}
              className="px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg text-gray-700 cursor-pointer"
            >
              <option value="All">All Departments</option>
              <option value="Leadership">Leadership</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
              <option value="Arabic & Islamic">Arabic & Islamic</option>
              <option value="Medical & Clinic">Medical & Clinic</option>
              <option value="Operations">Operations</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStaff.map(member => (
              <div key={member.id} className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs hover:shadow-md transition-all space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-linear-to-tr from-indigo-500 to-purple-600 text-white font-bold text-xs flex items-center justify-center">
                      {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">{member.name}</h4>
                      <p className="text-[11px] text-indigo-600 font-medium">{member.role}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                    {member.department}
                  </span>
                </div>

                <div className="text-[11px] text-gray-600 space-y-1 pt-2 border-t border-gray-100">
                  <p className="truncate"><strong className="text-gray-700">Credentials:</strong> {member.qualifications}</p>
                  <p><strong className="text-gray-700">Nationality:</strong> {member.nationality}</p>
                  <p className="font-mono text-gray-500"><strong className="text-gray-700 font-sans">Emp ID:</strong> {member.employeeId}</p>
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] font-mono text-gray-500">
                  <span>Leave Bal: <strong>{member.leaveBalanceAnnual}d</strong></span>
                  <a href={`mailto:${member.email}`} className="text-indigo-600 hover:underline">
                    {member.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Leave Requests */}
      {activeTab === 'leave' && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="text-base font-bold text-gray-900">Faculty Leave Applications</h3>
            <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded">
              1 Pending Executive Signoff
            </span>
          </div>

          <div className="divide-y divide-gray-100">
            {leaveRequests.map(req => (
              <div key={req.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-gray-900 text-sm">{req.staffName}</span>
                    <span className="text-gray-500">({req.dept})</span>
                    <span className="font-mono font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                      {req.type}
                    </span>
                  </div>
                  <p className="text-gray-600">Duration: <strong>{req.dates}</strong> · Reason: {req.reason}</p>
                  <p className="text-[11px] text-emerald-700 font-medium mt-0.5">Substitute plan: {req.substitute}</p>
                </div>

                <div className="flex items-center gap-2">
                  {req.status === 'Pending' ? (
                    <>
                      <button
                        onClick={() => handleApproveLeave(req.id)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve Leave</span>
                      </button>
                    </>
                  ) : (
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                      Approved ✓
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Substitute Cover */}
      {activeTab === 'substitutes' && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-gray-900 pb-3 border-b border-gray-100">
            Active Substitute Coverage Timetable
          </h3>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-700">
            All periods for absent faculty are 100% covered by qualified internal subject specialists. No unsupervised study periods scheduled today.
          </div>
        </div>
      )}

    </div>
  );
};
