export default {
  common: {
    back: 'Back',
  },
  home: {
    title: 'Currency Converter',
    subtitle: 'Live Exchange Rates',
    amount: 'Amount',
    from: 'From',
    to: 'To',
    searchFrom: 'Search by currency or country',
    searchTo: 'Search by currency or country',
    enterAmount: 'Enter amount',
  },
  settings: {
    appearance: 'Appearance',
    darkMode: 'Dark Mode',
    colorScheme: 'Color Scheme',
    support: 'Support',
    rateApp: 'Rate App',
    reportBug: 'Report Bug',
    privacyPolicy: 'Privacy Policy',
    about: 'About',
    version: 'Version {{version}}',
    selectLanguage: 'Select Language',
    aboutText: 'A simple and elegant currency converter that helps you convert between different currencies in real-time. Features include live exchange rates, dark mode support, and a beautiful interface with country flags.',
    exchangeRateInfo: 'Exchange rates are updated hourly using data from exchangerate-api.com.',
    supportMe: 'Support Me ☕',
  },
  colorSchemes: {
    orange: 'Orange Sunset',
    purple: 'Royal Purple',
    teal: 'Ocean Teal',
  },
  privacyPolicy: {
    title: 'Privacy Policy',
    introduction: {
      title: 'Introduction',
      content: 'This privacy policy explains how we handle your data in our Currency Converter app. We are committed to protecting your privacy and ensuring you have a positive experience using our app.',
    },
    dataCollection: {
      title: 'Information We Collect',
      content: 'Our app collects minimal data to function properly:',
      items: [
        'App preferences (such as dark mode setting and color scheme)',
        'Currency selections for conversion',
      ],
    },
    dataUsage: {
      title: 'How We Use Your Information',
      content: 'We use your data solely to:',
      items: [
        'Save your app preferences',
        'Remember your most recent currency selections',
        'Improve app functionality and user experience',
      ],
    },
    thirdParty: {
      title: 'Third-Party Services',
      content: 'We use exchangerate-api.com to provide currency conversion rates. When you use our app, you\'re also subject to their privacy policy. We don\'t share any personal information with this service.',
    },
    storage: {
      title: 'Data Storage',
      content: 'All app preferences are stored locally on your device. We don\'t store any data on remote servers.',
    },
    rights: {
      title: 'Your Rights',
      content: 'You can clear all app data at any time by uninstalling the app. This will remove all locally stored preferences.',
    },
    updates: {
      title: 'Updates to This Policy',
      content: 'We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy in the app.',
    },
    contact: {
      title: 'Contact Us',
      content: 'If you have any questions about this privacy policy or our practices, please contact us at support@currencyconverter.com',
    },
    lastUpdated: 'Last updated: {{date}}',
  },
  languages: {
    en: 'English',
    es: 'Spanish',
    sv: 'Swedish',
    th: 'Thai',
  },
  bugReport: {
    title: 'Report Bug',
    description: 'Bug Description',
    descriptionPlaceholder: 'Describe the bug...',
    steps: 'Steps to Reproduce',
    stepsPlaceholder: '1. Open the app\n2. Go to...\n3. Click on...',
    expectedBehavior: 'Expected Behavior',
    expectedBehaviorPlaceholder: 'What should have happened?',
    actualBehavior: 'Actual Behavior',
    actualBehaviorPlaceholder: 'What actually happened?',
    deviceInfo: 'Device Information',
    deviceInfoPlaceholder: 'Device model, OS version...',
    severity: 'Severity',
    severityLevels: {
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      critical: 'Critical'
    },
    submit: 'Submit Bug Report',
    errorNoEmail: 'Could not open email client. Please make sure you have an email app installed.',
    errorGeneral: 'An error occurred while trying to open email client.'
  },
}; 