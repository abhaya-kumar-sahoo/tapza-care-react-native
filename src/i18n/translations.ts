import { SupportedLanguage } from '../types';

export interface Translations {
  appName: string;
  locationDefault: string;
  greetingMorning: string;
  greetingAfternoon: string;
  greetingEvening: string;
  greetingDiwali: string;
  greetingDiwaliSub: string;
  healthOurCare: string;
  searchPlaceholder: string;
  bookADoctor: string;
  bookDoctorSubtitle: string;
  exploreByCategory: string;
  viewAll: string;
  quickActions: string;
  popularServices: string;
  topDoctorsNearYou: string;
  consultationFee: string;
  nextSlot: string;
  speaks: string;
  tabHome: string;
  tabBookings: string;
  tabPrescriptions: string;
  tabProfile: string;
  quickBook: string;
  quickPrescriptions: string;
  quickReminders: string;
  quickFamily: string;
  bookAppointment: string;
  confirmBooking: string;
  selectDate: string;
  selectTimeSlot: string;
  morning: string;
  afternoon: string;
  evening: string;
  consultFeeLabel: string;
  confirmAppointmentCTA: string;
  appointmentBooked: string;
  appointmentConfirmedWith: string;
  addToCalendar: string;
  done: string;
  filterAll: string;
  filterActive: string;
  filterPast: string;
  medicinesCount: (count: number) => string;
  prescriptionDetails: string;
  medicineReminders: string;
  today: string;
  allMedicines: string;
  taken: string;
  markAsTaken: string;
  aboutDoctor: string;
  clinicLocation: string;
  getDirections: string;
  chat: string;
  retry: string;
  loading: string;
  emptyDoctors: string;
  emptySlots: string;
  emptyPrescriptions: string;
  slotTakenError: string;
  offlineTitle: string;
  offlineSubtitle: string;
  configLoadError: string;
  usingCachedConfig: string;
  diwaliSpecial: string;
  diwaliOfferHeadline: string;
  bookNow: string;
  care247: string;
  consultDoctorOnline: string;
  consultDoctorSubtext: string;
  // Profile Screen & Settings
  profileTitle: string;
  profileSubtitle: string;
  yearsAge: (years: number) => string;
  ageLabel: string;
  genderMale: string;
  genderLabel: string;
  healthIdLabel: string;
  languageCardTitle: string;
  chooseLanguageSubtitle: string;
  healthAppSettings: string;
  remindersScheduleTitle: string;
  remindersScheduleSub: string;
  myAppointmentsTitle: string;
  myAppointmentsSub: string;
  prescriptionsTitle: string;
  prescriptionsSub: string;
  healthRecordsTitle: string;
  healthRecordsSub: string;
  familyMembersTitle: string;
  familyMembersSub: string;
  otherSectionTitle: string;
  adminControlsTitle: string;
  adminControlsSub: string;
  privacySecurityTitle: string;
  privacySecuritySub: string;
  helpSupportTitle: string;
  helpSupportSub: string;
  aboutTapzaTitle: string;
  aboutTapzaSub: string;
  closeBtn: string;
  // Profile Modals
  healthRecordsModalDesc: string;
  healthRecordsModalPoint1: string;
  healthRecordsModalPoint2: string;
  familyProfilesModalTitle: string;
  familyProfilesModalDesc: string;
  familyProfile1: string;
  familyProfile2: string;
  familyProfile3: string;
  privacyModalDesc: string;
  privacyModalPoint1: string;
  privacyModalPoint2: string;
  helpModalTitle: string;
  helpModalDesc: string;
  helpModalReception: string;
  helpModalClinic: string;
  helpModalEmail: string;
  aboutModalTitle: string;
  aboutModalDesc: string;
  aboutModalClinic: string;
  aboutModalCopyright: string;
  patientProfileModalTitle: string;
  patientProfileModalDesc: string;
  patientProfileName: string;
  patientProfilePhone: string;
  patientProfileLocation: string;
}

