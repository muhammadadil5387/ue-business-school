import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ue: {
          navy: "#0d2b45",
          "navy-dark": "#081c2d",
          "navy-light": "#1a4266",
          maroon: "#800020",
          "maroon-dark": "#5a0016",
          gold: "#d4af37",
          "gold-light": "#f4e091",
        },
      },
    },
  },
  plugins: [],
};
export default config;
