import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Breadcrumb } from '../common/Breadcrumb';
import { 
  User, Users, BookOpen, HeartPulse, Bus, 
  FileCheck, CheckCircle2, ChevronRight, ChevronLeft, 
  Sparkles, UploadCloud 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const StudentRegistrationWizard: React.FC = () => {
  const { addStudent, setActiveRoute, addToast } = useApp();
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    firstName: 'Zayed',
    lastName: 'Al-Nahyan',
    arabicName: 'زايد آل نهيان',
    gender: 'Male' as 'Male' | 'Female',
    dob: '2009-09-12',
    nationality: 'Emirati',
    bloodType: 'O+',
    grade: 'Grade 10',
    section: 'A',
    previousSchool: 'Al Bateen Academy, Abu Dhabi',
    guardianName: 'Sheikh Mansour Al-Nahyan',
    guardianRelationship: 'Father',
    guardianEmail: 'office.m@alnahyan.ae',
    guardianPhone: '+971 50 111 0000',
    homeAddress: 'Villa 1, Al Bateen Palace Area, Abu Dhabi / Dubai',
    busRequired: true,
    busPickupArea: 'Al Barsha 2 / Emirates Hills',
    medicalConditions: 'None',
    allergies: 'None'
  });

  const steps = [
    { num: 1, label: 'Basic Info', icon: User },
    { num: 2, label: 'Guardian', icon: Users },
    { num: 3, label: 'Previous School', icon: BookOpen },
    { num: 4, label: 'Medical', icon: HeartPulse },
    { num: 5, label: 'Transport', icon: Bus },
    { num: 6, label: 'Documents', icon: FileCheck },
    { num: 7, label: 'Review & Submit', icon: CheckCircle2 }
  ];

  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep(s => s + 1);
    } else {
      // Final submit
      const studentId = `EIS-2024-00${Math.floor(100 + Math.random() * 900)}`;
      const emiratesId = `784-2009-${Math.floor(1000000 + Math.random() * 9000000)}-1`;

      addStudent({
        studentId,
        emiratesId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        arabicName: formData.arabicName,
        gender: formData.gender,
        dob: formData.dob,
        grade: formData.grade,
        section: formData.section,
        admissionDate: new Date().toISOString().slice(0, 10),
        status: 'Active',
        nationality: formData.nationality,
        bloodType: formData.bloodType,
        guardianName: formData.guardianName,
        guardianRelationship: formData.guardianRelationship,
        guardianEmail: formData.guardianEmail,
        guardianPhone: formData.guardianPhone,
        homeAddress: formData.homeAddress,
        busRoute: formData.busRequired ? 'Route 4 - Al Barsha & Springs' : undefined,
        busStop: formData.busRequired ? 'Main Gate Entrance' : undefined,
        feeStatus: 'Paid',
        feeBalanceAED: 0,
        attendancePercent: 100,
        gpa: 3.90,
        medicalConditions: formData.medicalConditions === 'None' ? [] : [formData.medicalConditions],
        allergies: formData.allergies === 'None' ? [] : [formData.allergies],
        behaviorPoints: 200
      });

      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 }
      });

      setActiveRoute('/students');
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(s => s - 1);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Breadcrumb items={[
        { label: 'Students', route: '/students' },
        { label: 'Register New Student (Wizard)' }
      ]} />

      {/* Header */}
      <div className="text-center pb-2">
        <h1 className="text-2xl font-bold text-gray-900">Student Admission & Registration Wizard</h1>
        <p className="text-xs text-gray-500 mt-1">
          Complete the 7-step automated onboarding dossier to generate Emirates ID link and student registry file.
        </p>
      </div>

      {/* Step Indicator */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-xs overflow-x-auto">
        <div className="flex items-center justify-between min-w-[560px]">
          {steps.map((st, i) => {
            const isCompleted = currentStep > st.num;
            const isCurrent = currentStep === st.num;
            return (
              <React.Fragment key={st.num}>
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isCompleted ? 'bg-emerald-600 text-white' :
                    isCurrent ? 'bg-indigo-600 text-white ring-4 ring-indigo-100' :
                    'bg-gray-100 text-gray-400'
                  }`}>
                    {isCompleted ? '✓' : st.num}
                  </div>
                  <span className={`text-[11px] mt-1.5 font-medium whitespace-nowrap ${
                    isCurrent ? 'text-indigo-600 font-bold' : isCompleted ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {st.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 ${currentStep > st.num ? 'bg-emerald-500' : 'bg-gray-200'}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Wizard Step Content Box */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs">
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-gray-900 pb-2 border-b border-gray-100">Step 1: Student Identity & Basic Info</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">First Name (English) *</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-hidden focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Last Name (English) *</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-hidden focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Arabic Full Name (الاسم بالعربية)</label>
                <input
                  type="text"
                  value={formData.arabicName}
                  onChange={e => setFormData({ ...formData, arabicName: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-hidden focus:border-indigo-500 font-arabic"
                  dir="rtl"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Date of Birth *</label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={e => setFormData({ ...formData, dob: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-hidden focus:border-indigo-500 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Gender *</label>
                <select
                  value={formData.gender}
                  onChange={e => setFormData({ ...formData, gender: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-hidden focus:border-indigo-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Nationality *</label>
                <input
                  type="text"
                  value={formData.nationality}
                  onChange={e => setFormData({ ...formData, nationality: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-hidden focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-gray-900 pb-2 border-b border-gray-100">Step 2: Guardian & Emergency Contacts</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Guardian Full Name *</label>
                <input
                  type="text"
                  value={formData.guardianName}
                  onChange={e => setFormData({ ...formData, guardianName: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-hidden focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Relationship to Student *</label>
                <input
                  type="text"
                  value={formData.guardianRelationship}
                  onChange={e => setFormData({ ...formData, guardianRelationship: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-hidden focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Contact Mobile (+971 format) *</label>
                <input
                  type="text"
                  value={formData.guardianPhone}
                  onChange={e => setFormData({ ...formData, guardianPhone: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-hidden focus:border-indigo-500 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Guardian Email *</label>
                <input
                  type="email"
                  value={formData.guardianEmail}
                  onChange={e => setFormData({ ...formData, guardianEmail: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-hidden focus:border-indigo-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 mb-1">Residential Address in UAE *</label>
                <input
                  type="text"
                  value={formData.homeAddress}
                  onChange={e => setFormData({ ...formData, homeAddress: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-hidden focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-gray-900 pb-2 border-b border-gray-100">Step 3: Academic Placement & Previous Record</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Grade Applying For *</label>
                <select
                  value={formData.grade}
                  onChange={e => setFormData({ ...formData, grade: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-hidden focus:border-indigo-500"
                >
                  <option value="Grade 9">Grade 9 (Year 10)</option>
                  <option value="Grade 10">Grade 10 (Year 11)</option>
                  <option value="Grade 11">Grade 11 (IB / A-Level)</option>
                  <option value="Grade 12">Grade 12</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Target Section</label>
                <select
                  value={formData.section}
                  onChange={e => setFormData({ ...formData, section: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-hidden focus:border-indigo-500"
                >
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 mb-1">Last School Attended</label>
                <input
                  type="text"
                  value={formData.previousSchool}
                  onChange={e => setFormData({ ...formData, previousSchool: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-hidden focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-gray-900 pb-2 border-b border-gray-100">Step 4: Medical Health Profile</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Blood Type</label>
                <select
                  value={formData.bloodType}
                  onChange={e => setFormData({ ...formData, bloodType: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-hidden focus:border-indigo-500 font-mono"
                >
                  <option value="O+">O+</option>
                  <option value="A+">A+</option>
                  <option value="B+">B+</option>
                  <option value="AB+">AB+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Known Allergies (Food or Drug)</label>
                <input
                  type="text"
                  value={formData.allergies}
                  onChange={e => setFormData({ ...formData, allergies: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-hidden focus:border-indigo-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 mb-1">Chronic Conditions (Asthma, Diabetes, etc.)</label>
                <input
                  type="text"
                  value={formData.medicalConditions}
                  onChange={e => setFormData({ ...formData, medicalConditions: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-hidden focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-gray-900 pb-2 border-b border-gray-100">Step 5: Transportation Services</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.busRequired}
                  onChange={e => setFormData({ ...formData, busRequired: e.target.checked })}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-xs font-semibold text-gray-800">Requires daily school bus transportation</span>
              </label>

              {formData.busRequired && (
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
                  <label className="block text-xs font-semibold text-gray-700">Preferred Pickup Neighborhood</label>
                  <input
                    type="text"
                    value={formData.busPickupArea}
                    onChange={e => setFormData({ ...formData, busPickupArea: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white"
                  />
                  <p className="text-[11px] text-gray-500">
                    Assigned route will be automatically calculated based on RTA safe bus stops.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {currentStep === 6 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-gray-900 pb-2 border-b border-gray-100">Step 6: Compliance Document Uploads</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Emirates ID (Front & Back)', status: 'Verified ✓' },
                { title: 'Official Birth Certificate', status: 'Uploaded ✓' },
                { title: 'Passport & UAE Residency Visa', status: 'Verified ✓' },
                { title: 'Immunization / Vaccination Record', status: 'Uploaded ✓' }
              ].map((doc, i) => (
                <div key={i} className="p-4 border border-dashed border-gray-300 rounded-xl text-center bg-gray-50/50 hover:bg-white transition-colors">
                  <UploadCloud className="w-6 h-6 text-indigo-600 mx-auto mb-1" />
                  <h4 className="text-xs font-bold text-gray-900">{doc.title}</h4>
                  <span className="text-[10px] text-emerald-600 font-semibold font-mono block mt-1">{doc.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentStep === 7 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <h3 className="text-base font-bold text-gray-900">Step 7: Dossier Summary & Confirmation</h3>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-gray-500">Student Name:</span> <strong>{formData.firstName} {formData.lastName} ({formData.arabicName})</strong></div>
              <div className="flex justify-between"><span className="text-gray-500">Grade & Section:</span> <strong>{formData.grade} - {formData.section}</strong></div>
              <div className="flex justify-between"><span className="text-gray-500">Nationality & Blood Group:</span> <strong>{formData.nationality} · {formData.bloodType}</strong></div>
              <div className="flex justify-between"><span className="text-gray-500">Guardian Name:</span> <strong>{formData.guardianName} ({formData.guardianPhone})</strong></div>
              <div className="flex justify-between"><span className="text-gray-500">Transport:</span> <strong>{formData.busRequired ? 'Bus Route 4 Confirmed' : 'Self Drop-off'}</strong></div>
            </div>

            <p className="text-[11px] text-gray-500 text-center">
              Clicking "Complete Enrollment" will issue the student ID card, create their student portal login, and notify the bursar.
            </p>
          </div>
        )}

        {/* Wizard Footer Controls */}
        <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="px-4 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={handleNext}
            className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <span>{currentStep === 7 ? 'Complete Enrollment' : 'Continue'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
