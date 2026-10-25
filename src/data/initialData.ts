import { Doctor, Service, Appointment, ClinicInfo, DigitalPrescription, EmailReminderLog, Invoice } from '../types/clinic';

export const INITIAL_CLINIC_INFO: ClinicInfo = {
  name: "Prime Skin and Hair Clinic",
  hindiName: "प्राइम स्किन एण्ड हेयर क्लीनिक",
  tagline: "Advanced Clinical Dermatology, Hair Restoration & Aesthetic Excellence",
  hindiTagline: "स्किन (त्वचा/चर्म रोग), कुष्ठ रोग, यौन रोग एवं सौंदर्य समस्याओं के विशेषज्ञ",
  phone: "+91 8960777591",
  emergencyPhone: "+91 8960777591",
  email: "care@primeskinclinic.com",
  addressLine1: "10A/113, Daud Nagar, Mewalal ki Bagiya",
  addressLine2: "Opposite Hotel India, Near Indian Oil Petrol Pump",
  area: "Beside Goodwill Garage, Naini",
  city: "Prayagraj",
  state: "Uttar Pradesh",
  pincode: "211008",
  landmark: "Opposite Hotel India / Beside Goodwill Garage / Near Indian Oil Pump",
  opdTimings: "Mon – Sat: 5:00 PM – 7:00 PM",
  opdDays: "Monday to Saturday (Sunday on prior request)",
  noticeBanner: "✨ Special OPD Evening Clinic: Mon - Sat 5:00 PM to 7:00 PM | Walk-ins & Prior Appointments Welcome!",
  logoUrl: "/assets/aistudio/IMG-20261026-WA0000_2ad54099.jpg",
  bannerPhoto1: "/assets/aistudio/IMG-20261006-WA0006_e87ab6ff.jpg",
  bannerPhoto2: "/assets/aistudio/IMG-20261018-WA0001_23d9bd7d.jpg",
  galleryImages: [
    {
      id: "img-1",
      url: "/assets/aistudio/IMG-20261026-WA0000_2ad54099.jpg",
      title: "Clinic Logo & Emblem",
      description: "Official emblem of Prime Skin and Hair Clinic"
    },
    {
      id: "img-2",
      url: "/assets/aistudio/IMG-20261006-WA0006_e87ab6ff.jpg",
      title: "Clinical Services & Specialty Board",
      description: "Comprehensive treatments for Vitiligo, Hair PRP, Allergies, Psoriasis & Scar therapies"
    },
    {
      id: "img-3",
      url: "/assets/aistudio/IMG-20261018-WA0001_23d9bd7d.jpg",
      title: "Official Prescription & Department Services",
      description: "Official clinical prescription pad with list of certified dermatological specialties"
    }
  ],
  emailRemindersEnabled: true,
  reminderHoursBefore: 24,
  clinicUpiId: "8960777591@upi"
};

