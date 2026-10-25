import React from 'react';
import { 
  X, 
  Printer, 
  Download, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Clock, 
  FileText 
} from 'lucide-react';
import { DigitalPrescription, ClinicInfo } from '../types/clinic';

interface DigitalPrescriptionModalProps {
  prescription: DigitalPrescription;
  clinicInfo: ClinicInfo;
  onClose: () => void;
}

export const DigitalPrescriptionModal: React.FC<DigitalPrescriptionModalProps> = ({
  prescription,
  clinicInfo,
  onClose,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden animate-fadeIn relative my-8">
        {/* Top Modal Bar (Excluded during print) */}
        <div className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <FileText className="w-4 h-4 text-sky-400" />
            <span>Digital Medical Prescription • {prescription.id}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Prescription</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Prescription Paper Sheet (Faithful replication of the letterhead in IMG-20261018-WA0001_23d9bd7d.jpg) */}
        <div className="p-8 sm:p-10 bg-white text-slate-900 font-sans relative border-8 border-sky-900/10">
          {/* Watermark in background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
            <img 
              src={clinicInfo.logoUrl} 
              alt="Watermark" 
              className="w-96 h-96 object-contain" 
            />
          </div>

          {/* Letterhead Top Header */}
          <div className="border-b-2 border-sky-800 pb-5 mb-5 relative z-10">
            <div className="flex items-center justify-between gap-4">
              {/* Left: Clinic Logo & Name */}
              <div className="flex items-center gap-4">
                <img 
                  src={clinicInfo.logoUrl} 
                  alt="Clinic Logo" 
                  className="w-20 h-20 rounded-full object-cover ring-2 ring-sky-700 shadow-sm"
                />
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-sky-900 tracking-tight">
                    PRIME
                  </h1>
                  <h2 className="text-sm sm:text-base font-extrabold text-sky-600 tracking-wider uppercase">
                    Skin and Hair Clinic
                  </h2>
                  <p className="text-[11px] text-slate-600 font-medium">
                    Center for Clinical Dermatology, Trichology &amp; Laser Dermatosurgery
                  </p>
                </div>
              </div>

              {/* Right: Both Featured Doctors from Letterhead */}
              <div className="text-right space-y-2">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">Dr A K Chaurasia</h3>
                  <p className="text-[11px] text-sky-800 font-semibold">MBBS, MD (Skin and VD)</p>
                  <p className="text-[10px] text-slate-500">Consultant Dermatologist • Ex-SRN Hospital</p>
                </div>
                <div className="pt-1 border-t border-slate-200">
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm">Dr Chandan Lal</h3>
                  <p className="text-[11px] text-sky-800 font-semibold">MBBS, MD</p>
                  <p className="text-[10px] text-slate-500">Consultant Dermatologist</p>
                </div>
              </div>
            </div>
          </div>

          {/* Patient Details Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 px-4 rounded-xl bg-sky-50/60 border border-sky-200/60 text-xs mb-6 relative z-10">
            <div>
              <span className="text-slate-500 text-[10px] uppercase font-bold block">Patient Name:</span>
              <span className="font-bold text-slate-900">{prescription.patientName}</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] uppercase font-bold block">Age / Sex:</span>
              <span className="font-bold text-slate-900">{prescription.age} Yrs / {prescription.gender}</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] uppercase font-bold block">Consult Date:</span>
              <span className="font-bold text-slate-900">{prescription.date}</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] uppercase font-bold block">Rx Serial ID:</span>
              <span className="font-bold text-sky-800 font-mono">{prescription.id}</span>
            </div>
          </div>

          {/* Main Body: Clinical Diagnosis, Rx symbol, & Medications */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10 min-h-[380px]">
            {/* Left sidebar: Symptoms & Diagnosis */}
            <div className="md:col-span-4 border-r border-slate-200 pr-4 space-y-4 text-xs">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Clinical Diagnosis:
                </span>
                <p className="font-bold text-slate-900 bg-amber-50 p-2.5 rounded-lg border border-amber-200 text-xs">
                  {prescription.diagnosis}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Symptoms &amp; Observations:
                </span>
                <ul className="space-y-1.5 list-disc list-inside text-slate-700">
                  {prescription.symptoms.map((sym, idx) => (
                    <li key={idx} className="leading-tight">{sym}</li>
                  ))}
                </ul>
              </div>

              {/* Specialities stamp column mimicking the Rx letterhead icons */}
              <div className="pt-4 border-t border-slate-200 text-[10px] text-slate-500 space-y-1">
                <p className="font-bold text-sky-800">Department Specialties:</p>
                <p>• Skin Diseases (त्वचा रोग)</p>
                <p>• Hair Loss (बाल झड़ना / PRP)</p>
                <p>• Laser &amp; Cosmetic Procedures</p>
                <p>• Aesthetic &amp; Anti-aging</p>
                <p>• Dermatosurgery &amp; Vitiligo</p>
              </div>
            </div>

            {/* Right: Rx section with medications */}
            <div className="md:col-span-8 space-y-4">
              <div className="text-3xl font-serif font-black text-sky-800 flex items-center gap-2">
                <span>℞</span>
                <span className="text-xs font-sans font-medium text-slate-400">Prescribed Treatment Regimen</span>
              </div>

              {/* Medication Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b-2 border-slate-200 text-slate-500">
                      <th className="py-2 font-bold uppercase text-[10px]">Medicine / Topical Form</th>
                      <th className="py-2 font-bold uppercase text-[10px]">Dosage &amp; Timing</th>
                      <th className="py-2 font-bold uppercase text-[10px]">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {prescription.medications.map((med, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="py-2.5 pr-2">
                          <span className="font-bold text-slate-900 block">{med.name}</span>
                          <span className="text-[11px] text-slate-500">{med.dosage}</span>
                        </td>
                        <td className="py-2.5 pr-2 font-medium text-sky-900">
                          {med.timing}
                        </td>
                        <td className="py-2.5 font-semibold text-slate-700">
                          {med.duration}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* General Advice */}
              <div className="pt-4 border-t border-slate-200 space-y-2">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                  Physician's Instructions &amp; Lifestyle Advice:
                </span>
                <ul className="space-y-1 text-xs text-slate-600">
                  {prescription.generalAdvice.map((adv, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-sky-600 font-bold shrink-0">✓</span>
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Next review & doctor signature block */}
              <div className="pt-6 flex items-end justify-between text-xs">
                <div>
                  <span className="text-[11px] text-slate-500 block">Next Follow-up Review:</span>
                  <span className="font-bold text-emerald-700">
                    {prescription.nextVisitDate || 'After 3 Weeks'}
                  </span>
                </div>

                <div className="text-right space-y-1">
                  <div className="font-cursive text-lg text-sky-900 tracking-wider font-bold italic">
                    {prescription.doctorName}
                  </div>
                  <div className="h-0.5 w-36 bg-slate-400 ml-auto"></div>
                  <span className="text-[10px] text-slate-500 block font-semibold">
                    Authorized Signatory &amp; Stamp
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Letterhead Footer */}
          <div className="mt-8 pt-4 border-t-2 border-sky-800 flex flex-wrap items-center justify-between text-[11px] text-slate-600 relative z-10 gap-2">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-sky-700 shrink-0" />
              <span>Near Indian Oil Petrol Pump, Opposite Hotel India, Mewalal ki Bagiya, Naini, Prayagraj - 211008</span>
            </div>
            <div className="flex items-center gap-3 font-semibold text-slate-800">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Mon – Sat: 5:00 PM – 7:00 PM</span>
              </span>
              <span className="flex items-center gap-1 text-sky-800">
                <Phone className="w-3.5 h-3.5 text-sky-600" />
                <span>Appointments: 8960777591</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
