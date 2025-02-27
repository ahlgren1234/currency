// Currency to country code mapping
export const currencyToCountry: Record<string, string> = {
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

// Country names to currency codes mapping
export const countryToCurrency: Record<string, string> = {
  'United States': 'USD',
  'United Arab Emirates': 'AED',
  'Afghanistan': 'AFN',
  'Albania': 'ALL',
  'Armenia': 'AMD',
  'Netherlands Antilles': 'ANG',
  'Angola': 'AOA',
  'Argentina': 'ARS',
  'Australia': 'AUD',
  'Aruba': 'AWG',
  'Azerbaijan': 'AZN',
  'Bosnia and Herzegovina': 'BAM',
  'Barbados': 'BBD',
  'Bangladesh': 'BDT',
  'Bulgaria': 'BGN',
  'Bahrain': 'BHD',
  'Burundi': 'BIF',
  'Bermuda': 'BMD',
  'Brunei': 'BND',
  'Bolivia': 'BOB',
  'Brazil': 'BRL',
  'Bahamas': 'BSD',
  'Botswana': 'BWP',
  'Belarus': 'BYN',
  'Belize': 'BZD',
  'Canada': 'CAD',
  'DR Congo': 'CDF',
  'Switzerland': 'CHF',
  'Chile': 'CLP',
  'China': 'CNY',
  'Colombia': 'COP',
  'Costa Rica': 'CRC',
  'Cuba': 'CUP',
  'Cape Verde': 'CVE',
  'Czech Republic': 'CZK',
  'Djibouti': 'DJF',
  'Denmark': 'DKK',
  'Dominican Republic': 'DOP',
  'Algeria': 'DZD',
  'Egypt': 'EGP',
  'Eritrea': 'ERN',
  'Ethiopia': 'ETB',
  'European Union': 'EUR',
  'Fiji': 'FJD',
  'Falkland Islands': 'FKP',
  'United Kingdom': 'GBP',
  'Georgia': 'GEL',
  'Ghana': 'GHS',
  'Gibraltar': 'GIP',
  'Gambia': 'GMD',
  'Guinea': 'GNF',
  'Guatemala': 'GTQ',
  'Guyana': 'GYD',
  'Hong Kong': 'HKD',
  'Honduras': 'HNL',
  'Croatia': 'HRK',
  'Haiti': 'HTG',
  'Hungary': 'HUF',
  'Indonesia': 'IDR',
  'Israel': 'ILS',
  'India': 'INR',
  'Iraq': 'IQD',
  'Iran': 'IRR',
  'Iceland': 'ISK',
  'Jamaica': 'JMD',
  'Jordan': 'JOD',
  'Japan': 'JPY',
  'Kenya': 'KES',
  'Kyrgyzstan': 'KGS',
  'Cambodia': 'KHR',
  'Comoros': 'KMF',
  'South Korea': 'KRW',
  'Kuwait': 'KWD',
  'Cayman Islands': 'KYD',
  'Kazakhstan': 'KZT',
  'Laos': 'LAK',
  'Lebanon': 'LBP',
  'Sri Lanka': 'LKR',
  'Liberia': 'LRD',
  'Lesotho': 'LSL',
  'Libya': 'LYD',
  'Morocco': 'MAD',
  'Moldova': 'MDL',
  'Madagascar': 'MGA',
  'North Macedonia': 'MKD',
  'Myanmar': 'MMK',
  'Mongolia': 'MNT',
  'Macau': 'MOP',
  'Mauritania': 'MRU',
  'Mauritius': 'MUR',
  'Maldives': 'MVR',
  'Malawi': 'MWK',
  'Mexico': 'MXN',
  'Malaysia': 'MYR',
  'Mozambique': 'MZN',
  'Namibia': 'NAD',
  'Nigeria': 'NGN',
  'Nicaragua': 'NIO',
  'Norway': 'NOK',
  'Nepal': 'NPR',
  'New Zealand': 'NZD',
  'Oman': 'OMR',
  'Panama': 'PAB',
  'Peru': 'PEN',
  'Papua New Guinea': 'PGK',
  'Philippines': 'PHP',
  'Pakistan': 'PKR',
  'Poland': 'PLN',
  'Paraguay': 'PYG',
  'Qatar': 'QAR',
  'Romania': 'RON',
  'Serbia': 'RSD',
  'Russia': 'RUB',
  'Rwanda': 'RWF',
  'Saudi Arabia': 'SAR',
  'Solomon Islands': 'SBD',
  'Seychelles': 'SCR',
  'Sudan': 'SDG',
  'Sweden': 'SEK',
  'Singapore': 'SGD',
  'Saint Helena': 'SHP',
  'Sierra Leone': 'SLE',
  'Somalia': 'SOS',
  'Suriname': 'SRD',
  'South Sudan': 'SSP',
  'São Tomé and Príncipe': 'STN',
  'Syria': 'SYP',
  'Eswatini': 'SZL',
  'Thailand': 'THB',
  'Tajikistan': 'TJS',
  'Turkmenistan': 'TMT',
  'Tunisia': 'TND',
  'Tonga': 'TOP',
  'Turkey': 'TRY',
  'Trinidad and Tobago': 'TTD',
  'Taiwan': 'TWD',
  'Tanzania': 'TZS',
  'Ukraine': 'UAH',
  'Uganda': 'UGX',
  'Uruguay': 'UYU',
  'Uzbekistan': 'UZS',
  'Venezuela': 'VES',
  'Vietnam': 'VND',
  'Vanuatu': 'VUV',
  'Samoa': 'WST',
  'Central African Republic': 'XAF',
  'Eastern Caribbean': 'XCD',
  'West African CFA franc': 'XOF',
  'CFP franc': 'XPF',
  'Yemen': 'YER',
  'South Africa': 'ZAR',
  'Zambia': 'ZMW',
  'Zimbabwe': 'ZWL'
}; 