import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, Bell, User as UserIcon, Shield, GraduationCap, 
  BookOpen, Users, ChevronDown, Check, LogOut, Settings, 
  Building2, Sparkles, Menu 
} from 'lucide-react';
import { NotificationDropdown } from './NotificationDropdown';
import { UserRole } from '../../types';

interface NavbarProps {
  onToggleSidebarMobile?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebarMobile }) => {
  const { 
    currentUser, userRole, setUserRole, 
    activeSchool, setIsCommandPaletteOpen, 
    notifications, setActiveRoute 
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const roleMenuRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (roleMenuRef.current && !roleMenuRef.current.contains(event.target as Node)) {
        setIsRoleMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const rolesList: { role: UserRole; label: string; desc: string; icon: any }[] = [
    { role: 'principal', label: 'Principal Portal', desc: 'Dr. Sarah — Complete school overview & KPIs', icon: Shield },
    { role: 'teacher', label: 'Teacher Portal', desc: 'Ms. Ayesha — Classes, attendance & mark entry', icon: BookOpen },
    { role: 'parent', label: 'Parent Portal', desc: 'Tariq Al-Rashid — Children grades, fees & bus', icon: Users },
    { role: 'student', label: 'Student Portal', desc: 'Ahmed Al-Rashid — Timetable, homework & streaks', icon: GraduationCap },
    { role: 'super_admin', label: 'Super Admin Portal', desc: 'Group Level — 12 Schools & Multi-campus finance', icon: Building2 },
  ];

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 backdrop-blur-md border-b border-gray-200/80 px-4 sm:px-6 flex items-center justify-between gap-4">
      
      {/* Left: Mobile hamburger & Logo Lockup */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebarMobile}
          className="lg:hidden p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-linear-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-900 tracking-tight text-base">EduNexus</span>
              <span className="hidden sm:inline-flex text-[10px] font-semibold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-200">
                {activeSchool.branch.split(',')[0]}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Center: Command Palette Trigger */}
      <div className="flex-1 max-w-md mx-2 hidden sm:block">
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="w-full flex items-center justify-between px-3.5 py-1.5 bg-gray-50 hover:bg-gray-100/80 text-gray-400 hover:text-gray-600 border border-gray-200 rounded-lg text-xs transition-colors cursor-pointer group"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors" />
            <span>Search students, timetable, fees, staff...</span>
          </div>
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-gray-400 bg-white border border-gray-200 rounded shadow-2xs">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right Controls: Role Switcher, Notification Bell, User Avatar */}
      <div className="flex items-center gap-2.5 sm:gap-3">

        {/* Quick Role Switcher (Demonstration Feature) */}
        <div className="relative" ref={roleMenuRef}>
          <button
            onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-indigo-200/80 bg-indigo-50/70 hover:bg-indigo-100/70 text-indigo-900 text-xs font-medium transition-colors cursor-pointer"
            title="Switch portal perspective"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
            <span className="hidden md:inline text-indigo-700">Role:</span>
            <span className="font-semibold capitalize">
              {userRole.replace('_', ' ')}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-indigo-500" />
          </button>

          {isRoleMenuOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-1.5 border-b border-gray-100 mb-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Switch Active Portal Experience
                </span>
              </div>
              {rolesList.map(item => {
                const isCurrent = userRole === item.role;
                const Icon = item.icon;
                return (
                  <button
                    key={item.role}
                    onClick={() => {
                      setUserRole(item.role);
                      setIsRoleMenuOpen(false);
                      setActiveRoute('/dashboard');
                    }}
                    className={`w-full flex items-start gap-2.5 px-3 py-2 text-left text-xs transition-colors cursor-pointer ${
                      isCurrent ? 'bg-indigo-50/80 text-indigo-950 font-medium' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`p-1.5 rounded-md mt-0.5 shrink-0 ${isCurrent ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-900">{item.label}</span>
                        {isCurrent && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                      </div>
                      <p className="text-[11px] text-gray-500 line-clamp-1">{item.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Mobile Search Button */}
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="sm:hidden p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Notification Bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full ring-2 ring-white animate-pulse" />
            )}
          </button>

          {isNotifOpen && (
            <NotificationDropdown onClose={() => setIsNotifOpen(false)} />
          )}
        </div>

        {/* User Profile Avatar & Menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="w-7 h-7 rounded-full bg-linear-to-tr from-indigo-500 to-purple-600 text-white font-bold text-xs flex items-center justify-center">
              {currentUser.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <span className="hidden xl:inline text-xs font-medium text-gray-800 max-w-[120px] truncate">
              {currentUser.name}
            </span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3.5 py-2.5 border-b border-gray-100">
                <p className="text-xs font-bold text-gray-900 truncate">{currentUser.name}</p>
                <p className="text-[11px] text-gray-500 truncate">{currentUser.email}</p>
                <div className="mt-1 inline-flex items-center text-[10px] font-medium text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                  {currentUser.title}
                </div>
              </div>

              <div className="py-1">
                <button
                  onClick={() => { setActiveRoute('/settings/school-profile'); setIsUserMenuOpen(false); }}
                  className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-gray-700 hover:bg-gray-50 text-left cursor-pointer"
                >
                  <Building2 className="w-3.5 h-3.5 text-gray-400" />
                  <span>Campus Settings</span>
                </button>
                <button
                  onClick={() => { setActiveRoute('/settings/roles'); setIsUserMenuOpen(false); }}
                  className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-gray-700 hover:bg-gray-50 text-left cursor-pointer"
                >
                  <Settings className="w-3.5 h-3.5 text-gray-400" />
                  <span>Roles & Permissions</span>
                </button>
                <button
                  onClick={() => { setActiveRoute('/login'); setIsUserMenuOpen(false); }}
                  className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-rose-600 hover:bg-rose-50 text-left cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-500" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
