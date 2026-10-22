import React, { useEffect } from 'react';
import { View, StyleSheet, ViewStyle, ScrollView } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, colors } from '../../theme';

export interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  borderRadius = 8,
  style,
}) => {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.8, { duration: 750 }),
        withTiming(0.3, { duration: 750 })
      ),
      -1,
      true
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        {
          width: width as any,
          height,
          borderRadius,
          backgroundColor: colors.slate[200],
        },
        animatedStyle,
        style,
      ]}
    />
  );
};

export const HeroBannerSkeleton: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { spacing, radii } = useTheme();
  return (
    <View style={[styles.skeletonContainer, { padding: spacing.lg, paddingTop: insets.top + spacing.sm, backgroundColor: colors.emerald.pale }]}>
      <Skeleton width={120} height={18} style={{ marginBottom: spacing.xs }} />
      <Skeleton width={180} height={32} style={{ marginBottom: spacing.xs }} />
      <Skeleton width={140} height={14} style={{ marginBottom: spacing.lg }} />
      {/* Search bar skeleton */}
      <Skeleton width="100%" height={48} borderRadius={radii.full} style={{ marginBottom: spacing.md }} />
      {/* Promo banner skeleton */}
      <Skeleton width="100%" height={110} borderRadius={radii.lg} />
    </View>
  );
};

export const CategoryChipsSkeleton: React.FC = () => {
  const { spacing, radii } = useTheme();
  return (
    <View style={{ paddingVertical: spacing.md, paddingHorizontal: spacing.lg, backgroundColor: colors.white }}>
      <Skeleton width={160} height={20} style={{ marginBottom: spacing.md }} />
      <View style={{ flexDirection: 'row', gap: spacing.md }}>
        {[1, 2, 3, 4, 5].map(i => (
          <View key={i} style={{ alignItems: 'center' }}>
            <Skeleton width={56} height={56} borderRadius={radii.full} style={{ marginBottom: spacing.xs }} />
            <Skeleton width={48} height={12} borderRadius={4} />
          </View>
        ))}
      </View>
    </View>
  );
};

export const QuickActionsSkeleton: React.FC = () => {
  const { spacing, radii } = useTheme();
  return (
    <View style={{ padding: spacing.lg, backgroundColor: colors.slate[50] }}>
      <Skeleton width={130} height={20} style={{ marginBottom: spacing.md }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {[1, 2, 3, 4].map(i => (
          <Skeleton key={i} width="22%" height={76} borderRadius={radii.md} />
        ))}
      </View>
    </View>
  );
};

export const ServiceGridSkeleton: React.FC = () => {
  const { spacing, radii } = useTheme();
  return (
    <View style={{ padding: spacing.lg, backgroundColor: colors.white }}>
      <Skeleton width={150} height={20} style={{ marginBottom: spacing.md }} />
      <View style={{ flexDirection: 'row', gap: spacing.md }}>
        {[1, 2, 3].map(i => (
          <Skeleton key={i} width="31%" height={140} borderRadius={radii.md} />
        ))}
      </View>
    </View>
  );
};

export const DoctorCarouselSkeleton: React.FC = () => {
  const { spacing, radii } = useTheme();
  return (
    <View style={{ paddingVertical: spacing.lg, paddingHorizontal: spacing.lg }}>
      <Skeleton width={180} height={20} style={{ marginBottom: spacing.md }} />
      <View style={{ flexDirection: 'row', gap: spacing.md }}>
        {[1, 2].map(i => (
          <Skeleton key={i} width={180} height={220} borderRadius={radii.lg} />
        ))}
      </View>
    </View>
  );
};

export const PrescriptionsSkeleton: React.FC = () => {
  const { spacing, radii } = useTheme();
  return (
    <View style={{ padding: spacing.lg, gap: spacing.md }}>
      {[1, 2, 3].map(i => (
        <Skeleton key={i} width="100%" height={110} borderRadius={radii.lg} />
      ))}
    </View>
  );
};

export const SlotsSkeleton: React.FC = () => {
  const { spacing, radii } = useTheme();
  return (
    <View style={{ padding: spacing.lg }}>
      <Skeleton width={120} height={18} style={{ marginBottom: spacing.md }} />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
        {[1, 2, 3, 4, 5, 6].map(i => (
          <Skeleton key={i} width="22%" height={44} borderRadius={radii.sm} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  skeletonContainer: {
    width: '100%',
  },
});
