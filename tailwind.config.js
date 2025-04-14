/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['../../packages/**/*.{tsx,ts}', '../../apps/**/*.{tsx,ts}', './src/**/*.{tsx,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'rgba(var(--primary), <alpha-value>)',
          light: 'rgba(var(--primary-light), <alpha-value>)',
        },

        background: {
          DEFAULT: 'rgba(var(--background), <alpha-value>)',
        },

        'main-bold': {
          DEFAULT: 'rgba(var(--main-bold), <alpha-value>)',
        },

        foreground: {
          1: 'rgba(var(--text-gray-1), <alpha-value>)',
          2: 'rgba(var(--text-gray-2), <alpha-value>)',
          3: 'rgba(var(--text-gray-3), <alpha-value>)',
        },

        dark: {
          1: 'rgba(var(--dark-1), <alpha-value>)',
          2: 'rgba(var(--dark-2), <alpha-value>)',
          3: 'rgba(var(--dark-3), <alpha-value>)',
        },

        light: {
          1: 'rgba(var(--light-1), <alpha-value>)',
          2: 'rgba(var(--light-2), <alpha-value>)',
        },

        gray: {
          25: 'rgba(var(--gray-25), <alpha-value>)',
          50: 'rgba(var(--gray-50), <alpha-value>)',
          100: 'rgba(var(--gray-100), <alpha-value>)',
          200: 'rgba(var(--gray-200), <alpha-value>)',
          300: 'rgba(var(--gray-300), <alpha-value>)',
          400: 'rgba(var(--gray-400), <alpha-value>)',
          500: 'rgba(var(--gray-500), <alpha-value>)',
          600: 'rgba(var(--gray-600), <alpha-value>)',
          700: 'rgba(var(--gray-700), <alpha-value>)',
          800: 'rgba(var(--gray-800), <alpha-value>)',
          900: 'rgba(var(--gray-900), <alpha-value>)',
        },

        danger: {
          25: 'rgba(var(--danger-25), <alpha-value>)',
          50: 'rgba(var(--danger-50), <alpha-value>)',
          100: 'rgba(var(--danger-100), <alpha-value>)',
          200: 'rgba(var(--danger-200), <alpha-value>)',
          300: 'rgba(var(--danger-300), <alpha-value>)',
          400: 'rgba(var(--danger-400), <alpha-value>)',
          500: 'rgba(var(--danger-500), <alpha-value>)',
          600: 'rgba(var(--danger-600), <alpha-value>)',
          700: 'rgba(var(--danger-700), <alpha-value>)',
          800: 'rgba(var(--danger-800), <alpha-value>)',
          900: 'rgba(var(--danger-900), <alpha-value>)',
        },

        info: {
          25: 'rgba(var(--info-25), <alpha-value>)',
          50: 'rgba(var(--info-50), <alpha-value>)',
          100: 'rgba(var(--info-100), <alpha-value>)',
          200: 'rgba(var(--info-200), <alpha-value>)',
          300: 'rgba(var(--info-300), <alpha-value>)',
          400: 'rgba(var(--info-400), <alpha-value>)',
          500: 'rgba(var(--info-500), <alpha-value>)',
          600: 'rgba(var(--info-600), <alpha-value>)',
          700: 'rgba(var(--info-700), <alpha-value>)',
          800: 'rgba(var(--info-800), <alpha-value>)',
          900: 'rgba(var(--info-900), <alpha-value>)',
        },

        success: {
          25: 'rgba(var(--success-25), <alpha-value>)',
          50: 'rgba(var(--success-50), <alpha-value>)',
          100: 'rgba(var(--success-100), <alpha-value>)',
          200: 'rgba(var(--success-200), <alpha-value>)',
          300: 'rgba(var(--success-300), <alpha-value>)',
          400: 'rgba(var(--success-400), <alpha-value>)',
          500: 'rgba(var(--success-500), <alpha-value>)',
          600: 'rgba(var(--success-600), <alpha-value>)',
          700: 'rgba(var(--success-700), <alpha-value>)',
          800: 'rgba(var(--success-800), <alpha-value>)',
          900: 'rgba(var(--success-900), <alpha-value>)',
        },

        warning: {
          25: 'rgba(var(--warning-25), <alpha-value>)',
          50: 'rgba(var(--warning-50), <alpha-value>)',
          100: 'rgba(var(--warning-100), <alpha-value>)',
          200: 'rgba(var(--warning-200), <alpha-value>)',
          300: 'rgba(var(--warning-300), <alpha-value>)',
          400: 'rgba(var(--warning-400), <alpha-value>)',
          500: 'rgba(var(--warning-500), <alpha-value>)',
          600: 'rgba(var(--warning-600), <alpha-value>)',
          700: 'rgba(var(--warning-700), <alpha-value>)',
          800: 'rgba(var(--warning-800), <alpha-value>)',
          900: 'rgba(var(--warning-900), <alpha-value>)',
        },
      },
      spacing: {
        7.5: '30px',
      },
    },
  },
};
