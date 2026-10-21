import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Breadcrumb } from '../common/Breadcrumb';
import { gradebookMock } from '../../data/mockData';
import { GradebookEntry } from '../../types';
import { 
  FileEdit, Lock, Unlock, CheckCircle2, Download, 
  Upload, Save, Send, Sparkles, AlertCircle 
} from 'lucide-react';

export const GradeBookView: React.FC = () => {
  const { addToast, setActiveRoute } = useApp();
  const [entries, setEntries] = useState<GradebookEntry[]>(gradebookMock);
  const [isLocked, setIsLocked] = useState(false);
  const [selectedClass, setSelectedClass] = useState('Grade 10-A');
  const [selectedExam, setSelectedExam] = useState('Unit 3 Assessment: Quadratic Functions');

  const calculateGrade = (marks: number, max: number) => {
    const pct = Math.round((marks / max) * 100);
    let letter = 'F';
    let gpa = 0.0;

    if (pct >= 95) { letter = 'A*'; gpa = 4.0; }
    else if (pct >= 85) { letter = 'A'; gpa = 3.85; }
    else if (pct >= 80) { letter = 'A-'; gpa = 3.65; }
    else if (pct >= 75) { letter = 'B+'; gpa = 3.30; }
    else if (pct >= 70) { letter = 'B'; gpa = 3.00; }
    else if (pct >= 60) { letter = 'C'; gpa = 2.50; }
    else if (pct >= 50) { letter = 'D'; gpa = 2.00; }

    return { pct, letter, gpa };
  };

  const handleMarkChange = (studentId: string, value: string) => {
    if (isLocked) return;
    const num = Math.min(100, Math.max(0, Number(value) || 0));

    setEntries(prev => prev.map(entry => {
      if (entry.studentId === studentId) {
        const { pct, letter, gpa } = calculateGrade(num, entry.maxMarks);
        return {
          ...entry,
          marksObtained: num,
          percentage: pct,
          letterGrade: letter,
          gpa
        };
      }
      return entry;
    }));
  };

  const handleSaveDraft = () => {
    addToast({
      type: 'success',
      title: 'Marks Saved to Draft',
      message: `${entries.length} student scores saved securely.`
    });
  };

  const handlePublishMarks = () => {
    setIsLocked(true);
    addToast({
      type: 'success',
      title: 'Gradebook Moderated & Published',
      message: 'Marks officially locked and published to student & parent portals.'
    });
  };

  const classAvg = Math.round(entries.reduce((acc, curr) => acc + curr.percentage, 0) / entries.length);

  return (
    <div className="space-y-6">
      <Breadcrumb items={[
        { label: 'Examinations', route: '/exams/gradebook' },
        { label: 'Mark Entry Gradebook' }
      ]} />

      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200/80 gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Examinations Gradebook</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Real-time mark entry, scale weighting, auto letter-grade conversion & KHDA registry publishing
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsLocked(!isLocked)}
            className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors border ${
              isLocked 
                ? 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100' 
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
            }`}
          >
            {isLocked ? <Lock className="w-3.5 h-3.5 text-amber-600" /> : <Unlock className="w-3.5 h-3.5 text-gray-500" />}
            <span>{isLocked ? 'Gradebook Locked' : 'Unlocked (Editing)'}</span>
          </button>

          <button
            onClick={handleSaveDraft}
            className="px-3.5 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-lg text-xs font-semibold shadow-2xs flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Save className="w-3.5 h-3.5 text-gray-500" />
            <span>Save Draft</span>
          </button>

          <button
            onClick={handlePublishMarks}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Publish to Portals</span>
          </button>
        </div>
      </div>

      {/* Selectors and Stats Strip */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div>
            <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Target Class</label>
            <select
              value={selectedClass}
              onChange={e => setSelectedClass(e.target.value)}
              className="px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg text-gray-800 font-semibold cursor-pointer"
            >
              <option value="Grade 10-A">Grade 10-A (Mathematics)</option>
              <option value="Grade 10-B">Grade 10-B (Mathematics)</option>
              <option value="Grade 10-C">Grade 10-C (Mathematics)</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Assessment Series</label>
            <select
              value={selectedExam}
              onChange={e => setSelectedExam(e.target.value)}
              className="px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg text-gray-800 font-semibold cursor-pointer"
            >
              <option value="Unit 3 Assessment: Quadratic Functions">Unit 3 Assessment (Out of 100)</option>
              <option value="Term 1 Midterms">Term 1 Midterm Exam</option>
              <option value="Unit 2 Diagnostic Quiz">Unit 2 Diagnostic Quiz</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="text-right">
            <span className="text-gray-400 block text-[10px] uppercase font-sans">Class Average</span>
            <span className="text-lg font-bold text-indigo-600">{classAvg}%</span>
          </div>
          <div className="text-right border-l border-gray-100 pl-4">
            <span className="text-gray-400 block text-[10px] uppercase font-sans">Highest Mark</span>
            <span className="text-lg font-bold text-emerald-600">97%</span>
          </div>
          <div className="text-right border-l border-gray-100 pl-4">
            <span className="text-gray-400 block text-[10px] uppercase font-sans">Graded Count</span>
            <span className="text-lg font-bold text-gray-900">{entries.length} / 32</span>
          </div>
        </div>
      </div>

      {/* Grade Entry Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/70 text-gray-500 uppercase tracking-wider font-semibold">
                <th className="py-3 px-4">Roll #</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Score (/100)</th>
                <th className="py-3 px-4">Percentage</th>
                <th className="py-3 px-4">Letter Grade</th>
                <th className="py-3 px-4">GPA Equiv</th>
                <th className="py-3 px-4">Teacher Remark</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-mono">
              {entries.map((entry) => (
                <tr key={entry.studentId} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-gray-500">
                    {entry.rollNumber}
                  </td>
                  <td className="py-3.5 px-4 font-sans font-semibold text-gray-900">
                    {entry.studentName}
                  </td>
                  <td className="py-3.5 px-4">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      disabled={isLocked}
                      value={entry.marksObtained}
                      onChange={(e) => handleMarkChange(entry.studentId, e.target.value)}
                      className="w-20 px-2.5 py-1 text-xs border border-gray-200 rounded bg-white text-gray-900 font-bold focus:outline-hidden focus:border-indigo-500 disabled:bg-gray-100 disabled:text-gray-500"
                    />
                  </td>
                  <td className="py-3.5 px-4 font-bold text-gray-900">
                    {entry.percentage}%
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-block px-2 py-0.5 rounded font-bold text-xs ${
                      entry.letterGrade.startsWith('A') ? 'bg-emerald-50 text-emerald-700' :
                      entry.letterGrade.startsWith('B') ? 'bg-indigo-50 text-indigo-700' :
                      'bg-amber-50 text-amber-700'
                    }`}>
                      {entry.letterGrade}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-indigo-600">
                    {entry.gpa.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4 font-sans text-gray-600 truncate max-w-xs">
                    {entry.remarks}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
