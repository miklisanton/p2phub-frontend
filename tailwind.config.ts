import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "tangerine": "#DD4124",
      "coffee": "#4B342F",
      "lime": "#DFEF87",
      "olive": "726A4E",

    },
  },
  plugins: [],
};
export default config;
