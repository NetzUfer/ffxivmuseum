module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        cormorant: ['Cormorant', 'serif'],
        eorzea: ['Cinzel', 'Cormorant', 'serif'],
      },
      colors: {
        'eorzea-dark': 'var(--color-eorzea-dark)',
        'eorzea-darker': 'var(--color-eorzea-darker)',
        'eorzea-light': 'var(--color-eorzea-light)',
        'eorzea-gold': 'var(--color-eorzea-gold)',
        'eorzea-green': 'var(--color-eorzea-green)',
        'eorzea-blue': 'var(--color-eorzea-blue)',
        'eorzea-accent': 'var(--color-eorzea-accent)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { opacity: 0, transform: 'translateX(-100%)' },
          '50%': { opacity: 0.5 },
          '100%': { opacity: 0, transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
};
