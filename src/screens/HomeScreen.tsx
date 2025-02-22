import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  ScrollView,
  FlatList,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import axios from 'axios';
import { colors } from '../theme/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  withTiming,
  withSequence,
  runOnJS,
} from 'react-native-reanimated';
import { useTheme } from '../theme/ThemeContext';
import { useLanguage } from '../i18n/LanguageContext';
import { countryToCurrency } from '../utils/currencyData';
import { Ionicons } from '@expo/vector-icons';

const API_KEY = '062578696d00dab96b6c2855'; // You'll need to replace this with a real API key
const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';

// Currency to country code mapping
const currencyToCountry: Record<string, string> = {
  USD: 'us', AED: 'ae', AFN: 'af', ALL: 'al', AMD: 'am', ANG: 'cw', AOA: 'ao',
  ARS: 'ar', AUD: 'au', AWG: 'aw', AZN: 'az', BAM: 'ba', BBD: 'bb', BDT: 'bd',
  BGN: 'bg', BHD: 'bh', BIF: 'bi', BMD: 'bm', BND: 'bn', BOB: 'bo', BRL: 'br',
  BSD: 'bs', BWP: 'bw', BYN: 'by', BZD: 'bz', CAD: 'ca', CDF: 'cd', CHF: 'ch',
  CLP: 'cl', CNY: 'cn', COP: 'co', CRC: 'cr', CUP: 'cu', CVE: 'cv', CZK: 'cz',
  DJF: 'dj', DKK: 'dk', DOP: 'do', DZD: 'dz', EGP: 'eg', ERN: 'er', ETB: 'et',
  EUR: 'eu', FJD: 'fj', FKP: 'fk', GBP: 'gb', GEL: 'ge', GHS: 'gh', GIP: 'gi',
  GMD: 'gm', GNF: 'gn', GTQ: 'gt', GYD: 'gy', HKD: 'hk', HNL: 'hn', HRK: 'hr',
  HTG: 'ht', HUF: 'hu', IDR: 'id', ILS: 'il', INR: 'in', IQD: 'iq', IRR: 'ir',
  ISK: 'is', JMD: 'jm', JOD: 'jo', JPY: 'jp', KES: 'ke', KGS: 'kg', KHR: 'kh',
  KMF: 'km', KRW: 'kr', KWD: 'kw', KYD: 'ky', KZT: 'kz', LAK: 'la', LBP: 'lb',
  LKR: 'lk', LRD: 'lr', LSL: 'ls', LYD: 'ly', MAD: 'ma', MDL: 'md', MGA: 'mg',
  MKD: 'mk', MMK: 'mm', MNT: 'mn', MOP: 'mo', MRU: 'mr', MUR: 'mu', MVR: 'mv',
  MWK: 'mw', MXN: 'mx', MYR: 'my', MZN: 'mz', NAD: 'na', NGN: 'ng', NIO: 'ni',
  NOK: 'no', NPR: 'np', NZD: 'nz', OMR: 'om', PAB: 'pa', PEN: 'pe', PGK: 'pg',
  PHP: 'ph', PKR: 'pk', PLN: 'pl', PYG: 'py', QAR: 'qa', RON: 'ro', RSD: 'rs',
  RUB: 'ru', RWF: 'rw', SAR: 'sa', SBD: 'sb', SCR: 'sc', SDG: 'sd', SEK: 'se',
  SGD: 'sg', SHP: 'sh', SLE: 'sl', SOS: 'so', SRD: 'sr', SSP: 'ss', STN: 'st',
  SYP: 'sy', SZL: 'sz', THB: 'th', TJS: 'tj', TMT: 'tm', TND: 'tn', TOP: 'to',
  TRY: 'tr', TTD: 'tt', TWD: 'tw', TZS: 'tz', UAH: 'ua', UGX: 'ug', UYU: 'uy',
  UZS: 'uz', VES: 've', VND: 'vn', VUV: 'vu', WST: 'ws', XAF: 'cm', XCD: 'ag',
  XOF: 'sn', XPF: 'pf', YER: 'ye', ZAR: 'za', ZMW: 'zm', ZWL: 'zw'
};

interface ExchangeRates {
  [key: string]: number;
}

