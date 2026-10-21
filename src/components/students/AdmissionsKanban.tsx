import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Breadcrumb } from '../common/Breadcrumb';
import { AdmissionEnquiry } from '../../types';
import { 
  Users, UserPlus, Filter, ChevronRight, Clock, 
  CheckCircle2, ArrowRight, Phone, Mail, Sparkles 
} from 'lucide-react';

export const AdmissionsKanban: React.FC = () => {
  const { admissions, updateAdmissionStage, setActiveRoute } = useApp();
  const [selectedGrade, setSelectedGrade] = useState('All');

  const stages: AdmissionEnquiry['stage'][] = [
    'New Enquiry',
    'Under Review',
    'Assessment Scheduled',
    'Assessment Done',
    'Offer Made',
    'Accepted',
    'Enrolled'
  ];

  const filteredAdmissions = selectedGrade === 'All'
    ? admissions
    : admissions.filter(a => a.gradeApplying.includes(selectedGrade));

  const nextStageMap: Record<AdmissionEnquiry['stage'], AdmissionEnquiry['stage'] | null> = {
    'New Enquiry': 'Under Review',
    'Under Review': 'Assessment Scheduled',
    'Assessment Scheduled': 'Assessment Done',
    'Assessment Done': 'Offer Made',
    'Offer Made': 'Accepted',
    'Accepted': 'Enrolled',
    'Enrolled': null,
    'Withdrawn': null
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[
        { label: 'Students', route: '/students' },
        { label: 'Admissions Pipeline (Kanban)' }
      ]} />

      {/* Header & Metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200/80 gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Admissions Pipeline</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Real-time prospective student applicant stages, diagnostic bookings, and offer acceptances
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="px-3 py-2 text-xs bg-white border border-gray-200 rounded-lg text-gray-700 cursor-pointer shadow-2xs"
          >
            <option value="All">All Grades</option>
            <option value="Grade 7">Grade 7</option>
            <option value="Grade 8">Grade 8</option>
            <option value="Grade 9">Grade 9</option>
            <option value="Grade 10">Grade 10</option>
          </select>
          <button
            onClick={() => setActiveRoute('/students/new')}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>New Application</span>
          </button>
        </div>
      </div>

      {/* Pipeline KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-gray-400 block">Total Active Leads</span>
          <span className="text-2xl font-bold font-mono text-gray-900 mt-1 block">{admissions.length}</span>
          <span className="text-[11px] text-emerald-600 font-medium">↑ 18 new this week</span>
        </div>
        <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-gray-400 block">Diagnostic Pass Rate</span>
          <span className="text-2xl font-bold font-mono text-indigo-600 mt-1 block">84.2%</span>
          <span className="text-[11px] text-gray-500">CAT4 & English testing</span>
        </div>
        <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-gray-400 block">Offer Acceptance Rate</span>
          <span className="text-2xl font-bold font-mono text-emerald-600 mt-1 block">76.0%</span>
          <span className="text-[11px] text-gray-500">Seat deposit conversion</span>
        </div>
        <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-gray-400 block">Avg. Velocity to Enroll</span>
          <span className="text-2xl font-bold font-mono text-purple-600 mt-1 block">11.4 Days</span>
          <span className="text-[11px] text-gray-500">Enquiry to seat confirmation</span>
        </div>
      </div>

      {/* Kanban Board Horizontal Scroll */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-[1400px]">
          {stages.map((stage) => {
            const itemsInStage = filteredAdmissions.filter(a => a.stage === stage);
            return (
              <div
                key={stage}
                className="w-72 bg-gray-50/70 rounded-2xl border border-gray-200/80 p-3.5 flex flex-col shrink-0"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-gray-200/80">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                    <span className="text-xs font-bold text-gray-900 truncate">{stage}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">
                    {itemsInStage.length}
                  </span>
                </div>

                {/* Cards in column */}
                <div className="space-y-3 flex-1 overflow-y-auto max-h-[560px]">
                  {itemsInStage.length === 0 ? (
                    <div className="py-8 text-center text-xs text-gray-400">
                      No candidates in this stage
                    </div>
                  ) : (
                    itemsInStage.map((lead) => {
                      const nextStage = nextStageMap[lead.stage];
                      return (
                        <div
                          key={lead.id}
                          className="p-3.5 bg-white rounded-xl border border-gray-200/80 shadow-2xs hover:shadow-md hover:border-indigo-300 transition-all space-y-2 group"
                        >
                          <div className="flex items-start justify-between gap-1">
                            <h4 className="text-xs font-bold text-gray-900 leading-snug">
                              {lead.studentName}
                            </h4>
                            <span className="text-[10px] font-mono font-semibold text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded shrink-0">
                              {lead.gradeApplying}
                            </span>
                          </div>

                          <p className="text-[11px] text-gray-600 line-clamp-2 leading-relaxed">
                            {lead.notes}
                          </p>

                          <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400">
                            <span>Guardian: {lead.parentName}</span>
                            <span className="font-mono">{lead.date.slice(5)}</span>
                          </div>

                          {/* Fast Action to advance pipeline */}
                          {nextStage && (
                            <button
                              onClick={() => updateAdmissionStage(lead.id, nextStage)}
                              className="w-full mt-2 py-1.5 px-2 bg-gray-50 hover:bg-indigo-600 text-gray-700 hover:text-white rounded-lg text-[11px] font-medium transition-colors flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <span>Move to {nextStage}</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
