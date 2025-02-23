import colors from 'tailwindcss/colors'
import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: '#F1F1F1',
      gray: '#161616',
      orange: '#FF9653',
      purple: '#CAABD1',
      green: '#90D1BD',
      yellow: '#F7ED56',
      pink: '#EC1380',
      slate: colors.slate,
      zinc: '#AFAFAF',
      error: '#CC3125',
    },

    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      lineHeight: {
        '12': '3rem',
        '13': '3.5rem',
        '14': '4rem',
        '16': '5rem'
      },
      fontFamily: {
        sans: ['Fira Sans', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        xxs: '10px',
        '2xxl': ['28px', '40px'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      perspective: {
        DEFAULT: '1000px',
      },
      transform: {
        'rotate-y-180': 'rotateY(180deg)',
      },
      transformStyle: {
        '3d': 'preserve-3d',
      },
      backface: {
        hidden: 'hidden',
      },
    },
  },
  plugins: [],
}
