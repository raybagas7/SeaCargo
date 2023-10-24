import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      translate: {
        "slide-0": "0%",
        "slide-1": "100%",
        "slide-2": "200%",
      },
      screens: {
        semitablet: "1250px",
        tablet: "1001px",
        mobile: "376px",
        md: "768px",
      },
      boxShadow: {
        "huge-up": "0px 4px 3px 0px rgba(0, 0, 0, 0.75)",
        "huge-updark": "0px 4px 3px 0px rgba(255, 255, 255, 0.50)",
        normal: "0px 2px 3px 0px rgba(0, 0, 0, 0.75)",
        "right-shadow": "5px 5px 10px 0px rgba(0, 0, 0, 0.75)",
        "left-shadow": "-5px 5px 10px 0px rgba(0, 0, 0, 0.75)",
        "shadow-base-inset": "0px 0px 5px 0px rgba(0,0,0,0.75) inset",
      },
      colors: {
        "prim-light": "#11C3AD",
        "sec-light": "#9FCEC6",
        "prim-libg": "#FFFFFF",
        "second-libg": "#4FE2B8",
        "prim-litext": "#222831",
        "sec-litext": "#393E46",
        "prim-dark": "#F472B6",
        "sec-dark": "#FF6E31",
        "prim-dkbg": "#2A3447",
        "second-dkbg": "#282A36",
        "prim-dktext": "#EAEFF4",
        "sec-dktext": "#718C95",
        "border-light": "#ebf1f6",
        "border-dark": "#364052",
        "muted-bg": "#EAEFF4",
        "muted-text": "#A49BA4",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      gridTemplateRows: {
        "5-shipping": "repeat(5, minmax(0, 350px))",
        "5-shipping-st": "repeat(5, minmax(0, 200px))",
        "10-shipping-t": "repeat(10, minmax(0, 200px))",
        "10-shipping-mb": "repeat(10, minmax(0, 150px))",
      },
      keyframes: {
        ligth_mode: {
          "0%": { right: "0.25rem" },
          "100%": { right: "2rem" },
        },
        dark_mode: {
          "0%": { left: "0.25rem" },
          "100%": { left: "2rem" },
        },
        slide_right: {
          "0%": { width: "0" },
          "100%": { width: "20rem" },
        },
        fade_out_quantum_bouncing: {
          "0%": { opacity: "100%", transform: "scale(1)" },
          "30%": { opacity: "100%", transform: "scale(1.2)" },
          "100%": {
            opacity: "0%",
            transform: "scale(0)",
            visibility: "hidden",
          },
        },
        default_quantum_bouncing: {
          "0%": { opacity: "0%", transform: "scale(0)", visibility: "visible" },
          "50%": {
            opacity: "0%",
            transform: "scale(0)",
            visibility: "visible",
          },
          "80%": { opacity: "100%", transform: "scale(1.2)" },
          "100%": { opacity: "100%", transform: "scale(1)" },
        },
        move_up: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "50%": {
            transform: "translateY(-100%) rotate(180deg)",
            opacity: "0",
          },
          "51%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0) rotate(360deg)", opacity: "1" },
        },
        move_down: {
          "0%": { transform: "translateY(0) rotate(180deg)", opacity: "1" },
          "50%": { transform: "translateY(100%) rotate(360deg)", opacity: "0" },
          "51%": {
            transform: "translateY(-100%)",
            opacity: "0",
          },
          "100%": { transform: "translateY(0) rotate(180deg)", opacity: "1" },
        },
        shrink_to_cart: {
          "0%": { transform: "scale(1)" },
          "50%": { top: "-60px" },
          "100%": { top: "-60px", left: "80vw", transform: "scale(0)" },
        },
        slide_right_continues: {
          "0%": { transform: "translateX(0%)" },
          "10%": { transform: "translateX(20%)" },
          "20%": { transform: "translateX(40%)" },
          "30%": { transform: "translateX(60%)" },
          "40%": { transform: "translateX(80%)" },
          "50%": { transform: "translateX(100%)" },
          "60%": { transform: "translateX(80%)" },
          "70%": { transform: "translateX(60%)" },
          "80%": { transform: "translateX(40%)" },
          "90%": { transform: "translateX(20%)" },
          "100%": { transform: "translateX(0%)" },
        },
        slide_right_following: {
          "0%": { transform: "translateX(-100%)" },
          "10%": { transform: "translateX(-80%)" },
          "20%": { transform: "translateX(-60%)" },
          "30%": { transform: "translateX(-40%)" },
          "40%": { transform: "translateX(-20%)" },
          "50%": { transform: "translateX(0%)" },
          "60%": { transform: "translateX(-20%)" },
          "70%": { transform: "translateX(-40%)" },
          "80%": { transform: "translateX(-60%)" },
          "90%": { transform: "translateX(-80%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        ligth_mode: "ligth_mode 0.5s forwards",
        dark_mode: "dark_mode 0.5s forwards",
        slide_right: "slide_right 1s forwards",
        fade_out_quantum_bouncing: "fade_out_quantum_bouncing 0.5s forwards",
        default_quantum_bouncing: "default_quantum_bouncing 0.5s forwards",
        move_up: "move_up 1s forwards",
        move_down: "move_down 1s forwards",
        shrink_to_cart: "shrink_to_cart 0.5s forwards",
        slide_right_continues: "slide_right_continues 30s infinite",
        slide_right_following: "slide_right_following 30s infinite",
      },
    },
  },
  plugins: [],
};
export default config;