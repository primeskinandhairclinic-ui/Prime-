import React from 'react';
import { 
  Calendar, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  Eye, 
  Award,
  ChevronRight,
  PhoneCall
} from 'lucide-react';
import { ClinicInfo, Doctor } from '../types/clinic';

interface HeroProps {
  clinicInfo: ClinicInfo;
  doctors: Doctor[];
  lang: 'en' | 'hi';
  onBookClick: () => void;
  onPortalClick: () => void;
  onViewDoctor: (docId: string) => void;
  onOpenGallery: (initialIndex?: number) => void;
}

export const Hero: React.FC<HeroProps> = ({
  clinicInfo,
  doctors,
  lang,
  onBookClick,
  onPortalClick,
  onViewDoctor,
  onOpenGallery,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-white to-slate-50 pt-6 pb-12 sm:pt-10 sm:pb-16 border-b border-slate-200/60">
      {/* Background subtle decorative blobs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Top Trust Pill */}
        <div className="flex flex-wrap items-center gap-2 justify-center lg:justify-start mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/80 border border-sky-200 text-sky-800 text-xs sm:text-sm font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 -ml-3"></span>
            <span>{lang === 'hi' ? 'नैनी, प्रयागराज का विश्वसनीय स्किन एवं हेयर सेंटर' : 'Certified Skin, Hair & Nail Specialty Clinic • Naini, Prayagraj'}</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs sm:text-sm font-semibold">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>Ex-Physician Swaroop Rani Hospital</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading, Lead, CTAs & Key Points */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-5">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              {lang === 'hi' ? (
                <>
                  <span className="text-sky-700">{clinicInfo.hindiName}</span>
                  <br />
                  <span className="text-slate-800 text-2xl sm:text-3xl font-extrabold">
                    त्वचा, बाल एवं सौंदर्य समस्याओं का स्थायी समाधान
                  </span>
                </>
              ) : (
                <>
                  Advanced Skin &amp; Hair Care By{' '}
                  <span className="bg-gradient-to-r from-sky-700 via-blue-700 to-indigo-800 bg-clip-text text-transparent">
                    Expert Dermatologists
                  </span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {lang === 'hi' 
                ? 'डॉ. ए.के. चौरसिया (MBBS KGMU, MD) एवं डॉ. चंदन लाल (MBBS, MD) द्वारा सफेद दाग, सोराइसिस, हेयर फॉल PRP, मुहांसे, दाग-धब्बे एवं एलर्जी का वैज्ञानिक उपचार।'
                : 'Led by Dr. A.K. Chaurasia (MBBS KGMU, MD Skin & VD MLN, Ex-Physician Swaroop Rani Hospital) & Dr. Chandan Lal (MBBS, MD). Specializing in Vitiligo, Hair PRP, Psoriasis, Acne Scars & Laser Procedures.'}
            </p>

            {/* Timings & Location Chip Bar */}
            <div className="inline-grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs text-xs sm:text-sm text-slate-700 text-left">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-semibold text-slate-900">OPD Timings: </span>
                  <span className="text-slate-600">Mon - Sat: 5:00 PM to 7:00 PM</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sky-600 shrink-0" />
                <div>
                  <span className="font-semibold text-slate-900">Location: </span>
                  <span className="text-slate-600">Mewalal ki Bagiya, Naini</span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <button
                onClick={onBookClick}
                className="px-6 py-3.5 bg-sky-700 hover:bg-sky-800 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2.5 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Calendar className="w-5 h-5 text-sky-200" />
                <span>{lang === 'hi' ? 'ऑनलाइन अपॉइंटमेंट बुक करें' : 'Schedule Appointment Online'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={onPortalClick}
                className="px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl border border-slate-300 shadow-xs hover:border-slate-400 transition flex items-center gap-2"
              >
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>{lang === 'hi' ? 'मरीज पोर्टल (Rx व पर्ची)' : 'Patient Portal & Rx'}</span>
              </button>

              <a
                href={`tel:${clinicInfo.phone.replace(/[^0-9+]/g, '')}`}
                className="px-4 py-3.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold rounded-xl border border-emerald-200 transition flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-emerald-600" />
                <span className="hidden sm:inline">Call:</span>
                <span>8960777591</span>
              </a>
            </div>

            {/* Clinical highlights bullet list */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-3 text-xs sm:text-sm font-medium text-slate-700 text-left">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{lang === 'hi' ? 'सफेद दाग व विटिलिगो सर्जरी' : 'Vitiligo Surgery & Grafting'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{lang === 'hi' ? 'PRP / GFC हेयर रीग्रोथ' : 'PRP / GFC Hair Restoration'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{lang === 'hi' ? 'ऑटोमेटेड ईमेल रिमाइंडर' : 'Automated Email Reminders'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{lang === 'hi' ? 'मुहांसे व गड्ढों का इलाज' : 'Acne Scar Resurfacing'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{lang === 'hi' ? 'कैमिकल पील & लेज़र' : 'Chemical Peels & Lasers'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{lang === 'hi' ? 'डिजिटल पर्चा व ऑनलाइन बिलिंग' : 'Digital Rx & Instant Billing'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Clinical Proof Cards (Showcasing the 3 User Photos!) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Main Showcase Card featuring both doctors and clinic board */}
            <div className="bg-white rounded-2xl p-5 shadow-lg border border-slate-100 relative">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <img 
                    src={clinicInfo.logoUrl} 
                    alt="Logo" 
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-400" 
                  />
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Prime Skin &amp; Hair Clinic</h3>
                    <p className="text-[11px] text-slate-500">Official Clinical Credentials</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
                  Verified OPD
                </span>
              </div>

              {/* Photo Previews from User Uploads */}
              <div className="grid grid-cols-2 gap-3 my-4">
                {/* Photo 1: Official Banner */}
                <div 
                  onClick={() => onOpenGallery(1)}
                  className="group relative cursor-pointer rounded-xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition bg-slate-100"
                >
                  <img 
                    src={clinicInfo.bannerPhoto1} 
                    alt="Clinic Specialty Board" 
                    className="w-full h-32 object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-2">
                    <div className="text-white text-[11px] font-semibold flex items-center justify-between w-full">
                      <span>Services Board</span>
                      <Eye className="w-3.5 h-3.5 text-sky-300" />
                    </div>
                  </div>
                </div>

                {/* Photo 2: Official Prescription Letterhead */}
                <div 
                  onClick={() => onOpenGallery(2)}
                  className="group relative cursor-pointer rounded-xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition bg-slate-100"
                >
                  <img 
                    src={clinicInfo.bannerPhoto2} 
                    alt="Official Prescription Pad" 
                    className="w-full h-32 object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-2">
                    <div className="text-white text-[11px] font-semibold flex items-center justify-between w-full">
                      <span>Doctor Rx Pad</span>
                      <Eye className="w-3.5 h-3.5 text-sky-300" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Doctor Mini Profiles Card */}
              <div className="space-y-2.5 pt-1">
                {doctors.map((doc) => (
                  <div 
                    key={doc.id}
                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-sky-50/60 transition flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-sky-100 text-sky-800 font-bold flex items-center justify-center text-xs shrink-0 ring-1 ring-sky-300">
                        {doc.name.split(' ').map(n => n[0]).slice(-2).join('')}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-sky-700 transition">
                          {doc.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 line-clamp-1">{doc.degrees}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => onViewDoctor(doc.id)}
                      className="px-2.5 py-1 text-xs font-semibold text-sky-700 hover:text-white hover:bg-sky-700 rounded-lg border border-sky-200 transition"
                    >
                      Profile &rarr;
                    </button>
                  </div>
                ))}
              </div>

              {/* Lightbox / Gallery button */}
              <button
                onClick={() => onOpenGallery(0)}
                className="w-full mt-3 py-2 text-xs font-semibold text-slate-600 hover:text-sky-700 bg-slate-100/70 hover:bg-slate-100 rounded-lg transition flex items-center justify-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View All Official Photos &amp; Prescription Records</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
