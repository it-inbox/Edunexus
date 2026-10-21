import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, Users, GraduationCap, LayoutDashboard, 
  Calendar, DollarSign, Bus, ShieldAlert, HeartPulse, 
  FileText, Settings, ArrowRight, UserPlus, CheckCircle2, 
  Receipt, School as SchoolIcon, X 
} from 'lucide-react';
import { schoolsData } from '../../data/mockData';

export const CommandPalette: React.FC = () => {
  const { 
    isCommandPaletteOpen, setIsCommandPaletteOpen, 
    setActiveRoute, students, staff, setActiveSchool, 
    setSelectedStudentId, addToast 
  } = useApp();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Global keyboard shortcut Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(!isCommandPaletteOpen);
      } else if (e.key === 'Escape' && isCommandPaletteOpen) {
        setIsCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, setIsCommandPaletteOpen]);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  // Pages
  const pages = [
    { label: 'Role Dashboard', category: 'Navigation', route: '/dashboard', icon: LayoutDashboard },
    { label: 'Students Directory', category: 'Navigation', route: '/students', icon: GraduationCap },
    { label: 'Admissions Pipeline (Kanban)', category: 'Navigation', route: '/admissions', icon: Users },
    { label: 'Staff & Faculty', category: 'Navigation', route: '/staff', icon: Users },
    { label: 'Timetable Builder', category: 'Navigation', route: '/academics/timetable', icon: Calendar },
    { label: 'Examinations & Gradebook', category: 'Navigation', route: '/exams/gradebook', icon: FileText },
    { label: 'Daily Attendance Marking', category: 'Navigation', route: '/attendance/daily', icon: CheckCircle2 },
    { label: 'Fee Management & Invoices', category: 'Navigation', route: '/finance', icon: DollarSign },
    { label: 'Transport Fleet & GPS', category: 'Navigation', route: '/transport', icon: Bus },
    { label: 'Safeguarding & Incidents', category: 'Navigation', route: '/safeguarding', icon: ShieldAlert },
    { label: 'School Medical Clinic', category: 'Navigation', route: '/health', icon: HeartPulse },
    { label: 'KHDA Compliance Reports', category: 'Navigation', route: '/reports/khda', icon: FileText },
    { label: 'School Settings & Security', category: 'Navigation', route: '/settings/school-profile', icon: Settings },
  ];

  // Quick Actions
  const quickActions = [
    { 
      label: 'Quick Action: Register New Student (Wizard)', 
      category: 'Actions', 
      action: () => { setActiveRoute('/students/new'); setIsCommandPaletteOpen(false); }, 
      icon: UserPlus 
    },
    { 
      label: 'Quick Action: Mark Attendance for Class 10-A', 
      category: 'Actions', 
      action: () => { setActiveRoute('/attendance/daily'); setIsCommandPaletteOpen(false); }, 
      icon: CheckCircle2 
    },
    { 
      label: 'Quick Action: Create Fee Invoice', 
      category: 'Actions', 
      action: () => { setActiveRoute('/finance'); setIsCommandPaletteOpen(false); }, 
      icon: Receipt 
    },
    { 
      label: 'Quick Action: Report Safeguarding Incident', 
      category: 'Actions', 
      action: () => { setActiveRoute('/safeguarding/incidents/new'); setIsCommandPaletteOpen(false); }, 
      icon: ShieldAlert 
    },
    { 
      label: 'Switch Campus: Dubai Modern Academy (IB)', 
      category: 'Campuses', 
      action: () => { 
        setActiveSchool(schoolsData[1]); 
        setIsCommandPaletteOpen(false);
        addToast({ type: 'info', title: 'Campus Switched', message: 'Now viewing Dubai Modern Academy (Jumeirah)' });
      }, 
      icon: SchoolIcon 
    },
    { 
      label: 'Switch Campus: Emirates International School (British)', 
      category: 'Campuses', 
      action: () => { 
        setActiveSchool(schoolsData[0]); 
        setIsCommandPaletteOpen(false);
        addToast({ type: 'info', title: 'Campus Switched', message: 'Now viewing Emirates International School (Al Barsha)' });
      }, 
      icon: SchoolIcon 
    }
  ];

  // Filter students
  const filteredStudents = students
    .filter(s => 
      s.firstName.toLowerCase().includes(query.toLowerCase()) ||
      s.lastName.toLowerCase().includes(query.toLowerCase()) ||
      s.studentId.toLowerCase().includes(query.toLowerCase()) ||
      s.grade.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 4)
    .map(s => ({
      label: `${s.firstName} ${s.lastName} (${s.studentId}) — ${s.grade}-${s.section}`,
      category: 'Students',
      action: () => {
        setSelectedStudentId(s.id);
        setActiveRoute(`/students/${s.id}`);
        setIsCommandPaletteOpen(false);
      },
      icon: GraduationCap
    }));

  // Filter staff
  const filteredStaff = staff
    .filter(st => 
      st.name.toLowerCase().includes(query.toLowerCase()) ||
      st.role.toLowerCase().includes(query.toLowerCase()) ||
      st.department.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 3)
    .map(st => ({
      label: `${st.name} — ${st.role} (${st.department})`,
      category: 'Staff',
      action: () => {
        setActiveRoute('/staff');
        setIsCommandPaletteOpen(false);
      },
      icon: Users
    }));

  // Filter pages and actions
  const filteredPages = pages
    .filter(p => p.label.toLowerCase().includes(query.toLowerCase()))
    .map(p => ({
      ...p,
      action: () => {
        setActiveRoute(p.route);
        setIsCommandPaletteOpen(false);
      }
    }));

  const filteredActions = quickActions.filter(a => a.label.toLowerCase().includes(query.toLowerCase()));

  const allItems = [...filteredActions, ...filteredPages, ...filteredStudents, ...filteredStaff];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (allItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + allItems.length) % (allItems.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (allItems[selectedIndex]) {
        allItems[selectedIndex].action();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-gray-950/40 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-gray-100 bg-gray-50/50">
          <Search className="w-5 h-5 text-gray-400 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or search students, staff, pages..."
            className="w-full bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-hidden"
          />
          {query ? (
            <button onClick={() => setQuery('')} className="p-1 text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-gray-400 bg-gray-100 border border-gray-200 rounded">
              ESC to exit
            </kbd>
          )}
        </div>

        {/* Results list */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
          {allItems.length === 0 ? (
            <div className="py-12 text-center text-sm text-gray-500">
              No matching results found for <span className="font-semibold text-gray-800">"{query}"</span>
            </div>
          ) : (
            allItems.map((item, index) => {
              const Icon = item.icon;
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={index}
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer text-xs transition-colors ${
                    isSelected ? 'bg-indigo-50 text-indigo-900' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-medium truncate">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-400 px-1.5 py-0.5 rounded bg-gray-100">
                      {item.category}
                    </span>
                    {isSelected && <ArrowRight className="w-3.5 h-3.5 text-indigo-600" />}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400 font-mono">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="text-indigo-600 font-medium">EduNexus Search v2.4</span>
        </div>
      </div>
    </div>
  );
};
