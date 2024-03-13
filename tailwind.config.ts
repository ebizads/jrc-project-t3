import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      "light",
      "dark",
      "lofi",
      {
        darkTheme: {
          primary: "#f3f4f6",
          secondary: "#383838",
          accent: "#7e7e7e",
          neutral: "#2F2F2F",
          "base-100": "#282828",
          info: "#919191",
          success: "#4BA45C",
          warning: "#EFD98A",
          error: "#E8545C",
        },
      },
    ],
  },
} satisfies Config;
