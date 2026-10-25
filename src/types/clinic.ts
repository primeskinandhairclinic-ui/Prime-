export interface Doctor {
  id: string;
  name: string;
  hindiName: string;
  title: string;
  degrees: string;
  qualifications: string[];
  designation: string;
  hospitalExperience: string;
  experienceYears: number;
  bio: string;
  specialities: string[];
  opdTimings: string;
  availableDays: string[];
  consultationFee: number;
  followUpFee: number;
  avatar: string;
  badge?: string;
  roomNumber: string;
  contactNumber: string;
}

export interface Service {
  id: string;
  name: string;
  hindiName: string;
  category: 'Skin Diseases' | 'Hair Care' | 'Aesthetic & Lasers' | 'Dermatosurgery' | 'Allergies & Infections';
  description: string;
  hindiDescription: string;
  estimatedDuration: string;
  priceFrom: number;
  popular?: boolean;
  commonConditions: string[];
  proceduresIncluded: string[];
  iconName: string;
}

export interface Appointment {
  id: string; // e.g. PS-8492
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  patientAge: number;
  patientGender: 'Male' | 'Female' | 'Other';
  patientAddress?: string;
  doctorId: string;
  doctorName: string;
  serviceId: string;
  serviceName: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "05:20 PM - 05:40 PM"
  notes?: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  paymentStatus: 'paid' | 'pending' | 'at_clinic';
  paymentMethod?: 'UPI / QR' | 'Card' | 'Cash at Clinic' | 'Net Banking';
  amount: number;
  reminderSent: boolean;
  remindersList: {
    type: 'confirmation' | '24h_reminder' | '2h_reminder' | 'followup';
    sentAt: string;
    email: string;
  }[];
  createdAt: string;
}

export interface DigitalPrescription {
  id: string;
  appointmentId: string;
  patientName: string;
  age: number;
  gender: string;
  date: string;
  doctorName: string;
  doctorDegrees: string;
  diagnosis: string;
  symptoms: string[];
  medications: {
    name: string;
    dosage: string;
    timing: string; // e.g. "Morning & Night after meals"
    duration: string; // e.g. "14 Days"
  }[];
  generalAdvice: string[];
  nextVisitDate?: string;
}

export interface ClinicInfo {
  name: string;
  hindiName: string;
  tagline: string;
  hindiTagline: string;
  phone: string;
  emergencyPhone: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  landmark: string;
  opdTimings: string;
  opdDays: string;
  noticeBanner: string;
  logoUrl: string;
  bannerPhoto1: string; // IMG-20261006-WA0006_e87ab6ff.jpg
  bannerPhoto2: string; // IMG-20261018-WA0001_23d9bd7d.jpg
  galleryImages: {
    id: string;
    url: string;
    title: string;
    description: string;
  }[];
  emailRemindersEnabled: boolean;
  reminderHoursBefore: number;
  clinicUpiId: string;
}

export interface EmailReminderLog {
  id: string;
  appointmentId: string;
  recipientEmail: string;
  recipientName: string;
  doctorName: string;
  appointmentDate: string;
  appointmentTime: string;
  reminderType: 'Booking Confirmation' | '24-Hour Reminder' | '2-Hour Reminder' | 'Post-Consult Followup';
  subject: string;
  contentSnippet: string;
  sentAt: string;
  status: 'Delivered' | 'Pending';
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  appointmentId: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  doctorName: string;
  serviceName: string;
  date: string;
  items: {
    description: string;
    amount: number;
  }[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  paymentMethod: string;
  paymentStatus: 'PAID' | 'PENDING';
  transactionId?: string;
}
