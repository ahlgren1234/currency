import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useLanguage } from '../i18n/LanguageContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';

export default function BugReportScreen() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();

  const [description, setDescription] = useState('');
  const [steps, setSteps] = useState('');
  const [expectedBehavior, setExpectedBehavior] = useState('');
  const [actualBehavior, setActualBehavior] = useState('');
  const [deviceInfo, setDeviceInfo] = useState('');
  const [severity, setSeverity] = useState('medium');

  const handleSubmit = () => {
    const subject = encodeURIComponent('Bug Report: Currency Converter App');
    const body = encodeURIComponent(
      `Bug Description:\n${description}\n\n` +
      `Steps to Reproduce:\n${steps}\n\n` +
      `Expected Behavior:\n${expectedBehavior}\n\n` +
      `Actual Behavior:\n${actualBehavior}\n\n` +
      `Device Information:\n${deviceInfo}\n\n` +
      `Severity: ${severity}\n\n` +
      `App Version: ${require('../../app.json').expo.version}`
    );

    const mailtoLink = `mailto:ahlgren1234@gmail.com?subject=${subject}&body=${body}`;

    Linking.canOpenURL(mailtoLink)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(mailtoLink);
        }
        Alert.alert(
          'Error',
          t('bugReport.errorNoEmail')
        );
      })
      .catch((error) => {
        Alert.alert(
          'Error',
          t('bugReport.errorGeneral')
        );
      });
  };

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
        <Text style={[styles.title, { color: theme.text }]}>{t('bugReport.title')}</Text>
        
        <Text style={[styles.label, { color: theme.text }]}>{t('bugReport.description')}</Text>
        <TextInput
          style={[styles.input, { color: theme.text, backgroundColor: theme.background }]}
          placeholder={t('bugReport.descriptionPlaceholder')}
          placeholderTextColor={theme.gray}
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />

        <Text style={[styles.label, { color: theme.text }]}>{t('bugReport.steps')}</Text>
        <TextInput
          style={[styles.input, { color: theme.text, backgroundColor: theme.background }]}
          placeholder={t('bugReport.stepsPlaceholder')}
          placeholderTextColor={theme.gray}
          value={steps}
          onChangeText={setSteps}
          multiline
          numberOfLines={4}
        />

        <Text style={[styles.label, { color: theme.text }]}>{t('bugReport.expectedBehavior')}</Text>
        <TextInput
          style={[styles.input, { color: theme.text, backgroundColor: theme.background }]}
          placeholder={t('bugReport.expectedBehaviorPlaceholder')}
          placeholderTextColor={theme.gray}
          value={expectedBehavior}
          onChangeText={setExpectedBehavior}
          multiline
          numberOfLines={3}
        />

        <Text style={[styles.label, { color: theme.text }]}>{t('bugReport.actualBehavior')}</Text>
        <TextInput
          style={[styles.input, { color: theme.text, backgroundColor: theme.background }]}
          placeholder={t('bugReport.actualBehaviorPlaceholder')}
          placeholderTextColor={theme.gray}
          value={actualBehavior}
          onChangeText={setActualBehavior}
          multiline
          numberOfLines={3}
        />

        <Text style={[styles.label, { color: theme.text }]}>{t('bugReport.deviceInfo')}</Text>
        <TextInput
          style={[styles.input, { color: theme.text, backgroundColor: theme.background }]}
          placeholder={t('bugReport.deviceInfoPlaceholder')}
          placeholderTextColor={theme.gray}
          value={deviceInfo}
          onChangeText={setDeviceInfo}
        />

        <Text style={[styles.label, { color: theme.text }]}>{t('bugReport.severity')}</Text>
        <View style={[styles.pickerContainer, { backgroundColor: theme.background }]}>
          <Picker
            selectedValue={severity}
            onValueChange={(value) => setSeverity(value)}
            style={{ color: theme.text }}
          >
            <Picker.Item label={t('bugReport.severityLevels.low')} value="low" />
            <Picker.Item label={t('bugReport.severityLevels.medium')} value="medium" />
            <Picker.Item label={t('bugReport.severityLevels.high')} value="high" />
            <Picker.Item label={t('bugReport.severityLevels.critical')} value="critical" />
          </Picker>
        </View>

        <TouchableOpacity
          style={[styles.submitButton, { backgroundColor: theme.primary }]}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>{t('bugReport.submit')}</Text>
        </TouchableOpacity>
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
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 8,
  },
  input: {
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    marginBottom: 20,
  },
  submitButton: {
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 