export const INITIAL_DOCTORS: Doctor[] = [
  {
    id: "dr-ak-chaurasia",
    name: "Dr. A.K. Chaurasia",
    hindiName: "डॉ. ए. के. चौरसिया",
    title: "Senior Consultant Dermatologist & Dermatosurgeon",
    degrees: "MBBS (KGMU Lucknow), MD (Skin & VD, MLN Medical College Prayagraj)",
    qualifications: [
      "MBBS - King George's Medical University (KGMU), Lucknow",
      "MD (Skin & VD) - Moti Lal Nehru (MLN) Medical College & SRN Hospital, Prayagraj",
      "Former Resident & Physician - Swaroop Rani Nehru (SRN) Hospital, Prayagraj"
    ],
    designation: "Chief Dermatologist & Hair Specialist",
    hospitalExperience: "Former Physician at Swaroop Rani Hospital, Prayagraj with over a decade of clinical care in leading government and private medical institutions.",
    experienceYears: 14,
    bio: "Dr. A.K. Chaurasia is a distinguished Skin, Hair & Nail Specialist in Prayagraj. Having trained at prestigious centers including KGMU Lucknow and MLN Medical College, he brings comprehensive clinical acumen to complex dermatological disorders, vitiligo surgical repigmentation, autologous PRP hair growth treatments, and advanced scar revision.",
    specialities: [
      "Vitiligo (सफेद दाग) Surgery & Phototherapy",
      "PRP & GFC Hair Regrowth Therapy",
      "Psoriasis & Chronic Eczema Management",
      "Acne Scar Resurfacing & Microneedling",
      "Chemical Peeling for Melasma & Pigmentation",
      "Mole, Wart & Skin Tag Radiofrequency Removal",
      "Leprosy & Sexually Transmitted Infections (STD Care)"
    ],
    opdTimings: "Monday – Saturday: 5:00 PM – 7:00 PM",
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    consultationFee: 400,
    followUpFee: 250,
    avatar: "/assets/aistudio/IMG-20261026-WA0000_2ad54099.jpg",
    badge: "Ex-Swaroop Rani Hospital",
    roomNumber: "Chamber 01 (Consultant Suite)",
    contactNumber: "+91 8960777591"
  },
  {
    id: "dr-chandan-lal",
    name: "Dr. Chandan Lal",
    hindiName: "डॉ. चंदन लाल",
    title: "Consultant Dermatologist & Cosmetic Specialist",
    degrees: "MBBS, MD (Dermatology, Venereology & Leprosy)",
    qualifications: [
      "MBBS - Reputed Medical Institute",
      "MD (Dermatology, Venereology & Leprosy)",
      "Fellowship in Aesthetic & Pediatric Dermatology"
    ],
    designation: "Consultant Dermatologist",
    hospitalExperience: "Experienced clinical dermatologist specializing in aesthetic dermatology, anti-aging therapies, pediatric skin care, and laser dermatological interventions.",
    experienceYears: 10,
    bio: "Dr. Chandan Lal is a highly respected consultant dermatologist with dedicated interest in pediatric skin conditions, laser procedures, tattoo removal, and aesthetic medicine. He is committed to personalized skin wellness plans and modern therapeutic interventions for patients of all age groups.",
    specialities: [
      "Pediatric Dermatology (बाल त्वचा रोग)",
      "Laser & Cosmetic Procedures",
      "Anti-Aging & Mesotherapy Rejuvenation",
      "Allergic Contact Dermatitis & Urticaria",
      "Tattoo Removal & Pigment Lightening",
      "Nail Clinic & Fungal Infections",
      "Skin Hydration & Glow Facials"
    ],
    opdTimings: "Monday – Saturday: 5:00 PM – 7:00 PM",
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    consultationFee: 400,
    followUpFee: 250,
    avatar: "/assets/aistudio/IMG-20261026-WA0000_2ad54099.jpg",
    badge: "Aesthetic & Pediatric Specialist",
    roomNumber: "Chamber 02 (Dermatology Suite)",
    contactNumber: "+91 8960777591"
  }
];

