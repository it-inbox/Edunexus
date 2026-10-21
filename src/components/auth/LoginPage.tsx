import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, Lock, Mail, ArrowRight, ShieldCheck, 
  Building2, School, GraduationCap, Users, BookOpen 
} from 'lucide-react';
import { UserRole } from '../../types';

export const LoginPage: React.FC = () => {
  const { setActiveRoute, setUserRole, activeSchool, addToast } = useApp();
  const [email, setEmail] = useState('principal@eis.sch.ae');
  const [password, setPassword] = useState('••••••••••••');
  const [isMfaStep, setIsMfaStep] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsMfaStep(true);
  };

  const handleVerifyOtp = () => {
    setIsMfaStep(false);
    setActiveRoute('/dashboard');
    addToast({
      type: 'success',
      title: 'Identity Verified (MFA)',
      message: 'Welcome back to EduNexus Executive Platform.'
    });
  };

  const handleQuickDemoLogin = (role: UserRole) => {
    setUserRole(role);
    setActiveRoute('/dashboard');
    addToast({
      type: 'success',
      title: 'Direct Demo Access Granted',
      message: `Signed in as ${role.replace('_', ' ').toUpperCase()}.`
    });
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#FCFCFD]">
      
      {/* Left Panel: Branded Luxury Visual Showcase */}
      <div className="md:w-1/2 bg-linear-to-br from-indigo-950 via-slate-900 to-indigo-900 p-8 sm:p-12 text-white flex flex-col justify-between relative overflow-hidden">
        {/* Subtle decorative background circles */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

        {/* Top brand header */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-lg">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight block">EduNexus</span>
            <span className="text-[11px] text-indigo-300 uppercase tracking-widest font-semibold block">
              Emirates Education Group · Dubai, UAE
            </span>
          </div>
        </div>

        {/* Center Editorial Quote & Features */}
        <div className="relative z-10 my-12 space-y-6 max-w-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-300 text-xs font-semibold backdrop-blur-md">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>KHDA Certified Private School Ecosystem</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            The intelligent operating system for world-class education.
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            Reimagined for premium institutions in Dubai. Unified academics, finance, safeguarding, transport GPS, and regulatory reporting in one seamless platform.
          </p>

          <div className="pt-4 grid grid-cols-2 gap-3 text-xs font-mono text-indigo-200">
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <span className="text-xl font-bold text-white block">18,450+</span>
              <span className="text-[11px] text-slate-300">Students Across UAE</span>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <span className="text-xl font-bold text-white block">94.7%</span>
              <span className="text-[11px] text-slate-300">Consolidated Attendance</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-xs text-slate-400 flex items-center justify-between">
          <span>Protected by 256-bit AES & UAE Cloud Residency</span>
          <span>© 2026 EduNexus</span>
        </div>
      </div>

      {/* Right Panel: Clean Enterprise Login Form */}
      <div className="md:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-6">
          
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              {isMfaStep ? 'Two-Factor Authentication' : 'Sign in to your account'}
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              {isMfaStep 
                ? 'Enter the 6-digit security code sent to your registered UAE mobile (+971 ••• ••00).' 
                : 'Access your role-tailored dashboard with institutional credentials.'}
            </p>
          </div>

          {!isMfaStep ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Institutional Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-hidden focus:border-indigo-500 font-mono"
                    placeholder="name@eis.sch.ae"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-gray-700">Password</label>
                  <a href="#forgot" onClick={(e) => { e.preventDefault(); addToast({ type: 'info', title: 'Password Reset', message: 'Reset link dispatched to registered email.' }); }} className="text-xs text-indigo-600 hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-hidden focus:border-indigo-500 font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-indigo-600" />
                  <span className="text-gray-600">Remember this device</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <span>Sign In with Password</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between gap-2">
                {[0, 1, 2, 3, 4, 5].map(idx => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    defaultValue={idx + 4}
                    className="w-12 h-12 text-center text-lg font-mono font-bold border border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-hidden focus:ring-2 focus:ring-indigo-100"
                  />
                ))}
              </div>

              <button
                onClick={handleVerifyOtp}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <span>Verify & Enter Ecosystem</span>
                <ShieldCheck className="w-4 h-4" />
              </button>

              <div className="text-center">
                <button
                  onClick={() => setIsMfaStep(false)}
                  className="text-xs text-gray-500 hover:text-gray-900"
                >
                  ← Back to Email Sign In
                </button>
              </div>
            </div>
          )}

          {/* Quick Demo Role Logins */}
          <div className="pt-6 border-t border-gray-100 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block text-center">
              Instant Demo Access by Role
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => handleQuickDemoLogin('principal')}
                className="p-2.5 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50 text-left cursor-pointer transition-all flex items-center gap-2"
              >
                <div className="w-6 h-6 rounded bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                  P
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-gray-900 truncate">Dr. Sarah</div>
                  <div className="text-[10px] text-gray-500 truncate">Principal Portal</div>
                </div>
              </button>

              <button
                onClick={() => handleQuickDemoLogin('teacher')}
                className="p-2.5 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50 text-left cursor-pointer transition-all flex items-center gap-2"
              >
                <div className="w-6 h-6 rounded bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs">
                  T
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-gray-900 truncate">Ms. Ayesha</div>
                  <div className="text-[10px] text-gray-500 truncate">Teacher Portal</div>
                </div>
              </button>

              <button
                onClick={() => handleQuickDemoLogin('parent')}
                className="p-2.5 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50 text-left cursor-pointer transition-all flex items-center gap-2"
              >
                <div className="w-6 h-6 rounded bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                  PR
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-gray-900 truncate">Mr. Tariq</div>
                  <div className="text-[10px] text-gray-500 truncate">Parent Portal</div>
                </div>
              </button>

              <button
                onClick={() => handleQuickDemoLogin('student')}
                className="p-2.5 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50 text-left cursor-pointer transition-all flex items-center gap-2"
              >
                <div className="w-6 h-6 rounded bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">
                  S
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-gray-900 truncate">Ahmed (10-A)</div>
                  <div className="text-[10px] text-gray-500 truncate">Student Portal</div>
                </div>
              </button>
            </div>

            <button
              onClick={() => handleQuickDemoLogin('super_admin')}
              className="w-full mt-2 p-2 rounded-lg border border-indigo-200 bg-indigo-50/40 hover:bg-indigo-50 text-center font-semibold text-xs text-indigo-900 cursor-pointer transition-colors block"
            >
              Sign in as Group Board Super Admin (12 Campuses) →
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};
