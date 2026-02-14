import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        dancing: ['"Dancing Script"', 'cursive'],
        inter: ['Inter', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif'],
      },
      colors: {
        romantic: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      typography: (theme) => ({
        romantic: {
          css: {
            '--tw-prose-body': theme('colors.slate[700]'),
            '--tw-prose-headings': theme('colors.romantic[700]'),
            '--tw-prose-lead': theme('colors.slate[600]'),
            '--tw-prose-links': theme('colors.romantic[600]'),
            '--tw-prose-bold': theme('colors.romantic[800]'),
            '--tw-prose-counters': theme('colors.romantic[500]'),
            '--tw-prose-bullets': theme('colors.romantic[300]'),
            '--tw-prose-hr': theme('colors.romantic[100]'),
            '--tw-prose-quotes': theme('colors.romantic[900]'),
            '--tw-prose-quote-borders': theme('colors.romantic[200]'),
            '--tw-prose-captions': theme('colors.slate[500]'),
            '--tw-prose-code': theme('colors.romantic[900]'),
            '--tw-prose-pre-code': theme('colors.romantic[100]'),
            '--tw-prose-pre-bg': theme('colors.romantic[900]'),
            '--tw-prose-th-borders': theme('colors.romantic[300]'),
            '--tw-prose-td-borders': theme('colors.romantic[200]'),
          },
        },
      }),
    },
  },
  plugins: [typography],
};
