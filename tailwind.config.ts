import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'custom': ['Montserrat', 'sans-serif'],
      },
      colors:{
        'grayBorder': '#64748B',
        'greenButton': '#174F2C',
        'greenNav':'#A0C92C',
      }
    },
  },
  plugins: [],
};
export default config;
