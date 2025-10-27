/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        gold: 'var(--gd-gold)',
        'neon-yellow': 'var(--gd-neon-yellow)',
        'neon-pink': 'var(--gd-neon-pink)',
        'neon-cyan': 'var(--gd-neon-cyan)',
        black: 'var(--gd-black)',
        grey: 'var(--gd-grey)',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
}