interface ApiResponse {
  rates: ExchangeRates;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const BUTTON_WIDTH = 100; // minWidth of currency button
const BUTTON_MARGIN = 8; // marginRight of currency button

const CurrencyButton = ({ 
  currency, 
  selected, 
  onPress, 
  theme 
}: { 
  currency: string; 
  selected: boolean; 
  onPress: () => void; 
  theme: typeof colors;
}) => {
  const countryCode = currencyToCountry[currency]?.toLowerCase();
  const flagUrl = countryCode ? `https://flagcdn.com/w40/${countryCode}.png` : null;

  return (
    <TouchableOpacity
      style={[
        styles.currencyButton,
        {
          backgroundColor: selected ? theme.primary : theme.background,
          borderColor: selected ? theme.primary : theme.lightGray,
        },
      ]}
      onPress={onPress}
    >
      {flagUrl && (
        <Image
          source={{ uri: flagUrl }}
          style={styles.flagImage}
          resizeMode="contain"
        />
      )}
      <Text
        style={[
          styles.currencyButtonText,
          { 
            color: selected ? theme.white : theme.text,
            marginLeft: flagUrl ? 8 : 0,
          },
        ]}
      >
        {currency}
      </Text>
    </TouchableOpacity>
  );
};

const CurrencyList = ({
  data,
  selectedCurrency,
  onSelect,
  theme,
  placeholder = "Search currency",
}: {
  data: string[];
  selectedCurrency: string;
  onSelect: (currency: string) => void;
  theme: typeof colors;
  placeholder?: string;
}) => {
  const flatListRef = useRef<FlatList>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const initialScrollDone = useRef(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const scrollToSelected = useCallback(() => {
    if (!selectedCurrency || searchQuery) return;

    const selectedIndex = filteredData.indexOf(selectedCurrency);
    if (selectedIndex === -1) return;

    // Calculate the center offset
    const itemWidth = BUTTON_WIDTH + BUTTON_MARGIN;
    const screenWidth = SCREEN_WIDTH;
    const centerOffset = (screenWidth - itemWidth) / 2;
    const scrollPosition = itemWidth * selectedIndex - centerOffset;

    // Ensure we don't scroll past the bounds
    const maxScroll = itemWidth * filteredData.length - screenWidth;
    const finalOffset = Math.max(0, Math.min(scrollPosition, maxScroll));

    requestAnimationFrame(() => {
      flatListRef.current?.scrollToOffset({
        offset: finalOffset,
        animated: true
      });
    });
  }, [selectedCurrency, filteredData, searchQuery]);

  // Initial scroll to selected currency
  useEffect(() => {
    if (!initialScrollDone.current && filteredData.length > 0) {
      initialScrollDone.current = true;
      scrollToSelected();
    }
  }, [filteredData, scrollToSelected]);

  // Scroll when selected currency changes
  useEffect(() => {
    if (initialScrollDone.current && !searchQuery) {
      scrollToSelected();
    }
  }, [selectedCurrency, scrollToSelected]);

  const handleSearch = useCallback((text: string) => {
    setSearchQuery(text);
    if (!text.trim()) {
      setFilteredData(data);
      // Reset scroll position after search is cleared
      setTimeout(scrollToSelected, 100);
    } else {
      const searchTerm = text.toLowerCase().trim();
      const filtered = data.filter(currency => {
        if (currency.toLowerCase().includes(searchTerm)) {
          return true;
        }

        const countryMatch = Object.entries(countryToCurrency).find(
          ([_, code]) => code === currency
        );

        if (countryMatch) {
          const [countryName] = countryMatch;
          return countryName.toLowerCase().includes(searchTerm);
        }

        return false;
      });
      setFilteredData(filtered);
      
      // Force layout update on Android
      if (Platform.OS === 'android') {
        setTimeout(() => {
          flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
          requestAnimationFrame(() => {
            if (filtered.length > 0) {
              const selectedIndex = filtered.indexOf(selectedCurrency);
              const firstResultIndex = 0;
              const indexToUse = selectedIndex >= 0 ? selectedIndex : firstResultIndex;
              
              const itemWidth = BUTTON_WIDTH + BUTTON_MARGIN;
              const screenWidth = SCREEN_WIDTH;
              const centerOffset = (screenWidth - itemWidth) / 2;
              const scrollPosition = itemWidth * indexToUse - centerOffset;
              
              flatListRef.current?.scrollToOffset({
                offset: Math.max(0, scrollPosition),
                animated: true
              });
            }
          });
        }, 50);
      }
    }
    setRefreshTrigger(prev => prev + 1);
  }, [data, scrollToSelected, selectedCurrency]);

  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
    setFilteredData(data);
    // Reset scroll position after clearing search
    setTimeout(scrollToSelected, 100);
  }, [data, scrollToSelected]);

  const handleSelectCurrency = useCallback((currency: string) => {
    Keyboard.dismiss();
    onSelect(currency);
    setSearchQuery("");
    setFilteredData(data);
    // Scroll to the newly selected currency
    setTimeout(scrollToSelected, 100);
  }, [onSelect, data, scrollToSelected]);

