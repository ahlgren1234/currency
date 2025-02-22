import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Platform, View, Text, Image } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import PrivacyPolicyScreen from './src/screens/PrivacyPolicyScreen';
import BugReportScreen from './src/screens/BugReportScreen';
import { colors } from './src/theme/colors';
import { ThemeProvider, useTheme } from './src/theme/ThemeContext';
import { LanguageProvider, useLanguage } from './src/i18n/LanguageContext';

enableScreens();

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const CustomHeader = ({ theme }: { theme: typeof colors }) => {
  const insets = useSafeAreaInsets();
  const { t } = useLanguage();
  return (
    <View style={[
      styles.headerContainer, 
      { 
        backgroundColor: theme.card,
        paddingTop: Math.max(insets.top + 10, Platform.OS === 'ios' ? 50 : 45),
      }
    ]}>
      <View style={styles.headerContent}>
        <Ionicons name="trending-up" size={24} color={theme.primary} style={styles.headerIcon} />
        <View>
          <Text style={[styles.headerTitle, { color: theme.text }]}>{t('home.title')}</Text>
          <Text style={[styles.headerSubtitle, { color: theme.gray }]}>{t('home.subtitle')}</Text>
        </View>
      </View>
    </View>
  );
};

const SettingsStack = () => {
  const { theme } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.card,
        },
        headerTintColor: theme.text,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicyScreen}
        options={{
          title: 'Privacy Policy',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="BugReport"
        component={BugReportScreen}
        options={{
          title: 'Report Bug',
          headerBackTitle: 'Back',
        }}
      />
    </Stack.Navigator>
  );
};

function TabNavigator() {
  const { theme, isDarkMode } = useTheme();

  return (
    <>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: {
            backgroundColor: theme.card,
          },
          headerTintColor: theme.text,
          headerShadowVisible: false,
          tabBarStyle: {
            backgroundColor: theme.card,
            borderTopColor: theme.lightGray,
            borderTopWidth: 0.5,
            height: Platform.select({
              android: 75,
              ios: 90,
            }),
            paddingBottom: Platform.select({
              android: 18,
              ios: 30,
            }),
            paddingTop: Platform.select({
              android: 12,
              ios: 12,
            }),
          },
          tabBarActiveTintColor: theme.primary,
          tabBarInactiveTintColor: theme.gray,
          tabBarLabelStyle: {
            fontSize: 12,
            paddingBottom: Platform.select({
              android: 5,
              ios: 5,
            }),
            marginTop: Platform.OS === 'ios' ? 8 : 0,
          },
          tabBarIconStyle: {
            marginBottom: Platform.OS === 'ios' ? -3 : 0,
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Convert') {
              iconName = focused ? 'swap-horizontal' : 'swap-horizontal-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Ionicons name={iconName as any} size={24} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="Convert"
          component={HomeScreen}
          options={{
            header: () => <CustomHeader theme={theme} />,
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsStack}
        />
      </Tab.Navigator>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <TabNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerContainer: {
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: 12,
    backgroundColor: `${colors.primary}15`,
    padding: 8,
    borderRadius: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
});
