import type { Config } from 'tailwindcss';

const createPxEntries = (size: number) => {
  return {
    0: '0',
    ...Array.from(Array(size + 1)).reduce((accumulator, _, i) => {
      return { ...accumulator, [`${i * 4}`]: `${i * 4}px` };
    }),
  };
};

const PX_ENTRIES = createPxEntries(500);

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      md: { min: '768px' },
      lg: { min: '1024px' },
    },
    zIndex: {
      base: '1',
      nav: '2',
      dropdown: '10',
      popup: '999',
      floating: '1000',
    },
    extend: {
      spacing: PX_ENTRIES,
      fontFamily: {
        pretendard: ['Pretendard'],
      },
      colors: {
        'var-black': '#000000',
        'var-white': '#FFFFFF',
        'var-orange-50': '#FFF7ED',
        'var-orange-100': '#FFEDD5',
        'var-orange-200': '#FED7AA',
        'var-orange-300': '#FDBA74',
        'var-orange-400': '#FB923C',
        'var-orange-500': '#F97316',
        'var-orange-600': '#EA580C',
        'var-orange-700': '#C2410C',
        'var-orange-800': '#9A3412',
        'var-orange-900': '#7C2D12',
        'var-orange-950': '#431407',
        'var-gray-50': '#F9FAFB',
        'var-gray-100': '#F3F4F6',
        'var-gray-200': '#E5E7EB',
        'var-gray-300': '#D1D5DB',
        'var-gray-400': '#9CA3AF',
        'var-gray-500': '#6B7280',
        'var-gray-600': '#4B5563',
        'var-gray-700': '#374151',
        'var-gray-800': '#1F2937',
        'var-gray-900': '#111827',
        'var-gray-950': '#030712',
        'var-red': '#DC2626',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontSize: {
        12: ['1.2rem', '1.6rem'],
        14: ['1.4rem', '2rem'],
        16: ['1.6rem', '2.4rem'],
        18: ['1.8rem', '2.8rem'],
        20: ['2.0rem', '2.8rem'],
        24: ['2.4rem', '3.2rem'],
        30: ['3rem', '3.6rem'],
      },
      keyframes: {
        heartPulse: {
          '0%': { transform: 'scale(0.8)' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
        bounce: {
          '0%': { transform: 'translateY(0px)' },
          '37%': { transform: 'translateY(5px)' },
          '55%': { transform: 'translateY(0px)' },
          '73%': { transform: 'translateY(4px)' },
          '82%': { transform: 'translateY(0px)' },
          '91%': { transform: 'translateY(2px)' },
          '96%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(0px)' },
        },
      },
      animation: {
        heartPulse: 'heartPulse 0.4s ease-in-out',
        bounce: 'bounce 0.5s ease-out 0.25s',
      },
    },
  },
  plugins: [],
};
export default config;
