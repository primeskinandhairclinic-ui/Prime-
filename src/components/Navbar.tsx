import React, { useState } from 'react';
import { 
  Phone, 
  Clock, 
  MapPin, 
  Calendar, 
  User, 
  CreditCard, 
  ShieldCheck, 
  Bell, 
  Menu, 
  X, 
  Settings, 
  Languages, 
  Stethoscope, 
  FileText 
} from 'lucide-react';
import { ClinicInfo } from '../types/clinic';

interface NavbarProps {
  clinicInfo: ClinicInfo;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  lang: 'en' | 'hi';
  setLang: (lang: 'en' | 'hi') => void;
  unreadNotificationsCount: number;
  onOpenNotifications: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  clinicInfo,
  activeTab,
  setActiveTab,
  lang,
  setLang,
  unreadNotificationsCount,
  onOpenNotifications,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', labelEn: 'Home', labelHi: 'होम', icon: Stethoscope },
    { id: 'doctors', labelEn: 'Our Physicians', labelHi: 'चिकित्सक प्रोफाइल', icon: User },
    { id: 'services', labelEn: 'Treatments & Services', labelHi: 'इलाज एवं सेवाएं', icon: FileText },
    { id: 'book', labelEn: 'Book Appointment', labelHi: 'अपॉइंटमेंट बुक करें', icon: Calendar, highlight: true },
    { id: 'portal', labelEn: 'Patient Portal', labelHi: 'मरीज पोर्टल', icon: ShieldCheck },
    { id: 'billing', labelEn: 'Billing & Rates', labelHi: 'बिलिंग एवं शुल्क', icon: CreditCard },
    { id: 'contact', labelEn: 'Contact & Location', labelHi: 'संपर्क एवं पता', icon: MapPin },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-100">
      {/* Top Banner Notice */}
      {clinicInfo.noticeBanner && (
        <div className="bg-gradient-to-r from-blue-900 via-sky-900 to-indigo-900 text-amber-200 text-xs sm:text-sm py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2 tracking-wide shadow-inner">
          <Clock className="w-3.5 h-3.5 text-amber-300 animate-pulse shrink-0" />
          <span>{clinicInfo.noticeBanner}</span>
        </div>
      )}

      {/* Top Info Bar */}
      <div className="bg-slate-50 border-b border-slate-200/80 hidden md:block text-xs text-slate-600">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-sky-600" />
              <span>{clinicInfo.addressLine1}, {clinicInfo.area}, {clinicInfo.city}</span>
            </span>
            <span className="flex items-center gap-1.5 font-medium text-slate-700">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>{clinicInfo.opdTimings} (Mon - Sat)</span>
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a 
              href={`tel:${clinicInfo.phone.replace(/[^0-9+]/g, '')}`} 
              className="flex items-center gap-1.5 font-bold text-sky-800 hover:text-sky-900 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-sky-600" />
              <span>Helpline: {clinicInfo.phone}</span>
            </a>
            <div className="h-3 w-px bg-slate-300"></div>
            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-1 font-semibold text-slate-700 hover:text-sky-700 transition px-2 py-0.5 rounded bg-white border border-slate-200"
              title="Change Language / भाषा बदलें"
            >
              <Languages className="w-3.5 h-3.5 text-sky-600" />
              <span>{lang === 'en' ? 'हिन्दी (Hindi)' : 'English'}</span>
            </button>
            {/* Admin shortcut */}
            <button
              onClick={() => handleNavClick('admin')}
              className="flex items-center gap-1 text-slate-600 hover:text-slate-900 px-2 py-0.5 rounded hover:bg-slate-200 transition"
              title="Clinic Admin Control Panel"
            >
              <Settings className="w-3 h-3 text-slate-500" />
              <span>Admin CMS</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <button 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left focus:outline-none group"
        >
          <div className="relative">
            <img 
              src={clinicInfo.logoUrl} 
              alt="Prime Skin & Hair Clinic Logo" 
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover shadow-sm ring-2 ring-amber-400/80 group-hover:ring-amber-500 transition-all duration-300"
            />
            <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 ring-2 ring-white">
              <ShieldCheck className="w-3.5 h-3.5" />
            </span>
          </div>
          <div>
            <div className="font-extrabold text-base sm:text-xl text-slate-900 tracking-tight flex items-center gap-1.5">
              <span>{lang === 'hi' ? clinicInfo.hindiName : clinicInfo.name}</span>
            </div>
            <p className="text-xs text-sky-700 font-semibold tracking-wide">
              {lang === 'hi' ? 'स्किन, हेयर एवं नेल विशेषज्ञ क्लिनिक • नैनी, प्रयागराज' : 'Skin, Hair & Nail Specialist Clinic • Naini, Prayagraj'}
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            if (item.highlight) {
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="ml-2 px-4 py-2 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800 text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow transition flex items-center gap-2 transform active:scale-95"
                >
                  <Icon className="w-4 h-4 text-sky-200" />
                  <span>{lang === 'hi' ? item.labelHi : item.labelEn}</span>
                </button>
              );
            }
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 text-sm font-medium rounded-md transition flex items-center gap-1.5 ${
                  isActive
                    ? 'text-sky-700 bg-sky-50 font-bold border-b-2 border-sky-600'
                    : 'text-slate-700 hover:text-sky-700 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
                <span>{lang === 'hi' ? item.labelHi : item.labelEn}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons: Notification Center & Mobile Hamburger */}
        <div className="flex items-center gap-2">
          {/* Automated Notification Bell */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 text-slate-600 hover:text-sky-700 hover:bg-slate-100 rounded-full transition"
            title="Automated Email & SMS Reminders System"
          >
            <Bell className="w-5 h-5" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1 right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {/* Quick Call Button for Mobile */}
          <a
            href={`tel:${clinicInfo.phone.replace(/[^0-9+]/g, '')}`}
            className="lg:hidden p-2 text-white bg-sky-600 rounded-lg shadow hover:bg-sky-700 transition"
            title="Call Clinic Helpline"
          >
            <Phone className="w-4 h-4" />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-md focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-lg animate-fadeIn">
          {/* Language Switcher Mobile */}
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <span className="text-xs text-slate-500 font-medium">Selected Language:</span>
            <button
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="text-xs font-bold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200 flex items-center gap-1.5"
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Switch to हिन्दी' : 'Switch to English'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-1 pt-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? 'bg-sky-50 text-sky-700 font-bold border-l-4 border-sky-600'
                      : 'text-slate-700 hover:bg-slate-50'
                  } ${item.highlight ? 'bg-sky-600 text-white hover:bg-sky-700 mt-2 font-semibold' : ''}`}
                >
                  <Icon className={`w-4 h-4 ${item.highlight ? 'text-white' : isActive ? 'text-sky-600' : 'text-slate-400'}`} />
                  <span>{lang === 'hi' ? item.labelHi : item.labelEn}</span>
                </button>
              );
            })}
            
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 mt-2 border border-slate-200"
            >
              <Settings className="w-4 h-4 text-slate-500" />
              <span>Admin CMS & Content Control</span>
            </button>
          </div>

          {/* Quick Info Footer in Mobile Menu */}
          <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 space-y-1">
            <p className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>OPD: Mon – Sat 5:00 PM – 7:00 PM</span>
            </p>
            <p className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0" />
              <span>Mewalal ki Bagiya, Naini, Prayagraj</span>
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
