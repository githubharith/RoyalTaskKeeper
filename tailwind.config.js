/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'royal': {
          brown: '#8B5E3C',
          'brown-light': '#A67C5A',
          'brown-dark': '#6B4423',
          gold: '#FFD700',
          'gold-light': '#FFED4E',
          'gold-dark': '#B8860B',
          blue: '#4169E1',
          'blue-light': '#6495ED',
          'blue-dark': '#191970',
          crimson: '#DC143C',
          'crimson-light': '#F08080',
          'crimson-dark': '#8B0000',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-subtle': 'bounceSubtle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-3px)' },
          '60%': { transform: 'translateY(-1px)' },
        }
      }
    },
  },
  plugins: [],
}