  return (
    <View style={{ marginBottom: 20 }}>
      <View style={styles.searchInputContainer}>
        <TextInput
          style={[
            styles.searchInput,
            {
              backgroundColor: theme.background,
              color: theme.text,
              borderColor: theme.lightGray,
            },
          ]}
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder={placeholder}
          placeholderTextColor={theme.lightGray}
          returnKeyType="done"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClearSearch}
          >
            <Ionicons name="close-circle" size={20} color={theme.gray} />
          </TouchableOpacity>
        )}
      </View>
      <View style={[styles.listContainer, { backgroundColor: theme.card }]}>
        <FlatList
          ref={flatListRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={filteredData}
          extraData={[searchQuery, refreshTrigger]}
          keyExtractor={(item) => `${item}-${refreshTrigger}`}
          renderItem={({ item }) => (
            <CurrencyButton
              currency={item}
              selected={selectedCurrency === item}
              onPress={() => handleSelectCurrency(item)}
              theme={theme}
            />
          )}
          style={[styles.currencyList, { minHeight: 70 }]}
          contentContainerStyle={[
            styles.currencyListContent,
            filteredData.length === 0 && { flex: 1, justifyContent: 'center' }
          ]}
          getItemLayout={(_, index) => ({
            length: BUTTON_WIDTH + BUTTON_MARGIN,
            offset: (BUTTON_WIDTH + BUTTON_MARGIN) * index,
            index,
          })}
          ListEmptyComponent={() => (
            <Text style={[styles.emptyText, { color: theme.gray }]}>
              No currencies found
            </Text>
          )}
          removeClippedSubviews={false}
          initialNumToRender={20}
          maxToRenderPerBatch={20}
          windowSize={10}
          updateCellsBatchingPeriod={10}
          keyboardShouldPersistTaps="always"
          decelerationRate="fast"
          snapToAlignment="center"
        />
        <LinearGradient
          colors={[theme.card, `${theme.card}00`]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            styles.fadeLeft,
            Platform.OS === 'android' && { elevation: 0 }
          ]}
          pointerEvents="none"
        />
        <LinearGradient
          colors={[`${theme.card}00`, theme.card]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            styles.fadeRight,
            Platform.OS === 'android' && { elevation: 0 }
          ]}
          pointerEvents="none"
        />
      </View>
    </View>
  );
};

const SwapButton = ({ onPress, theme, isAnimating }: { onPress: () => void; theme: typeof colors; isAnimating: boolean }) => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (isAnimating) {
      rotation.value = withSequence(
        withSpring(rotation.value + 180)
      );
    }
  }, [isAnimating]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  }, []);

  return (
    <TouchableOpacity
      style={[styles.swapButton, { backgroundColor: theme.background }]}
      onPress={onPress}
    >
      <Animated.Text style={[styles.swapButtonText, { color: theme.primary }, animatedStyle]}>
        ⇅
      </Animated.Text>
    </TouchableOpacity>
  );
};

