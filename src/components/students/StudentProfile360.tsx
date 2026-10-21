import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Breadcrumb } from '../common/Breadcrumb';
import { StatusBadge } from '../common/StatusBadge';
import { 
  GraduationCap, User, BookOpen, Calendar, DollarSign, 
  ShieldAlert, HeartPulse, FileText, Bus, History, 
  Edit3, Printer, FileDown, Phone, Mail, MapPin, 
  AlertTriangle, CheckCircle2, ShieldCheck, Download 
} from 'lucide-react';
import { RadarSubjectChart } from '../common/ChartComponents';

export const StudentProfile360: React.FC = () => {
  const { selectedStudentId, students, setActiveRoute, addToast } = useApp();
  
  const student = students.find(s => s.id === selectedStudentId) || students[0];
  const [activeTab, setActiveTab] = useState<
    'overview' | 'academics' | 'attendance' | 'fees' | 'behavior' | 'health' | 'documents' | 'transport' | 'activity'
  >('overview');

  const handlePrintBadge = () => {
    addToast({
      type: 'info',
      title: 'Student ID Badge Ready',
      message: `Print payload generated for ${student.firstName} ${student.lastName} (${student.studentId}).`
    });
  };

  const handleGenerateTC = () => {
    addToast({
      type: 'success',
      title: 'KHDA Transfer Certificate Generated',
      message: 'Official bilingual clearance document signed and ready for parent download.'
    });
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[
        { label: 'Students', route: '/students' },
        { label: `${student.firstName} ${student.lastName} (360° Profile)` }
      ]} />

      {/* Top Profile Card Header */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-linear-to-tr from-indigo-600 via-indigo-500 to-purple-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-md shrink-0">
              {student.firstName[0]}{student.lastName[0]}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                  {student.firstName} {student.lastName}
                </h1>
                {student.arabicName && (
                  <span className="text-base text-gray-500 font-arabic">
                    ({student.arabicName})
                  </span>
                )}
                <StatusBadge status={student.status} />
              </div>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 font-mono">
                <span>ID: <strong className="text-gray-900">{student.studentId}</strong></span>
                <span>•</span>
                <span>Emirates ID: <strong className="text-gray-900">{student.emiratesId}</strong></span>
                <span>•</span>
                <span>Class: <strong className="text-indigo-600">{student.grade} - {student.section}</strong></span>
                <span>•</span>
                <span>Nationality: <strong className="text-gray-900">{student.nationality}</strong></span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handlePrintBadge}
              className="px-3 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-lg text-xs font-semibold shadow-2xs flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-gray-500" />
              <span>Print ID Card</span>
            </button>
            <button
              onClick={handleGenerateTC}
              className="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <FileDown className="w-3.5 h-3.5 text-indigo-600" />
              <span>Generate KHDA TC</span>
            </button>
          </div>
        </div>

        {/* 360 Profile Tab Navigation */}
        <div className="flex items-center gap-1 overflow-x-auto pt-3 border-t border-gray-100 -mb-2">
          {[
            { id: 'overview', label: 'Overview', icon: User },
            { id: 'academics', label: 'Academics', icon: BookOpen },
            { id: 'attendance', label: 'Attendance', icon: Calendar },
            { id: 'fees', label: 'Fees & Invoices', icon: DollarSign },
            { id: 'behavior', label: 'Behavior & Merits', icon: ShieldAlert },
            { id: 'health', label: 'Medical & Clinic', icon: HeartPulse },
            { id: 'documents', label: 'Official Documents', icon: FileText },
            { id: 'transport', label: 'Bus Transport', icon: Bus },
            { id: 'activity', label: 'Audit Trail', icon: History }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  isActive 
                    ? 'bg-indigo-600 text-white shadow-2xs' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/70'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-gray-900 pb-2 border-b border-gray-100">Personal Information</h3>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between"><span className="text-gray-500">Date of Birth:</span> <strong className="font-mono">{student.dob} (Age 17)</strong></div>
              <div className="flex justify-between"><span className="text-gray-500">Gender:</span> <strong>{student.gender}</strong></div>
              <div className="flex justify-between"><span className="text-gray-500">Nationality:</span> <strong>{student.nationality}</strong></div>
              <div className="flex justify-between"><span className="text-gray-500">Blood Group:</span> <strong className="font-mono text-rose-600">{student.bloodType}</strong></div>
              <div className="flex justify-between"><span className="text-gray-500">Admission Date:</span> <strong className="font-mono">{student.admissionDate}</strong></div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-gray-900 pb-2 border-b border-gray-100">Guardian & Emergency Contact</h3>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between"><span className="text-gray-500">Primary Guardian:</span> <strong>{student.guardianName}</strong></div>
              <div className="flex justify-between"><span className="text-gray-500">Relationship:</span> <strong>{student.guardianRelationship}</strong></div>
              <div className="flex justify-between"><span className="text-gray-500">Contact Phone:</span> <strong className="font-mono text-indigo-600">{student.guardianPhone}</strong></div>
              <div className="flex justify-between"><span className="text-gray-500">Email:</span> <strong className="truncate max-w-[150px]">{student.guardianEmail}</strong></div>
              <div className="flex justify-between"><span className="text-gray-500">Home Address:</span> <strong className="truncate max-w-[150px]">{student.homeAddress}</strong></div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-gray-900 pb-2 border-b border-gray-100">Vital School Standing</h3>
            <div className="space-y-2.5 text-xs font-mono">
              <div className="flex justify-between items-center"><span className="text-gray-500 font-sans">Current GPA:</span> <span className="font-bold text-indigo-600 text-sm">{student.gpa.toFixed(2)}</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-500 font-sans">Attendance:</span> <span className="font-bold text-emerald-600 text-sm">{student.attendancePercent}%</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-500 font-sans">Behavior Merits:</span> <span className="font-bold text-amber-600 text-sm">{student.behaviorPoints} pts</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-500 font-sans">Fee Balance:</span> <span className="font-bold text-gray-900">AED {student.feeBalanceAED.toLocaleString()}</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-500 font-sans">Bus Assignment:</span> <span className="text-[11px] font-bold text-sky-600">{student.busRoute ? 'Route 4 (Active)' : 'None'}</span></div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Academics */}
      {activeTab === 'academics' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-5 shadow-xs">
            <h3 className="text-base font-bold text-gray-900 pb-3 border-b border-gray-100 mb-4">
              Current Term Subject Markbook ({student.grade})
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-500 uppercase tracking-wider font-semibold">
                    <th className="py-2.5">Subject</th>
                    <th className="py-2.5">Teacher</th>
                    <th className="py-2.5">Coursework</th>
                    <th className="py-2.5">Midterm</th>
                    <th className="py-2.5">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { sub: 'Mathematics Extended (IGCSE)', teacher: 'Ms. Ayesha Khan', cw: '92%', exam: '88%', grade: 'A' },
                    { sub: 'Combined Science (Physics & Chem)', teacher: 'Dr. Vikram Patel', cw: '89%', exam: '91%', grade: 'A' },
                    { sub: 'English Language', teacher: 'Ms. Emma Richardson', cw: '85%', exam: '84%', grade: 'B+' },
                    { sub: 'Arabic Language Native', teacher: 'Sheikh Abdullah', cw: '81%', exam: '80%', grade: 'B' },
                    { sub: 'Computer Science (Python & Algorithms)', teacher: 'Mr. Siddharth Rao', cw: '96%', exam: '94%', grade: 'A*' }
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="py-3 font-semibold text-gray-900">{row.sub}</td>
                      <td className="py-3 text-gray-500">{row.teacher}</td>
                      <td className="py-3 font-mono">{row.cw}</td>
                      <td className="py-3 font-mono">{row.exam}</td>
                      <td className="py-3 font-mono font-bold text-indigo-600">{row.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs">
            <h3 className="text-base font-bold text-gray-900 pb-3 border-b border-gray-100 mb-2">
              Cohort Subject Mastery
            </h3>
            <RadarSubjectChart 
              subjects={[
                { name: 'Math', score: 88, classAvg: 78 },
                { name: 'Science', score: 91, classAvg: 80 },
                { name: 'English', score: 85, classAvg: 82 },
                { name: 'Arabic', score: 82, classAvg: 79 },
                { name: 'CompSci', score: 94, classAvg: 81 }
              ]} 
              size={220} 
            />
          </div>
        </div>
      )}

      {/* Tab 3: Attendance */}
      {activeTab === 'attendance' && (
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h3 className="text-base font-bold text-gray-900">Attendance Register & Punctuality</h3>
              <p className="text-xs text-gray-500">Total sessions: 84 | Present: 81 | Late: 1 | Excused: 2</p>
            </div>
            <span className="text-sm font-mono font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">
              {student.attendancePercent}% Presence
            </span>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200/80 text-xs text-gray-600">
            Student complies fully with KHDA 94% threshold. No chronic absenteeism or intervention notices recorded.
          </div>
        </div>
      )}

      {/* Tab 4: Fees */}
      {activeTab === 'fees' && (
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="text-base font-bold text-gray-900">Financial History & Invoices</h3>
            <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              Current Balance: AED {student.feeBalanceAED.toLocaleString()}
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-100 text-gray-500 uppercase tracking-wider font-semibold">
                  <th className="py-2.5">Invoice #</th>
                  <th className="py-2.5">Term</th>
                  <th className="py-2.5">Amount</th>
                  <th className="py-2.5">Paid</th>
                  <th className="py-2.5">Balance</th>
                  <th className="py-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-mono">
                <tr>
                  <td className="py-3 font-semibold text-gray-900">INV-2026-0891</td>
                  <td className="py-3 font-sans">Term 1 (2026-27)</td>
                  <td className="py-3">AED 18,400</td>
                  <td className="py-3 text-emerald-600">AED 18,400</td>
                  <td className="py-3 font-bold text-gray-900">AED 0</td>
                  <td className="py-3 font-sans"><StatusBadge status="Paid" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 5: Health & Medical */}
      {activeTab === 'health' && (
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-rose-600" />
              <h3 className="text-base font-bold text-gray-900">Restricted Medical Profile & Nurse Notes</h3>
            </div>
            <span className="text-[10px] uppercase font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              Confidential Medical Access
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40">
              <h4 className="text-xs font-bold text-amber-900 mb-1">Declared Conditions & Allergies</h4>
              <p className="text-xs text-gray-700">Conditions: {student.medicalConditions.join(', ') || 'None'}</p>
              <p className="text-xs text-gray-700 mt-1">Allergies: {student.allergies.join(', ') || 'No known allergies'}</p>
              <p className="text-xs text-gray-700 mt-1">Prescribed Inhaler: Ventolin 100mcg (Stored in Clinic Room)</p>
            </div>
            <div className="p-4 rounded-xl border border-gray-200 bg-gray-50">
              <h4 className="text-xs font-bold text-gray-900 mb-1">Clinic Visit Record</h4>
              <p className="text-xs text-gray-600">Last visited: Oct 21, 2026 at 09:15 AM</p>
              <p className="text-xs text-gray-600">Chief complaint: Post-sprint mild wheezing. Peak flow 420 L/min.</p>
              <p className="text-xs text-emerald-700 font-medium mt-1">Status: Fully stabilized and returned to class.</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 6: Transport */}
      {activeTab === 'transport' && (
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-gray-900 pb-3 border-b border-gray-100">Assigned Bus Route Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
              <div className="flex justify-between"><span className="text-gray-500">Route Name:</span> <strong>Route 4 - Al Barsha & Springs</strong></div>
              <div className="flex justify-between"><span className="text-gray-500">Assigned Vehicle:</span> <strong>Bus 02 (Volvo 48-Seater)</strong></div>
              <div className="flex justify-between"><span className="text-gray-500">Designated Stop:</span> <strong>Stop 3: Street 14 Park</strong></div>
              <div className="flex justify-between"><span className="text-gray-500">Morning Pickup Time:</span> <strong className="font-mono text-indigo-600">07:18 AM</strong></div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
              <div className="flex justify-between"><span className="text-gray-500">Driver Name:</span> <strong>Ahmed Raza</strong></div>
              <div className="flex justify-between"><span className="text-gray-500">Driver Contact:</span> <strong className="font-mono text-indigo-600">+971 50 119 2837</strong></div>
              <div className="flex justify-between"><span className="text-gray-500">Bus Assistant:</span> <strong>Rosalie Diaz</strong></div>
              <div className="flex justify-between"><span className="text-gray-500">Live Status:</span> <span className="text-emerald-600 font-bold">On Campus (Arrived 7:42 AM)</span></div>
            </div>
          </div>
        </div>
      )}

      {/* Fallback for other tabs */}
      {['behavior', 'documents', 'activity'].includes(activeTab) && (
        <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-xs text-center space-y-2">
          <CheckCircle2 className="w-8 h-8 text-indigo-600 mx-auto" />
          <h4 className="text-sm font-bold text-gray-900 capitalize">{activeTab} Dossier Verified</h4>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            All records synchronized in real-time with KHDA educational compliance registers.
          </p>
        </div>
      )}

    </div>
  );
};
