import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Platform,
  Linking,
  ScrollView,
  Modal,
  FlatList,
} from 'react-native';
import { colors } from '../theme/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import { useLanguage } from '../i18n/LanguageContext';
import { colorSchemes, ColorScheme } from '../theme/colors';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

type RootStackParamList = {
  Settings: undefined;
  PrivacyPolicy: undefined;
  BugReport: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Settings'>;

const ColorSchemeButton = ({
  scheme,
  isSelected,
  onPress,
  theme,
}: {
  scheme: ColorScheme;
  isSelected: boolean;
  onPress: () => void;
  theme: typeof colors;
}) => {
  const { t } = useLanguage();
  return (
    <TouchableOpacity
      style={[
        styles.colorSchemeButton,
        {
          backgroundColor: colorSchemes[scheme].colors.primary,
          borderColor: isSelected ? theme.primary : 'transparent',
          borderWidth: isSelected ? 2 : 0,
        },
      ]}
      onPress={onPress}
    >
      <Text style={styles.colorSchemeName}>{t(`colorSchemes.${scheme}`)}</Text>
    </TouchableOpacity>
  );
};

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

const LanguageSelector = ({
  visible,
  onClose,
  theme,
}: {
  visible: boolean;
  onClose: () => void;
  theme: typeof colors;
}) => {
  const { language, setLanguage, supportedLanguages, t } = useLanguage();
  const insets = useSafeAreaInsets();

  const handleSelectLanguage = async (lang: string) => {
    await setLanguage(lang);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View
        style={[
          styles.modalContainer,
          {
            backgroundColor: `${theme.black}80`,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          },
        ]}
      >
        <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              {t('settings.selectLanguage')}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={theme.text} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={Object.entries(supportedLanguages)}
            keyExtractor={([key]) => key}
            renderItem={({ item: [key, value] }) => (
              <TouchableOpacity
                style={[
                  styles.languageOption,
                  {
                    backgroundColor: language === key ? `${theme.primary}15` : 'transparent',
                  },
                ]}
                onPress={() => handleSelectLanguage(key)}
              >
                <Text style={[styles.languageText, { color: theme.text }]}>
                  {t(`languages.${key}`)}
                </Text>
                {language === key && (
                  <Ionicons name="checkmark" size={24} color={theme.primary} />
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

export default function SettingsScreen() {
  const { theme, isDarkMode, toggleTheme, colorScheme, setColorScheme } = useTheme();
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const [languageSelectorVisible, setLanguageSelectorVisible] = useState(false);

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
    navigation.navigate('BugReport');
  };

  const handlePrivacyPolicy = () => {
    navigation.navigate('PrivacyPolicy');
  };

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
      contentContainerStyle={{
        paddingTop: Platform.OS === 'ios' ? 20 : insets.top + 20,
        paddingBottom: insets.bottom + 20,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>{t('settings.appearance')}</Text>
        <SettingsOption
          title={t('settings.darkMode')}
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

        <Text style={[styles.sectionTitle, { color: theme.text, marginTop: 20 }]}>{t('settings.colorScheme')}</Text>
        <View style={styles.colorSchemeContainer}>
          {(Object.keys(colorSchemes) as ColorScheme[]).map((scheme) => (
            <ColorSchemeButton
              key={scheme}
              scheme={scheme}
              isSelected={colorScheme === scheme}
              onPress={() => setColorScheme(scheme)}
              theme={theme}
            />
          ))}
        </View>

        <Text style={[styles.sectionTitle, { color: theme.text, marginTop: 20 }]}>Language</Text>
        <SettingsOption
          title="Language"
          theme={theme}
          onPress={() => setLanguageSelectorVisible(true)}
        />

        <Text style={[styles.sectionTitle, { color: theme.text, marginTop: 20 }]}>{t('settings.support')}</Text>
        <SettingsOption
          title={t('settings.rateApp')}
          onPress={handleRateApp}
          theme={theme}
        />
        <SettingsOption
          title={t('settings.reportBug')}
          onPress={handleReportBug}
          theme={theme}
        />
        <SettingsOption
          title={t('settings.privacyPolicy')}
          onPress={handlePrivacyPolicy}
          theme={theme}
        />

        <Text style={[styles.sectionTitle, { color: theme.text, marginTop: 20 }]}>{t('settings.about')}</Text>
        <View style={styles.aboutContainer}>
          <Text style={[styles.aboutText, { color: theme.text }]}>
            {t('settings.aboutText')}
          </Text>
          <Text style={[styles.aboutText, { color: theme.text, marginTop: 8 }]}>
            {t('settings.exchangeRateInfo')}
          </Text>
        </View>

        <Text style={[styles.version, { color: theme.gray }]}>
          {t('settings.version', { version: '0.1.0' })}
        </Text>
      </View>

      <LanguageSelector
        visible={languageSelectorVisible}
        onClose={() => setLanguageSelectorVisible(false)}
        theme={theme}
      />
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
  colorSchemeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  colorSchemeButton: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  colorSchemeName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    maxHeight: '70%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    padding: 4,
  },
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  languageText: {
    fontSize: 16,
  },
}); 