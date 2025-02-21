import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Platform,
  Linking,
} from 'react-native';
import { colors } from '../theme/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';

const SettingsOption = ({
  title,
  onPress,
  theme,
  rightElement,
}: {
  title: string;
  onPress?: () => void;
  theme: typeof colors;
  rightElement?: React.ReactNode;
}) => (
  <TouchableOpacity
    style={[styles.settingsOption, { borderBottomColor: theme.lightGray }]}
    onPress={onPress}
    disabled={!onPress}
  >
    <Text style={[styles.settingsOptionText, { color: theme.text }]}>{title}</Text>
    {rightElement}
  </TouchableOpacity>
);

export default function SettingsScreen() {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const insets = useSafeAreaInsets();

  const handleRateApp = () => {
    const storeUrl = Platform.select({
      ios: 'https://apps.apple.com/app/your-app-id',
      android: 'https://play.google.com/store/apps/details?id=your.app.id',
    });
    if (storeUrl) {
      Linking.openURL(storeUrl);
    }
  };

  const handleReportBug = () => {
    Linking.openURL('mailto:your-support-email@example.com?subject=Bug%20Report');
  };

  const handlePrivacyPolicy = () => {
    Linking.openURL('https://your-website.com/privacy-policy');
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
          paddingTop: Platform.OS === 'ios' ? 20 : insets.top + 20,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Appearance</Text>
        <SettingsOption
          title="Dark Mode"
          theme={theme}
          rightElement={
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: theme.lightGray, true: theme.primary }}
              thumbColor={Platform.OS === 'ios' ? '#FFFFFF' : isDarkMode ? theme.primary : theme.lightGray}
            />
          }
        />

        <Text style={[styles.sectionTitle, { color: theme.text, marginTop: 20 }]}>Support</Text>
        <SettingsOption
          title="Rate App"
          onPress={handleRateApp}
          theme={theme}
        />
        <SettingsOption
          title="Report a Bug"
          onPress={handleReportBug}
          theme={theme}
        />
        <SettingsOption
          title="Privacy Policy"
          onPress={handlePrivacyPolicy}
          theme={theme}
        />

        <Text style={[styles.sectionTitle, { color: theme.text, marginTop: 20 }]}>About</Text>
        <View style={styles.aboutContainer}>
          <Text style={[styles.aboutText, { color: theme.text }]}>
            A simple and elegant currency converter that helps you convert between different currencies in real-time. Features include live exchange rates, dark mode support, and a beautiful interface with country flags.
          </Text>
          <Text style={[styles.aboutText, { color: theme.text, marginTop: 8 }]}>
            Exchange rates are updated hourly using data from exchangerate-api.com.
          </Text>
        </View>

        <Text style={[styles.version, { color: theme.gray }]}>
          Version 1.0.0
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  card: {
    borderRadius: 20,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  settingsOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  settingsOptionText: {
    fontSize: 16,
  },
  aboutContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 20,
  },
  version: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 14,
  },
}); 