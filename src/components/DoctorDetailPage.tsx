import React from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Award, 
  GraduationCap, 
  Building2, 
  CheckCircle2, 
  Phone, 
  Star, 
  ShieldCheck, 
  Stethoscope,
  HeartPulse,
  Sparkles
} from 'lucide-react';
import { Doctor, ClinicInfo } from '../types/clinic';

interface DoctorDetailPageProps {
  doctor: Doctor;
  clinicInfo: ClinicInfo;
  lang: 'en' | 'hi';
  onBack: () => void;
  onBookWithDoctor: (doctorId: string) => void;
}

export const DoctorDetailPage: React.FC<DoctorDetailPageProps> = ({
  doctor,
  clinicInfo,
  lang,
  onBack,
  onBookWithDoctor,
}) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-sky-700 mb-6 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{lang === 'hi' ? 'सभी चिकित्सकों पर वापस जाएं' : 'Back to All Physicians'}</span>
      </button>

      {/* Main Profile Header Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-blue-900 via-sky-800 to-indigo-900 p-6 sm:p-8 text-white relative">
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <Stethoscope className="w-48 h-48" />
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
            {/* Doctor Photo / Monogram */}
            <div className="relative">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-white p-1.5 shadow-xl ring-4 ring-white/30 shrink-0">
                <img 
                  src={doctor.avatar} 
                  alt={doctor.name} 
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              {doctor.badge && (
                <span className="absolute -bottom-2 -right-2 bg-amber-400 text-slate-900 text-[11px] font-bold px-2 py-0.5 rounded-full shadow border-2 border-white">
                  {doctor.badge}
                </span>
              )}
            </div>

            {/* Doctor Title and Quick Info */}
            <div className="text-center sm:text-left space-y-2 flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-sky-400/25 border border-sky-300/40 text-xs font-medium text-sky-100">
                  {doctor.title}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-400/25 border border-emerald-300/40 text-xs font-medium text-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Medical Council Specialist</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {lang === 'hi' ? doctor.hindiName : doctor.name}
              </h1>

              <p className="text-sky-200 text-sm font-semibold">{doctor.degrees}</p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-1 text-xs text-sky-100/90">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-300" />
                  <span>OPD: {doctor.opdTimings}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-300" />
                  <span>{doctor.roomNumber}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-300" />
                  <span>{doctor.experienceYears}+ Years Clinical Practice</span>
                </div>
              </div>
            </div>

            {/* Direct Booking CTA Header */}
            <div className="w-full sm:w-auto shrink-0 flex flex-col gap-2.5 pt-4 sm:pt-0">
              <button
                onClick={() => onBookWithDoctor(doctor.id)}
                className="w-full px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>{lang === 'hi' ? 'अपॉइंटमेंट बुक करें' : 'Book Appointment'}</span>
              </button>
              <div className="text-center text-xs text-sky-200">
                Consultation: <span className="font-bold text-white">₹{doctor.consultationFee}</span> (Follow-up: ₹{doctor.followUpFee})
              </div>
            </div>
          </div>
        </div>

        {/* Quick OPD & Consultation Schedule Banner */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-700">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">Available Days:</span>
            <div className="flex flex-wrap gap-1">
              {doctor.availableDays.map(day => (
                <span key={day} className="px-2 py-0.5 rounded bg-white border border-slate-200 font-medium">
                  {day}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-900">Direct Desk Helpline:</span>
            <a href={`tel:${doctor.contactNumber.replace(/[^0-9+]/g, '')}`} className="font-semibold text-sky-700 hover:underline flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" />
              <span>{doctor.contactNumber}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Grid: Credentials & Biography / Clinical Expertise */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 cols): Biography, Qualifications & Hospital Credentials */}
        <div className="lg:col-span-2 space-y-6">
          {/* Biography */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-sky-600" />
              <span>{lang === 'hi' ? 'चिकित्सक परिचय' : 'Physician Overview & Clinical Background'}</span>
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {doctor.bio}
            </p>
          </div>

          {/* Education & Hospital Experience */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-sky-600" />
              <span>Medical Qualifications &amp; Institutional Training</span>
            </h2>

            <div className="space-y-3">
              {doctor.qualifications.map((q, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="p-2 rounded-lg bg-sky-100 text-sky-700 shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 text-sm">{q}</h3>
                    <p className="text-xs text-slate-500">Government Medical College Recognized Post-Graduate Specialty</p>
                  </div>
                </div>
              ))}
            </div>

            {doctor.hospitalExperience && (
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 mt-2">
                <h3 className="font-bold text-amber-900 text-xs sm:text-sm flex items-center gap-2 mb-1">
                  <Building2 className="w-4 h-4 text-amber-700" />
                  <span>Hospital Experience &amp; Clinical Affiliations</span>
                </h3>
                <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
                  {doctor.hospitalExperience}
                </p>
              </div>
            )}
          </div>

          {/* Clinical Focus & Key Procedures Performed */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-sky-600" />
              <span>{lang === 'hi' ? 'विशेषज्ञ उपचार एवं प्रक्रियाएं' : 'Specialized Procedures & Clinical Focus'}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {doctor.specialities.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-2.5 rounded-lg bg-sky-50/60 border border-sky-100 text-slate-800 text-xs sm:text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Schedule Card, Fees & Patient Testimonials */}
        <div className="space-y-6">
          {/* OPD Booking Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-sky-200 ring-2 ring-sky-500/10 space-y-4">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Calendar className="w-5 h-5 text-sky-600" />
              <span>OPD Consultation Schedule</span>
            </h3>

            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span>Timings</span>
                <span className="font-bold text-slate-900">{doctor.opdTimings}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span>Location</span>
                <span className="font-medium text-slate-900 text-right">Mewalal ki Bagiya, Naini</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span>Chamber</span>
                <span className="font-bold text-slate-900">{doctor.roomNumber}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span>New Consultation Fee</span>
                <span className="font-bold text-emerald-600 text-sm">₹{doctor.consultationFee}</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Follow-up Review Fee</span>
                <span className="font-bold text-slate-700">₹{doctor.followUpFee}</span>
              </div>
            </div>

            <button
              onClick={() => onBookWithDoctor(doctor.id)}
              className="w-full py-3 bg-sky-700 hover:bg-sky-800 text-white font-bold rounded-xl shadow transition text-sm flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment with {doctor.name.split(' ')[1] || doctor.name}</span>
            </button>
          </div>

          {/* Patient Reviews / Feedback */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>Patient Experiences (4.9 / 5.0)</span>
              </h3>
              <span className="text-[11px] text-slate-400">120+ Verified Reviews</span>
            </div>

            <div className="space-y-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">Manish K.</span>
                  <div className="flex text-amber-400">
                    {'★★★★★'}
                  </div>
                </div>
                <p className="text-slate-600 italic">
                  "Consulted for chronic eczema. Dr. explained the trigger factors clearly and within 10 days of treatment the itching completely stopped."
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">Shruti S.</span>
                  <div className="flex text-amber-400">
                    {'★★★★★'}
                  </div>
                </div>
                <p className="text-slate-600 italic">
                  "Completed 3 sessions of PRP for severe hair thinning. Visible baby hairs and great density improvement. Very honest and gentle doctor."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
