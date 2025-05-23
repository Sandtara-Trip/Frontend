/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "warm-orange": "#FF9F1C",
        "light-orange": "#FFBF69",
        white: "#FFFFFF",
        "light-teal": "#CBF3F0",
        teal: "#2EC4B6",
        grey: "#4B5563",
        "text-gray": "#6B7280",
        "hover-orange": "#FB923C",
        "bg-icon": "#FFD48A",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        sandtara: {
          primary: "#FF9F1C",
          secondary: "#FFBF69",
          accent: "#CBF3F0",
          neutral: "#4B5563",
          "base-100": "#FFFFFF",
          info: "#2EC4B6",
          success: "#22C55E",
          warning: "#FB923C",
          error: "#EF4444",
        },
      },
      "light",
    ],
    base: false,
  },
};
