import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Breadcrumb } from '../common/Breadcrumb';
import { StatusBadge } from '../common/StatusBadge';
import { clinicVisitsData } from '../../data/mockData';
import { 
  ShieldAlert, HeartPulse, Trophy, Plus, 
  AlertTriangle, CheckCircle2, User, Clock, 
  Lock, Flame, FileText, ChevronRight 
} from 'lucide-react';

export const SafeguardingView: React.FC = () => {
  const { incidents, addIncident, updateIncidentStatus, addToast } = useApp();
  const [activeTab, setActiveTab] = useState<'incidents' | 'behavior' | 'clinic'>('incidents');
  const [isNewIncidentOpen, setIsNewIncidentOpen] = useState(false);

  // New incident form
  const [newIncidentForm, setNewIncidentForm] = useState({
    category: 'Behavioral' as const,
    severity: 'Moderate' as const,
    studentName: 'Zayed Al-Nahyan',
    grade: 'Grade 10-A',
    location: 'Cafeteria Dining Hall',
    reportedBy: 'Duty Supervisor',
    description: 'Minor dispute regarding seating queue during second break.',
    status: 'New' as const
  });

  const handleCreateIncident = () => {
    addIncident({
      date: new Date().toISOString().slice(0, 10),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      location: newIncidentForm.location,
      severity: newIncidentForm.severity,
      category: newIncidentForm.category,
      studentName: newIncidentForm.studentName,
      grade: newIncidentForm.grade,
      reportedBy: newIncidentForm.reportedBy,
      description: newIncidentForm.description,
      status: 'New',
      actionTaken: 'Assigned to Child Protection Officer for preliminary review.'
    });

    setIsNewIncidentOpen(false);
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[
        { label: 'Safeguarding', route: '/safeguarding' },
        { label: 'Child Protection, Behavior & Clinic' }
      ]} />

      {/* Header and Mode Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200/80 gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Safeguarding & Student Wellbeing</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Strictly controlled child safety registers, positive behavior leaderboard & DHA licensed medical clinic
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl text-xs">
          {[
            { id: 'incidents', label: 'Incident Records', icon: ShieldAlert },
            { id: 'behavior', label: 'Merit Leaderboard', icon: Trophy },
            { id: 'clinic', label: 'School Clinic Visits', icon: HeartPulse }
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

      {/* Tab 1: Safeguarding Incidents */}
      {activeTab === 'incidents' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
              <h3 className="text-base font-bold text-gray-900">Confidential Child Protection Log</h3>
            </div>
            <button
              onClick={() => setIsNewIncidentOpen(true)}
              className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Log New Incident</span>
            </button>
          </div>

          <div className="space-y-3">
            {incidents.map((inc) => (
              <div
                key={inc.id}
                className="p-5 bg-white rounded-2xl border border-gray-100 shadow-xs hover:border-gray-300 transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                      {inc.incidentNo}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      inc.severity === 'Critical' ? 'bg-rose-500 text-white' :
                      inc.severity === 'Serious' ? 'bg-rose-100 text-rose-800' :
                      inc.severity === 'Moderate' ? 'bg-amber-100 text-amber-900' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {inc.severity} Severity
                    </span>
                    <span className="text-xs font-bold text-gray-800">{inc.category}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <StatusBadge status={inc.status} />
                    {inc.status !== 'Resolved' && (
                      <button
                        onClick={() => updateIncidentStatus(inc.id, 'Resolved')}
                        className="text-xs font-semibold text-emerald-600 hover:text-emerald-800 ml-2 cursor-pointer"
                      >
                        Mark Resolved ✓
                      </button>
                    )}
                  </div>
                </div>

                <p className="text-xs text-gray-700 leading-relaxed font-medium">
                  {inc.description}
                </p>

                {inc.actionTaken && (
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-600">
                    <strong className="text-gray-900 block mb-0.5">Action & Remediation:</strong>
                    {inc.actionTaken}
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between text-[11px] text-gray-400 font-mono pt-2 border-t border-gray-100">
                  <span>Student: <strong>{inc.studentName}</strong> ({inc.grade})</span>
                  <span>Location: {inc.location}</span>
                  <span>Reported By: {inc.reportedBy} · {inc.date} ({inc.time})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Positive Behavior Leaderboard */}
      {activeTab === 'behavior' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-2xl border border-gray-100 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-bold text-gray-900">Term 1 Positive Behavior & House Points</h3>
              </div>
              <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded">
                Falcon House #1
              </span>
            </div>

            <div className="divide-y divide-gray-100">
              {[
                { rank: 1, name: 'Noor Al-Suwaidi', grade: 'Grade 9-A', points: 490, badge: 'Community Champion' },
                { rank: 2, name: 'Ananya Iyer', grade: 'Grade 6-A', points: 460, badge: 'Academic Integrity' },
                { rank: 3, name: 'Zainab Al-Mansouri', grade: 'Grade 10-A', points: 450, badge: 'Peer Mentor' },
                { rank: 4, name: 'Chloe Taylor', grade: 'Grade 12-A', points: 420, badge: 'Athletics Captain' },
                { rank: 5, name: 'Layla Al-Rashid', grade: 'Grade 7-B', points: 410, badge: 'Science Innovator' },
                { rank: 12, name: 'Ahmed Al-Rashid', grade: 'Grade 10-A', points: 340, badge: 'Star Student' }
              ].map(item => (
                <div key={item.rank} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono font-bold ${
                      item.rank === 1 ? 'bg-amber-400 text-white' :
                      item.rank === 2 ? 'bg-slate-300 text-slate-800' :
                      item.rank === 3 ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {item.rank}
                    </span>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{item.name}</h4>
                      <p className="text-[11px] text-gray-500">{item.grade} · {item.badge}</p>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-lg">
                    {item.points} pts
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-gray-900 pb-3 border-b border-gray-100">
              Four Inter-House Standings
            </h3>
            <div className="space-y-3">
              {[
                { house: 'Falcon House', points: 4820, color: 'bg-emerald-500' },
                { house: 'Oryx House', points: 4610, color: 'bg-indigo-500' },
                { house: 'Leopard House', points: 4390, color: 'bg-amber-500' },
                { house: 'Gazelle House', points: 4120, color: 'bg-rose-500' }
              ].map((h, i) => (
                <div key={i} className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex justify-between items-center text-xs mb-1.5 font-bold">
                    <span>{h.house}</span>
                    <span className="font-mono text-indigo-700">{h.points.toLocaleString()} pts</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className={`h-full rounded-full ${h.color}`} style={{ width: `${(h.points / 5000) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: School Clinic Visits */}
      {activeTab === 'clinic' && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h3 className="text-base font-bold text-gray-900">DHA Licensed Clinic Daily Log</h3>
              <p className="text-xs text-gray-500">Nurse Fatima Al-Zahra (DHA-RN-2019-0419) on duty</p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded">
              3 Visits Today
            </span>
          </div>

          <div className="divide-y divide-gray-100">
            {clinicVisitsData.map(visit => (
              <div key={visit.id} className="py-4 space-y-2 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900 text-sm">{visit.studentName}</span>
                    <span className="text-gray-500 font-mono">({visit.grade})</span>
                    <span className="font-mono text-gray-400">· Temp: {visit.temperature}</span>
                  </div>
                  <span className="font-mono text-indigo-600 font-semibold bg-indigo-50 px-2 py-0.5 rounded">
                    {visit.outcome}
                  </span>
                </div>

                <p className="text-gray-700"><strong>Complaint:</strong> {visit.complaint}</p>
                <p className="text-gray-600"><strong>Treatment Given:</strong> {visit.treatment}</p>

                <div className="flex items-center justify-between text-[11px] text-gray-400 font-mono pt-1">
                  <span>Attending Nurse: {visit.nurseName}</span>
                  <span>{visit.date} at {visit.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New Incident Modal */}
      {isNewIncidentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-base font-bold text-gray-900 pb-3 border-b border-gray-100 mb-4">
              File Safeguarding Incident Report
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Student Name *</label>
                <input
                  type="text"
                  value={newIncidentForm.studentName}
                  onChange={e => setNewIncidentForm({ ...newIncidentForm, studentName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Category</label>
                  <select
                    value={newIncidentForm.category}
                    onChange={e => setNewIncidentForm({ ...newIncidentForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  >
                    <option value="Behavioral">Behavioral</option>
                    <option value="Bullying">Bullying</option>
                    <option value="Physical">Physical / Altercation</option>
                    <option value="Property">Property Damage</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Severity Level</label>
                  <select
                    value={newIncidentForm.severity}
                    onChange={e => setNewIncidentForm({ ...newIncidentForm, severity: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  >
                    <option value="Minor">Minor</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Serious">Serious (Alerts VP)</option>
                    <option value="Critical">Critical (Immediate Escalation)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Campus Location</label>
                <input
                  type="text"
                  value={newIncidentForm.location}
                  onChange={e => setNewIncidentForm({ ...newIncidentForm, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Incident Summary & Context *</label>
                <textarea
                  rows={3}
                  value={newIncidentForm.description}
                  onChange={e => setNewIncidentForm({ ...newIncidentForm, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => setIsNewIncidentOpen(false)}
                  className="px-4 py-2 font-semibold text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateIncident}
                  className="px-4 py-2 font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-xs"
                >
                  Submit Incident Dossier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
