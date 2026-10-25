import { 
  ClinicInfo, 
  Doctor, 
  Service, 
  Appointment, 
  DigitalPrescription, 
  EmailReminderLog, 
  Invoice 
} from '../types/clinic';
import { 
  INITIAL_CLINIC_INFO, 
  INITIAL_DOCTORS, 
  INITIAL_SERVICES, 
  INITIAL_APPOINTMENTS, 
  INITIAL_PRESCRIPTIONS, 
  INITIAL_EMAIL_LOGS, 
  INITIAL_INVOICES 
} from '../data/initialData';

const STORAGE_KEYS = {
  CLINIC_INFO: 'ps_clinic_info_v1',
  DOCTORS: 'ps_doctors_v1',
  SERVICES: 'ps_services_v1',
  APPOINTMENTS: 'ps_appointments_v1',
  PRESCRIPTIONS: 'ps_prescriptions_v1',
  EMAIL_LOGS: 'ps_email_logs_v1',
  INVOICES: 'ps_invoices_v1',
  ACTIVE_USER: 'ps_active_patient_v1'
};

export const storage = {
  getClinicInfo: (): ClinicInfo => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CLINIC_INFO);
      return data ? JSON.parse(data) : INITIAL_CLINIC_INFO;
    } catch {
      return INITIAL_CLINIC_INFO;
    }
  },

  saveClinicInfo: (info: ClinicInfo): void => {
    localStorage.setItem(STORAGE_KEYS.CLINIC_INFO, JSON.stringify(info));
  },

  getDoctors: (): Doctor[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DOCTORS);
      return data ? JSON.parse(data) : INITIAL_DOCTORS;
    } catch {
      return INITIAL_DOCTORS;
    }
  },

  saveDoctors: (doctors: Doctor[]): void => {
    localStorage.setItem(STORAGE_KEYS.DOCTORS, JSON.stringify(doctors));
  },

  getServices: (): Service[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SERVICES);
      return data ? JSON.parse(data) : INITIAL_SERVICES;
    } catch {
      return INITIAL_SERVICES;
    }
  },

  saveServices: (services: Service[]): void => {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
  },

  getAppointments: (): Appointment[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
      return data ? JSON.parse(data) : INITIAL_APPOINTMENTS;
    } catch {
      return INITIAL_APPOINTMENTS;
    }
  },

  saveAppointments: (appointments: Appointment[]): void => {
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
  },

  getPrescriptions: (): DigitalPrescription[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PRESCRIPTIONS);
      return data ? JSON.parse(data) : INITIAL_PRESCRIPTIONS;
    } catch {
      return INITIAL_PRESCRIPTIONS;
    }
  },

  savePrescriptions: (rxList: DigitalPrescription[]): void => {
    localStorage.setItem(STORAGE_KEYS.PRESCRIPTIONS, JSON.stringify(rxList));
  },

  getEmailLogs: (): EmailReminderLog[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.EMAIL_LOGS);
      return data ? JSON.parse(data) : INITIAL_EMAIL_LOGS;
    } catch {
      return INITIAL_EMAIL_LOGS;
    }
  },

  saveEmailLogs: (logs: EmailReminderLog[]): void => {
    localStorage.setItem(STORAGE_KEYS.EMAIL_LOGS, JSON.stringify(logs));
  },

  getInvoices: (): Invoice[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.INVOICES);
      return data ? JSON.parse(data) : INITIAL_INVOICES;
    } catch {
      return INITIAL_INVOICES;
    }
  },

  saveInvoices: (invoices: Invoice[]): void => {
    localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(invoices));
  },

  resetToDefault: (): void => {
    localStorage.setItem(STORAGE_KEYS.CLINIC_INFO, JSON.stringify(INITIAL_CLINIC_INFO));
    localStorage.setItem(STORAGE_KEYS.DOCTORS, JSON.stringify(INITIAL_DOCTORS));
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(INITIAL_SERVICES));
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(INITIAL_APPOINTMENTS));
    localStorage.setItem(STORAGE_KEYS.PRESCRIPTIONS, JSON.stringify(INITIAL_PRESCRIPTIONS));
    localStorage.setItem(STORAGE_KEYS.EMAIL_LOGS, JSON.stringify(INITIAL_EMAIL_LOGS));
    localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(INITIAL_INVOICES));
  },

  // Helper to trigger automated email reminder
  dispatchAutomatedReminder: (
    appointment: Appointment,
    reminderType: 'Booking Confirmation' | '24-Hour Reminder' | '2-Hour Reminder' | 'Post-Consult Followup'
  ): EmailReminderLog => {
    const currentLogs = storage.getEmailLogs();
    const newLog: EmailReminderLog = {
      id: `EM-${Date.now().toString().slice(-4)}`,
      appointmentId: appointment.id,
      recipientEmail: appointment.patientEmail,
      recipientName: appointment.patientName,
      doctorName: appointment.doctorName,
      appointmentDate: appointment.date,
      appointmentTime: appointment.timeSlot,
      reminderType,
      subject: reminderType === 'Booking Confirmation' 
        ? `Appointment Confirmed: ${appointment.doctorName} at Prime Skin & Hair Clinic (${appointment.id})`
        : reminderType === '24-Hour Reminder'
        ? `Upcoming Appointment Reminder (Tomorrow at ${appointment.timeSlot}) - Prime Skin Clinic`
        : reminderType === '2-Hour Reminder'
        ? `Starting Soon: Your Doctor OPD Appointment in 2 Hours (${appointment.timeSlot})`
        : `Post-Consultation Care & Medication Instructions - Prime Skin & Hair Clinic`,
      contentSnippet: `Hello ${appointment.patientName}, this is an automated reminder regarding your appointment with ${appointment.doctorName} for ${appointment.serviceName} on ${appointment.date} during ${appointment.timeSlot}. Clinic address: Mewalal ki Bagiya, Opposite Hotel India, Naini, Prayagraj. Helpline: +91 8960777591.`,
      sentAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: 'Delivered'
    };

    const updatedLogs = [newLog, ...currentLogs];
    storage.saveEmailLogs(updatedLogs);

    // Update appointment reminders list
    const appointments = storage.getAppointments();
    const aptIndex = appointments.findIndex(a => a.id === appointment.id);
    if (aptIndex !== -1) {
      const typeKey = reminderType === 'Booking Confirmation' ? 'confirmation' 
        : reminderType === '24-Hour Reminder' ? '24h_reminder' 
        : reminderType === '2-Hour Reminder' ? '2h_reminder' : 'followup';

      appointments[aptIndex].remindersList.push({
        type: typeKey,
        sentAt: new Date().toISOString(),
        email: appointment.patientEmail
      });
      appointments[aptIndex].reminderSent = true;
      storage.saveAppointments(appointments);
    }

    return newLog;
  }
};
