import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Navigation, 
  Building2, 
  ShieldCheck,
  Compass
} from 'lucide-react';
import { ClinicInfo } from '../types/clinic';

interface ContactSectionProps {
  clinicInfo: ClinicInfo;
  lang: 'en' | 'hi';
}

export const ContactSection: React.FC<ContactSectionProps> = ({ clinicInfo, lang }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Skin Query');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      alert('Please fill out all fields.');
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setPhone('');
      setMessage('');
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold">
          <MapPin className="w-3.5 h-3.5 text-sky-600" />
          <span>{lang === 'hi' ? 'क्लीनिक संपर्क एवं पता' : 'Location & OPD Directions'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          {lang === 'hi' ? 'हमसे संपर्क करें एवं क्लीनिक पहुंचे' : 'Visit Prime Skin & Hair Clinic'}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          {lang === 'hi'
            ? 'मेवालाल की बगिया, इण्डिया होटल के सामने, नैनी, प्रयागराज। किसी भी आपातकाल या प्रश्न हेतु हमें कॉल करें।'
            : 'Conveniently located in Naini, Prayagraj. Easily accessible from Civil Lines, SRN Hospital corridor, and Kydganj.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (5 cols): Exact Address, Timings & Phone */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Address Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
              <Building2 className="w-5 h-5 text-sky-600" />
              <span>Official Clinic Address</span>
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block text-sm">
                    {clinicInfo.name}
                  </span>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    10A/113, Daud Nagar, Mewalal ki Bagiya
                  </p>
                  <p className="text-sky-800 font-semibold text-xs mt-0.5">
                    (Opposite Hotel India, Near Indian Oil Petrol Pump, Beside Goodwill Garage)
                  </p>
                  <p className="text-slate-800 font-bold text-xs mt-0.5">
                    Naini, Prayagraj, Uttar Pradesh - 211008
                  </p>
                </div>
              </div>

              {/* Hindi Landmark Translation for Local Convenience */}
              <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
                <span className="font-bold block">स्थानीय पता (हिन्दी):</span>
                <p className="leading-relaxed">
                  10A/113, दाउद नगर, मेवालाल की बगिया, (इण्डिया होटल के सामने, पेट्रोल टंकी के बगल वाली गली, गुडविल गैरेज के बगल में) नैनी, प्रयागराज
                </p>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-slate-100">
                <Clock className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">Evening OPD Timings</span>
                  <p className="text-slate-600 font-semibold">{clinicInfo.opdTimings}</p>
                  <p className="text-xs text-slate-500">{clinicInfo.opdDays}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-slate-100">
                <Phone className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">Telephone &amp; WhatsApp Helpline</span>
                  <a
                    href={`tel:${clinicInfo.phone.replace(/[^0-9+]/g, '')}`}
                    className="text-base font-extrabold text-sky-700 hover:underline block"
                  >
                    {clinicInfo.phone}
                  </a>
                  <span className="text-[11px] text-slate-500">Available during clinic OPD hours</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp & Call Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href={`tel:${clinicInfo.phone.replace(/[^0-9+]/g, '')}`}
                className="py-2.5 px-3 bg-sky-700 hover:bg-sky-800 text-white font-bold rounded-xl text-center text-xs transition flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Clinic</span>
              </a>

              <a
                href={`https://wa.me/918960777591?text=${encodeURIComponent('Hello Doctor, I would like to enquire about consultation at Prime Skin and Hair Clinic.')}`}
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-center text-xs transition flex items-center justify-center gap-1.5 shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Transportation / Accessibility Info */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-xs text-slate-600 space-y-2">
            <span className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
              <Compass className="w-4 h-4 text-sky-600" />
              <span>How to Reach the Clinic</span>
            </span>
            <p>• <b>From Civil Lines / Prayagraj Junction:</b> Drive via New Yamuna Bridge to Naini main highway (approx. 15 mins).</p>
            <p>• <b>Landmark:</b> Look for Indian Oil Petrol Pump and Hotel India on the main road; the clinic entrance is situated right beside Goodwill Garage.</p>
            <p>• <b>Parking:</b> Dedicated two-wheeler and four-wheeler patient parking available outside the clinic.</p>
          </div>
        </div>

        {/* Right Column (7 cols): Contact Query Form & Interactive Map */}
        <div className="lg:col-span-7 space-y-6">
          {/* Contact Inquiry Form */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <Send className="w-4 h-4 text-sky-600" />
              <span>{lang === 'hi' ? 'चिकित्सकीय संदेश या प्रश्न भेजें' : 'Send an Enquiry / Clinical Question'}</span>
            </h2>

            {submitted ? (
              <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="text-base font-bold text-slate-900">Message Received!</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Thank you for reaching out to Prime Skin &amp; Hair Clinic. Our OPD desk coordinator will call you back on your mobile number shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Anand Mishra"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 8960777591"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Subject / Concern Area
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="Skin Query">Skin Condition / Rash / Allergy Consultation</option>
                    <option value="Hair Loss / PRP">Hair Fall / PRP Growth Therapy Inquiry</option>
                    <option value="Vitiligo Surgery">Vitiligo (सफेद दाग) Evaluation &amp; Surgery</option>
                    <option value="Acne & Scars">Acne Scars / Laser Peel Appointment</option>
                    <option value="Mole / Wart Removal">Mole / Wart Radiofrequency Removal</option>
                    <option value="General Timing">OPD Timings &amp; Emergency Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Question / Message *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Briefly describe your skin or hair symptoms..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-sky-700 hover:bg-sky-800 text-white font-bold rounded-xl shadow transition text-xs sm:text-sm flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Clinic Desk</span>
                </button>
              </form>
            )}
          </div>

          {/* Interactive Map Visual */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <Navigation className="w-4 h-4 text-rose-500" />
                <span>Clinic Map &amp; Landmark Coordinates</span>
              </span>
              <span className="text-[11px] text-slate-500">Prayagraj - 211008</span>
            </div>

            {/* Simulated Clean Medical Map with Pins */}
            <div className="h-56 rounded-xl bg-slate-100 border border-slate-200 relative overflow-hidden flex items-center justify-center p-4">
              {/* Grid map effect */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
              
              {/* Roads simulation */}
              <div className="absolute w-full h-8 bg-slate-300/60 top-1/2 -translate-y-1/2 transform -rotate-6" />
              <div className="absolute h-full w-8 bg-slate-300/60 left-1/3 transform rotate-12" />

              {/* Pin 1: Clinic */}
              <div className="relative z-10 bg-white px-3 py-2 rounded-xl shadow-lg border-2 border-sky-600 text-center animate-bounce">
                <div className="w-3 h-3 bg-rose-500 rounded-full mx-auto mb-1 ring-4 ring-rose-200" />
                <span className="font-bold text-slate-900 text-xs block">Prime Skin &amp; Hair Clinic</span>
                <span className="text-[10px] text-slate-500">Opposite Hotel India, Naini</span>
              </div>

              {/* Pin 2: Petrol Pump */}
              <div className="absolute bottom-4 right-8 bg-white/90 px-2 py-1 rounded text-[10px] font-semibold text-slate-600 border border-slate-200 shadow-xs">
                ⛽ Indian Oil Pump
              </div>

              {/* Pin 3: Goodwill Garage */}
              <div className="absolute top-4 left-6 bg-white/90 px-2 py-1 rounded text-[10px] font-semibold text-slate-600 border border-slate-200 shadow-xs">
                🚗 Beside Goodwill Garage
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <span>GPS: Naini, Mewalal ki Bagiya</span>
              <a
                href="https://maps.google.com/?q=Prime+Skin+and+Hair+Clinic+Naini+Prayagraj"
                target="_blank"
                rel="noreferrer"
                className="text-sky-700 font-bold hover:underline flex items-center gap-1"
              >
                <span>Open in Google Maps &rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
