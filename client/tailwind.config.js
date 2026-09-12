/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#12100E',
          900: '#181512',
          850: '#201D19',
          800: '#2A2520',
          700: '#38322B',
          600: '#4A433A'
        },
        pastel: {
          yellow: '#FEF08A',
          yellowLight: '#FFFBEB',
          yellowDark: '#FDE047',
          green: '#A7F3D0',
          greenLight: '#ECFDF5',
          greenDark: '#6EE7B7',
          peach: '#FED7AA',
          peachLight: '#FFF7ED',
          peachDark: '#FDBA74',
          pink: '#FBCFE8',
          lavender: '#DDD6FE',
          cream: '#FAF6E9'
        },
        banana: {
          50: '#FEFCE8',
          100: '#FEF9C3',
          200: '#FEF08A',
          300: '#FDE047',
          400: '#FACC15',
          500: '#FBBF24',
          600: '#D97706',
          700: '#B45309',
          800: '#78350F',
          900: '#451A03'
        }
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        display: ['Bricolage Grotesque', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        body: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}