export const INITIAL_SERVICES: Service[] = [
  {
    id: "srv-skin-diseases",
    name: "Skin Diseases Care (त्वचा रोग)",
    hindiName: "त्वचा / चर्म रोग परामर्श एवं उपचार",
    category: "Skin Diseases",
    description: "Expert diagnosis and evidence-based clinical treatment for psoriasis, fungal infections (दाद, खुजली), rashes, urticaria, melasma, and autoimmune dermatological conditions.",
    hindiDescription: "सफेद दाग, सोराइसिस, दाद-खाज-खुजली, झाइयां, शरीर में चकत्ते एवं चर्म रोगों का सटीक और स्थायी इलाज।",
    estimatedDuration: "20 - 30 mins",
    priceFrom: 400,
    popular: true,
    commonConditions: ["Psoriasis (सोराइसिस)", "Fungal / Tinea Infection (दाद, खुजली)", "Eczema (एग्जिमा)", "Melasma (झाइयाँ)", "Urticaria (चकत्ते)", "Drug Allergy (दवा से एलर्जी)"],
    proceduresIncluded: ["Dermoscopy Examination", "Wood's Lamp Evaluation", "Targeted Prescription Plan", "Follow-up schedule"],
    iconName: "ShieldAlert"
  },
  {
    id: "srv-hair-loss",
    name: "Hair Loss & Scalp Treatment (बाल झड़ने का उपचार)",
    hindiName: "केश (बाल) रोग एवं रीग्रोथ थेरेपी",
    category: "Hair Care",
    description: "Comprehensive hair thinning, androgenetic alopecia, telogen effluvium, and patchy hair loss (alopecia areata) therapies utilizing medical trichology.",
    hindiDescription: "बालों का झड़ना, गंजापन, बालों का पतला होना, डैंड्रफ और एलोपेसिया का आधुनिक उपचार।",
    estimatedDuration: "30 - 45 mins",
    priceFrom: 400,
    popular: true,
    commonConditions: ["Male & Female Pattern Baldness", "Alopecia Areata", "Severe Dandruff & Scalp Dermatitis", "Post-Illness Hair Shedding"],
    proceduresIncluded: ["Trichoscopy Scalp Analysis", "Dietary & Micronutrient Assessment", "Prescription Topical & Oral Regimen"],
    iconName: "Sparkles"
  },
  {
    id: "srv-prp-gfc",
    name: "PRP / GFC Hair & Face Regrowth (पीआरपी / जीएफसी)",
    hindiName: "PRP/GFC हेयर रीग्रोथ एवं मेसोथेरेपी",
    category: "Hair Care",
    description: "Platelet-Rich Plasma (PRP) and Growth Factor Concentrate (GFC) autologous therapy to regenerate dormant hair follicles, increase hair thickness and restore density.",
    hindiDescription: "रक्त के प्राकृतिक ग्रोथ फैक्टर्स द्वारा बालों की जड़ों को पुनः सक्रिय करने की सुरक्षित और असरदार प्रक्रिया।",
    estimatedDuration: "45 - 60 mins",
    priceFrom: 2500,
    popular: true,
    commonConditions: ["Receding Hairline", "Crown Thinning", "Facial Skin Rejuvenation (Vampire Facial)", "Sluggish Hair Regrowth"],
    proceduresIncluded: ["Centrifuge Plasma Separation", "High-Concentrate Platelet Activation", "Scalp Microneedle Delivery", "Post-Procedure LED Therapy"],
    iconName: "Syringe"
  },
  {
    id: "srv-acne-scar",
    name: "Acne & Scar Treatment (मुहांसे एवं दाग-धब्बों का उपचार)",
    hindiName: "कील-मुंहासे, गड्ढे एवं दाग का इलाज",
    category: "Aesthetic & Lasers",
    description: "Active acne suppression, cystic acne resolution, subcision for pitted acne scars, chemical peels, and microneedling for smooth skin texture.",
    hindiDescription: "चेहरे के मुहांसे, लाल-काले धब्बे और गड्ढों (Acne Scars) को आधुनिक तकनीकों से मिटाने का सफल उपचार।",
    estimatedDuration: "30 - 45 mins",
    priceFrom: 600,
    popular: true,
    commonConditions: ["Grade 1-4 Acne Vulgaris", "Post-Acne Erythema & Hyperpigmentation", "Icepick, Boxcar & Rolling Scars"],
    proceduresIncluded: ["Comedone Extraction", "Targeted Acne Peel", "Subcision & Microneedling (Optional)", "Topical & Systemic Guidance"],
    iconName: "Sparkle"
  },
  {
    id: "srv-vitiligo-surgery",
    name: "Vitiligo Care & Surgery (सफेद दाग का इलाज)",
    hindiName: "सफेद दाग की सर्जरी एवं फोटोथेरेपी",
    category: "Dermatosurgery",
    description: "Specialized vitiligo stability management, phototherapy guidance, miniature punch grafting, suction blister epidermal grafting, and medical repigmentation.",
    hindiDescription: "सफेद दाग का चरणबद्ध उपचार, दवाईयां, फोटोथेरेपी एवं स्थिर दागों के लिए आधुनिक ग्राफ्टिंग सर्जरी।",
    estimatedDuration: "30 - 90 mins",
    priceFrom: 800,
    popular: true,
    commonConditions: ["Stable Vitiligo Patches", "Segmental Vitiligo", "Acrofacial Vitiligo", "Loss of skin pigment"],
    proceduresIncluded: ["Vitiligo Activity Scoring (VIDA)", "Medical Stabilization Therapy", "Surgical Punch/Blister Grafting (Selective)", "Maintenance Phototherapy"],
    iconName: "Activity"
  },
  {
    id: "srv-chemical-peels",
    name: "Chemical Peels (कैमिकल पील द्वारा चेहरे के कालेपन का इलाज)",
    hindiName: "कैमिकल पील ग्लो एवं डि-पिगमेंटेशन",
    category: "Aesthetic & Lasers",
    description: "Glycolic, Salicylic, Mandelic, and TCA dermatological peels to remove dead layers, reduce hyperpigmentation, brighten dull complexion, and unclog pores.",
    hindiDescription: "चेहरे की झाइयों, कालेपन, टैनिंग और असमान रंगत को हटाकर प्राकृतिक चमक लाने वाली प्रक्रिया।",
    estimatedDuration: "30 mins",
    priceFrom: 1200,
    popular: false,
    commonConditions: ["Melasma / Hyperpigmentation", "Sun Tanning & Uneven Skin Tone", "Superficial Scars", "Enlarged Open Pores"],
    proceduresIncluded: ["Skin Pre-cleansing", "Custom Acid Formulation", "Neutralization & Soothing Mask", "Sunscreen Guidance"],
    iconName: "Droplets"
  },
  {
    id: "srv-mole-wart-removal",
    name: "Mole & Wart Removal (तिल / मस्से हटाना)",
    hindiName: "तिल, मस्सा एवं स्किन टैग हटाना",
    category: "Dermatosurgery",
    description: "Quick, painless radiofrequency ablation and electro-cautery for skin tags, seborrheic keratosis, moles, and viral warts with minimal downtime and no scarring.",
    hindiDescription: "बिना किसी दर्द या निशान के रेडियोफ्रीक्वेंसी एवं इलेक्ट्रोकॉक्टरी द्वारा तिल और मस्से हटाने की सुविधा।",
    estimatedDuration: "20 - 30 mins",
    priceFrom: 800,
    popular: true,
    commonConditions: ["Facial & Neck Skin Tags", "Viral Warts (Verrucae)", "Benign Moles", "Seborrheic Keratoses"],
    proceduresIncluded: ["Local Topical Numbing Gel", "Precision RF Ablation", "Antiseptic Dressing", "Healing Balm Prescription"],
    iconName: "Scissors"
  },
  {
    id: "srv-anti-aging",
    name: "Anti-Aging & Aesthetic Rejuvenation (एंटी-एजिंग उपचार)",
    hindiName: "एंटी-एजिंग एवं स्किन टाइटनिंग",
    category: "Aesthetic & Lasers",
    description: "Fine line reduction, crow's feet improvement, skin tightening, collagen induction therapies, and hydration boost treatments for youthful radiance.",
    hindiDescription: "उम्र के साथ त्वचा पर आने वाली झुर्रियों, ढीलेपन और रूखेपन को ठीक कर त्वचा को जवां बनाए रखने के उपचार।",
    estimatedDuration: "45 mins",
    priceFrom: 1500,
    popular: false,
    commonConditions: ["Fine Lines & Wrinkles", "Skin Laxity & Sagging", "Dull, Dehydrated Complexion", "Loss of Facial Elasticity"],
    proceduresIncluded: ["Collagen Induction Consultation", "Microneedling / Mesoserum Infusion", "Hydrating Peel Mask"],
    iconName: "Clock"
  },
  {
    id: "srv-pediatric-derm",
    name: "Pediatric Dermatology (बाल त्वचा रोग)",
    hindiName: "बच्चों के त्वचा एवं बाल रोग",
    category: "Skin Diseases",
    description: "Gentle, compassionate skin care tailored for newborns, infants, and children: atopic dermatitis, cradle cap, diaper rash, molluscum, and childhood eczema.",
    hindiDescription: "नवजात शिशुओं और बच्चों की संवेदनशील त्वचा के लिए सुरक्षित, कोमल और प्रभावी चिकित्सकीय देखभाल।",
    estimatedDuration: "20 mins",
    priceFrom: 400,
    popular: false,
    commonConditions: ["Infantile Atopic Dermatitis", "Diaper Candidiasis", "Cradle Cap (Seborrheic Dermatitis)", "Viral Molluscum & Impetigo"],
    proceduresIncluded: ["Child-Friendly Clinical Checkup", "Non-Irritant Skincare Regimen", "Parental Care Instructions"],
    iconName: "Baby"
  },
  {
    id: "srv-std-leprosy",
    name: "STD & Leprosy Care (यौन रोग एवं कुष्ठ रोग उपचार)",
    hindiName: "यौन रोग एवं कुष्ठ रोग विशेषज्ञ देखभाल",
    category: "Allergies & Infections",
    description: "Strictly confidential, non-judgmental and clinically rigorous diagnosis and therapy for venereal diseases, genital ulcers, HPV, urethritis, and Hansen's disease.",
    hindiDescription: "पूर्ण गोपनीयता के साथ यौन संचारित रोगों, गुप्त रोगों एवं कुष्ठ रोग की विशेष जांच और स्थायी उपचार।",
    estimatedDuration: "25 mins",
    priceFrom: 400,
    popular: false,
    commonConditions: ["Genital Ulcers & Warts", "Urethral Discharge & Itching", "Syphilis & Gonorrhea Screening", "Hansen's Disease (Leprosy) Diagnosis"],
    proceduresIncluded: ["Confidential Private Consultation", "Microbiological Smear Guidance", "Targeted Antibiotic/Antiviral Therapy"],
    iconName: "Lock"
  },
  {
    id: "srv-nail-clinic",
    name: "Nail Clinic (नाखून क्लिनिक)",
    hindiName: "नाखूनों के रोग एवं विकार",
    category: "Skin Diseases",
    description: "Specialized care for fungal nail infections (onychomycosis), ingrown toenails, nail psoriasis, brittle discolored nails, and paronychia.",
    hindiDescription: "नाखूनों का पीला/काला पड़ना, फंगस, नाखून का अंदर धंसना एवं नाखून के सोराइसिस का सफल इलाज।",
    estimatedDuration: "20 mins",
    priceFrom: 400,
    popular: false,
    commonConditions: ["Onychomycosis (Fungal Nails)", "Ingrown Toenail", "Nail Pitting & Psoriasis", "Chronic Paronychia"],
    proceduresIncluded: ["Nail Clipping Examination", "Chemical/Physical Debridement", "Antifungal Lacquer & Therapy"],
    iconName: "Fingerprint"
  },
  {
    id: "srv-laser-cosmetic",
    name: "Laser & Cosmetic Procedures (लेज़र एवं कॉस्मेटिक प्रक्रियाएं)",
    hindiName: "लेज़र एवं कॉस्मेटिक प्रक्रियाएं",
    category: "Aesthetic & Lasers",
    description: "Advanced diode and fractional laser technology for unwanted hair reduction, tattoo removal, surgical scar smoothing, and birthmark lightening.",
    hindiDescription: "आधुनिक लेज़र द्वारा अनचाहे बाल हटाना, टैटू हटाना और गहरे निशानों को हल्का करने की प्रक्रियाएं।",
    estimatedDuration: "30 - 60 mins",
    priceFrom: 1800,
    popular: true,
    commonConditions: ["Unwanted Facial / Body Hair", "Permanent Tattoos", "Hypertrophic Scars & Keloids", "Hyperpigmented Birthmarks"],
    proceduresIncluded: ["Skin Phototype Laser Calibration", "Protective Eyewear & Cooling", "Targeted Laser Pulses", "Post-Laser Soothing Gel"],
    iconName: "Zap"
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: "PS-8492",
    patientName: "Rahul Sharma",
    patientPhone: "9876543210",
    patientEmail: "rahul.sharma@example.com",
    patientAge: 29,
    patientGender: "Male",
    patientAddress: "Civil Lines, Prayagraj",
    doctorId: "dr-ak-chaurasia",
    doctorName: "Dr. A.K. Chaurasia",
    serviceId: "srv-hair-loss",
    serviceName: "Hair Loss & Scalp Treatment",
    date: "2026-10-26",
    timeSlot: "05:20 PM - 05:40 PM",
    notes: "Experiencing rapid hair loss at crown and hairline for past 4 months.",
    status: "confirmed",
    paymentStatus: "paid",
    paymentMethod: "UPI / QR",
    amount: 400,
    reminderSent: true,
    remindersList: [
      {
        type: "confirmation",
        sentAt: "2026-10-25 10:15 AM",
        email: "rahul.sharma@example.com"
      },
      {
        type: "24h_reminder",
        sentAt: "2026-10-25 05:00 PM",
        email: "rahul.sharma@example.com"
      }
    ],
    createdAt: "2026-10-25T10:14:00Z"
  },
  {
    id: "PS-8493",
    patientName: "Pooja Verma",
    patientPhone: "9123456789",
    patientEmail: "pooja.verma@example.com",
    patientAge: 24,
    patientGender: "Female",
    patientAddress: "Naini, Prayagraj",
    doctorId: "dr-chandan-lal",
    doctorName: "Dr. Chandan Lal",
    serviceId: "srv-acne-scar",
    serviceName: "Acne & Scar Treatment",
    date: "2026-10-27",
    timeSlot: "05:40 PM - 06:00 PM",
    notes: "Persistent breakouts on cheeks and forehead.",
    status: "confirmed",
    paymentStatus: "at_clinic",
    paymentMethod: "Cash at Clinic",
    amount: 400,
    reminderSent: true,
    remindersList: [
      {
        type: "confirmation",
        sentAt: "2026-10-25 11:30 AM",
        email: "pooja.verma@example.com"
      }
    ],
    createdAt: "2026-10-25T11:29:00Z"
  },
  {
    id: "PS-8488",
    patientName: "Amit Kumar Patel",
    patientPhone: "9450123456",
    patientEmail: "amit.patel@example.com",
    patientAge: 38,
    patientGender: "Male",
    patientAddress: "Kydganj, Prayagraj",
    doctorId: "dr-ak-chaurasia",
    doctorName: "Dr. A.K. Chaurasia",
    serviceId: "srv-skin-diseases",
    serviceName: "Skin Diseases Care (त्वचा रोग)",
    date: "2026-10-24",
    timeSlot: "06:00 PM - 06:20 PM",
    notes: "Vitiligo patch on left hand - follow up consultation.",
    status: "completed",
    paymentStatus: "paid",
    paymentMethod: "Card",
    amount: 400,
    reminderSent: true,
    remindersList: [
      {
        type: "confirmation",
        sentAt: "2026-10-23 04:00 PM",
        email: "amit.patel@example.com"
      },
      {
        type: "followup",
        sentAt: "2026-10-25 09:00 AM",
        email: "amit.patel@example.com"
      }
    ],
    createdAt: "2026-10-23T15:58:00Z"
  }
];

