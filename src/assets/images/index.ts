import { ImageSourcePropType } from 'react-native';

export const Images = {
  familyHealthcare: require('./FamilyHealthcare.webp'),
  fullBodyCheckup: require('./FullBodyCheckup.webp'),
  homeHealthcare: require('./HomeHealthcare.webp'),
  modernLaboratory: require('./ModernLaboratory.webp'),
  pharmacyEssentials: require('./PharmacyEssentials.webp'),
  smilingDoctor: require('./SmilingDoctor.webp'),
  vaccineProtection: require('./VaccineProtection.webp'),
  dermatology: require('./dermatology.webp'),
  diwaliBanner: require('./DiwaliBanner.webp'),
  healthBanner: require('./health-banner.webp'),
  doctorConsultBanner: require('./DoctorConsultBanner.webp'),

  // Doctor Profile Avatars
  doc1: require('./doctors/doc1.webp'),
  doc2: require('./doctors/doc2.webp'),
  doc3: require('./doctors/doc3.webp'),
  doc4: require('./doctors/doc4.webp'),
  doc5: require('./doctors/doc5.webp'),
  doc6: require('./doctors/doc6.webp'),
} as const;

export type ImageKey = keyof typeof Images;

/**
 * Robust helper that resolves any image representation into a valid React Native Image source:
 * - A bundled image asset (e.g. Images.smilingDoctor)
 * - An ImageKey name (e.g. 'smilingDoctor', 'dermatology', 'fullBodyCheckup')
 * - A remote URL (e.g. 'https://...')
 * - A sensible fallback
 */
export const resolveImageSource = (
  source?: ImageSourcePropType | ImageKey | string | null,
  fallback: ImageSourcePropType = Images.smilingDoctor
): ImageSourcePropType => {
  if (!source) {
    return fallback;
  }
  // If it's already an ImageSourcePropType (e.g. number from require or object with uri)
  if (typeof source === 'number') {
    return source;
  }
  if (typeof source === 'object' && 'uri' in source) {
    return source as ImageSourcePropType;
  }
  // If it's an ImageKey string matching our local assets registry
  if (typeof source === 'string') {
    if (source in Images) {
      return Images[source as ImageKey];
    }
    if (source.startsWith('http://') || source.startsWith('https://')) {
      return { uri: source };
    }
  }
  return fallback;
};

// Named individual exports for convenience
export const FamilyHealthcareImage = Images.familyHealthcare;
export const FullBodyCheckupImage = Images.fullBodyCheckup;
export const HomeHealthcareImage = Images.homeHealthcare;
export const ModernLaboratoryImage = Images.modernLaboratory;
export const PharmacyEssentialsImage = Images.pharmacyEssentials;
export const SmilingDoctorImage = Images.smilingDoctor;
export const VaccineProtectionImage = Images.vaccineProtection;
export const DermatologyImage = Images.dermatology;
export const DiwaliBannerImage = Images.diwaliBanner;
export const HealthBannerImage = Images.healthBanner;
export const DoctorConsultBannerImage = Images.doctorConsultBanner;

// Doctor profile image bundle
export const DoctorImages = {
  doc1: Images.doc1,
  doc2: Images.doc2,
  doc3: Images.doc3,
  doc4: Images.doc4,
  doc5: Images.doc5,
  doc6: Images.doc6,
} as const;

export const Doc1Image = Images.doc1;
export const Doc2Image = Images.doc2;
export const Doc3Image = Images.doc3;
export const Doc4Image = Images.doc4;
export const Doc5Image = Images.doc5;
export const Doc6Image = Images.doc6;

/**
 * Returns a high-res doctor profile image with automatic ID/index fallback
 */
export const getDoctorProfileImage = (
  doctor?: { id?: string; photoUrl?: unknown } | null,
  fallbackIndex = 0
): ImageSourcePropType => {
  if (doctor?.photoUrl) {
    return resolveImageSource(doctor.photoUrl as any);
  }
  const profiles = [Images.doc1, Images.doc2, Images.doc3, Images.doc4, Images.doc5, Images.doc6];
  if (doctor?.id) {
    if (doctor.id.includes('priya') || doctor.id.includes('1')) return Images.doc1;
    if (doctor.id.includes('arjun') || doctor.id.includes('2')) return Images.doc2;
    if (doctor.id.includes('nikhil') || doctor.id.includes('3')) return Images.doc3;
    if (doctor.id.includes('meera') || doctor.id.includes('4')) return Images.doc4;
    if (doctor.id.includes('rajesh') || doctor.id.includes('5')) return Images.doc5;
    if (doctor.id.includes('sneha') || doctor.id.includes('6')) return Images.doc6;
  }
  return profiles[fallbackIndex % profiles.length];
};
