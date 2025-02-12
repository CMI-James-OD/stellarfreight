// Example tailwind.config.js
import daisyui from "daisyui";
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
  	extend: {
  		colors: {
  			'orange-450': '#e8772e',
  			'grey-450': '#102541'
  		},
  		fontFamily: {
  			sans: [
  				'Libre Franklin',
  				'sans-serif'
  			]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("daisyui"), require("tailwindcss-animate")],
  daisyui: {
    themes: ["light"], // specify the theme you want to use
  },
};
