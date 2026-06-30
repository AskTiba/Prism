import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        beige: '#f8f4f0',
        grey: {
          100: '#f2f2f2',
          300: '#b3b3b3',
          500: '#696868',
          700: '#4a494b',
          800: '#2d2c31',
          850: '#262529',
          900: '#201f24',
        },
        green: '#277c78',
        red: '#c94736',
        yellow: '#f2cdac',
        cyan: '#82c9d7',
        navy: '#626070',
        purple: '#826cb0',
      },
      fontFamily: {
        sans: ['"Public Sans"', 'system-ui', 'sans-serif'],
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        'tablet': '600px',
        'desktop': '1024px',
      },
    },
  },
  plugins: [],
}

export default config
