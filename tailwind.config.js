module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'eorzea': {
          dark: '#0a1428',
          darker: '#060d1a',
          light: '#e8e0d0',
          gold: '#c9a66b',
          green: '#2a5c45',
          blue: '#3a5e8c',
          accent: '#9e7eb9',
        },
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        nunito: ['Nunito', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s infinite alternate',
        'shimmer': 'shimmer 3s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { textShadow: '0 0 10px rgba(201, 166, 107, 0.5)' },
          '100%': { textShadow: '0 0 20px rgba(201, 166, 107, 0.8), 0 0 30px rgba(201, 166, 107, 0.6)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)', opacity: 0 },
          '50%': { opacity: 0.5 },
          '100%': { transform: 'translateX(100%)', opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};
