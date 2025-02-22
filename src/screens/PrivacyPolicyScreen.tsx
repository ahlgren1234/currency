import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PrivacyPolicyScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: theme.background }
      ]}
      contentContainerStyle={{
        paddingTop: Platform.OS === 'ios' ? 20 : insets.top + 20,
        paddingBottom: insets.bottom + 20,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.title, { color: theme.text }]}>Privacy Policy</Text>
        
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Introduction</Text>
        <Text style={[styles.paragraph, { color: theme.text }]}>
          This privacy policy explains how we handle your data in our Currency Converter app. We are committed to protecting your privacy and ensuring you have a positive experience using our app.
        </Text>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>Information We Collect</Text>
        <Text style={[styles.paragraph, { color: theme.text }]}>
          Our app collects minimal data to function properly:
        </Text>
        <Text style={[styles.listItem, { color: theme.text }]}>• App preferences (such as dark mode setting and color scheme)</Text>
        <Text style={[styles.listItem, { color: theme.text }]}>• Currency selections for conversion</Text>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>How We Use Your Information</Text>
        <Text style={[styles.paragraph, { color: theme.text }]}>
          We use your data solely to:
        </Text>
        <Text style={[styles.listItem, { color: theme.text }]}>• Save your app preferences</Text>
        <Text style={[styles.listItem, { color: theme.text }]}>• Remember your most recent currency selections</Text>
        <Text style={[styles.listItem, { color: theme.text }]}>• Improve app functionality and user experience</Text>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>Third-Party Services</Text>
        <Text style={[styles.paragraph, { color: theme.text }]}>
          We use exchangerate-api.com to provide currency conversion rates. When you use our app, you're also subject to their privacy policy. We don't share any personal information with this service.
        </Text>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>Data Storage</Text>
        <Text style={[styles.paragraph, { color: theme.text }]}>
          All app preferences are stored locally on your device. We don't store any data on remote servers.
        </Text>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>Your Rights</Text>
        <Text style={[styles.paragraph, { color: theme.text }]}>
          You can clear all app data at any time by uninstalling the app. This will remove all locally stored preferences.
        </Text>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>Updates to This Policy</Text>
        <Text style={[styles.paragraph, { color: theme.text }]}>
          We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy in the app.
        </Text>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>Contact Us</Text>
        <Text style={[styles.paragraph, { color: theme.text }]}>
          If you have any questions about this privacy policy or our practices, please contact us at ahlgren1234@gmail.com
        </Text>

        <Text style={[styles.lastUpdated, { color: theme.gray }]}>
          Last updated: February 2025
        </Text>
      </View>
    </ScrollView>
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
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 10,
  },
  listItem: {
    fontSize: 15,
    lineHeight: 22,
    marginLeft: 10,
    marginBottom: 5,
  },
  lastUpdated: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 30,
    fontStyle: 'italic',
  },
}); 