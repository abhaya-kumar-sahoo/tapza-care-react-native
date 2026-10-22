import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useTheme, colors } from '../../theme';
import { useI18n } from '../../i18n';
import { Icon } from '../common/Icon';
import { Badge } from '../common/Badge';
import { ServiceItem } from '../../types';
import { resolveImageSource } from '../../assets/images';

export interface ServiceGridProps {
  title?: string;
  items: ServiceItem[];
  onSelectService?: (service: ServiceItem) => void;
  onViewAll?: () => void;
}

export const ServiceGrid: React.FC<ServiceGridProps> = ({
  title,
  items,
  onSelectService,
  onViewAll,
}) => {
  const { theme, spacing, radii, typography } = useTheme();
  const { t } = useI18n();

  return (
    <View style={[styles.container, { paddingVertical: spacing.md }]}>
      <View style={[styles.headerRow, { paddingHorizontal: spacing.lg, marginBottom: spacing.md }]}>
        <Text
          allowFontScaling={true}
          style={[
            styles.title,
            {
              color: theme.textPrimary,
              fontSize: typography.sizes.md,
              fontWeight: typography.weights.bold,
            },
          ]}
        >
          {title || t.popularServices}
        </Text>
        <TouchableOpacity
          onPress={onViewAll}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="View all popular services"
          style={styles.viewAllBtn}
        >
          <Text
            allowFontScaling={true}
            style={[
              styles.viewAllText,
              {
                color: theme.primary,
                fontSize: typography.sizes.xs,
                fontWeight: typography.weights.semibold,
              },
            ]}
          >
            {t.viewAll}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.scrollList, { paddingHorizontal: spacing.lg }]}
      >
        {items.map(service => (
          <TouchableOpacity
            key={service.id}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel={`${service.name}, price ${service.priceInr} rupees`}
            onPress={() => onSelectService && onSelectService(service)}
            style={[
              styles.card,
              {
                backgroundColor: theme.cardBackground,
                borderRadius: radii.lg,
                borderColor: theme.cardBorder,
                borderWidth: 1,
                padding: spacing.sm,
                marginRight: spacing.md,
                width: 148,
                shadowColor: colors.black,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.04,
                shadowRadius: 5,
                elevation: 2,
              },
            ]}
          >
            {/* Top image or icon */}
            {service.imageUrl ? (
              <View style={[styles.imageContainer, { borderRadius: radii.md }]}>
                <Image
                  source={resolveImageSource(service.imageUrl)}
                  style={styles.serviceImage}
                  resizeMode="cover"
                />
                {service.badge && (
                  <View style={styles.badgeOverlay}>
                    <Badge
                      label={service.badge}
                      variant="accent"
                      style={{ alignSelf: 'flex-start' }}
                      textStyle={{ fontSize: 9 }}
                    />
                  </View>
                )}
              </View>
            ) : (
              <View style={styles.cardTopRow}>
                <View
                  style={[
                    styles.serviceIconWrap,
                    {
                      backgroundColor: `${theme.primary}12`,
                      borderRadius: radii.md,
                    },
                  ]}
                >
                  <Icon name={service.icon} size={22} color={theme.primary} />
                </View>
                {service.badge && (
                  <Badge
                    label={service.badge}
                    variant="accent"
                    style={{ alignSelf: 'flex-start' }}
                    textStyle={{ fontSize: 9 }}
                  />
                )}
              </View>
            )}

            {/* Name */}
            <Text
              allowFontScaling={true}
              numberOfLines={2}
              style={[
                styles.serviceName,
                {
                  color: theme.textPrimary,
                  fontSize: typography.sizes.sm,
                  fontWeight: typography.weights.semibold,
                  marginTop: spacing.sm,
                  minHeight: 34,
                },
              ]}
            >
              {service.name}
            </Text>

            {/* Price Row */}
            <View style={[styles.priceRow, { marginTop: spacing.xs }]}>
              <Text
                allowFontScaling={true}
                style={[
                  styles.priceText,
                  {
                    color: theme.textPrimary,
                    fontSize: typography.sizes.md,
                    fontWeight: typography.weights.bold,
                  },
                ]}
              >
                ₹{service.priceInr.toLocaleString('en-IN')}
              </Text>
              {service.originalPriceInr && (
                <Text
                  allowFontScaling={true}
                  style={[
                    styles.originalPriceText,
                    {
                      color: theme.textSecondary,
                      fontSize: typography.sizes.xs,
                      textDecorationLine: 'line-through',
                      marginLeft: spacing.xs,
                    },
                  ]}
                >
                  ₹{service.originalPriceInr}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    letterSpacing: -0.2,
  },
  viewAllBtn: {
    minHeight: 30,
    justifyContent: 'center',
  },
  viewAllText: {},
  scrollList: {
    alignItems: 'center',
  },
  card: {
    justifyContent: 'space-between',
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  serviceIconWrap: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceName: {
    lineHeight: 18,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceText: {},
  originalPriceText: {},
  imageContainer: {
    width: '100%',
    height: 74,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: colors.slate[100],
  },
  serviceImage: {
    width: '100%',
    height: '100%',
  },
  badgeOverlay: {
    position: 'absolute',
    top: 4,
    left: 4,
  },
});