export default function HomeScreen() {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();
  const [isSwapping, setIsSwapping] = useState(false);
  const fromAnimation = useSharedValue(0);
  const toAnimation = useSharedValue(0);
  const lastFetchRef = useRef<number>(0);

  // Load saved currencies
  useEffect(() => {
    const loadSavedCurrencies = async () => {
      try {
        const savedFrom = await AsyncStorage.getItem('fromCurrency');
        const savedTo = await AsyncStorage.getItem('toCurrency');
        
        if (savedFrom) setFromCurrency(savedFrom);
        if (savedTo) setToCurrency(savedTo);
      } catch (error) {
        console.error('Error loading saved currencies:', error);
      }
    };

    loadSavedCurrencies();
  }, []);

  // Save currency selections when they change
  useEffect(() => {
    const saveCurrencySelections = async () => {
      try {
        await AsyncStorage.setItem('fromCurrency', fromCurrency);
        await AsyncStorage.setItem('toCurrency', toCurrency);
      } catch (error) {
        console.error('Error saving currency selections:', error);
      }
    };

    saveCurrencySelections();
  }, [fromCurrency, toCurrency]);

  const fetchExchangeRates = async () => {
    try {
      const response = await axios.get<ApiResponse>(API_URL);
      setExchangeRates(response.data.rates);
      setLoading(false);
      lastFetchRef.current = Date.now();
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRates();

    // Refresh rates every hour if the app is still open
    const intervalId = setInterval(() => {
      const timeSinceLastFetch = Date.now() - lastFetchRef.current;
      if (timeSinceLastFetch >= 3600000) { // 1 hour in milliseconds
        fetchExchangeRates();
      }
    }, 3600000);

    return () => clearInterval(intervalId);
  }, []);

  const convertCurrency = () => {
    if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) return 0;
    const amountNum = parseFloat(amount) || 0;
    const rate = (exchangeRates[toCurrency] / exchangeRates[fromCurrency]);
    return (amountNum * rate).toFixed(2);
  };

  const handleSwapCurrencies = () => {
    setIsSwapping(true);
    const tempFrom = fromCurrency;
    const tempTo = toCurrency;
    
    fromAnimation.value = withSequence(
      withSpring(1, { damping: 15 }, (finished) => {
        if (finished) {
          runOnJS(setFromCurrency)(tempTo);
          fromAnimation.value = 0;
        }
      })
    );

    toAnimation.value = withSequence(
      withSpring(1, { damping: 15 }, (finished) => {
        if (finished) {
          runOnJS(setToCurrency)(tempFrom);
          toAnimation.value = 0;
          runOnJS(setIsSwapping)(false);
        }
      })
    );
  };

  const fromAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            fromAnimation.value,
            [0, 0.5, 1],
            [0, -50, 0]
          ),
        },
      ],
      opacity: interpolate(
        fromAnimation.value,
        [0, 0.5, 1],
        [1, 0.5, 1]
      ),
    };
  }, []);

  const toAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            toAnimation.value,
            [0, 0.5, 1],
            [0, 50, 0]
          ),
        },
      ],
      opacity: interpolate(
        toAnimation.value,
        [0, 0.5, 1],
        [1, 0.5, 1]
      ),
    };
  }, []);

  const handleClearAmount = () => {
    setAmount('');
  };

  if (loading) {
    return (
      <View style={[
        styles.container,
        {
          backgroundColor: theme.background,
          paddingTop: Platform.OS === 'ios' ? 20 : insets.top,
          justifyContent: 'center',
          alignItems: 'center',
        }
      ]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView 
        style={[styles.container, { backgroundColor: theme.background }]}
        contentContainerStyle={{ 
          paddingTop: Platform.OS === 'ios' ? 20 : insets.top,
          paddingBottom: insets.bottom + 20,
        }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.label, { color: theme.text }]}>{t('home.amount')}</Text>
          <View style={styles.searchInputContainer}>
            <TextInput
              style={[styles.input, { color: theme.text, backgroundColor: theme.background }]}
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholder={t('home.enterAmount')}
              placeholderTextColor={theme.lightGray}
            />
          </View>

          <Text style={[styles.label, { color: theme.text }]}>{t('home.from')}</Text>
          <Animated.View style={fromAnimatedStyle}>
            <CurrencyList
              data={Object.keys(exchangeRates)}
              selectedCurrency={fromCurrency}
              onSelect={setFromCurrency}
              theme={theme}
              placeholder={t('home.searchFrom')}
            />
          </Animated.View>

          <View style={styles.swapButtonContainer}>
            <SwapButton onPress={handleSwapCurrencies} theme={theme} isAnimating={isSwapping} />
          </View>

          <Text style={[styles.label, { color: theme.text }]}>{t('home.to')}</Text>
          <Animated.View style={toAnimatedStyle}>
            <CurrencyList
              data={Object.keys(exchangeRates)}
              selectedCurrency={toCurrency}
              onSelect={setToCurrency}
              theme={theme}
              placeholder={t('home.searchTo')}
            />
          </Animated.View>

          <View style={styles.resultContainer}>
            <Text style={[styles.resultText, { color: theme.text }]}>
              {amount} {fromCurrency} = 
            </Text>
            <Text style={[styles.convertedAmount, { color: theme.primary }]}>
              {convertCurrency()} {toCurrency}
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    flex: 1,
    borderWidth: 1,
    ...Platform.select({
      android: {
        paddingVertical: 8,
      },
    }),
  },
  resultContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  resultText: {
    fontSize: 18,
    marginBottom: 8,
  },
  convertedAmount: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  button: {
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  currencyList: {
    flex: 1,
    minHeight: 60,
  },
  currencyListContent: {
    paddingHorizontal: 20,
    paddingVertical: 4,
    flexGrow: 0,
  },
  currencyButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    minWidth: 100,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  currencyButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  flagImage: {
    width: 24,
    height: 16,
  },
  swapButtonContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  swapButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
  swapButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchInputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  searchInput: {
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 14,
    borderWidth: 1,
    flex: 1,
    ...Platform.select({
      android: {
        paddingVertical: 8,
      },
    }),
  },
  clearButton: {
    position: 'absolute',
    right: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    zIndex: 1,
  },
  listContainer: {
    height: 70,
    marginHorizontal: -20,
    ...Platform.select({
      android: {
        elevation: 0,
      },
    }),
  },
  fadeLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 60,
    ...Platform.select({
      android: {
        elevation: 0,
      },
    }),
  },
  fadeRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 60,
    ...Platform.select({
      android: {
        elevation: 0,
      },
    }),
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
}); 