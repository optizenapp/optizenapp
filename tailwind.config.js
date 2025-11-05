/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        // Optizen Brand Colors - Exact brand colors
        'optizen-blue': {
          50: '#e6f4fe',
          100: '#cce9fd',
          200: '#99d3fb',
          300: '#66bdf9',
          400: '#33a7f7',
          500: '#0577E9', // Exact brand blue
          600: '#0460ba',
          700: '#03488b',
          800: '#02305c',
          900: '#01182e',
        },
        'optizen-green': {
          50: '#edfce8',
          100: '#daf9d0',
          200: '#b5f3a1',
          300: '#90ed72',
          400: '#6be743',
          500: '#38D202', // Exact brand green
          600: '#2da802',
          700: '#227e01',
          800: '#165401',
          900: '#0b2a00',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}