export const INITIAL_PRESCRIPTIONS: DigitalPrescription[] = [
  {
    id: "RX-2026-109",
    appointmentId: "PS-8488",
    patientName: "Amit Kumar Patel",
    age: 38,
    gender: "Male",
    date: "2026-10-24",
    doctorName: "Dr. A.K. Chaurasia",
    doctorDegrees: "MBBS (KGMU), MD (Skin & VD, MLN Prayagraj)",
    diagnosis: "Localized Vitiligo (Stable), Mild Xerosis",
    symptoms: ["Hypopigmented non-itchy patch on left dorsal hand", "Mild dryness around peripheral margin"],
    medications: [
      {
        name: "Tacrolimus Ointment 0.1% (Tacroz Forte)",
        dosage: "Apply thin layer to white patch",
        timing: "Once daily at night, gentle massage",
        duration: "30 Days"
      },
      {
        name: "Tab. Folvite 5mg (Folic Acid)",
        dosage: "1 Tablet",
        timing: "Once daily in the morning after breakfast",
        duration: "30 Days"
      },
      {
        name: "Sunscreen SPF 50+ Gel (Sunban Soft)",
        dosage: "Generous application",
        timing: "Morning 20 minutes before stepping into sun",
        duration: "Ongoing"
      }
    ],
    generalAdvice: [
      "Expose the treated area to mild morning sunlight (between 8:00 AM - 8:15 AM) for 10 minutes.",
      "Avoid harsh chemical soaps or direct contact with strong industrial detergents.",
      "Include green leafy vegetables, amla, and citrus-balanced fruits in daily diet.",
      "Review at OPD after 4 weeks for evaluation of repigmentation progress."
    ],
    nextVisitDate: "2026-11-21"
  }
];

