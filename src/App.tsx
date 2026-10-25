import React, { useState, useEffect } from 'react';
import { 
  ClinicInfo, 
  Doctor, 
  Service, 
  Appointment 
} from './types/clinic';
import { storage } from './utils/storage';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DoctorProfiles } from './components/DoctorProfiles';
import { DoctorDetailPage } from './components/DoctorDetailPage';
import { ServicesSection } from './components/ServicesSection';
import { AppointmentScheduler } from './components/AppointmentScheduler';
import { PatientPortal } from './components/PatientPortal';
import { BillingSection } from './components/BillingSection';
import { ContactSection } from './components/ContactSection';
import { AdminDashboard } from './components/AdminDashboard';
import { ImageGalleryModal } from './components/ImageGalleryModal';
import { EmailNotificationModal } from './components/EmailNotificationModal';
import { Footer } from './components/Footer';
import { 
  Calendar, 
  Phone, 
  MessageSquare, 
  Clock, 
  ShieldCheck,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

export default function App() {
  const [clinicInfo, setClinicInfo] = useState<ClinicInfo>(storage.getClinicInfo());
  const [doctors, setDoctors] = useState<Doctor[]>(storage.getDoctors());
  const [services, setServices] = useState<Service[]>(storage.getServices());

  const [activeTab, setActiveTab] = useState<string>('home');
  const [activeDoctorDetailId, setActiveDoctorDetailId] = useState<string | null>(null);
  const [preselectedDoctorId, setPreselectedDoctorId] = useState<string | undefined>(undefined);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>(undefined);

  const [lang, setLang] = useState<'en' | 'hi'>('en');

  // Modals
  const [showNotificationsModal, setShowNotificationsModal] = useState<boolean>(false);
  const [showGalleryModal, setShowGalleryModal] = useState<boolean>(false);
  const [galleryInitialIndex, setGalleryInitialIndex] = useState<number>(0);

  // Email count
  const [emailCount, setEmailCount] = useState<number>(storage.getEmailLogs().length);

  const refreshNotificationCount = () => {
    setEmailCount(storage.getEmailLogs().length);
  };

  const handleBookWithDoctor = (docId: string) => {
    setPreselectedDoctorId(docId);
    setActiveDoctorDetailId(null);
    setActiveTab('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookService = (serviceId: string) => {
    setPreselectedServiceId(serviceId);
    setActiveTab('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDoctorDetail = (docId: string) => {
    setActiveDoctorDetailId(docId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenGallery = (initialIndex: number = 0) => {
    setGalleryInitialIndex(initialIndex);
    setShowGalleryModal(true);
  };

  // Find currently viewed doctor if any
  const currentDetailedDoctor = doctors.find(d => d.id === activeDoctorDetailId);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {/* Navigation Header */}
      <Navbar
        clinicInfo={clinicInfo}
        activeTab={activeDoctorDetailId ? 'doctors' : activeTab}
        setActiveTab={(tab) => {
          setActiveDoctorDetailId(null);
          setActiveTab(tab);
        }}
        lang={lang}
        setLang={setLang}
        unreadNotificationsCount={emailCount}
        onOpenNotifications={() => setShowNotificationsModal(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* If viewing a single doctor's dedicated website page */}
        {activeDoctorDetailId && currentDetailedDoctor ? (
          <DoctorDetailPage
            doctor={currentDetailedDoctor}
            clinicInfo={clinicInfo}
            lang={lang}
            onBack={() => setActiveDoctorDetailId(null)}
            onBookWithDoctor={handleBookWithDoctor}
          />
        ) : (
          <>
            {/* Tab: Home */}
            {activeTab === 'home' && (
              <div className="space-y-2">
                <Hero
                  clinicInfo={clinicInfo}
                  doctors={doctors}
                  lang={lang}
                  onBookClick={() => { setActiveTab('book'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  onPortalClick={() => { setActiveTab('portal'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  onViewDoctor={handleSelectDoctorDetail}
                  onOpenGallery={handleOpenGallery}
                />

                {/* Team Section on Home */}
                <DoctorProfiles
                  doctors={doctors}
                  clinicInfo={clinicInfo}
                  lang={lang}
                  onSelectDoctor={handleSelectDoctorDetail}
                  onBookWithDoctor={handleBookWithDoctor}
                />

                {/* Featured Services on Home */}
                <ServicesSection
                  services={services}
                  lang={lang}
                  onBookService={handleBookService}
                />

                {/* Quick Consultation Booking Banner */}
                <section className="bg-gradient-to-r from-sky-800 via-blue-900 to-indigo-950 text-white py-12 px-4 sm:px-6">
                  <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-2 text-center md:text-left">
                      <span className="text-amber-300 font-bold text-xs uppercase tracking-wider">
                        Evening Clinic Hours: 5:00 PM – 7:00 PM
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                        Experience Specialized Dermatological Care
                      </h2>
                      <p className="text-sky-200 text-xs sm:text-sm max-w-xl">
                        Schedule an appointment with Dr. A.K. Chaurasia or Dr. Chandan Lal in under 2 minutes. Receive instant automated confirmations and reminders.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                      <button
                        onClick={() => { setActiveTab('book'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl shadow-lg transition flex items-center gap-2 transform hover:scale-105"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Book Appointment</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => { setActiveTab('portal'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition"
                      >
                        Patient Portal
                      </button>
                    </div>
                  </div>
                </section>

                {/* Contact & Directions preview on Home */}
                <ContactSection clinicInfo={clinicInfo} lang={lang} />
              </div>
            )}

            {/* Tab: Physicians / Doctors */}
            {activeTab === 'doctors' && (
              <DoctorProfiles
                doctors={doctors}
                clinicInfo={clinicInfo}
                lang={lang}
                onSelectDoctor={handleSelectDoctorDetail}
                onBookWithDoctor={handleBookWithDoctor}
              />
            )}

            {/* Tab: Services & Treatments */}
            {activeTab === 'services' && (
              <ServicesSection
                services={services}
                lang={lang}
                onBookService={handleBookService}
              />
            )}

            {/* Tab: Appointment Scheduler */}
            {activeTab === 'book' && (
              <AppointmentScheduler
                doctors={doctors}
                services={services}
                clinicInfo={clinicInfo}
                lang={lang}
                preselectedDoctorId={preselectedDoctorId}
                preselectedServiceId={preselectedServiceId}
                onAppointmentBooked={(apt) => {
                  refreshNotificationCount();
                }}
                onGoToPortal={() => {
                  setActiveTab('portal');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {/* Tab: Patient Portal */}
            {activeTab === 'portal' && (
              <PatientPortal
                clinicInfo={clinicInfo}
                lang={lang}
                onBookNew={() => {
                  setActiveTab('book');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {/* Tab: Billing & Tariffs */}
            {activeTab === 'billing' && (
              <BillingSection clinicInfo={clinicInfo} lang={lang} />
            )}

            {/* Tab: Contact & Location */}
            {activeTab === 'contact' && (
              <ContactSection clinicInfo={clinicInfo} lang={lang} />
            )}

            {/* Tab: Admin CMS */}
            {activeTab === 'admin' && (
              <AdminDashboard
                clinicInfo={clinicInfo}
                onUpdateClinicInfo={(updated) => setClinicInfo(updated)}
                doctors={doctors}
                onUpdateDoctors={(updated) => setDoctors(updated)}
                services={services}
                onUpdateServices={(updated) => setServices(updated)}
                onExitAdmin={() => {
                  setActiveTab('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}
          </>
        )}
      </main>

      {/* Floating Mobile Bottom Action Bar */}
      <aside aria-label="Quick Actions" className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2.5 flex items-center justify-between gap-2 shadow-lg">
        <a
          href={`tel:${clinicInfo.phone.replace(/[^0-9+]/g, '')}`}
          className="flex-1 py-2 px-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition"
        >
          <Phone className="w-3.5 h-3.5 text-sky-700" />
          <span>Call Desk</span>
        </a>

        <button
          onClick={() => {
            setActiveDoctorDetailId(null);
            setActiveTab('book');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex-2 py-2 px-3 bg-sky-700 hover:bg-sky-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow transition"
        >
          <Calendar className="w-3.5 h-3.5 text-sky-200" />
          <span>Book OPD Appointment</span>
        </button>

        <a
          href={`https://wa.me/918960777591?text=${encodeURIComponent('Hello Doctor, I would like to enquire about consultation at Prime Skin and Hair Clinic.')}`}
          target="_blank"
          rel="noreferrer"
          className="py-2 px-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition"
          title="WhatsApp Clinic"
        >
          <MessageSquare className="w-3.5 h-3.5" />
        </a>
      </aside>

      {/* Footer */}
      <Footer
        clinicInfo={clinicInfo}
        onNavigate={(tab) => {
          setActiveDoctorDetailId(null);
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        lang={lang}
      />

      {/* Lightbox / Gallery Modal */}
      {showGalleryModal && (
        <ImageGalleryModal
          clinicInfo={clinicInfo}
          initialIndex={galleryInitialIndex}
          onClose={() => setShowGalleryModal(false)}
        />
      )}

      {/* Automated Email Notifications Modal */}
      {showNotificationsModal && (
        <EmailNotificationModal
          clinicInfo={clinicInfo}
          onClose={() => setShowNotificationsModal(false)}
          onRefreshNotifications={refreshNotificationCount}
        />
      )}
    </div>
  );
}
