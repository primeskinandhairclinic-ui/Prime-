import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Calendar, 
  Clock, 
  User, 
  FileText, 
  CreditCard, 
  Bell, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  Printer, 
  Send, 
  Upload, 
  RefreshCw,
  Phone,
  Eye,
  Camera
} from 'lucide-react';
import { Appointment, DigitalPrescription, Invoice, ClinicInfo } from '../types/clinic';
import { storage } from '../utils/storage';
import { DigitalPrescriptionModal } from './DigitalPrescriptionModal';

interface PatientPortalProps {
  clinicInfo: ClinicInfo;
  lang: 'en' | 'hi';
  onBookNew: () => void;
}

export const PatientPortal: React.FC<PatientPortalProps> = ({
  clinicInfo,
  lang,
  onBookNew,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('9876543210'); // Default demo phone
  const [activeTab, setActiveTab] = useState<'appointments' | 'prescriptions' | 'invoices' | 'reminders'>('appointments');
  const [selectedRx, setSelectedRx] = useState<DigitalPrescription | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Upload progress photo state
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);

  const allAppointments = storage.getAppointments();
  const allPrescriptions = storage.getPrescriptions();
  const allInvoices = storage.getInvoices();

  // Find matching appointments by phone or ID
  const matchedAppointments = allAppointments.filter(
    (apt) =>
      apt.patientPhone.includes(searchQuery.trim()) ||
      apt.id.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
      apt.patientEmail.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  const matchedPrescriptions = allPrescriptions.filter(
    (rx) =>
      matchedAppointments.some(apt => apt.id === rx.appointmentId) ||
      rx.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rx.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const matchedInvoices = allInvoices.filter(
    (inv) =>
      matchedAppointments.some(apt => apt.id === inv.appointmentId) ||
      inv.patientPhone.includes(searchQuery.trim()) ||
      inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const showNotification = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleSendTestReminder = (apt: Appointment) => {
    storage.dispatchAutomatedReminder(apt, '24-Hour Reminder');
    showNotification(`Automated reminder email sent successfully to ${apt.patientEmail}!`);
  };

  const handleCancelAppointment = (aptId: string) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) return;
    const updated = allAppointments.map(a => a.id === aptId ? { ...a, status: 'cancelled' as const } : a);
    storage.saveAppointments(updated);
    showNotification('Appointment cancelled. A cancellation notification has been recorded.');
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setUploadedPhotos(prev => [reader.result as string, ...prev]);
          showNotification('Skin progress photo uploaded to your patient record.');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>{lang === 'hi' ? 'सुरक्षित मरीज पोर्टल' : 'Confidential Patient Health Portal'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {lang === 'hi' ? 'मरीज रिकॉर्ड एवं डिजिटल पर्चा' : 'My Clinic Records & Appointments'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          {lang === 'hi'
            ? 'अपॉइंटमेंट टोकन या मोबाइल नंबर से अपनी जांच पर्ची, इनवॉइस और स्वचालित रिमाइंडर देखें।'
            : 'Access your consultation history, digital Rx prescriptions, billing invoices, and automated reminder preferences.'}
        </p>
      </div>

      {/* Notification Toast */}
      {actionNotice && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center justify-between shadow-xs animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{actionNotice}</span>
          </div>
          <button onClick={() => setActionNotice(null)} className="text-xs font-bold text-emerald-700 hover:underline">
            Dismiss
          </button>
        </div>
      )}

      {/* Search / Login Box */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200 mb-8 space-y-4">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          Lookup Records by Mobile Number or Token ID:
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter 10-digit Mobile (e.g. 9876543210) or Token (e.g. PS-8492)..."
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium text-slate-800"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Quick Demo:</span>
            <button
              onClick={() => setSearchQuery('9876543210')}
              className="px-2.5 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700"
            >
              Rahul (9876543210)
            </button>
            <button
              onClick={() => setSearchQuery('9450123456')}
              className="px-2.5 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700"
            >
              Amit (9450123456)
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 mb-6 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('appointments')}
          className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'appointments'
              ? 'bg-sky-700 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>My Appointments ({matchedAppointments.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('prescriptions')}
          className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'prescriptions'
              ? 'bg-sky-700 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Digital Prescriptions ({matchedPrescriptions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('invoices')}
          className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'invoices'
              ? 'bg-sky-700 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Invoices &amp; Receipts ({matchedInvoices.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('reminders')}
          className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'reminders'
              ? 'bg-sky-700 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Automated Notifications</span>
        </button>
      </div>

      {/* Tab 1: Appointments */}
      {activeTab === 'appointments' && (
        <div className="space-y-4">
          {matchedAppointments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matchedAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-black text-sky-800 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-100">
                        {apt.id}
                      </span>
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                          apt.status === 'confirmed'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : apt.status === 'completed'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {apt.status}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900 text-base">{apt.patientName}</h3>
                      <p className="text-xs text-slate-500">{apt.patientPhone} • {apt.patientEmail}</p>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-xs text-slate-700">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Doctor:</span>
                        <span className="font-bold text-slate-900">{apt.doctorName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Concern:</span>
                        <span className="font-medium">{apt.serviceName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Date &amp; Time:</span>
                        <span className="font-bold text-emerald-700">{apt.date} ({apt.timeSlot})</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Consultation Fee:</span>
                        <span className="font-bold">₹{apt.amount} ({apt.paymentStatus.toUpperCase()})</span>
                      </div>
                    </div>

                    {apt.notes && (
                      <p className="text-xs text-slate-600 bg-amber-50/70 p-2.5 rounded-lg border border-amber-200">
                        <span className="font-bold text-slate-800">Notes:</span> {apt.notes}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                    <button
                      onClick={() => handleSendTestReminder(apt)}
                      className="px-3 py-1.5 text-xs font-semibold text-sky-700 hover:bg-sky-50 rounded-lg border border-sky-200 transition flex items-center gap-1.5"
                      title="Dispatch automated reminder email"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Trigger Reminder Email</span>
                    </button>

                    {apt.status === 'confirmed' && (
                      <button
                        onClick={() => handleCancelAppointment(apt.id)}
                        className="px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
              <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-800 text-sm">No Appointments Found for "{searchQuery}"</h3>
              <p className="text-xs text-slate-500">
                Try searching with mobile number <b>9876543210</b> or book a fresh appointment.
              </p>
              <button
                onClick={onBookNew}
                className="px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold rounded-xl shadow transition"
              >
                Book New Appointment
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Prescriptions */}
      {activeTab === 'prescriptions' && (
        <div className="space-y-4">
          {matchedPrescriptions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matchedPrescriptions.map((rx) => (
                <div
                  key={rx.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div>
                      <span className="font-mono text-xs font-black text-sky-800 block">{rx.id}</span>
                      <span className="text-[11px] text-slate-500">Consultation Date: {rx.date}</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                      Official Rx
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{rx.patientName} ({rx.age} Yrs / {rx.gender})</h4>
                    <p className="text-xs text-slate-600">Attending: <span className="font-bold">{rx.doctorName}</span></p>
                  </div>

                  <div className="p-3 bg-sky-50/50 rounded-xl border border-sky-100 text-xs space-y-1">
                    <span className="text-[11px] font-bold text-slate-500 block uppercase">Diagnosis</span>
                    <p className="font-bold text-slate-900">{rx.diagnosis}</p>
                    <p className="text-slate-600 text-[11px]">{rx.medications.length} medicines prescribed</p>
                  </div>

                  <button
                    onClick={() => setSelectedRx(rx)}
                    className="w-full py-2.5 bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Official Prescription Letterhead</span>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6 space-y-2">
              <FileText className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-800 text-sm">No Prescriptions under this search</h3>
              <p className="text-xs text-slate-500">
                Prescriptions are issued post-consultation by Dr. A.K. Chaurasia or Dr. Chandan Lal.
              </p>
              <button
                onClick={() => setSearchQuery('9450123456')}
                className="mt-2 text-xs font-bold text-sky-700 hover:underline"
              >
                View Sample Rx (Amit Patel 9450123456)
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Invoices & Billing */}
      {activeTab === 'invoices' && (
        <div className="space-y-4">
          {matchedInvoices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matchedInvoices.map((inv) => (
                <div
                  key={inv.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div>
                      <span className="font-mono text-xs font-bold text-slate-800">{inv.invoiceNumber}</span>
                      <p className="text-[11px] text-slate-400">Date: {inv.date}</p>
                    </div>
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        inv.paymentStatus === 'PAID'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {inv.paymentStatus}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{inv.patientName}</h4>
                    <p className="text-xs text-slate-500">{inv.serviceName} • {inv.doctorName}</p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs">
                    {inv.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between text-slate-600">
                        <span>{it.description}</span>
                        <span className="font-medium text-slate-900">₹{it.amount}</span>
                      </div>
                    ))}
                    <div className="pt-1.5 border-t border-slate-200 flex justify-between font-bold text-sm text-slate-900">
                      <span>Total Amount</span>
                      <span className="text-emerald-700">₹{inv.total}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Payment Mode: <b>{inv.paymentMethod}</b></span>
                    <button
                      onClick={() => window.print()}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg flex items-center gap-1 transition"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Receipt</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6 space-y-2">
              <CreditCard className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-800 text-sm">No Invoices Found</h3>
              <p className="text-xs text-slate-500">Consultation receipts are automatically filed here upon booking.</p>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Automated Reminders & Progress Photos */}
      {activeTab === 'reminders' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email Notification Dispatch Status */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Bell className="w-5 h-5 text-sky-600" />
              <span>Automated Patient Reminders Engine</span>
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              Our automated system delivers reminder alerts 24 hours and 2 hours prior to scheduled consultations to ensure patients never miss their appointments.
            </p>

            <div className="space-y-2 pt-2">
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5 text-xs text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Instant Email Confirmation</span>
                  <span>Dispatched immediately upon appointment scheduling with doctor details and token pass.</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 flex items-start gap-2.5 text-xs text-sky-900">
                <Clock className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">24-Hour Advance Notification</span>
                  <span>Scheduled automatically for the day preceding the clinic visit.</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Pre-Visit Clinic Directions</span>
                  <span>Includes address guide (Mewalal ki Bagiya, Opp. Hotel India, Naini) and helpline.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Skin Progress Photos & Reports Upload */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Camera className="w-5 h-5 text-sky-600" />
              <span>Skin Progress Photos &amp; Lab Reports</span>
            </h3>

            <p className="text-xs text-slate-600">
              Patients can upload photos of their skin condition or previous medical tests so the doctors can review them during the consultation.
            </p>

            <label className="block p-4 border-2 border-dashed border-sky-300 rounded-xl bg-sky-50/50 hover:bg-sky-50 transition cursor-pointer text-center">
              <Upload className="w-6 h-6 text-sky-600 mx-auto mb-1" />
              <span className="text-xs font-bold text-sky-800 block">Click to upload skin photo / report</span>
              <span className="text-[11px] text-slate-500">JPG, PNG, PDF up to 10MB</span>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>

            {uploadedPhotos.length > 0 && (
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-slate-700">Uploaded for Doctor Review:</span>
                <div className="grid grid-cols-3 gap-2">
                  {uploadedPhotos.map((photo, idx) => (
                    <div key={idx} className="relative rounded-lg overflow-hidden border border-slate-200 h-20 bg-slate-100">
                      <img src={photo} alt="Progress" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Prescription Letterhead Modal */}
      {selectedRx && (
        <DigitalPrescriptionModal
          prescription={selectedRx}
          clinicInfo={clinicInfo}
          onClose={() => setSelectedRx(null)}
        />
      )}
    </div>
  );
};
