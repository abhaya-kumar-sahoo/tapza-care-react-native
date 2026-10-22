import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme, colors } from '../../theme';
import { useI18n } from '../../i18n';
import { Icon } from '../common/Icon';
import { OfferStripItem } from '../../types';

export interface OfferStripProps {
  items: OfferStripItem[];
  onOfferPress?: (item: OfferStripItem) => void;
}

export const OfferStrip: React.FC<OfferStripProps> = ({
  items,
  onOfferPress,
}) => {
  const { theme, spacing, radii, typography } = useTheme();
  const { t } = useI18n();

  const item = items[0];
  if (!item) return null;

  return (
    <View style={[styles.container, { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm }]}>
      <TouchableOpacity
        activeOpacity={0.92}
        accessibilityRole="button"
        accessibilityLabel={`${item.tag}: ${item.headline} ${item.subline}`}
        onPress={() => onOfferPress && onOfferPress(item)}
        style={[
          styles.bannerCard,
          {
            backgroundColor: colors.red.burgundy,
            borderRadius: radii.lg,
            padding: spacing.md,
            borderColor: colors.red.crimson,
            borderWidth: 1,
            shadowColor: colors.black,
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 3,
          },
        ]}
      >
        <View style={styles.textColumn}>
          {/* Tag */}
          <View
            style={[
              styles.tagPill,
              {
                backgroundColor: colors.alpha.goldPillBg,
                borderColor: colors.amber[500],
                borderRadius: radii.full,
                paddingVertical: 2,
                paddingHorizontal: spacing.sm,
              },
            ]}
          >
            <Text
              allowFontScaling={true}
              style={[
                styles.tagText,
                {
                  color: colors.amber[200],
                  fontSize: 10,
                  fontWeight: typography.weights.bold,
                  letterSpacing: 0.5,
                },
              ]}
            >
              {item.tag || t.diwaliSpecial}
            </Text>
          </View>

          {/* Headline & Subline */}
          <Text
            allowFontScaling={true}
            style={[
              styles.headline,
              {
                color: colors.white,
                fontSize: typography.sizes.lg,
                fontWeight: typography.weights.extrabold,
                marginTop: spacing.xs,
              },
            ]}
          >
            {item.headline}
          </Text>
          <Text
            allowFontScaling={true}
            style={[
              styles.subline,
              {
                color: colors.red.rosePale,
                fontSize: typography.sizes.xs,
                marginBottom: spacing.sm,
              },
            ]}
          >
            {item.subline}
          </Text>

          {/* CTA Button */}
          <View
            style={[
              styles.ctaBtn,
              {
                backgroundColor: colors.amber[500],
                borderRadius: radii.full,
                paddingVertical: 6,
                paddingHorizontal: spacing.md,
              },
            ]}
          >
            <Text
              allowFontScaling={true}
              style={[
                styles.ctaText,
                {
                  color: colors.amber.darkBrown,
                  fontSize: typography.sizes.xs,
                  fontWeight: typography.weights.bold,
                },
              ]}
            >
              {item.ctaText || t.bookNow}
            </Text>
          </View>
        </View>

        {/* Diya / Festive Lamp Graphic */}
        <View style={styles.graphicWrap}>
          <Icon name="diya" size={54} color={colors.amber[400]} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  bannerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  textColumn: {
    flex: 1,
    alignItems: 'flex-start',
  },
  tagPill: {
    borderWidth: 1,
  },
  tagText: {
    textTransform: 'uppercase',
  },
  headline: {
    letterSpacing: -0.3,
  },
  subline: {},
  ctaBtn: {
    alignSelf: 'flex-start',
  },
  ctaText: {},
  graphicWrap: {
    marginLeft: 16,
    paddingRight: 8,
  },
});
