import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  School, Student, Staff, AdmissionEnquiry, FeeInvoice, 
  IncidentReport, NotificationItem, UserRole, User 
} from '../types';
import { 
  schoolsData, studentsData, staffData, admissionsPipelineData, 
  invoicesData, incidentReportsData, notificationsData 
} from '../data/mockData';

export interface Toast {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message?: string;
}

interface AppContextType {
  activeSchool: School;
  setActiveSchool: (school: School) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  currentUser: User;
  activeRoute: string;
  setActiveRoute: (route: string) => void;
  selectedStudentId: string;
  setSelectedStudentId: (id: string) => void;
  
  students: Student[];
  addStudent: (student: Omit<Student, 'id'>) => void;
  updateStudent: (id: string, updates: Partial<Student>) => void;
  
  staff: Staff[];
  admissions: AdmissionEnquiry[];
  updateAdmissionStage: (id: string, stage: AdmissionEnquiry['stage']) => void;
  
  invoices: FeeInvoice[];
  recordPayment: (invoiceId: string, amount: number) => void;
  
  incidents: IncidentReport[];
  addIncident: (incident: Omit<IncidentReport, 'id' | 'incidentNo'>) => void;
  updateIncidentStatus: (id: string, status: IncidentReport['status']) => void;
  
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeSchool, setActiveSchool] = useState<School>(schoolsData[0]);
  const [userRole, setUserRole] = useState<UserRole>('principal');
  const [activeRoute, setActiveRoute] = useState<string>('/dashboard');
  const [selectedStudentId, setSelectedStudentId] = useState<string>('std-1');
  
  const [students, setStudents] = useState<Student[]>(studentsData);
  const [staff] = useState<Staff[]>(staffData);
  const [admissions, setAdmissions] = useState<AdmissionEnquiry[]>(admissionsPipelineData);
  const [invoices, setInvoices] = useState<FeeInvoice[]>(invoicesData);
  const [incidents, setIncidents] = useState<IncidentReport[]>(incidentReportsData);
  const [notifications, setNotifications] = useState<NotificationItem[]>(notificationsData);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addStudent = (newStudentData: Omit<Student, 'id'>) => {
    const id = `std-${students.length + 1}`;
    const newStudent: Student = { ...newStudentData, id };
    setStudents(prev => [newStudent, ...prev]);
    addToast({
      type: 'success',
      title: 'Student Registered Successfully',
      message: `${newStudent.firstName} ${newStudent.lastName} has been added to ${newStudent.grade}-${newStudent.section}`
    });
  };

  const updateStudent = (id: string, updates: Partial<Student>) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
    addToast({
      type: 'success',
      title: 'Profile Updated',
      message: 'Student record changes saved to registry.'
    });
  };

  const updateAdmissionStage = (id: string, stage: AdmissionEnquiry['stage']) => {
    setAdmissions(prev => prev.map(a => a.id === id ? { ...a, stage } : a));
    addToast({
      type: 'info',
      title: 'Admission Pipeline Updated',
      message: `Applicant stage moved to "${stage}".`
    });
  };

  const recordPayment = (invoiceId: string, amount: number) => {
    setInvoices(prev => prev.map(inv => {
      if (inv.id === invoiceId) {
        const newPaid = inv.paidAED + amount;
        const newBalance = Math.max(0, inv.amountAED - newPaid);
        return {
          ...inv,
          paidAED: newPaid,
          balanceAED: newBalance,
          status: newBalance === 0 ? 'Paid' : 'Partial'
        };
      }
      return inv;
    }));
    addToast({
      type: 'success',
      title: 'Payment Processed',
      message: `AED ${amount.toLocaleString()} received. Official tax receipt generated.`
    });
  };

  const addIncident = (incidentData: Omit<IncidentReport, 'id' | 'incidentNo'>) => {
    const id = `inc-${incidents.length + 1}`;
    const incidentNo = `INC-2026-${String(incidents.length + 32).padStart(3, '0')}`;
    const newIncident: IncidentReport = {
      ...incidentData,
      id,
      incidentNo
    };
    setIncidents(prev => [newIncident, ...prev]);
    addToast({
      type: 'warning',
      title: 'Incident Logged to Safeguarding',
      message: `${incidentNo} assigned to Child Protection Officer.`
    });
  };

  const updateIncidentStatus = (id: string, status: IncidentReport['status']) => {
    setIncidents(prev => prev.map(inc => inc.id === id ? { ...inc, status } : inc));
    addToast({
      type: 'info',
      title: 'Incident Status Updated',
      message: `Case status set to ${status}.`
    });
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    addToast({
      type: 'info',
      title: 'Notifications Cleared',
      message: 'All notices marked as read.'
    });
  };

  const currentUser: User = {
    id: 'usr-001',
    name: userRole === 'principal' ? 'Dr. Sarah Al-Maktoum' :
          userRole === 'teacher' ? 'Ms. Ayesha Khan' :
          userRole === 'parent' ? 'Tariq Al-Rashid' :
          userRole === 'student' ? 'Ahmed Al-Rashid' :
          userRole === 'super_admin' ? 'H.E. Sheikh Sultan (Group CEO)' : 'Finance Director Al-Khouri',
    email: userRole === 'principal' ? 'principal@eis.sch.ae' :
           userRole === 'teacher' ? 'a.khan@eis.sch.ae' :
           userRole === 'parent' ? 'tariq.rashid@emirates.ae' :
           userRole === 'student' ? 'ahmed.rashid@student.eis.sch.ae' : 'exec.board@emirateseducation.ae',
    role: userRole,
    title: userRole === 'principal' ? 'Executive Principal & CEO' :
           userRole === 'teacher' ? 'Head of Mathematics (HOD)' :
           userRole === 'parent' ? 'Parent of Ahmed & Layla' :
           userRole === 'student' ? 'Grade 10-A Student' : 'Group Executive Director',
    schoolId: activeSchool.id
  };

  return (
    <AppContext.Provider value={{
      activeSchool,
      setActiveSchool,
      userRole,
      setUserRole,
      currentUser,
      activeRoute,
      setActiveRoute,
      selectedStudentId,
      setSelectedStudentId,
      students,
      addStudent,
      updateStudent,
      staff,
      admissions,
      updateAdmissionStage,
      invoices,
      recordPayment,
      incidents,
      addIncident,
      updateIncidentStatus,
      notifications,
      markNotificationAsRead,
      markAllNotificationsAsRead,
      isCommandPaletteOpen,
      setIsCommandPaletteOpen,
      toasts,
      addToast,
      removeToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
