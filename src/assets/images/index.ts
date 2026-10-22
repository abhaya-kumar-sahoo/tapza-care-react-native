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
  diwaliBanner: require('./diwali-banner.webp'),
  healthBanner: require('./health-banner.webp'),
  doctorConsultBanner: require('./DoctorConsultBanner.webp'),
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
