/** @type {import('tailwindcss').Config} */
export const content = ["./index.html", "./src/*.{js,css}"];
export const theme = {
  extend: {
    fontFamily: {
      "spartan": ['League Spartan', 'sans-serif'],
    },
    colors: {
      "Desaturated-Dark-Cyan": 'hsl(180, 29%, 50%)',
      neutral: {
        "Light-Grayish-Cyan-Background": 'hsl(180, 52%, 96%)',
        "Light-Grayish-Cyan-Filter_Tablets": 'hsl(180, 31%, 95%)',
        "Dark-Grayish-Cyan": 'hsl(180, 8%, 52%)',
        "Very-Dark-Grayish-Cyan": 'hsl(180, 14%, 20%)',
      }
    }
  },
};
export const plugins = [];

