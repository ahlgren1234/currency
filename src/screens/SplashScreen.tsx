import React, { useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useLanguage } from '../i18n/LanguageContext';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withDelay,
  runOnJS,
  cancelAnimation,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface SplashScreenProps {
  onAnimationComplete: () => void;
}

export default function SplashScreen({ onAnimationComplete }: SplashScreenProps) {
  const { theme } = useTheme();
  const { t } = useLanguage();

  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const titleOpacity = useSharedValue(0);
  const subtitleOpacity = useSharedValue(0);

  const startAnimation = useCallback(() => {
    scale.value = withSequence(
      withSpring(1.2, { damping: 15 }),
      withSpring(1, { damping: 12 })
    );

    opacity.value = withSpring(1, { damping: 15 });

    titleOpacity.value = withDelay(
      400,
      withSpring(1, { damping: 15 })
    );

    subtitleOpacity.value = withDelay(
      600,
      withSpring(1, {
        damping: 15,
      }, (finished) => {
        if (finished) {
          runOnJS(onAnimationComplete)();
        }
      })
    );
  }, [scale, opacity, titleOpacity, subtitleOpacity, onAnimationComplete]);

  useEffect(() => {
    const timeout = setTimeout(startAnimation, 100);

    return () => {
      clearTimeout(timeout);
      cancelAnimation(scale);
      cancelAnimation(opacity);
      cancelAnimation(titleOpacity);
      cancelAnimation(subtitleOpacity);
    };
  }, [startAnimation]);

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [
      { 
        translateY: withSpring(titleOpacity.value * 0, {
          damping: 15,
        }),
      },
    ],
  }));

  const subtitleStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
    transform: [
      { 
        translateY: withSpring(subtitleOpacity.value * 0, {
          damping: 15,
        }),
      },
    ],
  }));

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Animated.View style={[styles.iconContainer, iconStyle]}>
        <View style={[styles.iconBackground, { backgroundColor: theme.primary }]}>
          <Ionicons name="trending-up" size={48} color="white" />
        </View>
      </Animated.View>
      
      <Animated.Text style={[
        styles.title,
        { color: theme.text },
        titleStyle,
      ]}>
        {t('home.title')}
      </Animated.Text>
      
      <Animated.Text style={[
        styles.subtitle,
        { color: theme.gray },
        subtitleStyle,
      ]}>
        {t('home.subtitle')}
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 20,
  },
  iconBackground: {
    width: 96,
    height: 96,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
  },
}); 