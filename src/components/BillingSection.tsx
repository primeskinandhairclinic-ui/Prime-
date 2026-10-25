import React, { useState } from 'react';
import { 
  CreditCard, 
  ShieldCheck, 
  QrCode, 
  Lock, 
  CheckCircle2, 
  Printer, 
  Clock, 
  FileText, 
  HelpCircle,
  Sparkles,
  Search,
  Building
} from 'lucide-react';
import { ClinicInfo, Invoice } from '../types/clinic';
import { storage } from '../utils/storage';

interface BillingSectionProps {
  clinicInfo: ClinicInfo;
  lang: 'en' | 'hi';
}

export const BillingSection: React.FC<BillingSectionProps> = ({ clinicInfo, lang }) => {
  const [selectedPaymentMode, setSelectedPaymentMode] = useState<'upi' | 'card' | 'cash'>('upi');
  const [searchInvoiceId, setSearchInvoiceId] = useState<string>('');
  const [lookupResult, setLookupResult] = useState<Invoice | null>(null);
  const [paySuccessMsg, setPaySuccessMsg] = useState<string | null>(null);

  // Procedure tariff list
  const tariffs = [
    { service: 'Specialist Dermatologist Consultation (OPD)', hindi: 'विशेषज्ञ चर्म रोग परामर्श', fee: '₹400', notes: 'Includes clinical examination' },
    { service: 'Follow-up Consultation (within 2 weeks)', hindi: 'फॉलो-अप रिव्यू परामर्श', fee: '₹250', notes: 'Valid within 14 days of first visit' },
    { service: 'PRP Hair Regrowth Therapy (Per Session)', hindi: 'PRP हेयर रीग्रोथ थेरेपी (प्रति सेशन)', fee: '₹2,500 - ₹3,500', notes: 'Autologous platelet concentrate' },
    { service: 'Chemical Peel for Glow & De-pigmentation', hindi: 'कैमिकल पील (झाइयों व कालेपन हेतु)', fee: '₹1,200 - ₹1,800', notes: 'Custom glycolic / salicylic' },
    { service: 'Mole / Wart / Skin Tag RF Ablation', hindi: 'तिल / मस्सा / स्किन टैग हटाना', fee: '₹800 - ₹1,500', notes: 'Painless radiofrequency' },
    { service: 'Vitiligo Surgery / Punch Grafting', hindi: 'सफेद दाग की सर्जरी एवं ग्राफ्टिंग', fee: '₹1,500 - ₹4,000', notes: 'For stable patches' },
    { service: 'Acne Scar Subcision & Microneedling', hindi: 'मुहांसे के गड्ढों का इलाज', fee: '₹1,800 - ₹2,500', notes: 'Collagen induction' },
    { service: 'Laser Hair Reduction / Tattoo Removal', hindi: 'लेज़र प्रक्रियाएं / टैटू हटाना', fee: '₹1,800+', notes: 'Per session assessment' },
  ];

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const invoices = storage.getInvoices();
    const found = invoices.find(
      inv => inv.invoiceNumber.toLowerCase().includes(searchInvoiceId.trim().toLowerCase()) ||
             inv.appointmentId.toLowerCase().includes(searchInvoiceId.trim().toLowerCase()) ||
             inv.patientPhone.includes(searchInvoiceId.trim())
    );
    if (found) {
      setLookupResult(found);
      setPaySuccessMsg(null);
    } else {
      alert('No invoice found with that number. Try "PS-INV-081" or "PS-8492"');
    }
  };

  const handlePayNow = () => {
    if (!lookupResult) return;
    const allInvoices = storage.getInvoices();
    const updated = allInvoices.map(inv => inv.id === lookupResult.id ? { ...inv, paymentStatus: 'PAID' as const } : inv);
    storage.saveInvoices(updated);
    setLookupResult(prev => prev ? { ...prev, paymentStatus: 'PAID' } : null);
    setPaySuccessMsg(`Payment of ₹${lookupResult.total} confirmed successfully! Receipt updated.`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>{lang === 'hi' ? 'सुरक्षित बिलिंग एवं पारदर्शी शुल्क' : 'Encrypted Billing & Transparent Pricing'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          {lang === 'hi' ? 'क्लीनिक शुल्क एवं ऑनलाइन भुगतान' : 'Billing, Procedure Tariffs & Payments'}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          {lang === 'hi'
            ? 'प्राइम स्किन एण्ड हेयर क्लीनिक में किसी भी गुप्त शुल्क के बिना पारदर्शी चिकित्सकीय दरें एवं सुरक्षित UPI/कार्ड भुगतान।'
            : 'Clear, ethical dermatological pricing with no hidden charges. Pay safely via UPI QR, Cards, or at the clinic front desk.'}
        </p>
      </div>

      {/* Trust & Encryption Badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10 text-xs text-slate-700">
        <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center gap-2.5 shadow-xs">
          <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
          <div>
            <span className="font-bold block text-slate-900">256-Bit SSL</span>
            <span className="text-[11px] text-slate-500">Bank-grade encryption</span>
          </div>
        </div>
        <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center gap-2.5 shadow-xs">
          <QrCode className="w-4 h-4 text-sky-600 shrink-0" />
          <div>
            <span className="font-bold block text-slate-900">Direct UPI</span>
            <span className="text-[11px] text-slate-500">GPay, PhonePe, Paytm</span>
          </div>
        </div>
        <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center gap-2.5 shadow-xs">
          <FileText className="w-4 h-4 text-indigo-600 shrink-0" />
          <div>
            <span className="font-bold block text-slate-900">Official Receipt</span>
            <span className="text-[11px] text-slate-500">Printable GST invoice</span>
          </div>
        </div>
        <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center gap-2.5 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <div>
            <span className="font-bold block text-slate-900">No Hidden Costs</span>
            <span className="text-[11px] text-slate-500">Published fee schedule</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (7 cols): Tariff Table */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-sky-600" />
              <span>Standard Dermatology Fee Schedule</span>
            </h2>
            <span className="text-xs text-slate-500 font-medium">Effective 2026</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 text-[11px] uppercase">
                  <th className="py-2.5">Service / Procedure</th>
                  <th className="py-2.5">Indicative Fee</th>
                  <th className="py-2.5 hidden sm:table-cell">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tariffs.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition">
                    <td className="py-3 pr-2">
                      <span className="font-bold text-slate-900 block">{item.service}</span>
                      <span className="text-[11px] text-slate-500">{item.hindi}</span>
                    </td>
                    <td className="py-3 font-bold text-emerald-700 whitespace-nowrap">
                      {item.fee}
                    </td>
                    <td className="py-3 text-xs text-slate-500 hidden sm:table-cell">
                      {item.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-[11px] text-slate-500 italic pt-2 border-t border-slate-100">
            * Note: Surgical procedures (Vitiligo grafting, RF mole ablation) and PRP therapies vary based on surface area and number of lesions. The exact estimate is provided by Dr. A.K. Chaurasia / Dr. Chandan Lal during initial OPD consultation.
          </p>
        </div>

        {/* Right Column (5 cols): Secure Online Payment & UPI Gateway */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick UPI & Payment Gateway Simulation Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-sky-600" />
                <span>Instant Consultation Payment</span>
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200">
                Active Gateway
              </span>
            </div>

            {/* Payment Mode Selector */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSelectedPaymentMode('upi')}
                className={`py-2 px-1 text-xs font-bold rounded-lg border text-center transition ${
                  selectedPaymentMode === 'upi'
                    ? 'bg-sky-50 text-sky-800 border-sky-500'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                UPI / QR
              </button>
              <button
                type="button"
                onClick={() => setSelectedPaymentMode('card')}
                className={`py-2 px-1 text-xs font-bold rounded-lg border text-center transition ${
                  selectedPaymentMode === 'card'
                    ? 'bg-sky-50 text-sky-800 border-sky-500'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                Card / NetBanking
              </button>
              <button
                type="button"
                onClick={() => setSelectedPaymentMode('cash')}
                className={`py-2 px-1 text-xs font-bold rounded-lg border text-center transition ${
                  selectedPaymentMode === 'cash'
                    ? 'bg-sky-50 text-sky-800 border-sky-500'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                At Clinic
              </button>
            </div>

            {/* UPI QR Display */}
            {selectedPaymentMode === 'upi' && (
              <div className="text-center p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="w-36 h-36 bg-white p-2 rounded-xl border border-slate-300 mx-auto shadow-xs flex items-center justify-center">
                  {/* Generated QR representation */}
                  <div className="w-full h-full bg-slate-900 rounded-lg flex flex-col items-center justify-center text-white p-2 text-center">
                    <QrCode className="w-16 h-16 text-sky-400 mb-1" />
                    <span className="text-[9px] font-mono font-bold tracking-tight">8960777591@upi</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-900">
                    Scan with any UPI App (GPay / PhonePe / Paytm / BHIM)
                  </p>
                  <p className="text-[11px] text-sky-700 font-mono font-semibold">
                    UPI ID: {clinicInfo.clinicUpiId}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Standard OPD Consultation Amount: ₹400
                  </p>
                </div>
              </div>
            )}

            {/* Card Simulation */}
            {selectedPaymentMode === 'card' && (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Card Number</label>
                  <input
                    type="text"
                    disabled
                    value="•••• •••• •••• 4242 (Encrypted Demo)"
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-500 font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Expiry</label>
                    <input
                      type="text"
                      disabled
                      value="12 / 28"
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">CVV</label>
                    <input
                      type="password"
                      disabled
                      value="•••"
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-500"
                    />
                  </div>
                </div>
                <span className="text-[11px] text-emerald-700 font-medium block">
                  ✓ Protected by 3D Secure OTP Verification
                </span>
              </div>
            )}

            {/* Cash option */}
            {selectedPaymentMode === 'cash' && (
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 space-y-2">
                <p className="font-bold">Pay at Clinic Reception Desk</p>
                <p className="text-[11px] text-emerald-800 leading-relaxed">
                  Patients preferring cash can pay ₹400 directly to the clinic billing coordinator upon arriving at Mewalal ki Bagiya, Naini.
                </p>
              </div>
            )}

            {/* Search Invoice lookup form */}
            <div className="pt-2 border-t border-slate-100">
              <form onSubmit={handleLookup} className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  Lookup &amp; Settle Existing Bill:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={searchInvoiceId}
                    onChange={(e) => setSearchInvoiceId(e.target.value)}
                    placeholder="Enter Invoice No. or Phone..."
                    className="flex-1 p-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold rounded-lg transition"
                  >
                    Lookup
                  </button>
                </div>
              </form>
            </div>

            {/* Invoice lookup modal / card */}
            {lookupResult && (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-3 animate-fadeIn">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900">{lookupResult.invoiceNumber}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    lookupResult.paymentStatus === 'PAID' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {lookupResult.paymentStatus}
                  </span>
                </div>
                <div className="space-y-1 text-slate-600">
                  <p>Patient: <b className="text-slate-800">{lookupResult.patientName}</b></p>
                  <p>Service: <b>{lookupResult.serviceName}</b></p>
                  <p>Total Due: <b className="text-emerald-700 text-sm">₹{lookupResult.total}</b></p>
                </div>

                {paySuccessMsg && (
                  <p className="text-emerald-700 font-bold text-[11px] bg-emerald-50 p-2 rounded border border-emerald-200">
                    {paySuccessMsg}
                  </p>
                )}

                {lookupResult.paymentStatus !== 'PAID' && (
                  <button
                    onClick={handlePayNow}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition"
                  >
                    Confirm &amp; Settle Payment (₹{lookupResult.total})
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
