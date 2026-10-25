import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Sparkles, 
  Syringe, 
  Sparkle, 
  Activity, 
  Droplets, 
  Scissors, 
  Clock, 
  Baby, 
  Lock, 
  Fingerprint, 
  Zap, 
  CheckCircle, 
  ArrowRight,
  Search,
  Filter
} from 'lucide-react';
import { Service } from '../types/clinic';

interface ServicesSectionProps {
  services: Service[];
  lang: 'en' | 'hi';
  onBookService: (serviceId: string) => void;
}

const iconMap: Record<string, React.ElementType> = {
  ShieldAlert,
  Sparkles,
  Syringe,
  Sparkle,
  Activity,
  Droplets,
  Scissors,
  Clock,
  Baby,
  Lock,
  Fingerprint,
  Zap,
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  lang,
  onBookService,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Skin Diseases',
    'Hair Care',
    'Aesthetic & Lasers',
    'Dermatosurgery',
    'Allergies & Infections'
  ];

  const filteredServices = services.filter((srv) => {
    const matchesCategory = selectedCategory === 'All' || srv.category === selectedCategory;
    const matchesSearch = 
      srv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.hindiName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.commonConditions.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-12 sm:py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Title & Description */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>{lang === 'hi' ? 'क्लीनिकल सेवाएं एवं उपचार' : 'Comprehensive Clinical Offerings'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'hi' ? 'त्वचा, बाल एवं सौंदर्य समस्याओं का संपूर्ण इलाज' : 'Treatments & Clinical Specialties'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {lang === 'hi'
              ? 'प्राइम स्किन एण्ड हेयर क्लीनिक में उपलब्ध सभी प्रमाणित त्वचा, बाल, लेज़र एवं माइनर सर्जरी प्रक्रियाएं'
              : 'Certified dermatological diagnostics, phototherapy, hair restoration PRP, radiofrequency mole removal, and scar therapies.'}
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'hi' ? 'बीमारी या सेवा खोजें (उदा. Vitiligo, Hair, Acne)...' : 'Search condition or treatment...'}
                className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
              <Filter className="w-4 h-4 text-slate-400 hidden md:block shrink-0" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                    selectedCategory === cat
                      ? 'bg-sky-700 text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat === 'All' ? (lang === 'hi' ? 'सभी सेवाएं' : 'All') : cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const Icon = iconMap[service.iconName] || Activity;
            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group hover:border-sky-300"
              >
                <div className="space-y-4">
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-700 group-hover:bg-sky-700 group-hover:text-white transition flex items-center justify-center shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    {service.popular && (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold border border-amber-200">
                        Top Requested
                      </span>
                    )}
                  </div>

                  {/* Title & Hindi Title */}
                  <div>
                    <span className="text-[11px] font-semibold text-sky-700 tracking-wider uppercase">
                      {service.category}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition">
                      {lang === 'hi' ? service.hindiName : service.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      {lang === 'hi' ? service.name : service.hindiName}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {lang === 'hi' ? service.hindiDescription : service.description}
                  </p>

                  {/* Common Conditions Treated */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-bold text-slate-700 uppercase">
                      {lang === 'hi' ? 'लक्षण एवं समस्याएं:' : 'Indications & Conditions:'}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {service.commonConditions.slice(0, 3).map((cond, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium"
                        >
                          {cond}
                        </span>
                      ))}
                      {service.commonConditions.length > 3 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-50 text-sky-700 font-medium">
                          +{service.commonConditions.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer with Price & Booking */}
                <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-500 block">Starting from</span>
                    <span className="text-base font-bold text-slate-900">₹{service.priceFrom}</span>
                  </div>

                  <button
                    onClick={() => onBookService(service.id)}
                    className="px-4 py-2 text-xs font-bold text-sky-700 hover:text-white bg-sky-50 hover:bg-sky-700 rounded-xl transition flex items-center gap-1.5"
                  >
                    <span>{lang === 'hi' ? 'बुक करें' : 'Book Now'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 text-sm">No treatments matched your search criteria.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-2 text-xs font-semibold text-sky-700 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
