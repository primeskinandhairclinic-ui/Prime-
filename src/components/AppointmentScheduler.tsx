import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  CreditCard, 
  Printer, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle,
  QrCode,
  FileText
} from 'lucide-react';
import { Doctor, Service, Appointment, ClinicInfo } from '../types/clinic';
import { storage } from '../utils/storage';

interface AppointmentSchedulerProps {
  doctors: Doctor[];
  services: Service[];
  clinicInfo: ClinicInfo;
  lang: 'en' | 'hi';
  preselectedDoctorId?: string;
  preselectedServiceId?: string;
  onAppointmentBooked: (apt: Appointment) => void;
  onGoToPortal: () => void;
}

export const AppointmentScheduler: React.FC<AppointmentSchedulerProps> = ({
  doctors,
  services,
  clinicInfo,
  lang,
  preselectedDoctorId,
  preselectedServiceId,
  onAppointmentBooked,
  onGoToPortal,
}) => {
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(
    preselectedDoctorId || doctors[0]?.id || ''
  );
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    preselectedServiceId || services[0]?.id || ''
  );

  // Default to tomorrow's date if today is Sunday, or today
  const getTomorrowDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const [selectedDate, setSelectedDate] = useState<string>(getTomorrowDate());
  const [selectedSlot, setSelectedSlot] = useState<string>('05:20 PM - 05:40 PM');
  
  // Patient Details
  const [patientName, setPatientName] = useState<string>('');
  const [patientPhone, setPatientPhone] = useState<string>('');
  const [patientEmail, setPatientEmail] = useState<string>('');
  const [patientAge, setPatientAge] = useState<string>('28');
  const [patientGender, setPatientGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [patientAddress, setPatientAddress] = useState<string>('Naini, Prayagraj');
  const [notes, setNotes] = useState<string>('');
  const [paymentOption, setPaymentOption] = useState<'UPI / QR' | 'Cash at Clinic' | 'Card'>('UPI / QR');
  const [enableEmailReminder, setEnableEmailReminder] = useState<boolean>(true);

  // Booking result state
  const [bookedAppointment, setBookedAppointment] = useState<Appointment | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (preselectedDoctorId) setSelectedDoctorId(preselectedDoctorId);
  }, [preselectedDoctorId]);

  useEffect(() => {
    if (preselectedServiceId) setSelectedServiceId(preselectedServiceId);
  }, [preselectedServiceId]);

  const selectedDoctor = doctors.find(d => d.id === selectedDoctorId) || doctors[0];
  const selectedService = services.find(s => s.id === selectedServiceId) || services[0];

  const opdSlots = [
    '05:00 PM - 05:20 PM',
    '05:20 PM - 05:40 PM',
    '05:40 PM - 06:00 PM',
    '06:00 PM - 06:20 PM',
    '06:20 PM - 06:40 PM',
    '06:40 PM - 07:00 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !patientPhone.trim() || !patientEmail.trim()) {
      alert('Please provide patient name, phone number, and email address for automated confirmations.');
      return;
    }

    setIsSubmitting(true);

    const tokenNumber = `PS-${Math.floor(1000 + Math.random() * 9000)}`;
    const fee = selectedDoctor ? selectedDoctor.consultationFee : 400;

    const newAppointment: Appointment = {
      id: tokenNumber,
      patientName: patientName.trim(),
      patientPhone: patientPhone.trim(),
      patientEmail: patientEmail.trim(),
      patientAge: parseInt(patientAge) || 30,
      patientGender,
      patientAddress: patientAddress.trim(),
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      date: selectedDate,
      timeSlot: selectedSlot,
      notes: notes.trim(),
      status: 'confirmed',
      paymentStatus: paymentOption === 'Cash at Clinic' ? 'at_clinic' : 'paid',
      paymentMethod: paymentOption,
      amount: fee,
      reminderSent: true,
      remindersList: [],
      createdAt: new Date().toISOString()
    };

    // Save appointment to storage
    const allApts = storage.getAppointments();
    storage.saveAppointments([newAppointment, ...allApts]);

    // Create Invoice
    const allInvoices = storage.getInvoices();
    const newInvoice = {
      id: `INV-${Date.now().toString().slice(-4)}`,
      invoiceNumber: `PS-INV-${tokenNumber.replace('PS-', '')}`,
      appointmentId: tokenNumber,
      patientName: newAppointment.patientName,
      patientPhone: newAppointment.patientPhone,
      patientEmail: newAppointment.patientEmail,
      doctorName: newAppointment.doctorName,
      serviceName: newAppointment.serviceName,
      date: newAppointment.date,
      items: [
        { description: `Specialist OPD Consultation - ${newAppointment.doctorName}`, amount: fee },
        { description: `Clinical Assessment & Prescription - ${newAppointment.serviceName}`, amount: 0 }
      ],
      subtotal: fee,
      discount: 0,
      tax: 0,
      total: fee,
      paymentMethod: paymentOption,
      paymentStatus: (paymentOption === 'Cash at Clinic' ? 'PENDING' : 'PAID') as 'PAID' | 'PENDING',
      transactionId: paymentOption === 'Cash at Clinic' ? undefined : `TXN/${Math.random().toString(36).substring(2, 9).toUpperCase()}`
    };
    storage.saveInvoices([newInvoice, ...allInvoices]);

    // Dispatch Automated Email Confirmation
    if (enableEmailReminder) {
      storage.dispatchAutomatedReminder(newAppointment, 'Booking Confirmation');
    }

    // Trigger Confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    setIsSubmitting(false);
    setBookedAppointment(newAppointment);
    onAppointmentBooked(newAppointment);
  };

  const handlePrintSlip = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold">
          <Calendar className="w-3.5 h-3.5 text-sky-600" />
          <span>{lang === 'hi' ? 'त्वरित ऑनलाइन अपॉइंटमेंट' : 'Instant OPD Appointment Scheduler'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {lang === 'hi' ? 'चिकित्सक अपॉइंटमेंट बुक करें' : 'Book Your Clinical Consultation'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          {lang === 'hi'
            ? 'अपनी पसंद के डॉक्टर, तारीख एवं समय का चयन करें। आपको तुरंत ईमेल एवं एसएमएस रिमाइंडर प्राप्त होगा।'
            : 'Select your preferred doctor, treatment, date and evening OPD slot (5:00 PM – 7:00 PM). Automated confirmation will be emailed immediately.'}
        </p>
      </div>

      {/* If Appointment is booked, show the confirmed pass card */}
      {bookedAppointment ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-emerald-500/30 max-w-2xl mx-auto animate-fadeIn text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full mx-auto flex items-center justify-center ring-8 ring-emerald-50">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Appointment Confirmed
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-2">
              Booking Token: <span className="text-sky-700">{bookedAppointment.id}</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Automated confirmation email has been dispatched to <b>{bookedAppointment.patientEmail}</b>
            </p>
          </div>

          {/* Booking Pass Printable Container */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-4 text-xs sm:text-sm">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2.5">
                <img 
                  src={clinicInfo.logoUrl} 
                  alt="Logo" 
                  className="w-10 h-10 rounded-full object-cover ring-1 ring-amber-400" 
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Prime Skin &amp; Hair Clinic</h4>
                  <p className="text-[11px] text-slate-500">Mewalal ki Bagiya, Naini, Prayagraj</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Date of Booking</span>
                <span className="font-semibold text-slate-700 text-xs">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-slate-400 text-[11px] block">Patient Name</span>
                <span className="font-bold text-slate-800">{bookedAppointment.patientName}</span>
                <span className="text-slate-500 text-[11px] block">
                  {bookedAppointment.patientAge} Yrs • {bookedAppointment.patientGender}
                </span>
              </div>

              <div>
                <span className="text-slate-400 text-[11px] block">Doctor Assigned</span>
                <span className="font-bold text-sky-800">{bookedAppointment.doctorName}</span>
                <span className="text-slate-500 text-[11px] block">Chamber 01 / 02</span>
              </div>

              <div>
                <span className="text-slate-400 text-[11px] block">Appointment Date &amp; Time</span>
                <span className="font-bold text-slate-900">{bookedAppointment.date}</span>
                <span className="text-emerald-700 font-semibold block">{bookedAppointment.timeSlot}</span>
              </div>

              <div>
                <span className="text-slate-400 text-[11px] block">Consultation Fee</span>
                <span className="font-bold text-slate-900">₹{bookedAppointment.amount}</span>
                <span className="text-[11px] font-semibold text-emerald-600 block">
                  {bookedAppointment.paymentStatus === 'paid' ? 'PAID ONLINE (Verified)' : 'PAY AT CLINIC DESK'}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Helpline: +91 8960777591</span>
              <span>Please arrive 10 minutes prior to your time slot</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handlePrintSlip}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white text-xs sm:text-sm font-semibold rounded-xl shadow transition flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save Booking Pass</span>
            </button>

            <button
              onClick={onGoToPortal}
              className="px-5 py-2.5 bg-sky-700 hover:bg-sky-800 text-white text-xs sm:text-sm font-semibold rounded-xl shadow transition flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Open Patient Portal</span>
            </button>

            <button
              onClick={() => setBookedAppointment(null)}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold rounded-xl transition"
            >
              Book Another
            </button>
          </div>
        </div>
      ) : (
        /* Booking Form */
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-8">
          {/* Step 1: Doctor & Service Selection */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-800 text-xs font-black flex items-center justify-center">1</span>
              <span>{lang === 'hi' ? 'चिकित्सक एवं सेवा का चयन' : 'Select Doctor & Treatment'}</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Doctor picker */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Consulting Physician
                </label>
                <div className="space-y-2">
                  {doctors.map((doc) => (
                    <label
                      key={doc.id}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                        selectedDoctorId === doc.id
                          ? 'bg-sky-50/80 border-sky-500 ring-2 ring-sky-500/20'
                          : 'bg-white border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="doctorRadio"
                          checked={selectedDoctorId === doc.id}
                          onChange={() => setSelectedDoctorId(doc.id)}
                          className="w-4 h-4 text-sky-600 focus:ring-sky-500"
                        />
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{doc.name}</p>
                          <p className="text-[11px] text-slate-500">{doc.degrees}</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        ₹{doc.consultationFee}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Service picker */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Clinical Concern / Service
                </label>
                <select
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                  className="w-full p-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium text-slate-800"
                >
                  {services.map((srv) => (
                    <option key={srv.id} value={srv.id}>
                      {srv.name} (from ₹{srv.priceFrom})
                    </option>
                  ))}
                </select>

                <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-600 space-y-1">
                  <p className="font-semibold text-slate-800">{selectedService.name}</p>
                  <p className="line-clamp-2">{selectedService.description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Date & Slot Selection */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-800 text-xs font-black flex items-center justify-center">2</span>
              <span>{lang === 'hi' ? 'तारीख एवं समय स्लॉट (शाम 5 से 7 बजे)' : 'Date & OPD Time Slot (Mon-Sat 5-7 PM)'}</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
              {/* Date Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Preferred Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={selectedDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium text-slate-800"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  OPD is open Monday through Saturday 5:00 PM - 7:00 PM.
                </p>
              </div>

              {/* Slot Grid */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Evening Slot
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {opdSlots.map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-2.5 rounded-xl text-xs font-semibold border transition text-center ${
                        selectedSlot === slot
                          ? 'bg-sky-700 text-white border-sky-700 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Patient Information */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-800 text-xs font-black flex items-center justify-center">3</span>
              <span>{lang === 'hi' ? 'मरीज का विवरण एवं संपर्क' : 'Patient Information & Contact'}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Patient Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full p-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mobile Number (WhatsApp/SMS) *
                </label>
                <input
                  type="tel"
                  required
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  placeholder="e.g. 9876543210"
                  className="w-full p-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email (for Auto Reminders) *
                </label>
                <input
                  type="email"
                  required
                  value={patientEmail}
                  onChange={(e) => setPatientEmail(e.target.value)}
                  placeholder="e.g. ramesh@example.com"
                  className="w-full p-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Age (Years)
                </label>
                <input
                  type="number"
                  min="1"
                  max="110"
                  value={patientAge}
                  onChange={(e) => setPatientAge(e.target.value)}
                  className="w-full p-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Gender
                </label>
                <select
                  value={patientGender}
                  onChange={(e) => setPatientGender(e.target.value as any)}
                  className="w-full p-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  City / Locality
                </label>
                <input
                  type="text"
                  value={patientAddress}
                  onChange={(e) => setPatientAddress(e.target.value)}
                  placeholder="e.g. Naini, Prayagraj"
                  className="w-full p-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2 md:col-span-3">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Symptoms / Medical Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. White patch on skin since 3 months, itching worsens at night, previous medications tried..."
                  className="w-full p-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Step 4: Payment Option & Automated Email Reminders */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-800 text-xs font-black flex items-center justify-center">4</span>
              <span>{lang === 'hi' ? 'भुगतान एवं ऑटोमेटेड रिमाइंडर' : 'Consultation Fee & Automated Notification'}</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <label
                className={`p-3.5 rounded-xl border cursor-pointer transition flex items-center gap-3 ${
                  paymentOption === 'UPI / QR'
                    ? 'bg-sky-50 border-sky-600 ring-2 ring-sky-500/20'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="payMethod"
                  checked={paymentOption === 'UPI / QR'}
                  onChange={() => setPaymentOption('UPI / QR')}
                  className="w-4 h-4 text-sky-600"
                />
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs sm:text-sm">
                    <QrCode className="w-4 h-4 text-sky-600" />
                    <span>UPI / QR Code</span>
                  </div>
                  <p className="text-[11px] text-slate-500">GPay, PhonePe, Paytm</p>
                </div>
              </label>

              <label
                className={`p-3.5 rounded-xl border cursor-pointer transition flex items-center gap-3 ${
                  paymentOption === 'Card'
                    ? 'bg-sky-50 border-sky-600 ring-2 ring-sky-500/20'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="payMethod"
                  checked={paymentOption === 'Card'}
                  onChange={() => setPaymentOption('Card')}
                  className="w-4 h-4 text-sky-600"
                />
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs sm:text-sm">
                    <CreditCard className="w-4 h-4 text-sky-600" />
                    <span>Debit / Credit Card</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Secure 256-bit gateway</p>
                </div>
              </label>

              <label
                className={`p-3.5 rounded-xl border cursor-pointer transition flex items-center gap-3 ${
                  paymentOption === 'Cash at Clinic'
                    ? 'bg-sky-50 border-sky-600 ring-2 ring-sky-500/20'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="payMethod"
                  checked={paymentOption === 'Cash at Clinic'}
                  onChange={() => setPaymentOption('Cash at Clinic')}
                  className="w-4 h-4 text-sky-600"
                />
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs sm:text-sm">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    <span>Pay at Clinic Desk</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Pay cash upon arrival</p>
                </div>
              </label>
            </div>

            {/* Automated Reminders Checkbox */}
            <div className="p-3.5 rounded-xl bg-sky-50/70 border border-sky-200 flex items-start gap-3">
              <input
                type="checkbox"
                id="autoEmailReminder"
                checked={enableEmailReminder}
                onChange={(e) => setEnableEmailReminder(e.target.checked)}
                className="w-4 h-4 text-sky-600 rounded mt-0.5"
              />
              <label htmlFor="autoEmailReminder" className="text-xs text-slate-700 cursor-pointer">
                <span className="font-bold text-slate-900 block">
                  Activate Automated Email Notification &amp; 24h Patient Reminders
                </span>
                <span>
                  The clinic system will automatically dispatch your booking confirmation slip, Google Calendar entry, and reminder 24 hours prior to your consultation.
                </span>
              </label>
            </div>
          </div>

          {/* Form Submit Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
            <div className="text-center sm:text-left">
              <span className="text-xs text-slate-500 block">Total Consultation Fee</span>
              <span className="text-2xl font-black text-slate-900">
                ₹{selectedDoctor ? selectedDoctor.consultationFee : 400}
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3.5 bg-sky-700 hover:bg-sky-800 active:bg-sky-900 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 transform active:scale-95 disabled:opacity-50"
            >
              <Calendar className="w-4 h-4 text-sky-200" />
              <span>{isSubmitting ? 'Confirming Appointment...' : 'Confirm Appointment Now'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
