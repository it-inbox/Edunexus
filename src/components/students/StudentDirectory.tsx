import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Breadcrumb } from '../common/Breadcrumb';
import { StatusBadge } from '../common/StatusBadge';
import { 
  Search, Filter, Download, UserPlus, Grid, 
  List, ArrowUpDown, ChevronLeft, ChevronRight, 
  Eye, MoreVertical, Phone, Mail, Sparkles 
} from 'lucide-react';

export const StudentDirectory: React.FC = () => {
  const { students, setSelectedStudentId, setActiveRoute, addToast } = useApp();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [selectedFeeStatus, setSelectedFeeStatus] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Filter students
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = 
        student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.emiratesId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.guardianName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesGrade = selectedGrade === 'All' || student.grade === selectedGrade;
      const matchesFee = selectedFeeStatus === 'All' || student.feeStatus === selectedFeeStatus;
      const matchesGender = selectedGender === 'All' || student.gender === selectedGender;

      return matchesSearch && matchesGrade && matchesFee && matchesGender;
    });
  }, [students, searchQuery, selectedGrade, selectedFeeStatus, selectedGender]);

  const totalPages = Math.ceil(filteredStudents.length / pageSize) || 1;
  const paginatedStudents = filteredStudents.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Student ID,First Name,Last Name,Grade,Section,Gender,Nationality,Fee Status,Attendance"]
      .concat(filteredStudents.map(s => `${s.studentId},${s.firstName},${s.lastName},${s.grade},${s.section},${s.gender},${s.nationality},${s.feeStatus},${s.attendancePercent}%`))
      .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `EduNexus_Students_Export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast({
      type: 'success',
      title: 'Export Generated',
      message: `${filteredStudents.length} student records downloaded in CSV format.`
    });
  };

  const handleViewProfile = (studentId: string) => {
    setSelectedStudentId(studentId);
    setActiveRoute(`/students/${studentId}`);
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Students', route: '/students' }, { label: 'Student Directory' }]} />

      {/* Header and Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200/80 gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Student Master Registry</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Showing {filteredStudents.length} active registered students across all primary & secondary sections
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setActiveRoute('/students/new')}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            <span>Register Student</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="px-3 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-lg text-xs font-medium flex items-center gap-1.5 cursor-pointer shadow-2xs transition-colors"
            title="Download CSV"
          >
            <Download className="w-4 h-4 text-gray-500" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
          <div className="border-l border-gray-200 pl-2 flex items-center gap-1 bg-gray-100 p-0.5 rounded-lg">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md text-xs cursor-pointer ${viewMode === 'table' ? 'bg-white text-indigo-600 shadow-2xs' : 'text-gray-500 hover:text-gray-900'}`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md text-xs cursor-pointer ${viewMode === 'grid' ? 'bg-white text-indigo-600 shadow-2xs' : 'text-gray-500 hover:text-gray-900'}`}
              title="Card Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-xs flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            placeholder="Search by student name, ID (EIS-2024-XXXX), Emirates ID, or guardian..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-indigo-500 focus:bg-white transition-colors"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Grade filter */}
          <select
            value={selectedGrade}
            onChange={(e) => { setSelectedGrade(e.target.value); setCurrentPage(1); }}
            className="px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-hidden cursor-pointer"
          >
            <option value="All">All Grades</option>
            <option value="Grade 6">Grade 6</option>
            <option value="Grade 7">Grade 7</option>
            <option value="Grade 8">Grade 8</option>
            <option value="Grade 9">Grade 9</option>
            <option value="Grade 10">Grade 10</option>
            <option value="Grade 11">Grade 11</option>
            <option value="Grade 12">Grade 12</option>
          </select>

          {/* Fee Status filter */}
          <select
            value={selectedFeeStatus}
            onChange={(e) => { setSelectedFeeStatus(e.target.value); setCurrentPage(1); }}
            className="px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-hidden cursor-pointer"
          >
            <option value="All">All Fee Status</option>
            <option value="Paid">Fee: Paid</option>
            <option value="Partial">Fee: Partial</option>
            <option value="Overdue">Fee: Overdue</option>
          </select>

          {/* Gender filter */}
          <select
            value={selectedGender}
            onChange={(e) => { setSelectedGender(e.target.value); setCurrentPage(1); }}
            className="px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-hidden cursor-pointer"
          >
            <option value="All">All Genders</option>
            <option value="Male">Boys</option>
            <option value="Female">Girls</option>
          </select>
        </div>
      </div>

      {/* Main Content: Table or Grid */}
      {viewMode === 'table' ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/70 text-gray-500 uppercase tracking-wider font-semibold">
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Student ID / EID</th>
                  <th className="py-3 px-4">Grade & Section</th>
                  <th className="py-3 px-4">Guardian Details</th>
                  <th className="py-3 px-4">Attendance</th>
                  <th className="py-3 px-4">Fee Balance</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedStudents.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-gray-400">
                      No students matching the current filter criteria.
                    </td>
                  </tr>
                ) : (
                  paginatedStudents.map((student) => (
                    <tr 
                      key={student.id} 
                      onClick={() => handleViewProfile(student.id)}
                      className="hover:bg-indigo-50/30 transition-colors cursor-pointer group"
                    >
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-linear-to-tr from-indigo-500 to-purple-600 text-white font-bold flex items-center justify-center text-xs shrink-0">
                            {student.firstName[0]}{student.lastName[0]}
                          </div>
                          <div className="min-w-0">
                            <span className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors block truncate">
                              {student.firstName} {student.lastName}
                            </span>
                            {student.arabicName && (
                              <span className="text-[11px] text-gray-400 font-arabic block">
                                {student.arabicName}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono">
                        <div className="text-gray-900 font-semibold">{student.studentId}</div>
                        <div className="text-[10px] text-gray-400">{student.emiratesId}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-block px-2 py-0.5 rounded font-medium bg-gray-100 text-gray-800">
                          {student.grade} - {student.section}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="text-gray-800 font-medium">{student.guardianName}</div>
                        <div className="text-[11px] text-gray-500 font-mono">{student.guardianPhone}</div>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-semibold">
                        <span className={student.attendancePercent >= 95 ? 'text-emerald-600' : student.attendancePercent >= 90 ? 'text-indigo-600' : 'text-amber-600'}>
                          {student.attendancePercent}%
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-semibold">
                        {student.feeBalanceAED === 0 ? (
                          <span className="text-emerald-600">Settled</span>
                        ) : (
                          <span className="text-amber-700">AED {student.feeBalanceAED.toLocaleString()}</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <StatusBadge status={student.feeStatus} />
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleViewProfile(student.id); }}
                          className="px-2.5 py-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors cursor-pointer"
                        >
                          View 360°
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 bg-gray-50/50">
            <span>
              Showing <span className="font-semibold text-gray-900">{Math.min(filteredStudents.length, (currentPage - 1) * pageSize + 1)}</span> to{' '}
              <span className="font-semibold text-gray-900">{Math.min(filteredStudents.length, currentPage * pageSize)}</span> of{' '}
              <span className="font-semibold text-gray-900">{filteredStudents.length}</span> students
            </span>
            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
                className="p-1.5 rounded border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-2 font-mono font-semibold text-gray-800">
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
                className="p-1.5 rounded border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Card Grid View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {paginatedStudents.map(student => (
            <div
              key={student.id}
              onClick={() => handleViewProfile(student.id)}
              className="bg-white rounded-xl border border-gray-100 p-4 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-full bg-linear-to-tr from-indigo-500 to-purple-600 text-white font-bold flex items-center justify-center text-sm shadow-2xs">
                  {student.firstName[0]}{student.lastName[0]}
                </div>
                <StatusBadge status={student.feeStatus} />
              </div>

              <div className="mt-3">
                <h4 className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {student.firstName} {student.lastName}
                </h4>
                {student.arabicName && (
                  <p className="text-[11px] text-gray-400 font-arabic">{student.arabicName}</p>
                )}
                <p className="text-xs font-mono text-gray-500 mt-0.5">{student.studentId} · {student.grade}-{student.section}</p>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">Attendance</span>
                  <span className="font-semibold text-emerald-600">{student.attendancePercent}%</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">GPA</span>
                  <span className="font-semibold text-indigo-600">{student.gpa.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-2 text-[11px] text-gray-500 truncate flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                <span>Guardian: {student.guardianName}</span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
