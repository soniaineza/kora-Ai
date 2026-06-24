export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        kora: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 1px 2px 0 rgb(0 0 0 / 0.03), 0 1px 6px -1px rgb(0 0 0 / 0.02)',
        'soft-lg': '0 4px 6px -1px rgb(0 0 0 / 0.03), 0 2px 4px -2px rgb(0 0 0 / 0.02)',
        'glow': '0 0 0 2px rgba(249, 115, 22, 0.12)',
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.03)',
        'card-hover': '0 4px 12px 0 rgb(0 0 0 / 0.06), 0 2px 4px -2px rgb(0 0 0 / 0.03)',
      },
    },
  },
  plugins: [],
}
