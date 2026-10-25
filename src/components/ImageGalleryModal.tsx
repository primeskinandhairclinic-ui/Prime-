import React, { useState } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  FileText, 
  CheckCircle2, 
  Download,
  Eye
} from 'lucide-react';
import { ClinicInfo } from '../types/clinic';

interface ImageGalleryModalProps {
  clinicInfo: ClinicInfo;
  initialIndex?: number;
  onClose: () => void;
}

export const ImageGalleryModal: React.FC<ImageGalleryModalProps> = ({
  clinicInfo,
  initialIndex = 0,
  onClose,
}) => {
  const images = [
    {
      id: 'logo',
      url: clinicInfo.logoUrl,
      title: 'Official Clinic Emblem & Logo',
      subtitle: 'Monogram "PS" (Prime Skin) with Aesthetic Silhouette & Botanical Leaf',
      details: [
        'Used in website navigation bar, booking passes, invoices, and digital prescriptions.',
        'Official gold & royal blue ring insignia for Prime Skin and Hair Clinic.'
      ]
    },
    {
      id: 'banner',
      url: clinicInfo.bannerPhoto1,
      title: 'Clinical Services & Specialist Banner',
      subtitle: 'Dr. A.K. Chaurasia (MBBS KGMU, MD MLN Prayagraj, Ex-SRN Hospital)',
      details: [
        'Extracted all 16 clinical conditions: Vitiligo (सफेद दाग), Eczema, Psoriasis, Hair Loss, Allergies, Facial Burns & Scars.',
        'Extracted specialized procedures: PRP/GFC Hair Growth, Microneedling, Chemical Peels, Vitiligo Grafting Surgery, Radiofrequency Mole Removal.',
        'Extracted address & timings: 10A/113 Daud Nagar, Mewalal ki Bagiya, Naini, Prayagraj. Mon-Sat 5:00 PM – 7:00 PM. Helpline: 8960777591.'
      ]
    },
    {
      id: 'prescription',
      url: clinicInfo.bannerPhoto2,
      title: 'Official Doctor Prescription Letterhead',
      subtitle: 'Dr. A.K. Chaurasia & Dr. Chandan Lal (Consultant Dermatologists)',
      details: [
        'Features both doctors: Dr. A.K. Chaurasia & Dr. Chandan Lal.',
        'Extracted department icons & specialty programs: Skin Diseases, Hair Loss, Laser & Cosmetic, Aesthetic, STD & Leprosy Care, Nail Clinic, Pediatric Derm, Anti-aging.',
        'Directly powers the interactive Digital Prescription (Rx) engine in the Patient Portal.'
      ]
    }
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);

  const currentItem = images[currentIndex] || images[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-fadeIn">
        {/* Top Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-xs">
              {currentIndex + 1}/{images.length}
            </span>
            <div>
              <h2 className="text-base font-bold text-white">{currentItem.title}</h2>
              <p className="text-xs text-sky-300">{currentItem.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden">
          {/* Image Viewer (8 cols) */}
          <div className="lg:col-span-8 bg-slate-950 flex items-center justify-center relative p-4 min-h-[360px] lg:min-h-[500px]">
            <img
              src={currentItem.url}
              alt={currentItem.title}
              className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl shadow-2xl ring-1 ring-white/10"
            />

            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition shadow-lg"
              title="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition shadow-lg"
              title="Next Photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Details Sidebar (4 cols) */}
          <div className="lg:col-span-4 p-6 bg-slate-50 border-t lg:border-t-0 lg:border-l border-slate-200 overflow-y-auto space-y-5 text-xs sm:text-sm">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-100 px-2.5 py-0.5 rounded-full">
                Clinical Asset Verification
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-2">{currentItem.title}</h3>
              <p className="text-xs text-slate-600 mt-1">{currentItem.subtitle}</p>
            </div>

            <div className="space-y-2">
              <span className="font-bold text-slate-800 text-xs uppercase block">
                Integrated Website Elements:
              </span>
              <ul className="space-y-2 text-slate-600">
                {currentItem.details.map((d, i) => (
                  <li key={i} className="flex items-start gap-2 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs leading-relaxed">{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Thumbnail Strip */}
            <div className="pt-2 border-t border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-700 block">Switch Asset:</span>
              <div className="grid grid-cols-3 gap-2">
                {images.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-16 rounded-lg overflow-hidden border-2 transition ${
                      currentIndex === idx ? 'border-sky-600 ring-2 ring-sky-300' : 'border-slate-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
