import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { colors } from './src/theme/colors';
import { ThemeProvider, useTheme } from './src/theme/ThemeContext';

enableScreens();

const Tab = createBottomTabNavigator();

function TabNavigator() {
  const { theme, isDarkMode } = useTheme();

  return (
    <>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: {
            backgroundColor: theme.background,
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
            title: 'Currency Converter',
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
        />
      </Tab.Navigator>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
