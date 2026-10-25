import React, { useState } from 'react';
import { 
  Settings, 
  Building, 
  Users, 
  FileText, 
  Calendar, 
  Image as ImageIcon, 
  Upload, 
  Save, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  Trash2, 
  Plus, 
  Clock, 
  Mail, 
  DollarSign, 
  ShieldAlert, 
  Lock, 
  Eye, 
  Download
} from 'lucide-react';
import { ClinicInfo, Doctor, Service, Appointment } from '../types/clinic';
import { storage } from '../utils/storage';

interface AdminDashboardProps {
  clinicInfo: ClinicInfo;
  onUpdateClinicInfo: (info: ClinicInfo) => void;
  doctors: Doctor[];
  onUpdateDoctors: (docs: Doctor[]) => void;
  services: Service[];
  onUpdateServices: (srvs: Service[]) => void;
  onExitAdmin: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  clinicInfo,
  onUpdateClinicInfo,
  doctors,
  onUpdateDoctors,
  services,
  onUpdateServices,
  onExitAdmin,
}) => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // Logged in for easy demo access
  const [adminPin, setAdminPin] = useState<string>('1234');
  const [pinInput, setPinInput] = useState<string>('');
  const [authError, setAuthError] = useState<string | null>(null);

  // Active Admin Sub-tab
  const [activeTab, setActiveTab] = useState<'clinic' | 'doctors' | 'services' | 'appointments' | 'media' | 'email'>('clinic');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form states
  const [editedClinic, setEditedClinic] = useState<ClinicInfo>({ ...clinicInfo });
  const [editedDoctors, setEditedDoctors] = useState<Doctor[]>([...doctors]);
  const [editedServices, setEditedServices] = useState<Service[]>([...services]);
  const [allAppointments, setAllAppointments] = useState<Appointment[]>(storage.getAppointments());

  // Doctor editor modal state
  const [editingDoctorIndex, setEditingDoctorIndex] = useState<number | null>(null);

  // Image Upload state
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);
  const [imageTarget, setImageTarget] = useState<'logo' | 'banner1' | 'banner2' | 'gallery'>('logo');

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '1234' || pinInput === adminPin) {
      setIsAuthenticated(true);
      setAuthError(null);
    } else {
      setAuthError('Incorrect PIN. (Default demo PIN is 1234)');
    }
  };

  // Save Clinic Details
  const handleSaveClinic = (e: React.FormEvent) => {
    e.preventDefault();
    storage.saveClinicInfo(editedClinic);
    onUpdateClinicInfo(editedClinic);
    showSuccess('Clinic website details successfully updated and persisted!');
  };

  // Save Doctors
  const handleSaveDoctors = () => {
    storage.saveDoctors(editedDoctors);
    onUpdateDoctors(editedDoctors);
    setEditingDoctorIndex(null);
    showSuccess('Physician team profiles updated successfully!');
  };

  // Save Services
  const handleSaveServices = () => {
    storage.saveServices(editedServices);
    onUpdateServices(editedServices);
    showSuccess('Clinical services catalogue updated!');
  };

  // File Upload Handler (FileReader -> base64)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setUploadedImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Apply uploaded image to chosen target
  const handleApplyUploadedImage = () => {
    if (!uploadedImagePreview) return;

    if (imageTarget === 'logo') {
      const updated = { ...editedClinic, logoUrl: uploadedImagePreview };
      setEditedClinic(updated);
      storage.saveClinicInfo(updated);
      onUpdateClinicInfo(updated);
      showSuccess('Clinic logo updated successfully with uploaded image!');
    } else if (imageTarget === 'banner1') {
      const updated = { ...editedClinic, bannerPhoto1: uploadedImagePreview };
      setEditedClinic(updated);
      storage.saveClinicInfo(updated);
      onUpdateClinicInfo(updated);
      showSuccess('Banner Photo 1 updated with uploaded image!');
    } else if (imageTarget === 'banner2') {
      const updated = { ...editedClinic, bannerPhoto2: uploadedImagePreview };
      setEditedClinic(updated);
      storage.saveClinicInfo(updated);
      onUpdateClinicInfo(updated);
      showSuccess('Banner Photo 2 updated with uploaded image!');
    } else if (imageTarget === 'gallery') {
      const newGalleryItem = {
        id: `img-${Date.now()}`,
        url: uploadedImagePreview,
        title: 'New Clinic Photo',
        description: 'Uploaded via Admin CMS'
      };
      const updated = { ...editedClinic, galleryImages: [newGalleryItem, ...editedClinic.galleryImages] };
      setEditedClinic(updated);
      storage.saveClinicInfo(updated);
      onUpdateClinicInfo(updated);
      showSuccess('New photo added to clinic gallery!');
    }

    setUploadedImagePreview(null);
  };

  // Reset to default
  const handleResetDefaults = () => {
    if (!confirm('Are you sure you want to reset all clinic details, doctors and services back to default?')) return;
    storage.resetToDefault();
    const info = storage.getClinicInfo();
    const docs = storage.getDoctors();
    const srvs = storage.getServices();
    setEditedClinic(info);
    setEditedDoctors(docs);
    setEditedServices(srvs);
    setAllAppointments(storage.getAppointments());
    onUpdateClinicInfo(info);
    onUpdateDoctors(docs);
    onUpdateServices(srvs);
    showSuccess('Reset all clinic data to original default state.');
  };

  // Export JSON backup
  const handleExportBackup = () => {
    const backupData = {
      clinic: editedClinic,
      doctors: editedDoctors,
      services: editedServices,
      appointments: allAppointments,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prime-clinic-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 space-y-4">
          <div className="w-14 h-14 bg-sky-100 text-sky-700 rounded-full mx-auto flex items-center justify-center">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Admin Control Panel Login</h2>
          <p className="text-xs text-slate-500">
            Enter 4-digit PIN to manage clinic details, doctors, services, and photo uploads.
          </p>

          {authError && (
            <p className="text-xs text-rose-600 bg-rose-50 p-2 rounded-lg font-semibold">{authError}</p>
          )}

          <form onSubmit={handleLogin} className="space-y-3">
            <input
              type="password"
              maxLength={6}
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="Enter PIN (Default: 1234)"
              className="w-full text-center text-lg tracking-widest p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <button
              type="submit"
              className="w-full py-2.5 bg-sky-700 hover:bg-sky-800 text-white font-bold rounded-xl text-sm transition"
            >
              Sign In to CMS
            </button>
          </form>

          <button
            onClick={() => { setPinInput('1234'); setIsAuthenticated(true); }}
            className="text-xs text-sky-700 font-semibold hover:underline block mx-auto"
          >
            Quick 1-Click Demo Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Top Admin Header Bar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-sky-700 text-white flex items-center justify-center shadow-xs">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-black text-slate-900">Admin CMS &amp; Content Control</h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                Admin Active
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Manage website copy, physician credentials, tariffs, automated notifications &amp; photo uploads
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportBackup}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition flex items-center gap-1.5"
            title="Download JSON backup"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Data</span>
          </button>

          <button
            onClick={handleResetDefaults}
            className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold rounded-xl border border-rose-200 transition flex items-center gap-1.5"
            title="Reset to default clinic data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            onClick={onExitAdmin}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition"
          >
            Back to Public Website
          </button>
        </div>
      </div>

      {/* Success Notification Alert */}
      {successMsg && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold flex items-center justify-between shadow-xs animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
          <button onClick={() => setSuccessMsg(null)} className="underline text-xs">Dismiss</button>
        </div>
      )}

      {/* CMS Sub-navigation Tabs */}
      <div className="flex items-center gap-1.5 border-b border-slate-200 mb-6 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('clinic')}
          className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'clinic' ? 'bg-sky-700 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>Clinic Details &amp; Contact</span>
        </button>

        <button
          onClick={() => setActiveTab('doctors')}
          className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'doctors' ? 'bg-sky-700 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Physicians &amp; Team ({editedDoctors.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('services')}
          className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'services' ? 'bg-sky-700 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Services &amp; Pricing ({editedServices.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('appointments')}
          className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'appointments' ? 'bg-sky-700 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Appointments Manager</span>
        </button>

        <button
          onClick={() => setActiveTab('media')}
          className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'media' ? 'bg-sky-700 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>Upload Image &amp; Media</span>
        </button>

        <button
          onClick={() => setActiveTab('email')}
          className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'email' ? 'bg-sky-700 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Automated Email Config</span>
        </button>
      </div>

      {/* Tab 1: Clinic Details Form */}
      {activeTab === 'clinic' && (
        <form onSubmit={handleSaveClinic} className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">General Clinic Branding &amp; Address</h2>
              <p className="text-xs text-slate-500">Edit clinic names, contact phones, and physical address shown to patients</p>
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-sky-700 hover:bg-sky-800 text-white font-bold rounded-xl text-xs sm:text-sm shadow transition flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Clinic Name (English)</label>
              <input
                type="text"
                value={editedClinic.name}
                onChange={(e) => setEditedClinic({ ...editedClinic, name: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Clinic Name (Hindi)</label>
              <input
                type="text"
                value={editedClinic.hindiName}
                onChange={(e) => setEditedClinic({ ...editedClinic, hindiName: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Primary Phone / Helpline</label>
              <input
                type="text"
                value={editedClinic.phone}
                onChange={(e) => setEditedClinic({ ...editedClinic, phone: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Clinic Email</label>
              <input
                type="email"
                value={editedClinic.email}
                onChange={(e) => setEditedClinic({ ...editedClinic, email: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">OPD Evening Timings</label>
              <input
                type="text"
                value={editedClinic.opdTimings}
                onChange={(e) => setEditedClinic({ ...editedClinic, opdTimings: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Clinic UPI ID for Payments</label>
              <input
                type="text"
                value={editedClinic.clinicUpiId}
                onChange={(e) => setEditedClinic({ ...editedClinic, clinicUpiId: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Top Announcement Banner Notice</label>
              <input
                type="text"
                value={editedClinic.noticeBanner}
                onChange={(e) => setEditedClinic({ ...editedClinic, noticeBanner: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Street Address Line 1</label>
              <input
                type="text"
                value={editedClinic.addressLine1}
                onChange={(e) => setEditedClinic({ ...editedClinic, addressLine1: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Address Line 2 (Opposite / Near)</label>
              <input
                type="text"
                value={editedClinic.addressLine2}
                onChange={(e) => setEditedClinic({ ...editedClinic, addressLine2: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Area &amp; City</label>
              <input
                type="text"
                value={`${editedClinic.area}, ${editedClinic.city} - ${editedClinic.pincode}`}
                onChange={(e) => {
                  const parts = e.target.value.split(',');
                  setEditedClinic({ ...editedClinic, area: parts[0]?.trim() || '', city: 'Prayagraj' });
                }}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-sky-500"
              />
            </div>
          </div>
        </form>
      )}

      {/* Tab 2: Physicians Manager */}
      {activeTab === 'doctors' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">Manage Physician Profiles</h2>
              <p className="text-xs text-slate-500">Edit qualifications, consultation fees, bios, and upload individual photos</p>
            </div>
            <button
              onClick={handleSaveDoctors}
              className="px-5 py-2.5 bg-sky-700 hover:bg-sky-800 text-white font-bold rounded-xl text-xs sm:text-sm shadow transition flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Doctor Changes</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {editedDoctors.map((doc, idx) => (
              <div key={doc.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-4 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={doc.avatar} alt={doc.name} className="w-12 h-12 rounded-xl object-cover ring-2 ring-sky-300" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{doc.name}</h4>
                      <p className="text-slate-500">{doc.title}</p>
                    </div>
                  </div>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    ₹{doc.consultationFee}
                  </span>
                </div>

                <div className="space-y-2">
                  <div>
                    <label className="block font-semibold text-slate-600 mb-0.5">Doctor Full Name</label>
                    <input
                      type="text"
                      value={doc.name}
                      onChange={(e) => {
                        const copy = [...editedDoctors];
                        copy[idx].name = e.target.value;
                        setEditedDoctors(copy);
                      }}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-600 mb-0.5">Degrees &amp; Qualifications</label>
                    <input
                      type="text"
                      value={doc.degrees}
                      onChange={(e) => {
                        const copy = [...editedDoctors];
                        copy[idx].degrees = e.target.value;
                        setEditedDoctors(copy);
                      }}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-semibold text-slate-600 mb-0.5">Consultation Fee (₹)</label>
                      <input
                        type="number"
                        value={doc.consultationFee}
                        onChange={(e) => {
                          const copy = [...editedDoctors];
                          copy[idx].consultationFee = parseInt(e.target.value) || 0;
                          setEditedDoctors(copy);
                        }}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-600 mb-0.5">Chamber Room</label>
                      <input
                        type="text"
                        value={doc.roomNumber}
                        onChange={(e) => {
                          const copy = [...editedDoctors];
                          copy[idx].roomNumber = e.target.value;
                          setEditedDoctors(copy);
                        }}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-600 mb-0.5">Biography</label>
                    <textarea
                      rows={3}
                      value={doc.bio}
                      onChange={(e) => {
                        const copy = [...editedDoctors];
                        copy[idx].bio = e.target.value;
                        setEditedDoctors(copy);
                      }}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Services & Pricing Editor */}
      {activeTab === 'services' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">Clinical Treatments &amp; Procedures</h2>
              <p className="text-xs text-slate-500">Modify service names, descriptions, and starting tariffs</p>
            </div>
            <button
              onClick={handleSaveServices}
              className="px-5 py-2.5 bg-sky-700 hover:bg-sky-800 text-white font-bold rounded-xl text-xs sm:text-sm shadow transition flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Services</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {editedServices.map((srv, idx) => (
              <div key={srv.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sky-800">{srv.name}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-slate-500">₹</span>
                    <input
                      type="number"
                      value={srv.priceFrom}
                      onChange={(e) => {
                        const copy = [...editedServices];
                        copy[idx].priceFrom = parseInt(e.target.value) || 0;
                        setEditedServices(copy);
                      }}
                      className="w-20 p-1 bg-white border border-slate-200 rounded font-bold text-slate-900"
                    />
                  </div>
                </div>

                <input
                  type="text"
                  value={srv.name}
                  onChange={(e) => {
                    const copy = [...editedServices];
                    copy[idx].name = e.target.value;
                    setEditedServices(copy);
                  }}
                  className="w-full p-1.5 bg-white border border-slate-200 rounded text-slate-800"
                />

                <textarea
                  rows={2}
                  value={srv.description}
                  onChange={(e) => {
                    const copy = [...editedServices];
                    copy[idx].description = e.target.value;
                    setEditedServices(copy);
                  }}
                  className="w-full p-1.5 bg-white border border-slate-200 rounded text-slate-800 text-[11px]"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Appointments Manager */}
      {activeTab === 'appointments' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">All Patient Bookings</h2>
              <p className="text-xs text-slate-500">Real-time schedule of online &amp; walk-in patients</p>
            </div>
            <span className="text-xs font-bold bg-sky-50 text-sky-700 px-3 py-1 rounded-full border border-sky-200">
              Total: {allAppointments.length} Bookings
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px]">
                  <th className="py-2.5">Token ID</th>
                  <th className="py-2.5">Patient Details</th>
                  <th className="py-2.5">Doctor &amp; Service</th>
                  <th className="py-2.5">Date &amp; Slot</th>
                  <th className="py-2.5">Fee &amp; Status</th>
                  <th className="py-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {allAppointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-slate-50">
                    <td className="py-3 font-mono font-bold text-sky-800">{apt.id}</td>
                    <td className="py-3">
                      <span className="font-bold text-slate-900 block">{apt.patientName}</span>
                      <span className="text-[11px] text-slate-500">{apt.patientPhone} • {apt.patientEmail}</span>
                    </td>
                    <td className="py-3">
                      <span className="font-semibold text-slate-800 block">{apt.doctorName}</span>
                      <span className="text-[11px] text-slate-500">{apt.serviceName}</span>
                    </td>
                    <td className="py-3">
                      <span className="font-bold text-slate-900 block">{apt.date}</span>
                      <span className="text-[11px] text-emerald-700">{apt.timeSlot}</span>
                    </td>
                    <td className="py-3">
                      <span className="font-bold block">₹{apt.amount}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        apt.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {apt.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => {
                          storage.dispatchAutomatedReminder(apt, '24-Hour Reminder');
                          showSuccess(`Reminder triggered for ${apt.patientName} (${apt.patientEmail})`);
                        }}
                        className="px-2.5 py-1 text-[11px] font-semibold text-sky-700 hover:bg-sky-50 rounded border border-sky-200"
                      >
                        Send Email Reminder
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 5: Image Upload & Media Manager */}
      {activeTab === 'media' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900">Upload New Images &amp; Manage Assets</h2>
            <p className="text-xs text-slate-500">
              Upload any image from your computer or phone to update the Clinic Logo, Services Banner, Prescription Letterhead, or Gallery.
            </p>
          </div>

          {/* Upload Dropzone */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-4">
              <label className="block p-8 border-2 border-dashed border-sky-300 rounded-2xl bg-sky-50/50 hover:bg-sky-50 transition cursor-pointer text-center">
                <Upload className="w-10 h-10 text-sky-600 mx-auto mb-2" />
                <span className="font-bold text-sm text-sky-900 block">Click or Drop Image Here to Upload</span>
                <span className="text-xs text-slate-500 mt-1 block">Supports JPG, PNG, WEBP, SVG</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              {uploadedImagePreview && (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <span className="text-xs font-bold text-slate-700 block">Uploaded Image Preview:</span>
                  <div className="h-44 rounded-xl overflow-hidden bg-black/10 flex items-center justify-center">
                    <img src={uploadedImagePreview} alt="Preview" className="max-h-full max-w-full object-contain" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Assign This Uploaded Image To:
                    </label>
                    <select
                      value={imageTarget}
                      onChange={(e) => setImageTarget(e.target.value as any)}
                      className="w-full p-2 text-xs bg-white border border-slate-200 rounded-lg font-medium text-slate-800"
                    >
                      <option value="logo">Replace Clinic Main Logo (PS Circular Emblem)</option>
                      <option value="banner1">Replace Clinic Banner Photo 1 (Specialty Board)</option>
                      <option value="banner2">Replace Clinic Banner Photo 2 (Doctor Rx Letterhead)</option>
                      <option value="gallery">Add to Clinic Photo Gallery</option>
                    </select>
                  </div>

                  <button
                    onClick={handleApplyUploadedImage}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Apply Image to Website</span>
                  </button>
                </div>
              )}
            </div>

            {/* Current Active Media Assets Showcase */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Currently Active Clinical Assets:
              </span>

              <div className="space-y-3 text-xs">
                {/* Active Logo */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                  <img src={editedClinic.logoUrl} alt="Logo" className="w-14 h-14 rounded-full object-cover ring-2 ring-amber-400 shrink-0" />
                  <div className="flex-1">
                    <span className="font-bold text-slate-900 block">Active Clinic Logo</span>
                    <span className="text-[11px] text-slate-500">Circular Emblem with PS Monogram &amp; Leaf</span>
                  </div>
                </div>

                {/* Active Banner 1 */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                  <img src={editedClinic.bannerPhoto1} alt="Banner 1" className="w-20 h-14 rounded-lg object-cover shrink-0" />
                  <div className="flex-1">
                    <span className="font-bold text-slate-900 block">Clinic Services Board (Banner 1)</span>
                    <span className="text-[11px] text-slate-500">IMG-20261006-WA0006_e87ab6ff.jpg</span>
                  </div>
                </div>

                {/* Active Banner 2 */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                  <img src={editedClinic.bannerPhoto2} alt="Banner 2" className="w-20 h-14 rounded-lg object-cover shrink-0" />
                  <div className="flex-1">
                    <span className="font-bold text-slate-900 block">Doctor Rx Letterhead (Banner 2)</span>
                    <span className="text-[11px] text-slate-500">IMG-20261018-WA0001_23d9bd7d.jpg</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 6: Automated Email Config */}
      {activeTab === 'email' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900">Automated Email Notification Settings</h2>
            <p className="text-xs text-slate-500">Configure appointment reminder schedule and automated triggers</p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">Automated Email Engine</span>
                <span className="text-slate-600">Dispatches confirmation immediately and reminder 24 hours prior</span>
              </div>
              <input
                type="checkbox"
                checked={editedClinic.emailRemindersEnabled}
                onChange={(e) => {
                  const updated = { ...editedClinic, emailRemindersEnabled: e.target.checked };
                  setEditedClinic(updated);
                  storage.saveClinicInfo(updated);
                  onUpdateClinicInfo(updated);
                }}
                className="w-5 h-5 text-sky-600 rounded"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Reminder Advance Notice (Hours)</label>
                <input
                  type="number"
                  value={editedClinic.reminderHoursBefore}
                  onChange={(e) => {
                    const updated = { ...editedClinic, reminderHoursBefore: parseInt(e.target.value) || 24 };
                    setEditedClinic(updated);
                    storage.saveClinicInfo(updated);
                    onUpdateClinicInfo(updated);
                  }}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Outgoing Sender Address</label>
                <input
                  type="email"
                  value={editedClinic.email}
                  disabled
                  className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
