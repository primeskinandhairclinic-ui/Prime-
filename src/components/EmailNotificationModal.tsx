import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Send, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  User, 
  MapPin, 
  Phone, 
  Eye, 
  Sparkles,
  Inbox
} from 'lucide-react';
import { EmailReminderLog, ClinicInfo } from '../types/clinic';
import { storage } from '../utils/storage';

interface EmailNotificationModalProps {
  clinicInfo: ClinicInfo;
  onClose: () => void;
  onRefreshNotifications: () => void;
}

export const EmailNotificationModal: React.FC<EmailNotificationModalProps> = ({
  clinicInfo,
  onClose,
  onRefreshNotifications,
}) => {
  const [logs, setLogs] = useState<EmailReminderLog[]>(storage.getEmailLogs());
  const [selectedLog, setSelectedLog] = useState<EmailReminderLog | null>(logs[0] || null);
  const [testEmail, setTestEmail] = useState<string>('Shivendrachaurasiya256@gmail.com');
  const [testSentNotice, setTestSentNotice] = useState<string | null>(null);

  const handleSendTestDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testEmail.trim()) return;

    const mockApt = {
      id: `PS-${Math.floor(2000 + Math.random() * 8000)}`,
      patientName: 'Shivendra Chaurasia',
      patientPhone: '8960777591',
      patientEmail: testEmail.trim(),
      patientAge: 32,
      patientGender: 'Male' as const,
      doctorId: 'dr-ak-chaurasia',
      doctorName: 'Dr. A.K. Chaurasia',
      serviceId: 'srv-hair-loss',
      serviceName: 'Hair Loss & Scalp Treatment (PRP)',
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      timeSlot: '05:40 PM - 06:00 PM',
      status: 'confirmed' as const,
      paymentStatus: 'paid' as const,
      amount: 400,
      reminderSent: true,
      remindersList: [],
      createdAt: new Date().toISOString()
    };

    const newLog = storage.dispatchAutomatedReminder(mockApt, '24-Hour Reminder');
    const updatedLogs = storage.getEmailLogs();
    setLogs(updatedLogs);
    setSelectedLog(newLog);
    onRefreshNotifications();

    setTestSentNotice(`Automated reminder email successfully dispatched to ${testEmail}!`);
    setTimeout(() => setTestSentNotice(null), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-fadeIn">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-blue-900 via-sky-800 to-indigo-900 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-sky-200">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold">Automated Email Notification System</h2>
              <p className="text-xs text-sky-200">Patient Appointment Confirmations &amp; 24h Reminders Engine</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-sky-200 hover:text-white rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Test Dispatch Bar */}
        <div className="bg-sky-50 border-b border-sky-100 p-3 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-700 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-sky-600 shrink-0" />
            <span className="font-semibold">Simulate Real Dispatch:</span>
            <span className="text-slate-500 hidden sm:inline">Send automated reminder to any test email</span>
          </div>

          <form onSubmit={handleSendTestDispatch} className="flex gap-2 w-full sm:w-auto">
            <input
              type="email"
              required
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              placeholder="Enter recipient email..."
              className="px-3 py-1.5 text-xs bg-white border border-sky-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-500 w-full sm:w-64"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold rounded-lg transition shrink-0 flex items-center gap-1"
            >
              <Send className="w-3 h-3" />
              <span>Send Now</span>
            </button>
          </form>
        </div>

        {testSentNotice && (
          <div className="bg-emerald-500 text-white text-xs font-semibold px-6 py-2 flex items-center justify-between">
            <span>{testSentNotice}</span>
            <button onClick={() => setTestSentNotice(null)} className="underline text-[11px]">Close</button>
          </div>
        )}

        {/* Main Body: 2 Columns (Left: Email List, Right: HTML Email Preview) */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
          {/* Left: Email Dispatch Log List */}
          <div className="md:col-span-5 border-r border-slate-200 overflow-y-auto p-4 space-y-2 bg-slate-50">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                <Inbox className="w-3.5 h-3.5 text-slate-400" />
                <span>Dispatched Logs ({logs.length})</span>
              </span>
              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Auto Cron Active
              </span>
            </div>

            {logs.map((log) => (
              <div
                key={log.id}
                onClick={() => setSelectedLog(log)}
                className={`p-3 rounded-xl border cursor-pointer transition text-left space-y-1 ${
                  selectedLog?.id === log.id
                    ? 'bg-white border-sky-500 shadow-sm ring-1 ring-sky-500/20'
                    : 'bg-white/80 border-slate-200 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-100">
                    {log.reminderType}
                  </span>
                  <span className="text-[10px] text-slate-400">{log.sentAt}</span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{log.subject}</h4>
                <p className="text-[11px] text-slate-500">To: {log.recipientEmail}</p>
                <p className="text-[10px] text-slate-600 line-clamp-1 italic">{log.contentSnippet}</p>
              </div>
            ))}
          </div>

          {/* Right: Realistic Rendered Email Viewer */}
          <div className="md:col-span-7 overflow-y-auto p-6 bg-slate-100">
            {selectedLog ? (
              <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden text-slate-800 text-xs sm:text-sm">
                {/* Email Client Simulated Header */}
                <div className="bg-slate-50 border-b border-slate-200 p-4 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">From:</span>
                    <span className="font-semibold text-slate-800">Prime Skin &amp; Hair Clinic &lt;care@primeskinclinic.com&gt;</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">To:</span>
                    <span className="font-semibold text-slate-800">{selectedLog.recipientName} &lt;{selectedLog.recipientEmail}&gt;</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Date:</span>
                    <span className="text-slate-600">{selectedLog.sentAt}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-200">
                    <span className="text-slate-400">Subject:</span>
                    <span className="font-bold text-sky-900">{selectedLog.subject}</span>
                  </div>
                </div>

                {/* Email HTML Template Body */}
                <div className="p-6 space-y-5">
                  {/* Email Clinic Header */}
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                    <img 
                      src={clinicInfo.logoUrl} 
                      alt="Logo" 
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-amber-400" 
                    />
                    <div>
                      <h3 className="font-black text-sky-900 text-base">Prime Skin and Hair Clinic</h3>
                      <p className="text-xs text-slate-500">Mewalal ki Bagiya, Naini, Prayagraj - 211008</p>
                    </div>
                  </div>

                  {/* Greeting */}
                  <div className="space-y-2 text-xs sm:text-sm leading-relaxed text-slate-700">
                    <p className="font-bold text-slate-900">Dear {selectedLog.recipientName},</p>
                    <p>
                      This is an automated notification from Prime Skin &amp; Hair Clinic regarding your upcoming medical consultation.
                    </p>
                  </div>

                  {/* Highlighted Appointment Card inside Email */}
                  <div className="p-4 rounded-xl bg-sky-50/80 border border-sky-200 space-y-2 text-xs">
                    <div className="flex justify-between font-bold text-sky-950 pb-2 border-b border-sky-200">
                      <span>Token Number: {selectedLog.appointmentId}</span>
                      <span className="text-emerald-700">Status: Confirmed</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-slate-700 pt-1">
                      <div>
                        <span className="text-slate-400 text-[10px] uppercase block">Doctor</span>
                        <span className="font-bold text-slate-900">{selectedLog.doctorName}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] uppercase block">Scheduled Time</span>
                        <span className="font-bold text-emerald-800">{selectedLog.appointmentTime}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] uppercase block">Appointment Date</span>
                        <span className="font-bold text-slate-900">{selectedLog.appointmentDate}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] uppercase block">Helpline</span>
                        <span className="font-bold text-slate-900">+91 8960777591</span>
                      </div>
                    </div>
                  </div>

                  {/* Clinic Address & Instructions */}
                  <div className="space-y-2 text-xs text-slate-600">
                    <p className="font-bold text-slate-800">Clinic Address &amp; Directions:</p>
                    <p className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      📍 10A/113, Daud Nagar, Mewalal ki Bagiya, Opposite Hotel India, Near Indian Oil Petrol Pump, Beside Goodwill Garage, Naini, Prayagraj.
                    </p>
                    <ul className="list-disc list-inside space-y-1 pt-1 text-[11px]">
                      <li>Please arrive 10 minutes prior to your time slot.</li>
                      <li>Bring any previous prescriptions or blood test reports if available.</li>
                      <li>For rescheduling or queries, reply to this email or call 8960777591.</li>
                    </ul>
                  </div>

                  {/* Sign-off */}
                  <div className="pt-4 border-t border-slate-200 text-xs text-slate-500">
                    <p className="font-semibold text-slate-700">Warm regards,</p>
                    <p className="font-bold text-sky-800">Clinic Desk &amp; Patient Care Team</p>
                    <p>Prime Skin &amp; Hair Clinic • Dr. A.K. Chaurasia &amp; Dr. Chandan Lal</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-20 text-slate-400">
                <Mail className="w-12 h-12 mx-auto mb-2 opacity-40" />
                <p>Select a dispatched reminder on the left to preview.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
