import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { CommandPalette } from './components/common/CommandPalette';
import { ToastContainer } from './components/common/ToastContainer';

// Dashboards
import { PrincipalDashboard } from './components/dashboards/PrincipalDashboard';
import { TeacherDashboard } from './components/dashboards/TeacherDashboard';
import { ParentDashboard } from './components/dashboards/ParentDashboard';
import { StudentDashboard } from './components/dashboards/StudentDashboard';
import { SuperAdminDashboard } from './components/dashboards/SuperAdminDashboard';

// Modules
import { StudentDirectory } from './components/students/StudentDirectory';
import { StudentProfile360 } from './components/students/StudentProfile360';
import { StudentRegistrationWizard } from './components/students/StudentRegistrationWizard';
import { AdmissionsKanban } from './components/students/AdmissionsKanban';
import { TimetableBuilder } from './components/academics/TimetableBuilder';
import { GradeBookView } from './components/exams/GradeBookView';
import { DailyAttendanceView } from './components/attendance/DailyAttendanceView';
import { FinanceDashboard } from './components/finance/FinanceDashboard';
import { TransportView } from './components/transport/TransportView';
import { CommunicationsView } from './components/communications/CommunicationsView';
import { SafeguardingView } from './components/safeguarding/SafeguardingView';
import { ReportsCenterView } from './components/reports/ReportsCenterView';
import { StaffDirectoryView } from './components/staff/StaffDirectoryView';
import { SettingsView } from './components/settings/SettingsView';
import { LoginPage } from './components/auth/LoginPage';

const MainAppContent: React.FC = () => {
  const { activeRoute, userRole } = useApp();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // If on login route, render standalone login
  if (activeRoute === '/login') {
    return (
      <>
        <LoginPage />
        <ToastContainer />
      </>
    );
  }

  // Dynamic route resolution
  const renderContent = () => {
    // 1. Dashboard Routes
    if (activeRoute === '/dashboard' || activeRoute === '/') {
      switch (userRole) {
        case 'super_admin':
          return <SuperAdminDashboard />;
        case 'teacher':
          return <TeacherDashboard />;
        case 'parent':
          return <ParentDashboard />;
        case 'student':
          return <StudentDashboard />;
        case 'principal':
        default:
          return <PrincipalDashboard />;
      }
    }

    // 2. Student Routes
    if (activeRoute === '/students') return <StudentDirectory />;
    if (activeRoute === '/students/new') return <StudentRegistrationWizard />;
    if (activeRoute.startsWith('/students/')) return <StudentProfile360 />;
    if (activeRoute === '/admissions') return <AdmissionsKanban />;

    // 3. Staff Routes
    if (activeRoute.startsWith('/staff')) return <StaffDirectoryView />;

    // 4. Academics Routes
    if (activeRoute.startsWith('/academics')) return <TimetableBuilder />;

    // 5. Examinations Routes
    if (activeRoute.startsWith('/exams')) return <GradeBookView />;

    // 6. Attendance Routes
    if (activeRoute.startsWith('/attendance')) return <DailyAttendanceView />;

    // 7. Finance Routes
    if (activeRoute.startsWith('/finance')) return <FinanceDashboard />;

    // 8. Transport Routes
    if (activeRoute.startsWith('/transport')) return <TransportView />;

    // 9. Communications Routes
    if (activeRoute.startsWith('/communications')) return <CommunicationsView />;

    // 10. Safeguarding & Health Routes
    if (activeRoute.startsWith('/safeguarding') || activeRoute.startsWith('/health')) {
      return <SafeguardingView />;
    }

    // 11. Reports Routes
    if (activeRoute.startsWith('/reports')) return <ReportsCenterView />;

    // 12. Settings Routes
    if (activeRoute.startsWith('/settings')) return <SettingsView />;

    // Fallback to Dashboard
    return <PrincipalDashboard />;
  };

  return (
    <div className="min-h-screen bg-[#FCFCFD] flex flex-col antialiased">
      {/* Top Navbar */}
      <Navbar onToggleSidebarMobile={() => setIsMobileSidebarOpen(true)} />

      {/* Main Shell: Sidebar + Content Area */}
      <div className="flex-1 flex">
        <Sidebar 
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Content Viewport */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 max-w-[1440px] mx-auto w-full">
          {renderContent()}
        </main>
      </div>

      {/* Global Overlays */}
      <CommandPalette />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
