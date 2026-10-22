import React, { useEffect } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import Animated, {
  SharedValue,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { BaseSectionConfig, Doctor, HeroBannerItem, CategoryItem, QuickActionItem, ServiceItem, OfferStripItem } from '../../types';
import { HeroBanner } from './HeroBanner';
import { CategoryChips } from './CategoryChips';
import { QuickActions } from './QuickActions';
import { ServiceGrid } from './ServiceGrid';
import { DoctorCarousel } from './DoctorCarousel';
import { OfferStrip } from './OfferStrip';
import { resolveImageSource } from '../../assets/images';

export interface SectionRendererProps {
  section: BaseSectionConfig;
  doctors?: Doctor[];
  scrollY?: SharedValue<number>;
  onSearchPress?: () => void;
  onBookPress?: (doctor?: Doctor, service?: ServiceItem) => void;
  onSelectCategory?: (category: CategoryItem) => void;
  onSelectAction?: (action: QuickActionItem) => void;
  onSelectDoctor?: (doctor: Doctor) => void;
  onSelectService?: (service: ServiceItem) => void;
  onOfferPress?: (item: OfferStripItem) => void;
  onAdminPress?: () => void;
  onNotificationPress?: () => void;
}

export const SectionRenderer: React.FC<SectionRendererProps> = ({
  section,
  doctors = [],
  scrollY,
  onSearchPress,
  onBookPress,
  onSelectCategory,
  onSelectAction,
  onSelectDoctor,
  onSelectService,
  onOfferPress,
  onAdminPress,
  onNotificationPress,
}) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(14);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 350 });
    translateY.value = withTiming(0, { duration: 350 });
  }, [opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const renderSectionContent = () => {
    switch (section.type) {
      case 'hero_banner': {
        const item = (section.items[0] || {}) as HeroBannerItem;
        return (
          <HeroBanner
            item={item}
            scrollY={scrollY}
            onSearchPress={onSearchPress}
            onBookPress={() => onBookPress && onBookPress()}
            onAdminPress={onAdminPress}
            onNotificationPress={onNotificationPress}
          />
        );
      }

      case 'category_chips': {
        const items = (section.items || []) as CategoryItem[];
        return (
          <CategoryChips
            title={section.title}
            items={items}
            onSelectCategory={onSelectCategory}
          />
        );
      }

      case 'quick_actions': {
        const items = (section.items || []) as QuickActionItem[];
        return (
          <QuickActions
            title={section.title}
            items={items}
            onActionPress={onSelectAction}
          />
        );
      }

      case 'service_grid': {
        const items = (section.items || []) as ServiceItem[];
        return (
          <ServiceGrid
            title={section.title}
            items={items}
            onSelectService={onSelectService}
          />
        );
      }

      case 'doctor_carousel': {
        // Items can be passed in config or fallback to doctors list
        const doctorList = section.items && section.items.length > 0 ? (section.items as Doctor[]) : doctors;
        return (
          <DoctorCarousel
            title={section.title}
            doctors={doctorList}
            onSelectDoctor={onSelectDoctor}
          />
        );
      }

      case 'offer_strip': {
        const items = (section.items || []) as OfferStripItem[];
        return (
          <OfferStrip
            items={items}
            onOfferPress={onOfferPress}
          />
        );
      }

      default:
        // CRITICAL REQUIREMENT: "An unknown section type must render nothing and never crash."
        return null;
    }
  };

  const content = renderSectionContent();
  if (!content) {
    return null;
  }

  // Handle distinct background bands per section
  const { kind, value } = section.background || { kind: 'color', value: 'transparent' };

  if (kind === 'image' && value) {
    return (
      <Animated.View style={[styles.sectionBand, animatedStyle]}>
        <ImageBackground source={resolveImageSource(value)} resizeMode="cover" style={styles.imageBackground}>
          {content}
        </ImageBackground>
      </Animated.View>
    );
  }

  if (kind === 'gradient' && value) {
    const colors = value.split(',');
    const primaryColor = colors[0] || 'transparent';
    return (
      <Animated.View
        style={[
          styles.sectionBand,
          { backgroundColor: primaryColor },
          animatedStyle,
        ]}
      >
        {content}
      </Animated.View>
    );
  }

  return (
    <Animated.View
      style={[
        styles.sectionBand,
        { backgroundColor: value || 'transparent' },
        animatedStyle,
      ]}
    >
      {content}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  sectionBand: {
    width: '100%',
  },
  imageBackground: {
    width: '100%',
  },
});
