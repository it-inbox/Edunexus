export type UserRole = 
  | 'super_admin' 
  | 'principal' 
  | 'teacher' 
  | 'parent' 
  | 'student' 
  | 'accountant' 
  | 'nurse' 
  | 'counselor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  title?: string;
  schoolId: string;
  phone?: string;
}

export interface School {
  id: string;
  name: string;
  branch: string;
  curriculum: 'British (IGCSE/A-Levels)' | 'IB (PYP/MYP/DP)' | 'CBSE';
  grades: string;
  totalStudents: number;
  totalStaff: number;
  attendanceRate: number;
  feeCollectionRate: number;
  address: string;
  khdaRating: 'Outstanding' | 'Very Good' | 'Good';
  khdaLicense: string;
  logoAccent: string;
}

export interface Student {
  id: string;
  studentId: string; // EIS-2024-0012
  emiratesId: string; // 784-XXXX-XXXXXXX-X
  firstName: string;
  lastName: string;
  arabicName?: string;
  photo?: string;
  gender: 'Male' | 'Female';
  dob: string;
  grade: string; // e.g. "Grade 10" or "Year 10"
  section: string; // e.g. "A"
  admissionDate: string;
  status: 'Active' | 'Inactive' | 'Graduated' | 'Withdrawn';
  nationality: string;
  bloodType: string;
  guardianName: string;
  guardianRelationship: string;
  guardianEmail: string;
  guardianPhone: string;
  homeAddress: string;
  busRoute?: string;
  busStop?: string;
  feeStatus: 'Paid' | 'Partial' | 'Overdue';
  feeBalanceAED: number;
  attendancePercent: number;
  gpa: number;
  medicalConditions: string[];
  allergies: string[];
  behaviorPoints: number;
}

export interface Staff {
  id: string;
  employeeId: string;
  name: string;
  role: string;
  department: string;
  category: 'Teaching' | 'Non-teaching' | 'Administrative' | 'Support';
  email: string;
  phone: string;
  nationality: string;
  qualifications: string;
  joiningDate: string;
  status: 'Active' | 'On Leave' | 'Resigned';
  classesAssigned: string[];
  subjectsAssigned: string[];
  leaveBalanceAnnual: number;
  leaveBalanceSick: number;
  leaveBalancePersonal: number;
}

export interface AdmissionEnquiry {
  id: string;
  studentName: string;
  gradeApplying: string;
  parentName: string;
  email: string;
  phone: string;
  stage: 'New Enquiry' | 'Under Review' | 'Assessment Scheduled' | 'Assessment Done' | 'Offer Made' | 'Accepted' | 'Enrolled' | 'Withdrawn';
  date: string;
  source: string;
  assignedStaff: string;
  notes: string;
}

export interface AttendanceRecord {
  studentId: string;
  studentName: string;
  grade: string;
  section: string;
  status: 'Present' | 'Absent' | 'Late' | 'Excused';
  time?: string;
  notes?: string;
}

export interface TimetableSlot {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  period: number;
  time: string;
  subject: string;
  teacher: string;
  room: string;
  color: string;
}

export interface LessonPlan {
  id: string;
  title: string;
  grade: string;
  subject: string;
  teacher: string;
  week: string;
  date: string;
  objectives: string;
  activities: string;
  resources: string;
  status: 'Draft' | 'Submitted' | 'Approved';
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  gradeSection: string;
  dueDate: string;
  maxMarks: number;
  submissionsCount: number;
  totalStudents: number;
  description: string;
  status: 'Open' | 'Graded' | 'Closed';
}

export interface ExamScheduleItem {
  id: string;
  series: 'Term 1 Midterms' | 'Unit 3 Assessment' | 'Final Exams';
  subject: string;
  grade: string;
  date: string;
  time: string;
  duration: string;
  venue: string;
  invigilator: string;
}

export interface GradebookEntry {
  studentId: string;
  studentName: string;
  rollNumber: string;
  marksObtained: number;
  maxMarks: number;
  percentage: number;
  letterGrade: string;
  gpa: number;
  remarks: string;
}

export interface FeeInvoice {
  id: string;
  invoiceNo: string;
  studentId: string;
  studentName: string;
  grade: string;
  term: string;
  amountAED: number;
  paidAED: number;
  balanceAED: number;
  dueDate: string;
  status: 'Paid' | 'Partial' | 'Overdue';
  breakdown: { item: string; amount: number }[];
}

export interface BusRoute {
  id: string;
  routeNo: string;
  name: string;
  busNumber: string;
  driverName: string;
  driverPhone: string;
  assistantName: string;
  capacity: number;
  assignedStudents: number;
  status: 'On Route' | 'Completed' | 'Delayed' | 'Stationary';
  stops: { name: string; time: string; studentsCount: number }[];
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  authorRole: string;
  date: string;
  target: 'All School' | 'High School' | 'Middle School' | 'Parents' | 'Staff';
  priority: 'Normal' | 'Important' | 'Urgent';
  readCount: number;
}

export interface Circular {
  id: string;
  refNo: string;
  title: string;
  category: 'Academic' | 'Events' | 'Administrative' | 'Safety';
  date: string;
  status: 'Draft' | 'Review' | 'Published';
  signedBy: string;
}

export interface IncidentReport {
  id: string;
  incidentNo: string;
  date: string;
  time: string;
  location: string;
  severity: 'Minor' | 'Moderate' | 'Serious' | 'Critical';
  category: 'Behavioral' | 'Bullying' | 'Physical' | 'Property' | 'Academic Dishonesty';
  studentName: string;
  grade: string;
  reportedBy: string;
  description: string;
  status: 'New' | 'Investigating' | 'Resolved';
  actionTaken?: string;
}

export interface ClinicVisit {
  id: string;
  studentName: string;
  grade: string;
  date: string;
  time: string;
  complaint: string;
  treatment: string;
  temperature: string;
  outcome: 'Returned to Class' | 'Sent Home' | 'Referred to Hospital';
  nurseName: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category: 'Approvals' | 'Alerts' | 'Reminders' | 'System';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}
