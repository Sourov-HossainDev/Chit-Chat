/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        nunito : ['Nunito', 'sans-serif'],
        openSans : ['Open Sans', 'sans-serif'],
        popins : ['Poppins', 'sans-serif'],
      },
      colors : {
        GlufBlue : '#11175D',
        PurpleBlue : '#5F35F5',
        NightBlue : '#03014C',
        MangoTango : '#EA6C00',
        overlay : 'rgba(0, 0, 0, 0.41)',
        positiveColor : '#4cd137',
        nagitiveColor : '#e84118'
      }
    },
  },
  plugins: [],
}