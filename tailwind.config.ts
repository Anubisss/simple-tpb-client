import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: ['text-black', 'text-green-500', 'text-pink-500', 'text-red-500', 'font-bold'],
};

export default config;