export const translations: Record<SupportedLanguage, Translations> = {
  en: {
    appName: 'Tapza Care',
    locationDefault: 'Hyderabad',
    greetingMorning: 'Good morning',
    greetingAfternoon: 'Good afternoon',
    greetingEvening: 'Good evening',
    greetingDiwali: 'Happy Diwali!',
    greetingDiwaliSub: "Here's to brighter health and happier days",
    healthOurCare: 'Your health, our care',
    searchPlaceholder: 'Search doctors, services, lab tests...',
    bookADoctor: 'Book a doctor',
    bookDoctorSubtitle: 'Consult from top specialists near you',
    exploreByCategory: 'Explore by category',
    viewAll: 'View all',
    quickActions: 'Quick actions',
    popularServices: 'Popular services',
    topDoctorsNearYou: 'Top doctors near you',
    consultationFee: 'Consultation fee',
    nextSlot: 'Next slot',
    speaks: 'Speaks',
    tabHome: 'Home',
    tabBookings: 'Bookings',
    tabPrescriptions: 'Prescriptions',
    tabProfile: 'Profile',
    quickBook: 'Book',
    quickPrescriptions: 'Prescriptions',
    quickReminders: 'Reminders',
    quickFamily: 'Family',
    bookAppointment: 'Book Appointment',
    confirmBooking: 'Confirm Booking',
    selectDate: 'Select a date',
    selectTimeSlot: 'Select a time slot',
    morning: 'Morning',
    afternoon: 'Afternoon',
    evening: 'Evening',
    consultFeeLabel: 'Consultation Fee',
    confirmAppointmentCTA: 'Confirm Appointment',
    appointmentBooked: 'Appointment Booked!',
    appointmentConfirmedWith: 'Your appointment is confirmed.',
    addToCalendar: 'Add to Calendar',
    done: 'Done',
    filterAll: 'All',
    filterActive: 'Active',
    filterPast: 'Past',
    medicinesCount: (count: number) => `${count} medicines`,
    prescriptionDetails: 'Prescription Details',
    medicineReminders: 'Medicine Reminder',
    today: 'Today',
    allMedicines: 'All Medicines',
    taken: 'Taken',
    markAsTaken: 'Mark as taken',
    aboutDoctor: 'About',
    clinicLocation: 'Clinic location',
    getDirections: 'Get directions',
    chat: 'Chat',
    retry: 'Retry',
    loading: 'Loading...',
    emptyDoctors: 'No doctors available right now',
    emptySlots: 'No slots available for this date',
    emptyPrescriptions: 'No prescriptions found',
    slotTakenError: 'This slot was just taken by another patient. Please pick another slot.',
    offlineTitle: "You're browsing offline",
    offlineSubtitle: 'Showing saved clinic details & services. Reconnect for real-time doctor availability.',
    configLoadError: 'Showing saved clinic details & services. Reconnect for real-time doctor availability.',
    usingCachedConfig: 'Using saved layout offline.',
    diwaliSpecial: 'Diwali Special',
    diwaliOfferHeadline: 'Flat 20% off on selected lab tests',
    bookNow: 'Book Now',
    care247: '24/7 Care',
    consultDoctorOnline: 'Consult a Doctor\nOnline',
    consultDoctorSubtext: 'Get expert medical advice from the comfort of home.',
    // Profile Screen & Settings
    profileTitle: 'Profile',
    profileSubtitle: 'Manage your account and preferences',
    yearsAge: (years: number) => `${years} years`,
    ageLabel: 'Age',
    genderMale: 'Male',
    genderLabel: 'Gender',
    healthIdLabel: 'Health ID',
    languageCardTitle: 'Language / भाषा / భాష',
    chooseLanguageSubtitle: 'Choose your preferred language',
    healthAppSettings: 'Health & App Settings',
    remindersScheduleTitle: 'Medicine Reminders Schedule',
    remindersScheduleSub: 'Manage your medicine reminders',
    myAppointmentsTitle: 'My Appointments',
    myAppointmentsSub: 'View and manage your bookings',
    prescriptionsTitle: 'Prescriptions',
    prescriptionsSub: 'View your prescriptions and reports',
    healthRecordsTitle: 'Health Records',
    healthRecordsSub: 'Manage your health information',
    familyMembersTitle: 'Family Members',
    familyMembersSub: 'Manage your family profiles',
    otherSectionTitle: 'Other',
    adminControlsTitle: 'Admin & Chaos Testing Controls',
    adminControlsSub: 'App testing and development tools',
    privacySecurityTitle: 'Privacy & Security',
    privacySecuritySub: 'Manage your data and privacy',
    helpSupportTitle: 'Help & Support',
    helpSupportSub: 'FAQs, contact support',
    aboutTapzaTitle: 'About Tapza Care',
    aboutTapzaSub: 'Version 1.0.0 • Built for Tapza Clinic, Banjara Hills, Hyderabad',
    closeBtn: 'Close',
    // Modals
    healthRecordsModalDesc: "Your laboratory reports, blood investigations, and clinic diagnostic notes are safely synced with Tapza Clinic's EMR.",
    healthRecordsModalPoint1: '• 2 Lab Reports (Complete Blood Count, Lipid Profile)',
    healthRecordsModalPoint2: '• 1 Vitals Assessment from Dr. Rajesh Varma',
    familyProfilesModalTitle: 'Family Profiles',
    familyProfilesModalDesc: 'Profiles linked to +91 98765 43210:',
    familyProfile1: '1. Abhaya (Self) • 27 Y • Male • UHID: TC-849201',
    familyProfile2: '2. Ramesh Sahoo (Father) • 64 Y • Male',
    familyProfile3: '3. Sunita Sahoo (Mother) • 58 Y • Female',
    privacyModalDesc: 'Your health information is encrypted end-to-end and compliant with the Ayushman Bharat Digital Mission (ABDM) guidelines.',
    privacyModalPoint1: '• 256-bit AES Medical Record Encryption',
    privacyModalPoint2: '• WhatsApp Prescription Delivery via Official Meta API',
    helpModalTitle: 'Tapza Clinic Help & Support',
    helpModalDesc: 'Need assistance with your booking or prescription?',
    helpModalReception: '📞 Reception: 040-2345-6789',
    helpModalClinic: '🏥 Banjara Hills Clinic: Open 8:00 AM - 9:30 PM',
    helpModalEmail: '✉️ care@tapzaclinic.com',
    aboutModalTitle: 'Tapza Care',
    aboutModalDesc: 'Version 1.0.0 (Build 48)',
    aboutModalClinic: 'Built for Tapza Clinic, Banjara Hills, Hyderabad.',
    aboutModalCopyright: '© 2026 Tapza Technologies Inc.',
    patientProfileModalTitle: 'Patient Profile',
    patientProfileModalDesc: 'Patient UHID: TC-849201 • Ayushman Bharat Health Account (ABHA) linked.',
    patientProfileName: 'Name: Abhaya',
    patientProfilePhone: 'Phone: +91 98765 43210',
    patientProfileLocation: 'Location: Banjara Hills, Hyderabad',
  },
  hi: {
    appName: 'ताप्ज़ा केयर',
    locationDefault: 'हैदराबाद',
    greetingMorning: 'शुभ प्रभात',
    greetingAfternoon: 'शुभ दोपहर',
    greetingEvening: 'शुभ संध्या',
    greetingDiwali: 'दीपावली की शुभकामनाएं!',
    greetingDiwaliSub: 'स्वस्थ और उज्ज्वल जीवन की मंगलकामनाएं',
    healthOurCare: 'आपका स्वास्थ्य, हमारा संकल्प',
    searchPlaceholder: 'डॉक्टर, सेवाएँ, लैब टेस्ट खोजें...',
    bookADoctor: 'डॉक्टर बुक करें',
    bookDoctorSubtitle: 'अपने नज़दीकी शीर्ष विशेषज्ञों से परामर्श लें',
    exploreByCategory: 'श्रेणी के अनुसार देखें',
    viewAll: 'सभी देखें',
    quickActions: 'त्वरित सेवाएं',
    popularServices: 'लोकप्रिय सेवाएं',
    topDoctorsNearYou: 'आपके नज़दीक शीर्ष डॉक्टर',
    consultationFee: 'परामर्श शुल्क',
    nextSlot: 'अगला समय',
    speaks: 'भाषा',
    tabHome: 'होम',
    tabBookings: 'अपॉइंटमेंट',
    tabPrescriptions: 'पर्चे',
    tabProfile: 'प्रोफ़ाइल',
    quickBook: 'बुक करें',
    quickPrescriptions: 'पर्चे',
    quickReminders: 'रिमाइंडर',
    quickFamily: 'परिवार',
    bookAppointment: 'अपॉइंटमेंट बुक करें',
    confirmBooking: 'बुकिंग की पुष्टि करें',
    selectDate: 'तारीख चुनें',
    selectTimeSlot: 'समय चुनें',
    morning: 'सुबह',
    afternoon: 'दोपहर',
    evening: 'शाम',
    consultFeeLabel: 'परामर्श शुल्क',
    confirmAppointmentCTA: 'अपॉइंटमेंट पक्की करें',
    appointmentBooked: 'अपॉइंटमेंट बुक हो गई!',
    appointmentConfirmedWith: 'आपकी अपॉइंटमेंट की पुष्टि हो गई है।',
    addToCalendar: 'कैलेंडर में जोड़ें',
    done: 'हो गया',
    filterAll: 'सभी',
    filterActive: 'सक्रिय',
    filterPast: 'पुराने',
    medicinesCount: (count: number) => `${count} दवाइयाँ`,
    prescriptionDetails: 'पर्चे का विवरण',
    medicineReminders: 'दवा रिमाइंडर',
    today: 'आज',
    allMedicines: 'सभी दवाइयाँ',
    taken: 'ले ली',
    markAsTaken: 'दवा ले ली',
    aboutDoctor: 'डॉक्टर के बारे में',
    clinicLocation: 'क्लिनिक का पता',
    getDirections: 'दिशा-निर्देश प्राप्त करें',
    chat: 'चैट',
    retry: 'पुनः प्रयास करें',
    loading: 'लोड हो रहा है...',
    emptyDoctors: 'फ़िलहाल कोई डॉक्टर उपलब्ध नहीं हैं',
    emptySlots: 'इस तिथि के लिए कोई समय स्लॉट उपलब्ध नहीं है',
    emptyPrescriptions: 'कोई पर्चा नहीं मिला',
    slotTakenError: 'यह स्लॉट किसी अन्य मरीज़ द्वारा ले लिया गया है। कृपया दूसरा स्लॉट चुनें।',
    offlineTitle: 'आप ऑफ़लाइन हैं',
    offlineSubtitle: 'सहेजे गए क्लिनिक और सेवाएं दिखाई जा रही हैं। लाइव उपलब्धता के लिए पुनः प्रयास करें।',
    configLoadError: 'सहेजे गए क्लिनिक और सेवाएं दिखाई जा रही हैं। लाइव उपलब्धता के लिए पुनः प्रयास करें।',
    usingCachedConfig: 'सहेजा हुआ लेआउट दिखाया जा रहा है।',
    diwaliSpecial: 'दीपावली स्पेशल',
    diwaliOfferHeadline: 'चुनिंदा लैब टेस्ट पर 20% की छूट',
    bookNow: 'अभी बुक करें',
    care247: '24/7 सेवा',
    consultDoctorOnline: 'डॉक्टर से ऑनलाइन\nपरामर्श लें',
    consultDoctorSubtext: 'घर बैठे विशेषज्ञ डॉक्टरों से चिकित्सीय सलाह प्राप्त करें।',
    // Profile Screen & Settings
    profileTitle: 'प्रोफ़ाइल',
    profileSubtitle: 'अपना खाता और प्राथमिकताएं प्रबंधित करें',
    yearsAge: (years: number) => `${years} वर्ष`,
    ageLabel: 'उम्र',
    genderMale: 'पुरुष',
    genderLabel: 'लिंग',
    healthIdLabel: 'हेल्थ आईडी',
    languageCardTitle: 'Language / भाषा / భాష',
    chooseLanguageSubtitle: 'अपनी पसंदीदा भाषा चुनें',
    healthAppSettings: 'स्वास्थ्य एवं ऐप सेटिंग्स',
    remindersScheduleTitle: 'दवा रिमाइंडर शेड्यूल',
    remindersScheduleSub: 'अपने दवा रिमाइंडर्स प्रबंधित करें',
    myAppointmentsTitle: 'मेरी अपॉइंटमेंट्स',
    myAppointmentsSub: 'अपनी बुकिंग देखें और प्रबंधित करें',
    prescriptionsTitle: 'पर्चे एवं रिपोर्ट्स',
    prescriptionsSub: 'अपने पर्चे और रिपोर्ट्स देखें',
    healthRecordsTitle: 'स्वास्थ्य रिकॉर्ड',
    healthRecordsSub: 'अपनी स्वास्थ्य जानकारी प्रबंधित करें',
    familyMembersTitle: 'परिवार के सदस्य',
    familyMembersSub: 'अपने पारिवारिक प्रोफ़ाइल प्रबंधित करें',
    otherSectionTitle: 'अन्य',
    adminControlsTitle: 'व्यवस्थापक एवं कैओस टेस्टिंग',
    adminControlsSub: 'ऐप टेस्टिंग और विकास टूल्स',
    privacySecurityTitle: 'गोपनीयता एवं सुरक्षा',
    privacySecuritySub: 'अपना डेटा और गोपनीयता प्रबंधित करें',
    helpSupportTitle: 'सहायता एवं संपर्क',
    helpSupportSub: 'अक्सर पूछे जाने वाले प्रश्न, सहायता',
    aboutTapzaTitle: 'ताप्ज़ा केयर के बारे में',
    aboutTapzaSub: 'संस्करण 1.0.0 • ताप्ज़ा क्लिनिक, बंजारा हिल्स, हैदराबाद',
    closeBtn: 'बंद करें',
    // Modals
    healthRecordsModalDesc: 'आपकी प्रयोगशाला रिपोर्ट, रक्त जांच और क्लिनिक डायग्नोस्टिक नोट्स ताप्ज़ा क्लिनिक EMR के साथ सुरक्षित रूप से सिंक हैं।',
    healthRecordsModalPoint1: '• 2 लैब रिपोर्ट्स (सीबीसी, लिपिड प्रोफाइल)',
    healthRecordsModalPoint2: '• 1 स्वास्थ्य परीक्षण डॉ. राजेश वर्मा द्वारा',
    familyProfilesModalTitle: 'पारिवारिक प्रोफ़ाइल',
    familyProfilesModalDesc: '+91 98765 43210 से जुड़े प्रोफ़ाइल:',
    familyProfile1: '1. अभय (स्वयं) • 27 वर्ष • पुरुष • UHID: TC-849201',
    familyProfile2: '2. रमेश साहू (पिता) • 64 वर्ष • पुरुष',
    familyProfile3: '3. सुनीता साहू (माता) • 58 वर्ष • महिला',
    privacyModalDesc: 'आपकी स्वास्थ्य जानकारी एंड-टू-एंड एन्क्रिप्टेड है और आयुष्मान भारत डिजिटल मिशन (ABDM) दिशानिर्देशों के अनुरूप है।',
    privacyModalPoint1: '• 256-बिट एईएस मेडिकल रिकॉर्ड एन्क्रिप्शन',
    privacyModalPoint2: '• आधिकारिक मेटा एपीआई द्वारा व्हाट्सएप पर्चा डिलीवरी',
    helpModalTitle: 'ताप्ज़ा क्लिनिक सहायता एवं संपर्क',
    helpModalDesc: 'क्या आपको अपनी बुकिंग या पर्चे के संबंध में सहायता चाहिए?',
    helpModalReception: '📞 स्वागत कक्ष: 040-2345-6789',
    helpModalClinic: '🏥 बंजारा हिल्स क्लिनिक: खुला 8:00 AM - 9:30 PM',
    helpModalEmail: '✉️ care@tapzaclinic.com',
    aboutModalTitle: 'ताप्ज़ा केयर',
    aboutModalDesc: 'संस्करण 1.0.0 (बिल्ड 48)',
    aboutModalClinic: 'ताप्ज़ा क्लिनिक, बंजारा हिल्स, हैदराबाद के लिए निर्मित।',
    aboutModalCopyright: '© 2026 ताप्ज़ा टेक्नोलॉजीज इंक.',
    patientProfileModalTitle: 'मरीज़ प्रोफ़ाइल',
    patientProfileModalDesc: 'मरीज़ UHID: TC-849201 • आयुष्मान भारत डिजिटल हेल्थ अकाउंट (ABHA) लिंक्ड।',
    patientProfileName: 'नाम: अभय',
    patientProfilePhone: 'फ़ोन: +91 98765 43210',
    patientProfileLocation: 'स्थान: बंजारा हिल्स, हैदराबाद',
  },
  te: {
    appName: 'తాప్జా కేర్',
    locationDefault: 'హైదరాబాద్',
    greetingMorning: 'శుభోదయం',
    greetingAfternoon: 'శుభ మధ్యాహ్నం',
    greetingEvening: 'శుభ సాయంత్రం',
    greetingDiwali: 'దీపావళి శుభాకాంక్షలు!',
    greetingDiwaliSub: 'మీ ఆయురారోగ్యాల కొరకు మా నిరంతర సంరక్షణ',
    healthOurCare: 'మీ ఆరోగ్యం, మా బాధ్యత',
    searchPlaceholder: 'డాక్టర్లు, సేవలు, ల్యాబ్ టెస్టులు శోధించండి...',
    bookADoctor: 'డాక్టర్ అపాయింట్‌మెంట్',
    bookDoctorSubtitle: 'మీ సమీపంలో ఉన్న నిపుణులతో సంప్రదించండి',
    exploreByCategory: 'విభాగాల వారిగా',
    viewAll: 'అన్నీ చూడండి',
    quickActions: 'త్వరిత సేవలు',
    popularServices: 'ప్రజాదరణ పొందిన సేవలు',
    topDoctorsNearYou: 'మీ సమీపంలోని ప్రముఖ డాక్టర్లు',
    consultationFee: 'కన్సల్టేషన్ ఫీజు',
    nextSlot: 'తదుపరి స్లాట్',
    speaks: 'భాషలు',
    tabHome: 'హోమ్',
    tabBookings: 'బుకింగ్స్',
    tabPrescriptions: 'ప్రిస్క్రిప్షన్లు',
    tabProfile: 'ప్రొఫైల్',
    quickBook: 'బుక్',
    quickPrescriptions: 'ప్రిస్క్రిప్షన్లు',
    quickReminders: 'రిమైండర్లు',
    quickFamily: 'కుటుంబం',
    bookAppointment: 'అపాయింట్‌మెంట్ బుక్ చేయండి',
    confirmBooking: 'బుకింగ్ నిర్ధారించండి',
    selectDate: 'తేదీని ఎంచుకోండి',
    selectTimeSlot: 'సమయాన్ని ఎంచుకోండి',
    morning: 'ఉదయం',
    afternoon: 'మధ్యాహ్నం',
    evening: 'సాయంత్రం',
    consultFeeLabel: 'కన్సల్టేషన్ ఫీజు',
    confirmAppointmentCTA: 'అపాయింట్‌మెంట్ ఖరారు చేయండి',
    appointmentBooked: 'అపాయింట్‌మెంట్ ఖరారైంది!',
    appointmentConfirmedWith: 'మీ అపాయింట్‌మెంట్ విజయవంతంగా బుక్ చేయబడింది.',
    addToCalendar: 'క్యాలెండర్‌కు జోడించండి',
    done: 'పూర్తయింది',
    filterAll: 'అన్నీ',
    filterActive: 'ప్రస్తుతం',
    filterPast: 'గతంలో',
    medicinesCount: (count: number) => `${count} మందులు`,
    prescriptionDetails: 'ప్రిస్క్రిప్షన్ వివరాలు',
    medicineReminders: 'మందుల రిమైండర్',
    today: 'ఈ రోజు',
    allMedicines: 'అన్ని మందులు',
    taken: 'వేసుకున్నారు',
    markAsTaken: 'మందు వేసుకున్నాను',
    aboutDoctor: 'డాక్టర్ గురించి',
    clinicLocation: 'క్లినిక్ చిరునామా',
    getDirections: 'దారి తెలుసుకోండి',
    chat: 'చాట్',
    retry: 'మళ్ళీ ప్రయత్నించండి',
    loading: 'లోడ్ అవుతోంది...',
    emptyDoctors: 'ప్రస్తుతం డాక్టర్లు అందుబాటులో లేరు',
    emptySlots: 'ఈ తేదీకి స్లాట్లు అందుబాటులో లేవు',
    emptyPrescriptions: 'ప్రిస్క్రిప్షన్లు లేవు',
    slotTakenError: 'ఈ సమయ స్లాట్ మరొకరు బుక్ చేసుకున్నారు. దయచేసి వేరొక సమయాన్ని ఎంచుకోండి.',
    offlineTitle: 'మీరు ఆఫ్‌లైన్‌లో ఉన్నారు',
    offlineSubtitle: 'సేవ్ చేసిన క్లినిక్ వివరాలు & సేవలు చూపుతున్నాము. లైవ్ స్లాట్‌ల కోసం రీకనెక్ట్ చేయండి.',
    configLoadError: 'సేవ్ చేసిన క్లినిక్ వివరాలు & సేవలు చూపుతున్నాము. లైవ్ స్లాట్‌ల కోసం రీకనెక్ట్ చేయండి.',
    usingCachedConfig: 'సేవ్ చేయబడిన లేఅవుట్ చూపుతున్నాము.',
    diwaliSpecial: 'దీపావళి స్పెషల్',
    diwaliOfferHeadline: 'ఎంపిక చేసిన ల్యాబ్ పరీక్షలపై 20% రాయితీ',
    bookNow: 'ఇప్పుడే బుక్ చేయండి',
    care247: '24/7 సంరక్షణ',
    consultDoctorOnline: 'డాక్టర్‌తో ఆన్‌లైన్\nసంప్రదింపులు',
    consultDoctorSubtext: 'మీ ఇంటి వద్ద నుంచే నిపుణులైన వైద్యుల సలహాలు పొందండి.',
    // Profile Screen & Settings
    profileTitle: 'ప్రొఫైల్',
    profileSubtitle: 'మీ ఖాతా మరియు ప్రాధాన్యతలను నిర్వహించండి',
    yearsAge: (years: number) => `${years} సంవత్సరాలు`,
    ageLabel: 'వయస్సు',
    genderMale: 'పురుషుడు',
    genderLabel: 'లింగం',
    healthIdLabel: 'హెల్త్ ఐడీ',
    languageCardTitle: 'Language / भाषा / భాష',
    chooseLanguageSubtitle: 'మీకు నచ్చిన భాషను ఎంచుకోండి',
    healthAppSettings: 'ఆరోగ్యం & యాప్ సెట్టింగ్స్',
    remindersScheduleTitle: 'మందుల రిమైండర్ల షెడ్యూల్',
    remindersScheduleSub: 'మీ మందుల రిమైండర్లను నిర్వహించండి',
    myAppointmentsTitle: 'నా అపాయింట్‌మెంట్లు',
    myAppointmentsSub: 'మీ బుకింగ్లను చూడండి మరియు నిర్వహించండి',
    prescriptionsTitle: 'ప్రిస్క్రిప్షన్లు & రిపోర్టులు',
    prescriptionsSub: 'మీ ప్రిస్క్రిప్షన్లు మరియు రిపోర్టులు చూడండి',
    healthRecordsTitle: 'ఆరోగ్య రికార్డులు',
    healthRecordsSub: 'మీ ఆరోగ్య సమాచారాన్ని నిర్వహించండి',
    familyMembersTitle: 'కుటుంబ సభ్యులు',
    familyMembersSub: 'మీ కుటుంబ ప్రొఫైల్లను నిర్వహించండి',
    otherSectionTitle: 'ఇతర వివరాలు',
    adminControlsTitle: 'అడ్మిన్ & టెస్టింగ్ కంట్రోల్స్',
    adminControlsSub: 'యాప్ టెస్టింగ్ మరియు డెవలప్‌మెంట్ టూల్స్',
    privacySecurityTitle: 'గోప్యత & భద్రత',
    privacySecuritySub: 'మీ డేటా మరియు గోప్యతను నిర్వహించండి',
    helpSupportTitle: 'సహాయం & మద్దతు',
    helpSupportSub: 'తరచుగా అడిగే ప్రశ్నలు, మద్దతు',
    aboutTapzaTitle: 'తాప్జా కేర్ గురించి',
    aboutTapzaSub: 'వెర్షన్ 1.0.0 • తాప్జా క్లినిక్, బంజారా హిల్స్, హైదరాబాద్',
    closeBtn: 'మూసివేయి',
    // Modals
    healthRecordsModalDesc: 'మీ లేబొరేటరీ నివేదికలు, రక్త పరీక్షలు మరియు క్లినిక్ డైగ్నోస్టిక్ నోట్స్ తాప్జా క్లినిక్ EMRతో సురక్షితంగా సింక్ చేయబడ్డాయి.',
    healthRecordsModalPoint1: '• 2 ల్యాబ్ రిపోర్టులు (సిబిసి, లిపిడ్ ప్రొఫైల్)',
    healthRecordsModalPoint2: '• డాక్టర్ రాజేష్ వర్మ గారిచే 1 ఆరోగ్య నిర్ధారణ',
    familyProfilesModalTitle: 'కుటుంబ ప్రొఫైల్స్',
    familyProfilesModalDesc: '+91 98765 43210 కు లింక్ చేయబడిన ప్రొఫైల్స్:',
    familyProfile1: '1. అభయ (స్వయంగా) • 27 సం. • పురుషుడు • UHID: TC-849201',
    familyProfile2: '2. రమేష్ సాహూ (తండ్రి) • 64 సం. • పురుషుడు',
    familyProfile3: '3. సునీత సాహూ (తల్లి) • 58 సం. • స్త్రీ',
    privacyModalDesc: 'మీ ఆరోగ్య సమాచారం ఎండ్-టు-ఎండ్ ఎన్క్రిప్ట్ చేయబడింది మరియు ఆయుష్మాన్ భారత్ డిజిటల్ మిషన్ (ABDM) మార్గదర్శకాలకు అనుగుణంగా ఉంది.',
    privacyModalPoint1: '• 256-బిట్ AES మెడికల్ రికార్డ్ ఎన్క్రిప్షన్',
    privacyModalPoint2: '• అధికారిక మెటా API ద్వారా వాట్సాప్ ప్రిస్క్రిప్షన్ డెలివరీ',
    helpModalTitle: 'తాప్జా క్లినిక్ సహాయం & మద్దతు',
    helpModalDesc: 'మీ బుకింగ్ లేదా ప్రిస్క్రిప్షన్ కోసం సహాయం కావాలా?',
    helpModalReception: '📞 రిసెప్షన్: 040-2345-6789',
    helpModalClinic: '🏥 బంజారా హిల్స్ క్లినిక్: తెరిచి ఉంటుంది 8:00 AM - 9:30 PM',
    helpModalEmail: '✉️ care@tapzaclinic.com',
    aboutModalTitle: 'తాప్జా కేర్',
    aboutModalDesc: 'వెర్షన్ 1.0.0 (బిల్డ్ 48)',
    aboutModalClinic: 'తాప్జా క్లినిక్, బంజారా హిల్స్, హైదరాబాద్ కోసం తయారు చేయబడింది.',
    aboutModalCopyright: '© 2026 తాప్జా టెక్నాలజీస్ ఇంక్.',
    patientProfileModalTitle: 'రోగి ప్రొఫైల్',
    patientProfileModalDesc: 'రోగి UHID: TC-849201 • ఆయుష్మాన్ భారత్ హెల్త్ అకౌంట్ (ABHA) లింక్ చేయబడింది.',
    patientProfileName: 'పేరు: అభయ',
    patientProfilePhone: 'ఫోన్: +91 98765 43210',
    patientProfileLocation: 'చిరునామా: బంజారా హిల్స్, హైదరాబాద్',
  },
};
