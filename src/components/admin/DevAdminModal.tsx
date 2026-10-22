import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  TextInput,
  Alert,
} from 'react-native';
import { useTheme, colors } from '../../theme';
import { useI18n } from '../../i18n';
import { MockApiClient, ResilienceConfig } from '../../api/mockClient';
import { Icon } from '../common/Icon';
import { Button } from '../common/Button';
import { SupportedLanguage } from '../../types';

export interface DevAdminModalProps {
  visible: boolean;
  onClose: () => void;
  onConfigChanged: () => void;
}

export const DevAdminModal: React.FC<DevAdminModalProps> = ({
  visible,
  onClose,
  onConfigChanged,
}) => {
  const { theme, radii, spacing, typography, isFestival } = useTheme();
  const { language, setLanguage } = useI18n();

  const [resilience, setResilience] = useState<ResilienceConfig>(
    MockApiClient.getResilienceConfig()
  );
  const [jsonText, setJsonText] = useState('');
  const [isJsonExpanded, setIsJsonExpanded] = useState(false);

  useEffect(() => {
    if (visible) {
      setResilience(MockApiClient.getResilienceConfig());
    }
  }, [visible]);

  const handleToggleTheme = (mode: 'normal' | 'festival') => {
    const updated = MockApiClient.updateResilienceConfig({ themeMode: mode });
    setResilience(updated);
    onConfigChanged();
  };

  const handleUpdate = (updates: Partial<ResilienceConfig>) => {
    const updated = MockApiClient.updateResilienceConfig(updates);
    setResilience(updated);
    onConfigChanged();
  };

  const handleApplyCustomJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      if (!parsed.theme || !parsed.sections) {
        Alert.alert('Invalid Config', 'Config must contain theme and sections objects.');
        return;
      }
      handleUpdate({ customConfigJson: jsonText });
      Alert.alert('Success', 'Live custom config applied successfully!');
    } catch {
      Alert.alert('Syntax Error', 'Please check the JSON formatting.');
    }
  };

  const handleReset = () => {
    MockApiClient.resetResilienceConfig();
    const current = MockApiClient.getResilienceConfig();
    setResilience(current);
    setJsonText('');
    onConfigChanged();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.sheet, { backgroundColor: theme.cardBackground, borderRadius: radii.xl }]}
        >
          {/* Header */}
          <View style={[styles.header, { borderBottomColor: theme.cardBorder, padding: spacing.lg }]}>
            <View style={styles.titleRow}>
              <Icon name="settings" size={22} color={theme.primary} />
              <Text
                allowFontScaling={true}
                style={[
                  styles.title,
                  {
                    color: theme.textPrimary,
                    fontSize: typography.sizes.lg,
                    fontWeight: typography.weights.bold,
                    marginLeft: spacing.sm,
                  },
                ]}
              >
                Admin & Resilience Panel
              </Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel="Close admin panel"
              style={[styles.closeBtn, { backgroundColor: colors.slate[100], borderRadius: radii.full }]}
            >
              <Text style={{ fontSize: 18, fontWeight: '700', color: colors.slate[500] }}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.body} contentContainerStyle={{ padding: spacing.lg }}>
            {/* 1. Theme Switcher */}
            <Text style={[styles.sectionTitle, { color: theme.textPrimary, fontSize: typography.sizes.sm, fontWeight: typography.weights.bold }]}>
              Remote Config Layout & Theme
            </Text>
            <View style={[styles.segmentedRow, { borderRadius: radii.md, marginVertical: spacing.sm }]}>
              <TouchableOpacity
                onPress={() => handleToggleTheme('normal')}
                style={[
                  styles.segmentBtn,
                  {
                    backgroundColor: resilience.themeMode === 'normal' ? theme.primary : colors.slate[100],
                    borderRadius: radii.sm,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.segmentText,
                    {
                      color: resilience.themeMode === 'normal' ? colors.white : colors.slate[600],
                      fontWeight: '600',
                    },
                  ]}
                >
                  Normal Day
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleToggleTheme('festival')}
                style={[
                  styles.segmentBtn,
                  {
                    backgroundColor: resilience.themeMode === 'festival' ? colors.red.diwaliPrimary : colors.slate[100],
                    borderRadius: radii.sm,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.segmentText,
                    {
                      color: resilience.themeMode === 'festival' ? colors.white : colors.slate[600],
                      fontWeight: '600',
                    },
                  ]}
                >
                  Diwali Festival
                </Text>
              </TouchableOpacity>
            </View>

            {/* 2. Language Selector */}
            <Text style={[styles.sectionTitle, { color: theme.textPrimary, fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginTop: spacing.md }]}>
              Language (i18n)
            </Text>
            <View style={[styles.segmentedRow, { borderRadius: radii.md, marginVertical: spacing.sm }]}>
              {(['en', 'hi', 'te'] as SupportedLanguage[]).map(lang => (
                <TouchableOpacity
                  key={lang}
                  onPress={() => setLanguage(lang)}
                  style={[
                    styles.segmentBtn,
                    {
                      backgroundColor: language === lang ? theme.primary : colors.slate[100],
                      borderRadius: radii.sm,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.segmentText,
                      {
                        color: language === lang ? colors.white : colors.slate[600],
                        fontWeight: '600',
                      },
                    ]}
                  >
                    {lang === 'en' ? 'English' : lang === 'hi' ? 'हिन्दी' : 'తెలుగు'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* 3. Latency Switcher */}
            <Text style={[styles.sectionTitle, { color: theme.textPrimary, fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginTop: spacing.md }]}>
              Simulated Network Latency: {resilience.latencyMs}ms
            </Text>
            <View style={[styles.chipsRow, { marginVertical: spacing.sm }]}>
              {[0, 400, 1500, 3000].map(ms => (
                <TouchableOpacity
                  key={ms}
                  onPress={() => handleUpdate({ latencyMs: ms })}
                  style={[
                    styles.latencyChip,
                    {
                      backgroundColor: resilience.latencyMs === ms ? theme.primary : colors.slate[100],
                      borderRadius: radii.sm,
                      paddingVertical: 6,
                      paddingHorizontal: spacing.md,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color: resilience.latencyMs === ms ? colors.white : colors.slate[700],
                      fontWeight: '600',
                      fontSize: 12,
                    }}
                  >
                    {ms === 0 ? '0ms (Fast)' : `${ms}ms`}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* 4. Failure Toggles */}
            <Text style={[styles.sectionTitle, { color: theme.textPrimary, fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, marginTop: spacing.md }]}>
              Chaos / Failure Injections
            </Text>

            <View style={styles.switchRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.switchLabel}>Force Config 500 Error</Text>
                <Text style={styles.switchSub}>Tests fallback to cached config & offline alert</Text>
              </View>
              <Switch
                value={resilience.forceConfigError}
                onValueChange={val => handleUpdate({ forceConfigError: val })}
                trackColor={{ false: colors.slate[300], true: colors.red[600] }}
              />
            </View>

            <View style={styles.switchRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.switchLabel}>Force Slot Conflict (409)</Text>
                <Text style={styles.switchSub}>Tests optimistic update rollback & error toast</Text>
              </View>
              <Switch
                value={resilience.forceBookingConflict}
                onValueChange={val => handleUpdate({ forceBookingConflict: val })}
                trackColor={{ false: colors.slate[300], true: colors.red[600] }}
              />
            </View>

            <View style={styles.switchRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.switchLabel}>Force Empty State</Text>
                <Text style={styles.switchSub}>Simulates zero doctors or slots</Text>
              </View>
              <Switch
                value={resilience.forceEmptyDoctors}
                onValueChange={val => handleUpdate({ forceEmptyDoctors: val, forceEmptySlots: val })}
                trackColor={{ false: colors.slate[300], true: colors.amber[500] }}
              />
            </View>

            <View style={styles.switchRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.switchLabel}>Simulate Offline Mode</Text>
                <Text style={styles.switchSub}>Blocks network requests completely</Text>
              </View>
              <Switch
                value={resilience.forceNetworkOffline}
                onValueChange={val => handleUpdate({ forceNetworkOffline: val })}
                trackColor={{ false: colors.slate[300], true: colors.slate[500] }}
              />
            </View>

            {/* 5. Live JSON Config Editor */}
            <TouchableOpacity
              onPress={() => setIsJsonExpanded(!isJsonExpanded)}
              style={[styles.accordionHeader, { marginTop: spacing.md }]}
            >
              <Text style={{ fontWeight: '700', color: theme.primary }}>
                {isJsonExpanded ? '▼ Hide Live Config Editor' : '► Open Live JSON Config Editor'}
              </Text>
            </TouchableOpacity>

            {isJsonExpanded && (
              <View style={{ marginTop: spacing.sm }}>
                <TextInput
                  value={jsonText}
                  onChangeText={setJsonText}
                  placeholder="Paste or edit LayoutConfig JSON here..."
                  multiline
                  numberOfLines={8}
                  style={[
                    styles.jsonInput,
                    {
                      borderColor: colors.slate[300],
                      borderRadius: radii.md,
                      padding: spacing.md,
                    },
                  ]}
                />
                <Button
                  title="Apply Live JSON Config"
                  onPress={handleApplyCustomJson}
                  size="sm"
                  style={{ marginTop: spacing.sm }}
                />
              </View>
            )}

            {/* Reset Button */}
            <View style={{ marginTop: spacing.lg, marginBottom: spacing.xl }}>
              <Button
                title="Reset All Controls to Default"
                variant="outline"
                size="sm"
                onPress={handleReset}
              />
            </View>
          </ScrollView>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: colors.alpha.black50,
    justifyContent: 'flex-end',
  },
  sheet: {
    maxHeight: '85%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {},
  closeBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {},
  sectionTitle: {},
  segmentedRow: {
    flexDirection: 'row',
    backgroundColor: colors.slate[100],
    padding: 3,
    gap: 4,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  segmentText: {
    fontSize: 13,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  latencyChip: {},
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.slate[100],
  },
  switchLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.slate[800],
  },
  switchSub: {
    fontSize: 12,
    color: colors.slate[500],
    marginTop: 2,
  },
  accordionHeader: {
    paddingVertical: 8,
  },
  jsonInput: {
    borderWidth: 1,
    fontFamily: 'Courier',
    fontSize: 11,
    backgroundColor: colors.slate[50],
    color: colors.slate[900],
    minHeight: 120,
    textAlignVertical: 'top',
  },
});