export const INITIAL_EMAIL_LOGS: EmailReminderLog[] = [
  {
    id: "EM-901",
    appointmentId: "PS-8492",
    recipientEmail: "rahul.sharma@example.com",
    recipientName: "Rahul Sharma",
    doctorName: "Dr. A.K. Chaurasia",
    appointmentDate: "2026-10-26",
    appointmentTime: "05:20 PM - 05:40 PM",
    reminderType: "Booking Confirmation",
    subject: "Appointment Confirmed: Dr. A.K. Chaurasia at Prime Skin & Hair Clinic (Token: PS-8492)",
    contentSnippet: "Dear Rahul Sharma, your appointment with Dr. A.K. Chaurasia has been confirmed for 2026-10-26 at 05:20 PM. Please arrive 10 minutes early at Mewalal ki Bagiya, Naini.",
    sentAt: "2026-10-25 10:15 AM",
    status: "Delivered"
  },
  {
    id: "EM-902",
    appointmentId: "PS-8492",
    recipientEmail: "rahul.sharma@example.com",
    recipientName: "Rahul Sharma",
    doctorName: "Dr. A.K. Chaurasia",
    appointmentDate: "2026-10-26",
    appointmentTime: "05:20 PM - 05:40 PM",
    reminderType: "24-Hour Reminder",
    subject: "Reminder: Tomorrow is your skin & hair consultation at Prime Skin and Hair Clinic",
    contentSnippet: "Friendly reminder that your OPD appointment PS-8492 is scheduled for tomorrow at 05:20 PM. Directions: Opposite Hotel India, Near Indian Oil Pump, Naini.",
    sentAt: "2026-10-25 05:00 PM",
    status: "Delivered"
  },
  {
    id: "EM-903",
    appointmentId: "PS-8493",
    recipientEmail: "pooja.verma@example.com",
    recipientName: "Pooja Verma",
    doctorName: "Dr. Chandan Lal",
    appointmentDate: "2026-10-27",
    appointmentTime: "05:40 PM - 06:00 PM",
    reminderType: "Booking Confirmation",
    subject: "Appointment Confirmed: Dr. Chandan Lal at Prime Skin & Hair Clinic (Token: PS-8493)",
    contentSnippet: "Dear Pooja Verma, your consultation with Dr. Chandan Lal has been reserved for 2026-10-27 at 05:40 PM. Please bring any past prescription records.",
    sentAt: "2026-10-25 11:30 AM",
    status: "Delivered"
  }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: "INV-2026-081",
    invoiceNumber: "PS-INV-081",
    appointmentId: "PS-8492",
    patientName: "Rahul Sharma",
    patientPhone: "9876543210",
    patientEmail: "rahul.sharma@example.com",
    doctorName: "Dr. A.K. Chaurasia",
    serviceName: "Hair Loss & Scalp Treatment",
    date: "2026-10-25",
    items: [
      { description: "Specialist OPD Consultation - Dr. A.K. Chaurasia", amount: 400 },
      { description: "Digital Trichoscopy Scalp Analysis (Complimentary)", amount: 0 }
    ],
    subtotal: 400,
    discount: 0,
    tax: 0,
    total: 400,
    paymentMethod: "UPI / QR (8960777591@upi)",
    paymentStatus: "PAID",
    transactionId: "UPI/261025/948271049"
  },
  {
    id: "INV-2026-082",
    invoiceNumber: "PS-INV-082",
    appointmentId: "PS-8488",
    patientName: "Amit Kumar Patel",
    patientPhone: "9450123456",
    patientEmail: "amit.patel@example.com",
    doctorName: "Dr. A.K. Chaurasia",
    serviceName: "Skin Diseases Care",
    date: "2026-10-24",
    items: [
      { description: "Specialist OPD Consultation", amount: 400 },
      { description: "Wood's Lamp Skin Assessment", amount: 200 }
    ],
    subtotal: 600,
    discount: 100,
    tax: 0,
    total: 500,
    paymentMethod: "Debit Card (POS)",
    paymentStatus: "PAID",
    transactionId: "CARD/261024/774129"
  }
];
