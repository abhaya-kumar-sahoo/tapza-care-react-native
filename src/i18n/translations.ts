import { SupportedLanguage } from '../types';

export interface Translations {
  appName: string;
  locationDefault: string;
  greetingMorning: string;
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
  configLoadError: string;
  usingCachedConfig: string;
  diwaliSpecial: string;
  diwaliOfferHeadline: string;
  bookNow: string;
  care247: string;
  consultDoctorOnline: string;
  consultDoctorSubtext: string;
}

export const translations: Record<SupportedLanguage, Translations> = {
  en: {
    appName: 'Tapza Care',
    locationDefault: 'Hyderabad',
    greetingMorning: 'Good morning',
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
    configLoadError: 'Unable to reach remote config server. Showing cached layout.',
    usingCachedConfig: 'Using cached layout offline.',
    diwaliSpecial: 'Diwali Special',
    diwaliOfferHeadline: 'Flat 20% off on selected lab tests',
    bookNow: 'Book Now',
    care247: '24/7 Care',
    consultDoctorOnline: 'Consult a Doctor\nOnline',
    consultDoctorSubtext: 'Get expert medical advice from the comfort of home.',
  },
  hi: {
    appName: 'ताप्ज़ा केयर',
    locationDefault: 'हैदराबाद',
    greetingMorning: 'शुभ प्रभात',
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
    configLoadError: 'सर्वर से कनेक्ट नहीं हो सका। सहेजा हुआ लेआउट दिखा रहे हैं।',
    usingCachedConfig: 'ऑफ़लाइन सहेजे गए लेआउट का उपयोग कर रहे हैं।',
    diwaliSpecial: 'दीपावली स्पेशल',
    diwaliOfferHeadline: 'चुनिंदा लैब टेस्ट पर 20% की छूट',
    bookNow: 'अभी बुक करें',
    care247: '24/7 सेवा',
    consultDoctorOnline: 'डॉक्टर से ऑनलाइन\nपरामर्श लें',
    consultDoctorSubtext: 'घर बैठे विशेषज्ञ डॉक्टरों से चिकित्सीय सलाह प्राप्त करें।',
  },
  te: {
    appName: 'తాప్జా కేర్',
    locationDefault: 'హైదరాబాద్',
    greetingMorning: 'శుభోదయం',
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
    configLoadError: 'సర్వర్ అందుబాటులో లేదు. కాష్ చేయబడిన లేఅవుట్ చూపుతున్నాము.',
    usingCachedConfig: 'ఆఫ్‌లైన్ కాష్ లేఅవుట్ వాడుతున్నారు.',
    diwaliSpecial: 'దీపావళి స్పెషల్',
    diwaliOfferHeadline: 'ఎంపిక చేసిన ల్యాబ్ పరీక్షలపై 20% రాయితీ',
    bookNow: 'ఇప్పుడే బుక్ చేయండి',
    care247: '24/7 సంరక్షణ',
    consultDoctorOnline: 'డాక్టర్‌తో ఆన్‌లైన్\nసంప్రదింపులు',
    consultDoctorSubtext: 'మీ ఇంటి వద్ద నుంచే నిపుణులైన వైద్యుల సలహాలు పొందండి.',
  },
};
