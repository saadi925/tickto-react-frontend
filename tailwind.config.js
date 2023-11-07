/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors :{
        'primary': '#FF6363',
        'secondary': {
          100: '#E2E2D5',
          200: '#888883',
      },
      },
      height :{
           'head' :"3.8rem" 
      },
      minHeight :{
         'head' : "3.8rem"
      },
      fontFamily: {
        mont : ['Montserrat', "sans-serif"],
        robo : ['Roboto', "sans-serif"],
      },
      fontSize: {
        '4.5xl': '2.5rem',
      },
      screens :{
        'xs' : '475px',
      }
    },
  },
  plugins: [],
}