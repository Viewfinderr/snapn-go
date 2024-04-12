import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        custom: ["Montserrat", "sans-serif"],
      },
      colors: {
        grayBorder: "#D0D5DD",
        greenButton: "#174F2C",
        greenNav: "#A0C92C",
        fontDesktop: "#FFC130",
        bgSliderDesktop: "#A0C92C"
      },
    },
  },
  plugins: [],
};
export default config;
