import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, GraduationCap, Users, BookOpen, 
  FileCheck2, CheckSquare, DollarSign, Bus, MessageSquare, 
  ShieldAlert, HeartPulse, BarChart3, Settings, ChevronDown, 
  ChevronRight, School as SchoolIcon, Sparkles, Building2, 
  Check, PanelLeftClose, PanelLeftOpen 
} from 'lucide-react';
import { schoolsData } from '../../data/mockData';

interface SidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onCloseMobile }) => {
  const { activeRoute, setActiveRoute, activeSchool, setActiveSchool, addToast } = useApp();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSchoolMenuOpen, setIsSchoolMenuOpen] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    students: true,
    academics: false,
    exams: false,
    finance: false,
    staff: false,
    attendance: false,
    transport: false,
    comms: false,
    safeguarding: false,
    reports: false,
    settings: false
  });

  const toggleSection = (key: string) => {
    if (isCollapsed) setIsCollapsed(false);
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      route: '/dashboard'
    },
    {
      id: 'students',
      label: 'Students',
      icon: GraduationCap,
      children: [
        { label: 'Student Directory', route: '/students' },
        { label: 'Admissions Pipeline', route: '/admissions' },
        { label: 'Register New Student', route: '/students/new' },
        { label: 'Promotions & Transfers', route: '/students/promotions' },
        { label: 'Alumni Network', route: '/students/alumni' },
      ]
    },
    {
      id: 'staff',
      label: 'Staff & Faculty',
      icon: Users,
      children: [
        { label: 'Staff Directory', route: '/staff' },
        { label: 'Leave Approvals', route: '/staff/leave' },
        { label: 'Substitute Allocation', route: '/staff/substitutions' },
      ]
    },
    {
      id: 'academics',
      label: 'Academics',
      icon: BookOpen,
      children: [
        { label: 'Visual Timetable', route: '/academics/timetable' },
        { label: 'Subjects & Grades', route: '/academics/subjects' },
        { label: 'Lesson Plans', route: '/academics/lesson-plans' },
        { label: 'Assignments & Homework', route: '/academics/assignments' },
      ]
    },
    {
      id: 'exams',
      label: 'Examinations',
      icon: FileCheck2,
      children: [
        { label: 'Exam Schedule', route: '/exams/schedule' },
        { label: 'Mark Entry Gradebook', route: '/exams/gradebook' },
        { label: 'Report Cards Generator', route: '/exams/report-cards' },
        { label: 'Cohort Analytics', route: '/exams/analytics' },
      ]
    },
    {
      id: 'attendance',
      label: 'Attendance',
      icon: CheckSquare,
      children: [
        { label: 'Daily Attendance Marking', route: '/attendance/daily' },
        { label: 'Weekly Heatmap', route: '/attendance/heatmap' },
        { label: 'Late Arrival Log', route: '/attendance/late-arrivals' },
      ]
    },
    {
      id: 'finance',
      label: 'Fee & Finance',
      icon: DollarSign,
      children: [
        { label: 'Fee Collection & Invoices', route: '/finance' },
        { label: 'Fee Structure Setup', route: '/finance/fee-structures' },
        { label: 'Aging Defaulters Report', route: '/finance/aging' },
      ]
    },
    {
      id: 'transport',
      label: 'Transportation',
      icon: Bus,
      children: [
        { label: 'Routes & Stops', route: '/transport' },
        { label: 'Fleet & Drivers', route: '/transport/vehicles' },
      ]
    },
    {
      id: 'comms',
      label: 'Communication',
      icon: MessageSquare,
      children: [
        { label: 'Announcements', route: '/communications/announcements' },
        { label: 'Parent Messages', route: '/communications/messages' },
        { label: 'Official Circulars', route: '/communications/circulars' },
        { label: 'PTM Scheduler', route: '/communications/ptm' },
      ]
    },
    {
      id: 'safeguarding',
      label: 'Safeguarding & Health',
      icon: ShieldAlert,
      children: [
        { label: 'Incident Reports', route: '/safeguarding' },
        { label: 'Behavior Points System', route: '/safeguarding/behavior' },
        { label: 'Clinic Medical Log', route: '/health' },
      ]
    },
    {
      id: 'reports',
      label: 'Reports & KHDA',
      icon: BarChart3,
      children: [
        { label: 'KHDA Compliance Dossier', route: '/reports/khda' },
        { label: 'Custom Report Builder', route: '/reports/builder' },
        { label: 'Export Center', route: '/reports/exports' },
      ]
    },
    {
      id: 'settings',
      label: 'Configuration',
      icon: Settings,
      children: [
        { label: 'School Profile', route: '/settings/school-profile' },
        { label: 'Roles & Permission Matrix', route: '/settings/roles' },
        { label: 'Audit Trail Log', route: '/settings/audit-log' },
      ]
    }
  ];

  const handleNavClick = (route: string) => {
    setActiveRoute(route);
    onCloseMobile();
  };

  const sidebarWidth = isCollapsed ? 'w-[72px]' : 'w-[260px]';

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-gray-900/40 backdrop-blur-xs lg:hidden"
        />
      )}

      <aside className={`
        fixed lg:sticky top-0 left-0 z-40 h-screen bg-[#F9FAFB] border-r border-gray-200/80
        flex flex-col transition-all duration-300 ease-in-out
        ${sidebarWidth}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        
        {/* Top Header Section inside Sidebar */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200/60 shrink-0">
          {!isCollapsed && (
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-xs">
                <SchoolIcon className="w-4 h-4" />
              </div>
              <div className="truncate">
                <span className="font-bold text-gray-900 text-sm tracking-tight block truncate">
                  {activeSchool.name}
                </span>
                <span className="text-[10px] text-gray-500 font-medium block truncate">
                  Academic Year 2026-27
                </span>
              </div>
            </div>
          )}

          {isCollapsed && (
            <div className="w-8 h-8 mx-auto rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-xs">
              <SchoolIcon className="w-4 h-4" />
            </div>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
          </button>
        </div>

        {/* Scrollable Navigation Body */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const hasChildren = item.children && item.children.length > 0;
            const isOpen = openSections[item.id];
            const isSingleActive = !hasChildren && activeRoute === item.route;
            const isChildActive = hasChildren && item.children?.some(c => c.route === activeRoute);

            return (
              <div key={item.id} className="space-y-0.5">
                {hasChildren ? (
                  <button
                    onClick={() => toggleSection(item.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer group ${
                      isChildActive 
                        ? 'text-indigo-900 font-semibold bg-indigo-50/70' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/70'
                    }`}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                        isChildActive ? 'text-indigo-600' : 'text-gray-500 group-hover:text-gray-700'
                      }`} />
                      {!isCollapsed && <span className="truncate">{item.label}</span>}
                    </div>
                    {!isCollapsed && (
                      <span className="text-gray-400 group-hover:text-gray-600">
                        {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                      </span>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={() => handleNavClick(item.route!)}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer group ${
                      isSingleActive 
                        ? 'text-indigo-900 font-semibold bg-indigo-100/80 shadow-2xs' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/70'
                    }`}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                      isSingleActive ? 'text-indigo-600' : 'text-gray-500 group-hover:text-gray-700'
                    }`} />
                    {!isCollapsed && <span className="truncate">{item.label}</span>}
                  </button>
                )}

                {/* Sub-items */}
                {!isCollapsed && hasChildren && isOpen && (
                  <div className="pl-6 pr-1 py-0.5 space-y-0.5 border-l border-gray-200/80 ml-4">
                    {item.children?.map(subItem => {
                      const isSubActive = activeRoute === subItem.route;
                      return (
                        <button
                          key={subItem.route}
                          onClick={() => handleNavClick(subItem.route)}
                          className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs transition-colors truncate block cursor-pointer ${
                            isSubActive 
                              ? 'text-indigo-600 font-semibold bg-white shadow-2xs' 
                              : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/50'
                          }`}
                        >
                          {subItem.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Campus Selector (Multi-Tenant) */}
        <div className="p-3 border-t border-gray-200/60 bg-gray-50/80 shrink-0 relative">
          {!isCollapsed ? (
            <div>
              <button
                onClick={() => setIsSchoolMenuOpen(!isSchoolMenuOpen)}
                className="w-full flex items-center justify-between p-2 rounded-lg bg-white border border-gray-200 hover:border-indigo-300 text-left transition-all shadow-2xs cursor-pointer group"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 rounded-md bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 font-bold text-[10px]">
                    {activeSchool.name.slice(0, 1)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-gray-800 truncate">{activeSchool.name}</p>
                    <p className="text-[10px] text-gray-500 truncate">{activeSchool.curriculum}</p>
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-700 shrink-0" />
              </button>

              {/* School Switcher Popup */}
              {isSchoolMenuOpen && (
                <div className="absolute bottom-16 left-3 right-3 bg-white rounded-xl shadow-xl border border-gray-200 p-1.5 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150">
                  <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100 mb-1">
                    Emirates Education Group Campuses
                  </div>
                  {schoolsData.map(school => {
                    const isSelected = school.id === activeSchool.id;
                    return (
                      <button
                        key={school.id}
                        onClick={() => {
                          setActiveSchool(school);
                          setIsSchoolMenuOpen(false);
                          addToast({
                            type: 'info',
                            title: 'Active School Switched',
                            message: `Viewing ${school.name} (${school.branch})`
                          });
                        }}
                        className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs transition-colors cursor-pointer ${
                          isSelected ? 'bg-indigo-50 text-indigo-950 font-medium' : 'hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        <div className="min-w-0">
                          <p className="font-semibold truncate">{school.name}</p>
                          <p className="text-[10px] text-gray-500 truncate">{school.branch} · {school.curriculum}</p>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0 ml-1" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setIsCollapsed(false)}
              className="w-8 h-8 mx-auto rounded-lg bg-white border border-gray-200 flex items-center justify-center text-indigo-600 hover:bg-indigo-50 cursor-pointer shadow-2xs"
              title={activeSchool.name}
            >
              <Building2 className="w-4 h-4" />
            </button>
          )}
        </div>

      </aside>
    </>
  );
};
