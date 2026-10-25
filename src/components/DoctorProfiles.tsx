import React from 'react';
import { 
  User, 
  Calendar, 
  Clock, 
  Award, 
  GraduationCap, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Stethoscope
} from 'lucide-react';
import { Doctor, ClinicInfo } from '../types/clinic';

interface DoctorProfilesProps {
  doctors: Doctor[];
  clinicInfo: ClinicInfo;
  lang: 'en' | 'hi';
  onSelectDoctor: (doctorId: string) => void;
  onBookWithDoctor: (doctorId: string) => void;
}

export const DoctorProfiles: React.FC<DoctorProfilesProps> = ({
  doctors,
  clinicInfo,
  lang,
  onSelectDoctor,
  onBookWithDoctor,
}) => {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold">
            <Stethoscope className="w-3.5 h-3.5 text-sky-600" />
            <span>{lang === 'hi' ? 'विशेषज्ञ चिकित्सक टीम' : 'Expert Medical Team'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'hi' ? 'हमारे विशेषज्ञ चर्म एवं सौंदर्य रोग विशेषज्ञ' : 'Our Consultant Dermatologists'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {lang === 'hi'
              ? 'प्राइम स्किन एण्ड हेयर क्लीनिक में किंग जॉर्ज मेडिकल यूनिवर्सिटी (KGMU) एवं एमएलएन मेडिकल कॉलेज के अनुभवी चिकित्सकों द्वारा परामर्श प्राप्त करें।'
              : 'Dedicated specialist physicians providing clinical dermatology, vitiligo surgery, hair restoration, and aesthetic treatments.'}
          </p>
        </div>

        {/* Doctor Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:border-sky-300"
            >
              {/* Doctor Card Top / Header */}
              <div className="p-6 sm:p-7 space-y-5">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                  {/* Photo / Avatar */}
                  <div className="relative shrink-0">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-slate-50 p-1.5 ring-2 ring-sky-200 shadow-md group-hover:ring-sky-500 transition">
                      <img
                        src={doctor.avatar}
                        alt={doctor.name}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                    {doctor.badge && (
                      <span className="absolute -bottom-2 -right-1 bg-amber-400 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-full shadow border border-white">
                        {doctor.badge}
                      </span>
                    )}
                  </div>

                  {/* Name & Qualifications */}
                  <div className="space-y-1.5 flex-1">
                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-sky-50 border border-sky-100 text-[11px] font-bold text-sky-700">
                      {doctor.title}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-sky-700 transition">
                      {lang === 'hi' ? doctor.hindiName : doctor.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-slate-700 flex items-center justify-center sm:justify-start gap-1">
                      <GraduationCap className="w-4 h-4 text-sky-600 shrink-0" />
                      <span>{doctor.degrees}</span>
                    </p>
                    <p className="text-xs text-slate-500 font-medium">
                      {doctor.hospitalExperience ? doctor.hospitalExperience.split('.')[0] : `${doctor.experienceYears}+ Years Clinical Experience`}
                    </p>
                  </div>
                </div>

                {/* Bio snippet */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {doctor.bio}
                </p>

                {/* Specialties chips */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    {lang === 'hi' ? 'प्रमुख विशेषज्ञताएं:' : 'Key Specialties & Treatments:'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {doctor.specialities.slice(0, 4).map((spec, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-50 text-slate-700 border border-slate-200/80 font-medium flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>{spec}</span>
                      </span>
                    ))}
                    {doctor.specialities.length > 4 && (
                      <span className="text-[11px] px-2 py-1 rounded-lg bg-sky-50 text-sky-700 font-medium">
                        +{doctor.specialities.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* OPD Schedule bar */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <div>
                      <span className="font-semibold text-slate-800">OPD Timings: </span>
                      <span className="text-slate-600">{doctor.opdTimings}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-500">Fee: </span>
                    <span className="font-bold text-slate-900">₹{doctor.consultationFee}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => onSelectDoctor(doctor.id)}
                  className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-sky-700 hover:bg-white rounded-lg border border-slate-200 transition flex items-center gap-1.5"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  <span>{lang === 'hi' ? 'पूरा प्रोफाइल देखें' : 'View Full Profile'}</span>
                </button>

                <button
                  onClick={() => onBookWithDoctor(doctor.id)}
                  className="px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-sky-700 hover:bg-sky-800 rounded-lg shadow-sm transition flex items-center gap-1.5"
                >
                  <Calendar className="w-4 h-4 text-sky-200" />
                  <span>{lang === 'hi' ? 'अपॉइंटमेंट बुक करें' : 'Book with Doctor'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
