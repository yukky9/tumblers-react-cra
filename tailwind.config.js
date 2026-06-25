/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Manrope', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'Inter', 'system-ui', 'sans-serif']
      },
      colors: {
        factory: {
          50: '#f4fbf7',
          100: '#dcf5e8',
          200: '#bcebd3',
          300: '#8edab7',
          400: '#59bf93',
          500: '#31a775',
          600: '#23865d',
          700: '#1f6b4e',
          800: '#1d5540',
          900: '#194737',
          950: '#08271d'
        },
        graphite: {
          50: '#f6f7f9',
          100: '#eceff3',
          200: '#d6dce5',
          300: '#b3becd',
          400: '#8a9aad',
          500: '#6b7d91',
          600: '#556477',
          700: '#465263',
          800: '#3c4654',
          900: '#222933',
          950: '#111722'
        }
      },
      boxShadow: {
        soft: '0 24px 70px rgba(15, 23, 42, 0.14)',
        glow: '0 0 0 1px rgba(49, 167, 117, 0.22), 0 28px 80px rgba(49, 167, 117, 0.22)'
      },
      backgroundImage: {
        'grid-dark': 'linear-gradient(rgba(255,255,255,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.055) 1px, transparent 1px)',
        mesh: 'radial-gradient(circle at 10% 20%, rgba(49, 167, 117, .22), transparent 28%), radial-gradient(circle at 82% 10%, rgba(20, 184, 166, .18), transparent 24%), radial-gradient(circle at 80% 76%, rgba(148, 163, 184, .16), transparent 30%)'
      }
    }
  },
  plugins: []
};
