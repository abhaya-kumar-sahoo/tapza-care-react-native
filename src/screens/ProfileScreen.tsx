import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../theme';
import { useI18n } from '../i18n';
import { Icon } from '../components/common/Icon';
import { SupportedLanguage } from '../types';

export interface ProfileScreenProps {
  onOpenAdmin: () => void;
  onOpenReminders: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onOpenAdmin,
  onOpenReminders,
}) => {
  const { theme, spacing, radii, typography, isFestival } = useTheme();
  const { language, setLanguage, t } = useI18n();

  return (
    <View style={[styles.container, { backgroundColor: '#F8FAFC' }]}>
      {/* Header */}
      <View style={[styles.header, { paddingHorizontal: spacing.lg, paddingVertical: spacing.md }]}>
        <Text
          allowFontScaling={true}
          style={[
            styles.title,
            {
              color: theme.textPrimary,
              fontSize: typography.sizes.xl,
              fontWeight: typography.weights.bold,
            },
          ]}
        >
          {t.tabProfile}
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: spacing.lg, paddingBottom: 100 }}
      >
        {/* User Card */}
        <View
          style={[
            styles.userCard,
            {
              backgroundColor: '#FFFFFF',
              borderRadius: radii.xl,
              padding: spacing.lg,
              borderColor: '#E2E8F0',
              borderWidth: 1,
            },
          ]}
        >
          <View style={[styles.userAvatar, { backgroundColor: `${theme.primary}15`, borderRadius: radii.full }]}>
            <Icon name="user" size={36} color={theme.primary} />
          </View>
          <View style={{ flex: 1, marginLeft: spacing.md }}>
            <Text
              allowFontScaling={true}
              style={[
                styles.userName,
                {
                  color: theme.textPrimary,
                  fontSize: typography.sizes.lg,
                  fontWeight: typography.weights.bold,
                },
              ]}
            >
              Abhaya
            </Text>
            <Text
              allowFontScaling={true}
              style={{
                color: theme.textSecondary,
                fontSize: typography.sizes.xs,
                marginTop: 2,
              }}
            >
              +91 98765 43210 • Banjara Hills, Hyderabad
            </Text>
          </View>
        </View>

        {/* Language Selection */}
        <View
          style={[
            styles.cardBlock,
            {
              backgroundColor: '#FFFFFF',
              borderRadius: radii.lg,
              padding: spacing.md,
              marginTop: spacing.md,
              borderColor: '#E2E8F0',
              borderWidth: 1,
            },
          ]}
        >
          <Text
            allowFontScaling={true}
            style={[
              styles.blockTitle,
              {
                color: theme.textPrimary,
                fontSize: typography.sizes.sm,
                fontWeight: typography.weights.bold,
                marginBottom: spacing.sm,
              },
            ]}
          >
            Language / भाषा / భాష
          </Text>

          <View style={styles.langRow}>
            {(['en', 'hi', 'te'] as SupportedLanguage[]).map(lang => (
              <TouchableOpacity
                key={lang}
                onPress={() => setLanguage(lang)}
                activeOpacity={0.8}
                style={[
                  styles.langBtn,
                  {
                    backgroundColor: language === lang ? theme.primary : '#F1F5F9',
                    borderRadius: radii.md,
                    paddingVertical: 8,
                    paddingHorizontal: spacing.md,
                  },
                ]}
              >
                <Text
                  style={{
                    color: language === lang ? '#FFFFFF' : '#334155',
                    fontSize: 13,
                    fontWeight: '600',
                  }}
                >
                  {lang === 'en' ? 'English' : lang === 'hi' ? 'हिन्दी' : 'తెలుగు'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Links */}
        <View
          style={[
            styles.cardBlock,
            {
              backgroundColor: '#FFFFFF',
              borderRadius: radii.lg,
              padding: spacing.md,
              marginTop: spacing.md,
              borderColor: '#E2E8F0',
              borderWidth: 1,
            },
          ]}
        >
          <TouchableOpacity
            onPress={onOpenReminders}
            activeOpacity={0.7}
            style={styles.menuRow}
          >
            <Icon name="bell" size={20} color={theme.primary} />
            <Text
              allowFontScaling={true}
              style={[styles.menuText, { color: theme.textPrimary, fontSize: typography.sizes.sm, marginLeft: spacing.sm, flex: 1 }]}
            >
              Medicine Reminders Schedule
            </Text>
            <Icon name="chevron-right" size={16} color="#94A3B8" />
          </TouchableOpacity>

          <View style={[styles.menuDivider, { backgroundColor: '#F1F5F9' }]} />

          <TouchableOpacity
            onPress={onOpenAdmin}
            activeOpacity={0.7}
            style={styles.menuRow}
          >
            <Icon name="settings" size={20} color={theme.primary} />
            <Text
              allowFontScaling={true}
              style={[styles.menuText, { color: theme.textPrimary, fontSize: typography.sizes.sm, marginLeft: spacing.sm, flex: 1 }]}
            >
              Admin & Chaos Testing Controls
            </Text>
            <Icon name="chevron-right" size={16} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        {/* Clinic info footer */}
        <View style={{ alignItems: 'center', marginTop: spacing.xl }}>
          <Text style={{ color: '#94A3B8', fontSize: 12 }}>
            Tapza Care Patient App v1.0.0
          </Text>
          <Text style={{ color: '#CBD5E1', fontSize: 11, marginTop: 2 }}>
            Built for Tapza Clinic, Banjara Hills, Hyderabad
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {},
  title: {},
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {},
  cardBlock: {},
  blockTitle: {},
  langRow: {
    flexDirection: 'row',
    gap: 8,
  },
  langBtn: {},
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  menuText: {},
  menuDivider: {
    height: 1,
    width: '100%',
  },
});
