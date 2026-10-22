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
import { useTheme } from '../../theme';
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
          style={[styles.sheet, { backgroundColor: '#FFFFFF', borderRadius: radii.xl }]}
        >
          {/* Header */}
          <View style={[styles.header, { borderBottomColor: '#E2E8F0', padding: spacing.lg }]}>
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
              style={[styles.closeBtn, { backgroundColor: '#F1F5F9', borderRadius: radii.full }]}
            >
              <Text style={{ fontSize: 18, fontWeight: '700', color: '#64748B' }}>✕</Text>
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
                    backgroundColor: resilience.themeMode === 'normal' ? theme.primary : '#F1F5F9',
                    borderRadius: radii.sm,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.segmentText,
                    {
                      color: resilience.themeMode === 'normal' ? '#FFFFFF' : '#475569',
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
                    backgroundColor: resilience.themeMode === 'festival' ? '#C83214' : '#F1F5F9',
                    borderRadius: radii.sm,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.segmentText,
                    {
                      color: resilience.themeMode === 'festival' ? '#FFFFFF' : '#475569',
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
                      backgroundColor: language === lang ? theme.primary : '#F1F5F9',
                      borderRadius: radii.sm,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.segmentText,
                      {
                        color: language === lang ? '#FFFFFF' : '#475569',
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
                      backgroundColor: resilience.latencyMs === ms ? theme.primary : '#F1F5F9',
                      borderRadius: radii.sm,
                      paddingVertical: 6,
                      paddingHorizontal: spacing.md,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color: resilience.latencyMs === ms ? '#FFFFFF' : '#334155',
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
                trackColor={{ false: '#CBD5E1', true: '#DC2626' }}
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
                trackColor={{ false: '#CBD5E1', true: '#DC2626' }}
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
                trackColor={{ false: '#CBD5E1', true: '#F59E0B' }}
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
                trackColor={{ false: '#CBD5E1', true: '#64748B' }}
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
                      borderColor: '#CBD5E1',
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
    backgroundColor: 'rgba(0,0,0,0.5)',
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
    backgroundColor: '#F1F5F9',
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
    borderBottomColor: '#F1F5F9',
  },
  switchLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  switchSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  accordionHeader: {
    paddingVertical: 8,
  },
  jsonInput: {
    borderWidth: 1,
    fontFamily: 'Courier',
    fontSize: 11,
    backgroundColor: '#F8FAFC',
    color: '#0F172A',
    minHeight: 120,
    textAlignVertical: 'top',
  },
});
