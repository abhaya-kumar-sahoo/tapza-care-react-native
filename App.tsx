import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider, useTheme } from './src/theme';
import { I18nProvider } from './src/i18n';
import { AppNavigator } from './src/navigation/AppNavigator';

function AppContent() {
  const { theme, isFestival } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isFestival ? 'light-content' : 'dark-content'} />
      <AppNavigator />
    </View>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <I18nProvider>
            <AppContent />
          </I18nProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
