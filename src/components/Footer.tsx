import React from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Mail, 
  ShieldCheck, 
  Heart, 
  Lock, 
  Calendar, 
  ExternalLink 
} from 'lucide-react';
import { ClinicInfo } from '../types/clinic';

interface FooterProps {
  clinicInfo: ClinicInfo;
  onNavigate: (tab: string) => void;
  lang: 'en' | 'hi';
}

export const Footer: React.FC<FooterProps> = ({ clinicInfo, onNavigate, lang }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
          {/* Col 1 (4 cols): Brand & Doctors */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={clinicInfo.logoUrl}
                alt="Logo"
                className="w-14 h-14 rounded-full object-cover ring-2 ring-amber-400"
              />
              <div>
                <h3 className="font-black text-white text-base sm:text-lg">
                  {lang === 'hi' ? clinicInfo.hindiName : clinicInfo.name}
                </h3>
                <p className="text-xs text-sky-400 font-semibold">
                  Skin, Hair &amp; Nail Specialist Clinic • Naini, Prayagraj
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Dr. A.K. Chaurasia (MBBS KGMU, MD MLN Prayagraj, Ex-Physician Swaroop Rani Hospital) &amp; Dr. Chandan Lal (MBBS, MD). Dedicated to ethical, evidence-based dermatological healthcare.
            </p>

            <div className="flex items-center gap-2 pt-1 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Certified Dermatology &amp; Trichology Practice</span>
            </div>
          </div>

          {/* Col 2 (2 cols): Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('doctors')} className="hover:text-white transition">
                  Physician Profiles
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition">
                  Treatments &amp; Procedures
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('book')} className="text-sky-400 hover:text-sky-300 font-bold transition">
                  Book Appointment
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('portal')} className="hover:text-white transition">
                  Patient Health Portal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('billing')} className="hover:text-white transition">
                  Billing &amp; Tariff Rates
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3 (3 cols): Specialities */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Clinical Specialities
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>• Vitiligo (सफेद दाग) Surgery &amp; Phototherapy</li>
              <li>• Autologous PRP &amp; GFC Hair Regrowth</li>
              <li>• Psoriasis, Eczema &amp; Fungal Infections</li>
              <li>• Acne Scars &amp; Microneedling Subcision</li>
              <li>• Radiofrequency Mole, Wart &amp; Tag Removal</li>
              <li>• Chemical Peels &amp; Laser Skin Rejuvenation</li>
              <li>• Pediatric Dermatology &amp; STD Care</li>
            </ul>
          </div>

          {/* Col 4 (3 cols): Contact & OPD Timings */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Clinic Contact &amp; Hours
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>10A/113, Daud Nagar, Mewalal ki Bagiya, Opp. Hotel India, Near Indian Oil Pump, Naini, Prayagraj - 211008</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-semibold text-slate-200">Mon – Sat: 5:00 PM – 7:00 PM</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <a href={`tel:${clinicInfo.phone.replace(/[^0-9+]/g, '')}`} className="font-bold text-white hover:underline">
                  Helpline: {clinicInfo.phone}
                </a>
              </p>
            </div>

            <button
              onClick={() => onNavigate('admin')}
              className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 hover:text-white transition border border-slate-700"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Portal Login</span>
            </button>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Prime Skin and Hair Clinic. All medical rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Consultant Dermatologists: Dr. A.K. Chaurasia &amp; Dr. Chandan Lal</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
